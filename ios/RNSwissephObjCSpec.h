#ifndef __cplusplus
#error This file must be compiled as Obj-C++. If you are importing it, you must change your file extension to .mm.
#endif
#import <Foundation/Foundation.h>
#import <RCTRequired/RCTRequired.h>
#import <RCTTypeSafety/RCTConvertHelpers.h>
#import <RCTTypeSafety/RCTTypedModuleConstants.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTCxxConvert.h>
#import <React/RCTManagedPointer.h>
#import <ReactCommon/RCTTurboModule.h>
#import <optional>
#import <vector>
#include "RNSwissephBaseSpec.h"

@protocol NativeSwissephSpec <RCTBridgeModule, RCTTurboModule>

@end

namespace facebook {
  namespace react {
    /**
     * ObjC++ class for module 'NativeSwisseph'
     */
    class JSI_EXPORT NativeSwissephSpecJSI : public ObjCTurboModule {
    public:
      NativeSwissephSpecJSI(const ObjCTurboModule::InitParams &params);
    };
  } // namespace react
} // namespace facebook
