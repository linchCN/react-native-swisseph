cmake_minimum_required(VERSION 3.13)
set(PACKAGE_NAME "Swisseph")
project(${PACKAGE_NAME})

set(CMAKE_VERBOSE_MAKEFILE ON)
set(CMAKE_CXX_STANDARD 17)
set(BUILD_DIR ./build)
set(REACT_NATIVE_DIR "${CMAKE_SOURCE_DIR}/../../react-native/ReactCommon")

# 指定 C 标准版本
set(CMAKE_C_STANDARD 99)
set(CMAKE_C_STANDARD_REQUIRED ON)

# 添加源文件
file(GLOB RN_SWISSEPH_COMMON_SRC "../cpp/*.cpp")
file(GLOB RN_SWISSEPH_ANDROID_SRC "./cpp/*.cpp")
file(GLOB RN_SWISSEPH_LIB_SRC "../swisseph/lib/*.c" "../swisseph/SwissEphGlue.c")

# 创建 swisseph_c 对象库，用于编译 C 文件
add_library(swisseph_c OBJECT ${RN_SWISSEPH_LIB_SRC})
target_include_directories(swisseph_c PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}
        ../swisseph/lib
        ../swisseph
)

add_definitions(-D_FILE_OFFSET_BITS=64)

# 设置编译选项，避免特定编译器的警告
if(CMAKE_C_COMPILER_ID MATCHES "Clang")
  target_compile_options(swisseph_c PRIVATE
          -Wno-unused-command-line-argument
          -Qunused-arguments
  )
endif()
# RN < 0.76.0 begin
#if(ANDROID)
#  add_definitions(-Dfseeko=fseek -Dftello=ftell)
#endif()
# RN < 0.76.0 end

# 添加主库 Swisseph，包含 C++ 源文件
add_library(${PACKAGE_NAME}
        SHARED
        ${RN_SWISSEPH_COMMON_SRC}
        "./cpp-adapter.cpp"
)

# 设置 include 路径
target_include_directories(${PACKAGE_NAME} PUBLIC
        ../cpp
        ./cpp
        ../swisseph/
        ../swisseph/lib/
        ./
)


add_library(react_codegen_Swisseph
        SHARED
        ${RN_SWISSEPH_ANDROID_SRC}
)

target_include_directories(${PACKAGE_NAME} PUBLIC
        ../cpp
        ./cpp
        ../swisseph/
        ../swisseph/lib/
)



# 寻找 ReactAndroid 和 fbjni 包
find_package(ReactAndroid REQUIRED CONFIG)
find_package(fbjni REQUIRED CONFIG)
find_library(log-lib log)
# 链接库
target_link_libraries(
        ${PACKAGE_NAME}
        fbjni::fbjni
        ReactAndroid::jsi
# RN < 0.76.0 begin
#        ReactAndroid::react_nativemodule_core
#        ReactAndroid::react_newarchdefaults
#        ReactAndroid::turbomodulejsijni
# RN < 0.76.0 end
# RN >= 0.76.0 begin
        ReactAndroid::reactnative
# RN >= 0.76.0 end
        ${log-lib}
        swisseph_c  # 链接 C 代码生成的对象文件
)

target_link_libraries(
        react_codegen_Swisseph
        swisseph_c  # 链接 C 代码生成的对象文件
        android
        ${PACKAGE_NAME}
)

# 设置编译选项，针对 C++ 标准和异常处理
target_compile_options(${PACKAGE_NAME} PRIVATE
        -DFOLLY_NO_CONFIG
        -DLOG_TAG=\"ReactNative\"
        -fexceptions
        -frtti
        -std=c++17
        -Wall
)

target_compile_options(react_codegen_Swisseph PRIVATE
        -DFOLLY_NO_CONFIG
        -DLOG_TAG=\"ReactNative\"
        -fexceptions
        -frtti
        -std=c++17
        -Wall
)
