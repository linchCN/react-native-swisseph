#include "Swisseph.h"

namespace facebook {
    namespace react {


        NativeSwissephSpecJSI::NativeSwissephSpecJSI(const JavaTurboModule::InitParams &params)
                : JavaTurboModule(params) {
            std::unordered_map<std::string, SwissephMethodMetadata> currentMethodMap = createMethodMap();
            for (const auto& pair : currentMethodMap) {
                methodMap_[pair.first] = MethodMetadata{pair.second.argCount,pair.second.invoker};
            }

        }

        std::shared_ptr<TurboModule> Swisseph_ModuleProvider(const std::string &moduleName, const JavaTurboModule::InitParams &params) {
            if (moduleName == "Swisseph") {
                return std::make_shared<NativeSwissephSpecJSI>(params);
            }
            return nullptr;
        }

    } // namespace react
} // namespace facebook
