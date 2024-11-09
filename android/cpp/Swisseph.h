#pragma once

#include <ReactCommon/JavaTurboModule.h>
#include <ReactCommon/TurboModule.h>
#include <jsi/jsi.h>
#include "RNSwissephBaseSpec.h"

namespace facebook {
    namespace react {

        /**
        * JNI C++ class for module 'NativeSwisseph'
        */
        class JSI_EXPORT NativeSwissephSpecJSI : public JavaTurboModule {
        public:
            NativeSwissephSpecJSI(const JavaTurboModule::InitParams &params);
        };


        JSI_EXPORT
        std::shared_ptr<TurboModule> Swisseph_ModuleProvider(const std::string &moduleName, const JavaTurboModule::InitParams &params);

    } // namespace react
} // namespace facebook
