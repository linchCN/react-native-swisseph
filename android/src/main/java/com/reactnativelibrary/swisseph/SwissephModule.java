package com.reactnativelibrary.swisseph;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactModuleWithSpec;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.turbomodule.core.interfaces.TurboModule;

import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@ReactModule(name = SwissephModule.NAME)
public class SwissephModule extends ReactContextBaseJavaModule implements ReactModuleWithSpec, TurboModule {

  public static final String NAME = "Swisseph";

  SwissephModule(ReactApplicationContext context) {
    super(context);
    SwissephBridge.createInstance(context);
  }


  @NonNull
  @Override
  public String getName() {
    return NAME;
  }

  public void initialize(){
    super.initialize();

  }

  public void invalidate() {
    SwissephBridge.getInstance().destroy();
    super.invalidate();
  }

}
