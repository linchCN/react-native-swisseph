"use strict";

import Native from './NativeSwisseph';
import SwissephLib from './Swisseph';
import { Platform } from 'react-native';
export function sweJulday(year, month, day, hour, gregflag) {
  return Native.sweJulday(year, month, day, hour, gregflag);
}
export function sweDeltat(tjd) {
  return Native.sweDeltat(tjd);
}
export function sweRevjul(julday, gregflag) {
  return Native.sweRevjul(julday, gregflag);
}
export function sweUtcTimeZone(iyear, imonth, iday, ihour, imin, isec, timezone) {
  return Native.sweUtcTimeZone(iyear, imonth, iday, ihour, imin, isec, timezone);
}
export function sweUtcToJd(year, month, day, hour, min, sec, gregflag) {
  return Native.sweUtcToJd(year, month, day, hour, min, sec, gregflag);
}
export function sweJdetToUtc(tjdEt, gregflag) {
  return Native.sweJdetToUtc(tjdEt, gregflag);
}
export function sweJdut1ToUtc(tjdUt, gregflag) {
  return Native.sweJdut1ToUtc(tjdUt, gregflag);
}
export function sweSetTopo(geolon, geolat, altitude) {
  Native.sweSetTopo(geolon, geolat, altitude);
}
export function sweGetPlanetName(ipl) {
  return Native.sweGetPlanetName(ipl);
}
export function sweCalcUt(tjdUt, ipl, iflag) {
  return Native.sweCalcUt(tjdUt, ipl, iflag);
}
export function sweCotrans(longitude, latitude, distance, eps) {
  return Native.sweCotrans(longitude, latitude, distance, eps);
}
export function sweCalc(tjd, ipl, iflag) {
  return Native.sweCalc(tjd, ipl, iflag);
}
export function sweHouses(tjdUt, iflag, geolat, geolon, hsys) {
  return Native.sweHouses(tjdUt, iflag, geolat, geolon, hsys);
}
export function sweHousesArmc(armc, geolat, eps, hsys) {
  return Native.sweHousesArmc(armc, geolat, eps, hsys);
}
export function sweHousePos(armc, geolat, eps, hsys) {
  return Native.sweHousePos(armc, geolat, eps, hsys);
}
export function sweSetSidMode(sidMode, t0, ayanT0) {
  return Native.sweSetSidMode(sidMode, t0, ayanT0);
}
export function sweGetAyanamsaUt(tjdUt) {
  return Native.sweGetAyanamsaUt(tjdUt);
}
export function sweSidtime(tjdUt) {
  return Native.sweSidtime(tjdUt);
}
export function sweGetAyanamsa(tjdEt) {
  return Native.sweGetAyanamsaUt(tjdEt);
}
export function sweFixstar(star, tjd, iflag) {
  return Native.sweFixstar(star, tjd, iflag);
}
export function sweFixstarUt(star, tjdUt, iflag) {
  return Native.sweFixstarUt(star, tjdUt, iflag);
}
export function sweHeliacalPhenoUt(tjdUt, dgeo, datm, dobs, objectName, eventType, helflag) {
  return Native.sweHeliacalPhenoUt(tjdUt, dgeo, datm, dobs, objectName, eventType, helflag);
}
export function sweHeliacalUt(tjdUt, dgeo, datm, dobs, objectName, eventType, helflag) {
  return Native.sweHeliacalUt(tjdUt, dgeo, datm, dobs, objectName, eventType, helflag);
}
export function sweVisLimitMag(tjdUt, dgeo, datm, dobs, objectName, helflag) {
  return Native.sweVisLimitMag(tjdUt, dgeo, datm, dobs, objectName, helflag);
}
export function sweNodApsUt(tjdUt, ipl, iflag, method) {
  return Native.sweNodApsUt(tjdUt, ipl, iflag, method);
}
export function getHarmonyResfilePath() {
  // @ts-ignore
  if (Platform.OS === 'harmony') {
    return Native.getHarmonyResfilePath();
  }
  return '';
}
export const Swisseph = SwissephLib;
export default {
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
  ...SwissephLib
};
//# sourceMappingURL=index.js.map