cmake_minimum_required(VERSION 3.8)
set(PACKAGE_NAME "Swisseph")
project(${PACKAGE_NAME})

set(CMAKE_EXPORT_COMPILE_COMMANDS ON)
set(CMAKE_CXX_STANDARD 20)

set(CMAKE_C_STANDARD 99)
set(CMAKE_C_STANDARD_REQUIRED ON)

# 启用详细编译日志（可选）
set(CMAKE_VERBOSE_MAKEFILE ON)

set(ROOT_DIR "${CMAKE_SOURCE_DIR}/../../../../react-native-swisseph")

# React Native 基础路径
set(REACT_NATIVE_DIR "${CMAKE_SOURCE_DIR}/../../../../react-native")

# ---------- 构建路径与源文件 ----------
set(BUILD_DIR "${CMAKE_SOURCE_DIR}/build")

file(GLOB RN_SWISSEPH_COMMON_SRC "${ROOT_DIR}/cpp/*.cpp")
file(GLOB RN_SWISSEPH_ANDROID_SRC "${ROOT_DIR}/android/cpp/*.cpp")
file(GLOB RN_SWISSEPH_LIB_SRC "${ROOT_DIR}/swisseph/lib/*.c" "${ROOT_DIR}/swisseph/SwissEphGlue.c")


# ---------- 编译 C 源文件为对象库 ----------
add_library(swisseph_c OBJECT ${RN_SWISSEPH_LIB_SRC})
target_include_directories(swisseph_c PRIVATE
  ${CMAKE_CURRENT_SOURCE_DIR}
  ${ROOT_DIR}/swisseph/lib
  ${ROOT_DIR}/swisseph
)
add_definitions(-D_FILE_OFFSET_BITS=64)

# ---------- 查找 React Native prefab 库 ----------
find_package(fbjni REQUIRED CONFIG)
find_package(ReactAndroid REQUIRED CONFIG)
find_library(log-lib log)

# ---------- 主 TurboModule 目标 ----------
add_library(${PROJECT_NAME} SHARED
  ${RN_SWISSEPH_COMMON_SRC}
  ${ROOT_DIR}/android/cpp-adapter.cpp
)

# React Native 编译 flags（0.76+ 新增）
if(ReactAndroid_VERSION_MINOR GREATER_EQUAL 80)
  include("../../react-native/ReactCommon/cmake-utils/react-native-flags.cmake")
  target_compile_reactnative_options(${PROJECT_NAME} PUBLIC)
else()
  string(APPEND CMAKE_CXX_FLAGS " -fexceptions -frtti -std=c++${CMAKE_CXX_STANDARD} -Wall")
endif()

# ---------- include 目录 ----------
target_include_directories(${PROJECT_NAME} PUBLIC
  ${ROOT_DIR}/cpp
  ${ROOT_DIR}/android/cpp
  ${ROOT_DIR}/swisseph
  ${ROOT_DIR}/swisseph/lib
  ${REACT_NATIVE_DIR}/ReactCommon
  ${REACT_NATIVE_DIR}/ReactCommon/react/nativemodule/core
  ${REACT_NATIVE_DIR}/ReactAndroid/src/main/jni/react/turbomodule
)

# ---------- 链接 ----------
target_link_libraries(${PROJECT_NAME}
  fbjni::fbjni
  ReactAndroid::jsi
  ReactAndroid::reactnative
  ${log-lib}
  swisseph_c
)

# ---------- 生成额外代码库（可选） ----------
add_library(react_codegen_Swisseph SHARED ${RN_SWISSEPH_ANDROID_SRC})
target_include_directories(react_codegen_Swisseph PUBLIC
  ${ROOT_DIR}/cpp
  ${ROOT_DIR}/android/cpp
  ${ROOT_DIR}/swisseph
  ${ROOT_DIR}/swisseph/lib
)
target_link_libraries(react_codegen_Swisseph
  ${PROJECT_NAME}
  swisseph_c
  fbjni::fbjni
  android
)
