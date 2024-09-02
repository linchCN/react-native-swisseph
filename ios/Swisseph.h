#ifdef __cplusplus
#import "react-native-swisseph.h"
#endif

#ifdef RCT_NEW_ARCH_ENABLED
#import "RNSwissephSpec.h"

@interface Swisseph : NSObject <NativeSwissephSpec>
#else
#import <React/RCTBridgeModule.h>

@interface Swisseph : NSObject <RCTBridgeModule>
#endif

@end
