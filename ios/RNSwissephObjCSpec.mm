#import "RNSwissephObjCSpec.h"

namespace facebook {
namespace react {


NativeSwissephSpecJSI::NativeSwissephSpecJSI(const ObjCTurboModule::InitParams &params)
      : ObjCTurboModule(params) {
  std::unordered_map<std::string, SwissephMethodMetadata> currentMethodMap = createMethodMap();
  for (const auto& pair : currentMethodMap) {
      methodMap_[pair.first] = MethodMetadata{pair.second.argCount,pair.second.invoker};
  }
}


} // namespace react
} // namespace facebook
