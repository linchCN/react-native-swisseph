#include <jni.h>
#include "RNSwisseph.h"
#include "RNSwissephBaseSpec.h"

#include <vector>
#include <string>


extern "C"
JNIEXPORT void JNICALL
Java_com_reactnativelibrary_swisseph_SwissephBridge_initialize(JNIEnv *env, jclass type, jstring path) {
    const char *hsysChars = env->GetStringUTFChars(path, nullptr);
    facebook::react::setGlobalEphemerisPath(hsysChars);
}

extern "C"
JNIEXPORT void JNICALL
Java_com_reactnativelibrary_swisseph_SwissephBridge_invalidate(JNIEnv *env, jobject type) {
    swisseph::swe_close();
}
