#include "RNSwisseph.h"
#include <map>
#include <string>
#include <vector>
#include <jsi/jsi.h>
#include <iostream>
#include <exception>
#include <stdlib.h>
#include <ReactCommon/TurboModule.h>

namespace facebook {
namespace react {

struct SwissephMethodMetadata {
  size_t argCount;
  facebook::jsi::Value (*invoker)(
    facebook::jsi::Runtime &rt,
    TurboModule &turboModule,
    const facebook::jsi::Value *args,
    size_t count);
};


void setGlobalEphemerisPath(const std::string& path);

std::string getGlobalEphemerisPath();

std::unordered_map<std::string, SwissephMethodMetadata> createMethodMap();

} // namespace react
} // namespace facebook
