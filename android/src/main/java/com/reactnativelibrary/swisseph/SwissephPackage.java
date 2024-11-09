package com.reactnativelibrary.swisseph;

import androidx.annotation.Nullable;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
 import com.facebook.react.module.model.ReactModuleInfo;
import com.facebook.react.module.model.ReactModuleInfoProvider;
import com.facebook.react.TurboReactPackage;

import java.util.Collections;
import java.util.List;
 import java.util.HashMap;
 import java.util.Map;

public class SwissephPackage extends TurboReactPackage {

  @Nullable
  @Override
  public NativeModule getModule(String name, ReactApplicationContext reactContext) {
      if (name.equals(SwissephModule.NAME)) {
          return new SwissephModule(reactContext);
      } else {
          return null;
      }
  }


  @Override
  public ReactModuleInfoProvider getReactModuleInfoProvider() {
      return () -> {
          final Map<String, ReactModuleInfo> moduleInfos = new HashMap<>();
          moduleInfos.put(
            SwissephModule.NAME,
                  new ReactModuleInfo(
                    SwissephModule.NAME,
                    SwissephModule.NAME,
                          false, // canOverrideExistingModule
                          false, // needsEagerInit
                          true, // hasConstants
                          true, // isCxxModule
                          true // isTurboModule
          ));
          return moduleInfos;
      };
  }
}
