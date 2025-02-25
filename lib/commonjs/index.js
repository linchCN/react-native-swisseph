"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Swisseph = void 0;
exports.getHarmonyResfilePath = getHarmonyResfilePath;
exports.sweCalc = sweCalc;
exports.sweCalcUt = sweCalcUt;
exports.sweCotrans = sweCotrans;
exports.sweDeltat = sweDeltat;
exports.sweFixstar = sweFixstar;
exports.sweFixstarUt = sweFixstarUt;
exports.sweGetAyanamsa = sweGetAyanamsa;
exports.sweGetAyanamsaUt = sweGetAyanamsaUt;
exports.sweGetPlanetName = sweGetPlanetName;
exports.sweHeliacalPhenoUt = sweHeliacalPhenoUt;
exports.sweHeliacalUt = sweHeliacalUt;
exports.sweHousePos = sweHousePos;
exports.sweHouses = sweHouses;
exports.sweHousesArmc = sweHousesArmc;
exports.sweJdetToUtc = sweJdetToUtc;
exports.sweJdut1ToUtc = sweJdut1ToUtc;
exports.sweJulday = sweJulday;
exports.sweNodApsUt = sweNodApsUt;
exports.sweRevjul = sweRevjul;
exports.sweSetSidMode = sweSetSidMode;
exports.sweSetTopo = sweSetTopo;
exports.sweSidtime = sweSidtime;
exports.sweUtcTimeZone = sweUtcTimeZone;
exports.sweUtcToJd = sweUtcToJd;
exports.sweVisLimitMag = sweVisLimitMag;
var _NativeSwisseph = _interopRequireDefault(require("./NativeSwisseph"));
var _Swisseph = _interopRequireDefault(require("./Swisseph"));
var _reactNative = require("react-native");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function sweJulday(year, month, day, hour, gregflag) {
  return _NativeSwisseph.default.sweJulday(year, month, day, hour, gregflag);
}
function sweDeltat(tjd) {
  return _NativeSwisseph.default.sweDeltat(tjd);
}
function sweRevjul(julday, gregflag) {
  return _NativeSwisseph.default.sweRevjul(julday, gregflag);
}
function sweUtcTimeZone(iyear, imonth, iday, ihour, imin, isec, timezone) {
  return _NativeSwisseph.default.sweUtcTimeZone(iyear, imonth, iday, ihour, imin, isec, timezone);
}
function sweUtcToJd(year, month, day, hour, min, sec, gregflag) {
  return _NativeSwisseph.default.sweUtcToJd(year, month, day, hour, min, sec, gregflag);
}
function sweJdetToUtc(tjdEt, gregflag) {
  return _NativeSwisseph.default.sweJdetToUtc(tjdEt, gregflag);
}
function sweJdut1ToUtc(tjdUt, gregflag) {
  return _NativeSwisseph.default.sweJdut1ToUtc(tjdUt, gregflag);
}
function sweSetTopo(geolon, geolat, altitude) {
  _NativeSwisseph.default.sweSetTopo(geolon, geolat, altitude);
}
function sweGetPlanetName(ipl) {
  return _NativeSwisseph.default.sweGetPlanetName(ipl);
}
function sweCalcUt(tjdUt, ipl, iflag) {
  return _NativeSwisseph.default.sweCalcUt(tjdUt, ipl, iflag);
}
function sweCotrans(longitude, latitude, distance, eps) {
  return _NativeSwisseph.default.sweCotrans(longitude, latitude, distance, eps);
}
function sweCalc(tjd, ipl, iflag) {
  return _NativeSwisseph.default.sweCalc(tjd, ipl, iflag);
}
function sweHouses(tjdUt, iflag, geolat, geolon, hsys) {
  return _NativeSwisseph.default.sweHouses(tjdUt, iflag, geolat, geolon, hsys);
}
function sweHousesArmc(armc, geolat, eps, hsys) {
  return _NativeSwisseph.default.sweHousesArmc(armc, geolat, eps, hsys);
}
function sweHousePos(armc, geolat, eps, hsys) {
  return _NativeSwisseph.default.sweHousePos(armc, geolat, eps, hsys);
}
function sweSetSidMode(sidMode, t0, ayanT0) {
  return _NativeSwisseph.default.sweSetSidMode(sidMode, t0, ayanT0);
}
function sweGetAyanamsaUt(tjdUt) {
  return _NativeSwisseph.default.sweGetAyanamsaUt(tjdUt);
}
function sweSidtime(tjdUt) {
  return _NativeSwisseph.default.sweSidtime(tjdUt);
}
function sweGetAyanamsa(tjdEt) {
  return _NativeSwisseph.default.sweGetAyanamsaUt(tjdEt);
}
function sweFixstar(star, tjd, iflag) {
  return _NativeSwisseph.default.sweFixstar(star, tjd, iflag);
}
function sweFixstarUt(star, tjdUt, iflag) {
  return _NativeSwisseph.default.sweFixstarUt(star, tjdUt, iflag);
}
function sweHeliacalPhenoUt(tjdUt, dgeo, datm, dobs, objectName, eventType, helflag) {
  return _NativeSwisseph.default.sweHeliacalPhenoUt(tjdUt, dgeo, datm, dobs, objectName, eventType, helflag);
}
function sweHeliacalUt(tjdUt, dgeo, datm, dobs, objectName, eventType, helflag) {
  return _NativeSwisseph.default.sweHeliacalUt(tjdUt, dgeo, datm, dobs, objectName, eventType, helflag);
}
function sweVisLimitMag(tjdUt, dgeo, datm, dobs, objectName, helflag) {
  return _NativeSwisseph.default.sweVisLimitMag(tjdUt, dgeo, datm, dobs, objectName, helflag);
}
function sweNodApsUt(tjdUt, ipl, iflag, method) {
  return _NativeSwisseph.default.sweNodApsUt(tjdUt, ipl, iflag, method);
}
function getHarmonyResfilePath() {
  // @ts-ignore
  if (_reactNative.Platform.OS === 'harmony') {
    return _NativeSwisseph.default.getHarmonyResfilePath();
  }
  return '';
}
const Swisseph = exports.Swisseph = _Swisseph.default;
var _default = exports.default = {
  sweJulday,
  sweDeltat,
  sweRevjul,
  sweUtcToJd,
  sweUtcTimeZone,
  sweJdetToUtc,
  sweJdut1ToUtc,
  sweSetTopo,
  sweGetPlanetName,
  sweCalcUt,
  sweCotrans,
  sweCalc,
  sweHouses,
  sweHousesArmc,
  sweHousePos,
  sweSetSidMode,
  sweGetAyanamsaUt,
  sweSidtime,
  sweGetAyanamsa,
  sweFixstar,
  sweFixstarUt,
  sweHeliacalPhenoUt,
  sweHeliacalUt,
  sweVisLimitMag,
  sweNodApsUt,
  getHarmonyResfilePath,
  ..._Swisseph.default
};
//# sourceMappingURL=index.js.map