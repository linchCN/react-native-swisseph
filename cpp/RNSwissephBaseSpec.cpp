#include "RNSwissephBaseSpec.h"

namespace facebook {
namespace react {

std::string g_ephemerisPath;

void setGlobalEphemerisPath(const std::string &path) {
    g_ephemerisPath = path;
    swisseph::swe_set_ephe_path(g_ephemerisPath.c_str());
}

std::string getGlobalEphemerisPath() { return g_ephemerisPath; }

facebook::jsi::Object mapToJsiObject(facebook::jsi::Runtime &runtime, const std::map<std::string, double> &map) {
  facebook::jsi::Object result(runtime);
  for (const auto &[key, value] : map) {
    result.setProperty(runtime, key.c_str(), facebook::jsi::Value(value));
  }
  return result;
}

facebook::jsi::Object mapVectorToJsiObject(facebook::jsi::Runtime &runtime,
                                           const std::map<std::string, std::vector<double>> &map) {
  facebook::jsi::Object result(runtime);
  for (const auto &[key, value] : map) {
    facebook::jsi::Array jsiArray(runtime, value.size());
    for (size_t i = 0; i < value.size(); ++i) {
      jsiArray.setValueAtIndex(runtime, i, value[i]);
    }
    // 将 JSI 数组设置为对象的属性
    result.setProperty(runtime, key.c_str(), std::move(jsiArray));
  }
  return result;
}

void printStackTrace(facebook::jsi::Runtime &rt, std::exception &e) {
  std::cerr << "Caught an exception: " << e.what() << std::endl;
  throw facebook::jsi::JSError(rt, e.what());
}


std::vector<double> jsiArrayToVector(facebook::jsi::Runtime &rt, const facebook::jsi::Value &value) {
  std::vector<double> result;
  if (value.isObject() && value.asObject(rt).isArray(rt)) {
    auto array = value.asObject(rt).asArray(rt);
    size_t size = array.size(rt);
    result.reserve(size);
    for (size_t i = 0; i < size; i++) {
        result.push_back(array.getValueAtIndex(rt, i).asNumber());
    }
  } else {
    throw facebook::jsi::JSError(rt, "Expected an array of numbers");
  }
  return result;
}


static facebook::jsi::Value __hostFunction_NativeSwissephSpecJSI_sweJulday(facebook::jsi::Runtime& rt, TurboModule &turboModule, const facebook::jsi::Value* args, size_t count) {
  try {
    int year = args[0].getNumber();
    int month = args[1].getNumber();
    int day = args[2].getNumber();
    double hour = args[3].getNumber();
    int gregflag = args[4].getNumber();
    double result = swisseph::swe_julday(year, month, day, hour, gregflag);
    return facebook::jsi::Value(result);
  } catch (std::exception &e) {
      printStackTrace(rt, e);
  }
  try {

  } catch (std::exception &e) {
      printStackTrace(rt, e);
  }
  return facebook::jsi::Value::undefined();
}

static facebook::jsi::Value __hostFunction_NativeSwissephSpecJSI_sweDeltat(facebook::jsi::Runtime& rt, TurboModule &turboModule, const facebook::jsi::Value* args, size_t count) {
  try {
    double tjd = args[0].getNumber();
    double result = swisseph::swe_deltat(tjd);
    return facebook::jsi::Value(result);
  } catch (std::exception &e) {
      printStackTrace(rt, e);
  }
  return facebook::jsi::Value::undefined();
}

static facebook::jsi::Value __hostFunction_NativeSwissephSpecJSI_sweRevjul(facebook::jsi::Runtime& rt, TurboModule &turboModule, const facebook::jsi::Value* args, size_t count) {
  try {
    double julday = args[0].getNumber();
    int gregflag = args[1].getNumber();
    auto result = swisseph::swe_revjul(julday, gregflag);
    facebook::jsi::Object obj = facebook::jsi::Object(rt);
    obj.setProperty(rt, "year", std::get<0>(result));
    obj.setProperty(rt, "month", std::get<1>(result));
    obj.setProperty(rt, "day", std::get<2>(result));
    obj.setProperty(rt, "hour", std::get<3>(result));
    return facebook::jsi::Value(std::move(obj));
  } catch (std::exception &e) {
      printStackTrace(rt, e);
  }
  return facebook::jsi::Value::undefined();
}

static facebook::jsi::Value __hostFunction_NativeSwissephSpecJSI_sweUtcTimeZone(facebook::jsi::Runtime& rt, TurboModule &turboModule, const facebook::jsi::Value* args, size_t count) {
  try {
    int iyear = args[0].getNumber();
    int imonth = args[1].getNumber();
    int iday = args[2].getNumber();
    int ihour = args[3].getNumber();
    int imin = args[4].getNumber();
    double isec = args[5].getNumber();
    double timezone = args[6].getNumber();
    auto result = swisseph::swe_utc_time_zone(iyear, imonth, iday, ihour, imin, isec, timezone);
    facebook::jsi::Object obj = facebook::jsi::Object(rt);
    obj.setProperty(rt, "year", std::get<0>(result));
    obj.setProperty(rt, "month", std::get<1>(result));
    obj.setProperty(rt, "day", std::get<2>(result));
    obj.setProperty(rt, "hour", std::get<3>(result));
    obj.setProperty(rt, "minute", std::get<4>(result));
    obj.setProperty(rt, "second", std::get<5>(result));
    return facebook::jsi::Value(std::move(obj));
  } catch (std::exception &e) {
      printStackTrace(rt, e);
  }
  return facebook::jsi::Value::undefined();
}

static facebook::jsi::Value __hostFunction_NativeSwissephSpecJSI_sweUtcToJd(facebook::jsi::Runtime& rt, TurboModule &turboModule, const facebook::jsi::Value* args, size_t count) {
  try {
    int year = args[0].getNumber();
    int month = args[1].getNumber();
    int day = args[2].getNumber();
    int hour = args[3].getNumber();
    int min = args[4].getNumber();
    double sec = args[5].getNumber();
    int gregflag = args[6].getNumber();
    auto result = swisseph::swe_utc_to_jd(year, month, day, hour, min, sec, gregflag);
    facebook::jsi::Object obj = facebook::jsi::Object(rt);
    obj.setProperty(rt, "tjdEt", result["tjd_et"]);
    obj.setProperty(rt, "tjdUt", result["tjd_ut"]);
    return facebook::jsi::Value(std::move(obj));
  } catch (std::exception &e) {
      printStackTrace(rt, e);
  }
  return facebook::jsi::Value::undefined();
}

static facebook::jsi::Value __hostFunction_NativeSwissephSpecJSI_sweJdetToUtc(facebook::jsi::Runtime& rt, TurboModule &turboModule, const facebook::jsi::Value* args, size_t count) {
  try {
    double tjd_et = args[0].getNumber();
    int gregflag = args[1].getNumber();
    auto result = swisseph::swe_jdet_to_utc(tjd_et, gregflag);
    facebook::jsi::Object obj = facebook::jsi::Object(rt);
    obj.setProperty(rt, "year", std::get<0>(result));
    obj.setProperty(rt, "month", std::get<1>(result));
    obj.setProperty(rt, "day", std::get<2>(result));
    obj.setProperty(rt, "hour", std::get<3>(result));
    obj.setProperty(rt, "minute", std::get<4>(result));
    obj.setProperty(rt, "second", std::get<5>(result));
    return facebook::jsi::Value(std::move(obj));
  } catch (std::exception &e) {
      printStackTrace(rt, e);
  }
  return facebook::jsi::Value::undefined();
}

static facebook::jsi::Value __hostFunction_NativeSwissephSpecJSI_sweJdut1ToUtc(facebook::jsi::Runtime& rt, TurboModule &turboModule, const facebook::jsi::Value* args, size_t count) {
  try {
    double tjd_ut = args[0].getNumber();
    int gregflag = args[1].getNumber();
    auto result = swisseph::swe_jdut1_to_utc(tjd_ut, gregflag);
    facebook::jsi::Object obj = facebook::jsi::Object(rt);
    obj.setProperty(rt, "year", std::get<0>(result));
    obj.setProperty(rt, "month", std::get<1>(result));
    obj.setProperty(rt, "day", std::get<2>(result));
    obj.setProperty(rt, "hour", std::get<3>(result));
    obj.setProperty(rt, "minute", std::get<4>(result));
    obj.setProperty(rt, "second", std::get<5>(result));
    return facebook::jsi::Value(std::move(obj));
  } catch (std::exception &e) {
      printStackTrace(rt, e);
  }
  return facebook::jsi::Value::undefined();
}

static facebook::jsi::Value __hostFunction_NativeSwissephSpecJSI_sweSetTopo(facebook::jsi::Runtime& rt, TurboModule &turboModule, const facebook::jsi::Value* args, size_t count) {
  try {
    double geolon = args[0].getNumber();
    double geolat = args[1].getNumber();
    double altitude = args[2].getNumber();
    swisseph::swe_set_topo(geolon, geolat, altitude);
    return facebook::jsi::Value::undefined();
  } catch (std::exception &e) {
      printStackTrace(rt, e);
  }
  return facebook::jsi::Value::undefined();
}

static facebook::jsi::Value __hostFunction_NativeSwissephSpecJSI_sweGetPlanetName(facebook::jsi::Runtime& rt, TurboModule &turboModule, const facebook::jsi::Value* args, size_t count) {
  try {
    int ipl = args[0].getNumber();
    std::string result = swisseph::swe_get_planet_name(ipl);
    return facebook::jsi::Value(rt, facebook::jsi::String::createFromUtf8(rt, result));
  } catch (std::exception &e) {
      printStackTrace(rt, e);
  }
  return facebook::jsi::Value::undefined();
}

static facebook::jsi::Value __hostFunction_NativeSwissephSpecJSI_sweCalcUt(facebook::jsi::Runtime& rt, TurboModule &turboModule, const facebook::jsi::Value* args, size_t count) {
  try {
    double tjd_ut = args[0].getNumber();
    int ipl = args[1].getNumber();
    int iflag = args[2].getNumber();
    if (swisseph::getPath().empty() && !getGlobalEphemerisPath().empty()) {
        swisseph::swe_set_ephe_path(getGlobalEphemerisPath().c_str());
    }
    auto result = swisseph::swe_calc_ut(tjd_ut, ipl, iflag);
    return facebook::jsi::Value(mapToJsiObject(rt, result));
  } catch (std::exception &e) {
      printStackTrace(rt, e);
  }
  return facebook::jsi::Value::undefined();
}

static facebook::jsi::Value __hostFunction_NativeSwissephSpecJSI_sweCotrans(facebook::jsi::Runtime& rt, TurboModule &turboModule, const facebook::jsi::Value* args, size_t count) {
  try {
    double longitude = args[0].getNumber();
    double latitude = args[1].getNumber();
    double distance = args[2].getNumber();
    double eps = args[3].getNumber();
    auto result = swisseph::swe_cotrans(longitude, latitude, distance, eps);
    return facebook::jsi::Value(mapToJsiObject(rt, result));
  } catch (std::exception &e) {
      printStackTrace(rt, e);
  }
  return facebook::jsi::Value::undefined();
}

static facebook::jsi::Value __hostFunction_NativeSwissephSpecJSI_sweCalc(facebook::jsi::Runtime& rt, TurboModule &turboModule, const facebook::jsi::Value* args, size_t count) {
  try {
    double tjd_ut = args[0].getNumber();
    int ipl = args[1].getNumber();
    int iflag = args[2].getNumber();
    auto result = swisseph::swe_calc(tjd_ut, ipl, iflag);
    return facebook::jsi::Value(mapToJsiObject(rt, result));
  } catch (std::exception &e) {
      printStackTrace(rt, e);
  }
  return facebook::jsi::Value::undefined();
}

static facebook::jsi::Value __hostFunction_NativeSwissephSpecJSI_sweHouses(facebook::jsi::Runtime& rt, TurboModule &turboModule, const facebook::jsi::Value* args, size_t count) {
  try {
    double tjd_ut = args[0].getNumber();
    int32_t iflag = args[1].getNumber();
    double geolat = args[2].getNumber();
    double geolon = args[3].getNumber();
    std::string hsys = args[4].getString(rt).utf8(rt);
    auto result = swisseph::swe_houses(tjd_ut, iflag, geolat, geolon, hsys);
    return facebook::jsi::Value(mapVectorToJsiObject(rt, result));
  } catch (std::exception &e) {
      printStackTrace(rt, e);
  }
  return facebook::jsi::Value::undefined();
}

static facebook::jsi::Value __hostFunction_NativeSwissephSpecJSI_sweHousesArmc(facebook::jsi::Runtime& rt, TurboModule &turboModule, const facebook::jsi::Value* args, size_t count) {
  try {
     double armc = args[0].getNumber();
     double geolat = args[1].getNumber();
     double eps = args[2].getNumber();
     std::string hsys = args[3].getString(rt).utf8(rt);
     auto result = swisseph::swe_houses_armc(armc, geolat, eps, hsys);
     return facebook::jsi::Value(mapVectorToJsiObject(rt, result));
  } catch (std::exception &e) {
      printStackTrace(rt, e);
  }
  return facebook::jsi::Value::undefined();
}

static facebook::jsi::Value __hostFunction_NativeSwissephSpecJSI_sweNodApsUt(facebook::jsi::Runtime& rt, TurboModule &turboModule, const facebook::jsi::Value* args, size_t count) {
  try {
     double tjd_ut = args[0].getNumber();
     int32_t ipl = args[1].getNumber();
     int32_t iflag = args[2].getNumber();
     int32_t method = args[3].getNumber();
     auto result = swisseph::swe_nod_aps_ut(tjd_ut, ipl, iflag, method);
     return facebook::jsi::Value(mapVectorToJsiObject(rt, result));
  } catch (std::exception &e) {
      printStackTrace(rt, e);
  }
  return facebook::jsi::Value::undefined();
}

static facebook::jsi::Value __hostFunction_NativeSwissephSpecJSI_sweHousePos(facebook::jsi::Runtime& rt, TurboModule &turboModule, const facebook::jsi::Value* args, size_t count) {
  try {
    double armc = args[0].getNumber();
    double geolat = args[1].getNumber();
    double eps = args[2].getNumber();
    std::string hsys = args[3].getString(rt).utf8(rt);
    auto result = swisseph::swe_house_pos(armc, geolat, eps, hsys);
    return facebook::jsi::Value(mapToJsiObject(rt, result));
  } catch (std::exception &e) {
      printStackTrace(rt, e);
  }
  return facebook::jsi::Value::undefined();
}

static facebook::jsi::Value __hostFunction_NativeSwissephSpecJSI_sweSetSidMode(facebook::jsi::Runtime& rt, TurboModule &turboModule, const facebook::jsi::Value* args, size_t count) {
  try {
    int32_t sid_mode = args[0].getNumber();
    double t0 = args[1].getNumber();
    double ayan_t0 = args[2].getNumber();
    swisseph::swe_set_sid_mode(sid_mode, t0, ayan_t0);
    return facebook::jsi::Value::undefined();
  } catch (std::exception &e) {
      printStackTrace(rt, e);
  }
  return facebook::jsi::Value::undefined();
}

static facebook::jsi::Value __hostFunction_NativeSwissephSpecJSI_sweGetAyanamsaUt(facebook::jsi::Runtime& rt, TurboModule &turboModule, const facebook::jsi::Value* args, size_t count) {
  try {
    double tjd_ut = args[0].getNumber();
    double ayanamsa = swisseph::swe_get_ayanamsa_ut(tjd_ut);
    return facebook::jsi::Value(ayanamsa);
  } catch (std::exception &e) {
      printStackTrace(rt, e);
  }
  return facebook::jsi::Value::undefined();
}

static facebook::jsi::Value __hostFunction_NativeSwissephSpecJSI_sweSidtime(facebook::jsi::Runtime& rt, TurboModule &turboModule, const facebook::jsi::Value* args, size_t count) {
  try {
    double tjd_ut = args[0].getNumber();
    double sidtime = swisseph::swe_sidtime(tjd_ut);
    return facebook::jsi::Value(sidtime);
  } catch (std::exception &e) {
      printStackTrace(rt, e);
  }
  return facebook::jsi::Value::undefined();
}

static facebook::jsi::Value __hostFunction_NativeSwissephSpecJSI_sweGetAyanamsa(facebook::jsi::Runtime& rt, TurboModule &turboModule, const facebook::jsi::Value* args, size_t count) {
  try {
    double tjd = args[0].getNumber();
    double ayanamsa = swisseph::swe_get_ayanamsa(tjd);
    return facebook::jsi::Value(ayanamsa);
  } catch (std::exception &e) {
      printStackTrace(rt, e);
  }
  return facebook::jsi::Value::undefined();
}

static facebook::jsi::Value __hostFunction_NativeSwissephSpecJSI_sweFixstar(facebook::jsi::Runtime& rt, TurboModule &turboModule, const facebook::jsi::Value* args, size_t count) {
  try {
    std::string star = args[0].getString(rt).utf8(rt);
    double tjd = args[1].getNumber();
    int iflag = args[2].getNumber();
    auto result = swisseph::swe_fixstar(star, tjd, iflag);
    return facebook::jsi::Value(mapToJsiObject(rt, result));
  } catch (std::exception &e) {
      printStackTrace(rt, e);
  }
  return facebook::jsi::Value::undefined();
}

static facebook::jsi::Value __hostFunction_NativeSwissephSpecJSI_sweFixstarUt(facebook::jsi::Runtime& rt, TurboModule &turboModule, const facebook::jsi::Value* args, size_t count) {
  try {
    std::string star = args[0].getString(rt).utf8(rt);
    double tjd_ut = args[1].getNumber();
    int iflag = args[2].getNumber();
    auto result = swisseph::swe_fixstar_ut(star, tjd_ut, iflag);
    return facebook::jsi::Value(mapToJsiObject(rt, result));
  } catch (std::exception &e) {
      printStackTrace(rt, e);
  }
  return facebook::jsi::Value::undefined();
}

static facebook::jsi::Value __hostFunction_NativeSwissephSpecJSI_sweHeliacalPhenoUt(facebook::jsi::Runtime& rt, TurboModule &turboModule, const facebook::jsi::Value* args, size_t count) {
  try {
    double tjd_ut = args[0].getNumber();
    std::vector<double> dgeo = jsiArrayToVector(rt, args[1]);
    std::vector<double> datm = jsiArrayToVector(rt, args[2]);
    std::vector<double> dobs = jsiArrayToVector(rt, args[3]);
    std::string object_name = args[4].getString(rt).utf8(rt);
    int event_type = args[5].getNumber();
    int helflag = args[6].getNumber();

    auto result = swisseph::swe_heliacal_pheno_ut(tjd_ut, dgeo, datm, dobs, object_name, event_type, helflag);

    facebook::jsi::Object obj = facebook::jsi::Object(rt);
    std::vector<std::string> keys = {"tcAltitude",
                                 "tcApparentAltitude",
                                 "gcAltitude",
                                 "azimuth",
                                 "tcSunAltitude",
                                 "sunAzimuth",
                                 "tcActualVisibleArc",
                                 "gcActualVisibleArc",
                                 "objectToSunAzimuth",
                                 "objectToSunLongitude",
                                 "extinction",
                                 "tcMinVisibleArc",
                                 "firstVisible",
                                 "bestVisible",
                                 "endVisible",
                                 "yallopBestVisible",
                                 "moonCresentWidth",
                                 "yallopValue",
                                 "yallopCriterion",
                                 "parallax",
                                 "magnitude",
                                 "rise",
                                 "riseSet",
                                 "riseObjectToSun",
                                 "visibleDuration",
                                 "moonCresetLength",
                                 "elong",
                                 "illumination",
                                 "kOZ",
                                 "ka",
                                 "ksumm"};
    for (size_t i = 1; i < result.size(); ++i) {
      auto propName = facebook::jsi::PropNameID::forUtf8(rt, keys[i - 1]);
      obj.setProperty(rt, propName, result[i]);
    }
    return facebook::jsi::Value(std::move(obj));
  } catch (std::exception &e) {
      printStackTrace(rt, e);
  }
  return facebook::jsi::Value::undefined();
}

static facebook::jsi::Value __hostFunction_NativeSwissephSpecJSI_sweHeliacalUt(facebook::jsi::Runtime& rt, TurboModule &turboModule, const facebook::jsi::Value* args, size_t count) {
  try {
    double tjd_ut = args[0].getNumber();
    std::vector<double> dgeo = jsiArrayToVector(rt, args[1]);
    std::vector<double> datm = jsiArrayToVector(rt, args[2]);
    std::vector<double> dobs = jsiArrayToVector(rt, args[3]);
    std::string object_name = args[4].getString(rt).utf8(rt);
    int event_type = args[5].getNumber();
    int helflag = args[6].getNumber();

    auto result = swisseph::swe_heliacal_ut(tjd_ut, dgeo, datm, dobs, object_name, event_type, helflag);

    facebook::jsi::Object obj = facebook::jsi::Object(rt);
    std::vector<std::string> keys = {"startVisible", "bestVisible", "endVisible"};
    for (size_t i = 1; i < result.size(); ++i) {
        auto propName = facebook::jsi::PropNameID::forUtf8(rt, keys[i - 1]);
        obj.setProperty(rt, propName, result[i]);
    }
    return facebook::jsi::Value(std::move(obj));
  } catch (std::exception &e) {
      printStackTrace(rt, e);
  }
  return facebook::jsi::Value::undefined();
}

static facebook::jsi::Value __hostFunction_NativeSwissephSpecJSI_sweVisLimitMag(facebook::jsi::Runtime& rt, TurboModule &turboModule, const facebook::jsi::Value* args, size_t count) {
  try {
    double tjd_ut = args[0].getNumber();
    std::vector<double> dgeo = jsiArrayToVector(rt, args[1]);
    std::vector<double> datm = jsiArrayToVector(rt, args[2]);
    std::vector<double> dobs = jsiArrayToVector(rt, args[3]);
    std::string object_name = args[4].getString(rt).utf8(rt);
    int helflag = args[5].getNumber();
    auto result = swisseph::swe_vis_limit_mag(tjd_ut, dgeo, datm, dobs, object_name, helflag);
    facebook::jsi::Object obj = facebook::jsi::Object(rt);
    std::vector<std::string> keys = {"vissualMagnitudeLimit", "AltO", "AziO", "AltS", "AziS", "AltM", "AziM"};
    for (size_t i = 1; i < result.size(); ++i) {
      auto propName = facebook::jsi::PropNameID::forUtf8(rt, keys[i - 1]);
      obj.setProperty(rt, propName, result[i]);
    }
    return facebook::jsi::Value(std::move(obj));
  } catch (std::exception &e) {
      printStackTrace(rt, e);
  }
  return facebook::jsi::Value::undefined();
}


std::unordered_map<std::string, SwissephMethodMetadata> createMethodMap(){
  return {
    {"sweJulday", SwissephMethodMetadata {5, __hostFunction_NativeSwissephSpecJSI_sweJulday}},
    {"sweDeltat", SwissephMethodMetadata {1, __hostFunction_NativeSwissephSpecJSI_sweDeltat}},
    {"sweRevjul", SwissephMethodMetadata {2, __hostFunction_NativeSwissephSpecJSI_sweRevjul}},
    {"sweUtcTimeZone", SwissephMethodMetadata {7, __hostFunction_NativeSwissephSpecJSI_sweUtcTimeZone}},
    {"sweUtcToJd", SwissephMethodMetadata {7, __hostFunction_NativeSwissephSpecJSI_sweUtcToJd}},
    {"sweJdetToUtc", SwissephMethodMetadata {2, __hostFunction_NativeSwissephSpecJSI_sweJdetToUtc}},
    {"sweJdut1ToUtc", SwissephMethodMetadata {2, __hostFunction_NativeSwissephSpecJSI_sweJdut1ToUtc}},
    {"sweSetTopo", SwissephMethodMetadata {3, __hostFunction_NativeSwissephSpecJSI_sweSetTopo}},
    {"sweGetPlanetName", SwissephMethodMetadata {1, __hostFunction_NativeSwissephSpecJSI_sweGetPlanetName}},
    {"sweCalcUt", SwissephMethodMetadata {3, __hostFunction_NativeSwissephSpecJSI_sweCalcUt}},
    {"sweCotrans", SwissephMethodMetadata {4, __hostFunction_NativeSwissephSpecJSI_sweCotrans}},
    {"sweCalc", SwissephMethodMetadata {3, __hostFunction_NativeSwissephSpecJSI_sweCalc}},
    {"sweHouses", SwissephMethodMetadata {5, __hostFunction_NativeSwissephSpecJSI_sweHouses}},
    {"sweHousesArmc", SwissephMethodMetadata {4, __hostFunction_NativeSwissephSpecJSI_sweHousesArmc}},
    {"sweHousePos", SwissephMethodMetadata {4, __hostFunction_NativeSwissephSpecJSI_sweHousePos}},
    {"sweSetSidMode", SwissephMethodMetadata {3, __hostFunction_NativeSwissephSpecJSI_sweSetSidMode}},
    {"sweGetAyanamsaUt", SwissephMethodMetadata {1, __hostFunction_NativeSwissephSpecJSI_sweGetAyanamsaUt}},
    {"sweSidtime", SwissephMethodMetadata {1, __hostFunction_NativeSwissephSpecJSI_sweSidtime}},
    {"sweGetAyanamsa", SwissephMethodMetadata {1, __hostFunction_NativeSwissephSpecJSI_sweGetAyanamsa}},
    {"sweFixstar", SwissephMethodMetadata {3, __hostFunction_NativeSwissephSpecJSI_sweFixstar}},
    {"sweFixstarUt", SwissephMethodMetadata {3, __hostFunction_NativeSwissephSpecJSI_sweFixstarUt}},
    {"sweHeliacalPhenoUt", SwissephMethodMetadata {7, __hostFunction_NativeSwissephSpecJSI_sweHeliacalPhenoUt}},
    {"sweHeliacalUt", SwissephMethodMetadata {7, __hostFunction_NativeSwissephSpecJSI_sweHeliacalUt}},
    {"sweVisLimitMag", SwissephMethodMetadata {6, __hostFunction_NativeSwissephSpecJSI_sweVisLimitMag}},
    {"sweNodApsUt", SwissephMethodMetadata {4, __hostFunction_NativeSwissephSpecJSI_sweNodApsUt}}
  };
}
}
}
