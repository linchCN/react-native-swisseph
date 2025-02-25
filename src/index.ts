import Native from './NativeSwisseph';
import SwissephLib from './Swisseph';
import { Platform } from 'react-native';

export function sweJulday(
  year: number,
  month: number,
  day: number,
  hour: number,
  gregflag: number
): number {
  return Native.sweJulday(year, month, day, hour, gregflag);
}

export function sweDeltat(tjd: number): number {
  return Native.sweDeltat(tjd);
}

export function sweRevjul(
  julday: number,
  gregflag: number
): { year: number; month: number; day: number; hour: number } {
  return Native.sweRevjul(julday, gregflag);
}

export function sweUtcTimeZone(
  iyear: number,
  imonth: number,
  iday: number,
  ihour: number,
  imin: number,
  isec: number,
  timezone: number
): {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
} {
  return Native.sweUtcTimeZone(
    iyear,
    imonth,
    iday,
    ihour,
    imin,
    isec,
    timezone
  );
}

export function sweUtcToJd(
  year: number,
  month: number,
  day: number,
  hour: number,
  min: number,
  sec: number,
  gregflag: number
): { tjdEt: number; tjdUt: number } {
  return Native.sweUtcToJd(year, month, day, hour, min, sec, gregflag);
}

export function sweJdetToUtc(
  tjdEt: number,
  gregflag: number
): {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
} {
  return Native.sweJdetToUtc(tjdEt, gregflag);
}

export function sweJdut1ToUtc(
  tjdUt: number,
  gregflag: number
): {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
} {
  return Native.sweJdut1ToUtc(tjdUt, gregflag);
}

export function sweSetTopo(
  geolon: number,
  geolat: number,
  altitude: number
): void {
  Native.sweSetTopo(geolon, geolat, altitude);
}

export function sweGetPlanetName(ipl: number): string {
  return Native.sweGetPlanetName(ipl);
}

export function sweCalcUt(
  tjdUt: number,
  ipl: number,
  iflag: number
): {
  longitude: number;
  latitude: number;
  distance: number;
  longitudeSpeed: number;
  latitudeSpeed: number;
  distanceSpeed: number;
} {
  return Native.sweCalcUt(tjdUt, ipl, iflag);
}

export function sweCotrans(
  longitude: number,
  latitude: number,
  distance: number,
  eps: number
): { longitude: number; latitude: number; distance: number } {
  return Native.sweCotrans(longitude, latitude, distance, eps);
}

export function sweCalc(
  tjd: number,
  ipl: number,
  iflag: number
): {
  longitude: number;
  latitude: number;
  distance: number;
  longitudeSpeed: number;
  latitudeSpeed: number;
  distanceSpeed: number;
} {
  return Native.sweCalc(tjd, ipl, iflag);
}

export function sweHouses(
  tjdUt: number,
  iflag: number,
  geolat: number,
  geolon: number,
  hsys: string
): { cusp: number[]; ascmc: number[] } {
  return Native.sweHouses(tjdUt, iflag, geolat, geolon, hsys);
}

export function sweHousesArmc(
  armc: number,
  geolat: number,
  eps: number,
  hsys: string
): { cusp: number[]; ascmc: number[] } {
  return Native.sweHousesArmc(armc, geolat, eps, hsys);
}

export function sweHousePos(
  armc: number,
  geolat: number,
  eps: number,
  hsys: string
): { longitude: number; latitude: number } {
  return Native.sweHousePos(armc, geolat, eps, hsys);
}

export function sweSetSidMode(
  sidMode: number,
  t0: number,
  ayanT0: number
): void {
  return Native.sweSetSidMode(sidMode, t0, ayanT0);
}

export function sweGetAyanamsaUt(tjdUt: number): number {
  return Native.sweGetAyanamsaUt(tjdUt);
}

export function sweSidtime(tjdUt: number): number {
  return Native.sweSidtime(tjdUt);
}

export function sweGetAyanamsa(tjdEt: number): number {
  return Native.sweGetAyanamsaUt(tjdEt);
}

export function sweFixstar(
  star: string,
  tjd: number,
  iflag: number
): {
  longitude: number;
  latitude: number;
  distance: number;
} {
  return Native.sweFixstar(star, tjd, iflag);
}

export function sweFixstarUt(
  star: string,
  tjdUt: number,
  iflag: number
): {
  longitude: number;
  latitude: number;
  distance: number;
} {
  return Native.sweFixstarUt(star, tjdUt, iflag);
}

export function sweHeliacalPhenoUt(
  tjdUt: number,
  dgeo: number[],
  datm: number[],
  dobs: number[],
  objectName: string,
  eventType: number,
  helflag: number
): {
  tcAltitude: number;
  tcApparentAltitude: number;
  gcAltitude: number;
  azimuth: number;
  tcSunAltitude: number;
  sunAzimuth: number;
  tcActualVisibleArc: number;
  gcActualVisibleArc: number;
  objectToSunAzimuth: number;
  objectToSunLongitude: number;
  extinction: number;
  tcMinVisibleArc: number;
  firstVisible: number;
  bestVisible: number;
  endVisible: number;
  yallopBestVisible: number;
  moonCresentWidth: number;
  yallopValue: number;
  yallopCriterion: number;
  parallax: number;
  magnitude: number;
  rise: number;
  riseSet: number;
  riseObjectToSun: number;
  visibleDuration: number;
  moonCresetLength: number;
  elong: number;
  illumination: number;
  kOZ: number;
  ka: number;
  ksumm: number;
  error?: string;
} {
  return Native.sweHeliacalPhenoUt(
    tjdUt,
    dgeo,
    datm,
    dobs,
    objectName,
    eventType,
    helflag
  );
}

export function sweHeliacalUt(
  tjdUt: number,
  dgeo: number[],
  datm: number[],
  dobs: number[],
  objectName: string,
  eventType: number,
  helflag: number
): {
  error?: boolean;
  errorCode?: number;
  startVisible?: number;
  bestVisible?: number;
  endVisible?: number;
} {
  return Native.sweHeliacalUt(
    tjdUt,
    dgeo,
    datm,
    dobs,
    objectName,
    eventType,
    helflag
  );
}

export function sweVisLimitMag(
  tjdUt: number,
  dgeo: number[],
  datm: number[],
  dobs: number[],
  objectName: string,
  helflag: number
): {
  error?: boolean;
  errorCode?: number;
  vissualMagnitudeLimit?: number;
  AltO?: number;
  AziO?: number;
  AltS?: number;
  AziS?: number;
  AltM?: number;
  AziM?: number;
} {
  return Native.sweVisLimitMag(tjdUt, dgeo, datm, dobs, objectName, helflag);
}

export function sweNodApsUt(
  tjdUt: number,
  ipl: number,
  iflag: number,
  method: number
): {
  ascending: number[];
  descending: number[];
  perihelion: number[];
  aphelion: number[];
} {
  return Native.sweNodApsUt(tjdUt, ipl, iflag, method);
}

export function getHarmonyResfilePath(): string {
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
  ...SwissephLib,
};
