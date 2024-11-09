#ifdef __cplusplus
#endif

#ifdef RCT_NEW_ARCH_ENABLED
#import "RNSwissephObjCSpec.h"

@interface Swisseph : NSObject <NativeSwissephSpec>
#else
#import <React/RCTBridgeModule.h>

@interface Swisseph : NSObject <RCTBridgeModule>
#endif

@end
