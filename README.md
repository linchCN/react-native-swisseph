
# Swiss Ephemeris binding for react-native

## Getting started

### Old Architecture
`$ npm install react-native-swisseph@0.0.20 --save`

### New Architecture and React Native 0.76+
`$ npm install react-native-swisseph@0.1 --save`

### Mostly automatic installation

1. With autolinking (react-native 0.60+)

   `cd ios && pod install`

2. Pre react-native 0.60

   `$ react-native link react-native-swisseph`


### Versions greater than 0.1.* include the following features:

1. Support for New Architecture
2. Code uniformly implemented in C/C++
3. Synchronous method calls
4. Typescript support

## Usage
```typescript

  sweJulday(
    year: number,
    month: number,
    day: number,
    hour: number,
    gregflag: number
  ): number;

  sweDeltat(tjd: number): number;

  sweRevjul(
    julday: number,
    gregflag: number
  ): { year: number; month: number; day: number; hour: number };

  sweUtcTimeZone(
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
  };

  sweUtcToJd(
    year: number,
    month: number,
    day: number,
    hour: number,
    min: number,
    sec: number,
    gregflag: number
  ): { tjd_et: number; tjd_ut: number };

  sweJdetToUtc(
    tjd_et: number,
    gregflag: number
  ): {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
  };

  sweJdut1ToUtc(
    tjd_ut: number,
    gregflag: number
  ): {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
  };

  sweSetTopo(geolon: number, geolat: number, altitude: number): void;

  sweGetPlanetName(ipl: number): string;

  sweCalcUt(
    tjd_ut: number,
    ipl: number,
    iflag: number
  ): {
    longitude: number;
    latitude: number;
    distance: number;
    longitudeSpeed: number;
    latitudeSpeed: number;
    distanceSpeed: number;
  };

  sweCotrans(
    longitude: number,
    latitude: number,
    distance: number,
    eps: number
  ): { longitude: number; latitude: number; distance: number };

  sweCalc(
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
  };

  sweHouses(
    tjd_ut: number,
    iflag: number,
    geolat: number,
    geolon: number,
    hsys: string
  ): { cusp: number[]; ascmc: number[] };

  sweHousesArmc(
    armc: number,
    geolat: number,
    eps: number,
    hsys: string
  ): { cusp: number[]; ascmc: number[] };

  sweHousePos(
    armc: number,
    geolat: number,
    eps: number,
    hsys: string
  ): { longitude: number; latitude: number };

  sweSetSidMode(sid_mode: number, t0: number, ayan_t0: number): void;

  sweGetAyanamsaUt(tjd_ut: number): number;

  sweSidtime(tjd_ut: number): number;

  sweGetAyanamsa(tjd_et: number): number;

  sweFixstar(
    star: string,
    tjd: number,
    iflag: number
  ): {
    longitude: number;
    latitude: number;
    distance: number;
  };

  sweFixstarUt(
    star: string,
    tjd_ut: number,
    iflag: number
  ): {
    longitude: number;
    latitude: number;
    distance: number;
  };

  sweHeliacalPhenoUt(
    tjd_ut: number,
    dgeo: number[],
    datm: number[],
    dobs: number[],
    object_name: string,
    event_type: number,
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
  };

  sweHeliacalUt(
    tjd_ut: number,
    dgeo: number[],
    datm: number[],
    dobs: number[],
    object_name: string,
    event_type: number,
    helflag: number
  ): {
    error?: boolean;
    errorCode?: number;
    startVisible?: number;
    bestVisible?: number;
    endVisible?: number;
  };

  sweVisLimitMag(
    tjd_ut: number,
    dgeo: number[],
    datm: number[],
    dobs: number[],
    object_name: string,
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
  };

  sweNodApsUt(
    tjd_ut: number,
    ipl: number,
    iflag: number,
    method: number
  ): {
    ascending: number[];
    descending: number[];
    perihelion: number[];
    aphelion: number[];
  };


```


## Documentation
See [Programming interface](http://www.astro.com/swisseph/swephprg.htm)  to the Swiss Ephemeris for more details.


## References
- [Swiss Ephemeris](http://www.astro.com/swisseph/)
- [swisseph-java](http://th-mack.de/download/index.html)
- [Swiss Ephemeris binding for node.js](https://github.com/mivion/swisseph)


## License
The license for this project is the same as original Swiss Ephemeris.
