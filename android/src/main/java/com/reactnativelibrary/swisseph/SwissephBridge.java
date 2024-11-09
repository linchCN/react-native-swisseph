package com.reactnativelibrary.swisseph;

import com.facebook.react.bridge.WritableMap;
import com.reactnativelibrary.swisseph.util.CopyAssetfiles;
import com.facebook.react.bridge.ReactApplicationContext;

import java.io.File;
import java.util.List;
import java.util.Map;

public class SwissephBridge {

  static {
    System.loadLibrary("Swisseph");
  }

  public static native void initialize(String path);

  public native void invalidate();


  private static SwissephBridge instance = null;

  public static SwissephBridge getInstance() {
    return instance;
  }

  public static SwissephBridge createInstance(ReactApplicationContext context) {
    instance = new SwissephBridge();
    new CopyAssetfiles(".*\\.se1", context).copy();
    initialize(context.getFilesDir() + File.separator + "/ephe");
    return instance;
  }


  public void destroy() {
    invalidate();
  }



}
