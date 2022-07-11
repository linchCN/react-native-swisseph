/**
 * ## react native swisseph
 * Swiss Ephemeris native module bindings for react native.
 *
 * Type definitions abridged and modified from https://github.com/timotejroiko/sweph/
 *
 * [Official programmers documentation for the Swiss Ephemeris](https://www.astro.com/swisseph/swephprg.htm)
 * [Official guide for the Swiss Ephemeris](https://www.astro.com/ftp/swisseph/doc/swisseph.htm)
 * [Sweph on Github](https://github.com/timotejroiko/sweph)
 * [Sweph on NPM](http://npmjs.com/package/sweph)
 *
 * ### Usage
 * ```
 * const { utc_to_jd, calc, houses_ex2, constants, set_ephe_path } = require("sweph");
 * // or import { utc_to_jd, calc, houses_ex2, constants, set_ephe_path } from "sweph";
 *
 * set_ephe_path("./ephemeris"); // folder containing your ephemeris files;
 *
 * const date = utc_to_jd(2020, 1, 25, 15, 35, 0, constants.SE_GREG_CAL); // 1 Jan 2020, 15:35:00
 * if(date.flag !== constants.OK) { throw new Error(date.error); }
 *
 * const [ jd_et, jd_ut ] = date.data; // et for planets, ut for houses
 * const flags = constants.SEFLG_SWIEPH | constants.SEFLG_SPEED; // use the ephemeris files and enable speeds
 * const planets = calc(jd_et, constants.SE_SUN, flags);
 * if(planets.flag !== flags) { console.log(planets.error); } // if the flags are not the same then something went wrong
 *
 * const houses = houses_ex2(jd_ut, 0, 37, 54, "P"); // placidus houses on latitude 37 longitude 54
 * if(houses.flag !== constants.OK) { console.log(houses.error) } // if flag is not equal to OK then something went wrong
 *
 * console.log(planets.data, houses.data)
 * ```
 */
declare module "react-native-swisseph" {
    //@ts-ignore
    export * as default from "index";

    /*
	┌──────────────────────────────────────────────────┬────────────┬──────────────────────────────────────────────────┐
	│┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼│ Interfaces │┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼│
	└──────────────────────────────────────────────────┴────────────┴──────────────────────────────────────────────────┘
	*/

    interface Flag {
        /**
         * ### Description
         * Status flag returned by the function
         * Use it to check if the function succeeded, failed, or to check output type
         * ```
         * ```
         */
        flag: number;
    }

    interface Error {
        /**
         * ### Description
         * Error message
         * An error message will be available here when the flag indicates failure
         * ```
         * ```
         */
        error: string;
    }

    interface Name {
        /**
         * ### Description
         * Star name
         * The full star name as it appears in the sefstars.txt file
         * ```
         * ```
         */
        name: string;
    }

    interface GetCurrentFileData {
        /**
         * ### Description
         * Path to ephemeris file
         * ```
         * ```
         */
        path: string;
        /**
         * ### Description
         * Ephemeris start date for this file
         * ```
         * ```
         */
        start: number;
        /**
         * ### Description
         * Ephemeris end date for this file
         * ```
         * ```
         */
        end: number;
        /**
         * ### Description
         * JPL ephemeris version used to generate the file
         * ```
         * ```
         */
        denum: number;
    }

    interface GetOrbitalElements extends Flag, Error {
        /**
         * ### Description
         * Array of orbital/kepler elements
         * ```
         * ```
         */
        data: OrbitalElementsData;
    }

    interface Calc extends Error, Flag {
        /**
         * ### Description
         * Array of values returned by the calculation
         * By default the values are in ecliptic coordinates (longitude, latitude, distance)
         * If `SEFLG_SPEED` or `SEFLG_SPEED3` are used, the daily speeds for each value are also retured, otherwise they are 0
         * If `SEFLG_EQUATORIAL` is used, the values are in equatorial coordinates instead (right ascension, declination, distance)
         * If `SELFG_XYZ` is used, the values are in cartesian coordinates instead (X, Y, Z)
         * If target object ID is `SE_ECL_NUT`, then the values will contain obliquity and nutation data instead
         * ```
         * ```
         */
        data: CalcData;
    }

    interface DateConversion extends Flag {
        /**
         * ### Description
         * Julian day value
         * ```
         * ```
         */
        data: number;
    }

    interface DeltaT extends Error {
        /**
         * ### Description
         * Delta T value
         * ```
         * ```
         */
        data: number;
    }

    interface FixStar extends Flag, Name, Error {
        /**
         * ### Description
         * Array of values returned by the calculation
         * By default the values are in ecliptic coordinates (longitude, latitude, distance)
         * If `SEFLG_SPEED` or `SEFLG_SPEED3` are used, the daily speeds for each value are also retured, otherwise they are 0
         * If `SEFLG_EQUATORIAL` is used, the values are in equatorial coordinates instead (right ascension, declination, distance)
         * If `SELFG_XYZ` is used, the values are in cartesian coordinates instead (X, Y, Z)
         * ```
         * ```
         */
        data: CalcData2;
    }

    interface FixStarMag extends Flag, Name, Error {
        /**
         * ### Description
         * Magnitude value
         * ```
         * ```
         */
        data: number;
    }

    interface GauquelinSector extends Flag, Error {
        /**
         * ### Description
         * Gauquelin Sector
         * ```
         * ```
         */
        data: number;
    }

    interface Ayanamsa extends Flag, Error {
        /**
         * ### Description
         * Ayanamsa Value
         * ```
         * ```
         */
        data: number;
    }

    interface HeliacalPheno extends Flag, Error {
        /**
         * ### Description
         * Array of values used by heliacal calculations
         * ```
         * ```
         */
        data: HeliacalPhenoData;
    }

    interface Heliacal extends Flag, Error {
        /**
         * ### Description
         * Event times of the heliacal phenomenon
         * ```
         * ```
         */
        data: HeliacalData;
    }

    interface HousePosition extends Error {
        /**
         * ### Description
         * House position including fraction
         * From 1.0 to 12.999999 for normal houses and 1.0 to 36.9999999 for gauquelin sectors
         * ```
         * ```
         */
        data: number
    }

    interface Houses<T> extends Flag {
        /**
         * ### Description
         * Calculated positions for the houses and other points
         * ```
         * ```
         */
        data: HouseData<T>
    }

    interface HousesEx<T> extends Flag, Error {
        /**
         * ### Description
         * Calculated positions for the houses and other points
         * Also includes momentary motion speeds
         * ```
         * ```
         */
        data: HouseExData<T>
    }

    interface HouseData<T> {
        /**
         * ### Description
         * Longitude positions for the houses
         * 36 houses for gauquelin sectors, 12 houses for all other systems
         * ```
         * ```
         */
        houses: T extends 36 ? GauquelinHousesList : HousesList,
        /**
         * ### Description
         * Longitude positions for other points of interest in the great circles
         * ```
         * ```
         */
        points: PointsList
    }

    interface HouseExData<T> extends HouseData<T> {
        /**
         * ### Description
         * Momentary motion speeds of the houses
         * ```
         * ```
         */
        housesSpeed: T extends 36 ? GauquelinHousesSpeeds : HousesSpeeds,
        /**
         * ### Description
         * Momentary motion speeds of other points of interest
         * ```
         * ```
         */
        pointsSpeed: PointsSpeeds
    }

    interface DateObject {
        /**
         * ### Description
         * Full year
         * ```
         * ```
         */
        year: number;
        /**
         * ### Description
         * Month (1-12)
         * ```
         * ```
         */
        month: number;
        /**
         * ### Description
         * Day (1-31)
         * ```
         * ```
         */
        day: number;
        /**
         * ### Description
         * Hour including fraction (0-23.99999)
         * ```
         * ```
         */
        hour: number;
    }

    interface DateObject2 extends DateObject {
        /**
         * ### Description
         * Hour (0-23)
         * ```
         * ```
         */
        hour: number;
        /**
         * ### Description
         * Minute (0-59)
         * ```
         * ```
         */
        minute: number;
        /**
         * ### Description
         * Second including fraction (0-59.99999)
         * ```
         * ```
         */
        second: number;
    }

    interface LocalApparentTime extends Flag, Error {
        /**
         * ### Description
         * Local apparent time in julian day in universal time
         * ```
         * ```
         */
        data: number
    }

    interface LocalMeanTime extends Flag, Error {
        /**
         * ### Description
         * Local mean time in julian day in universal time
         * ```
         * ```
         */
        data: number
    }

    interface OrbitMaxMinTrueDistance extends Flag, Error {
        /**
         * ### Description
         * Orbital maximum and minimum possible distances
         * ```
         * ```
         */
        data: {
            /**
             * Maximum possible distance
             */
            max: number,
            /**
             * Minimum possible distance
             */
            min: number,
            /**
             * Current true distance
             */
            true: number
        }
    }

    interface LunEclipseHow extends Flag, Error {
        /**
         * ### Description
         * Array of data about the lunar eclipse
         * ```
         * ```
         */
        data: LunEclipseAttributes
    }

    interface LunEclipseWhenLoc extends Flag, Error {
        /**
         * ### Description
         * Array of eclipse timings
         * ```
         * ```
         */
        data: EclipseTimes2,
        /**
         * ### Description
         * Array of additional data about the lunar eclipse
         * ```
         * ```
         */
        attributes: LunEclipseAttributes
    }

    interface LunEclipseWhen extends Flag, Error {
        /**
         * ### Description
         * Array of eclipse timings
         * ```
         * ```
         */
        data: EclipseTimes
    }

    interface EclipseWhenGlob extends Flag, Error {
        /**
         * ### Description
         * Array of eclipse timings
         * ```
         * ```
         */
        data: EclipseTimes3
    }

    interface LunOccultWhenLoc extends Flag, Error {
        /**
         * ### Description
         * Array of eclipse timings
         * ```
         * ```
         */
        data: EclipseTimes4,
        /**
         * ### Description
         * Array of additional data about the lunar eclipse
         * ```
         * ```
         */
        attributes: EclipseAttributes
    }

    interface LunOccultWhere extends Flag, Error {
        /**
         * ### Description
         * Array of eclipse coordinates
         * ```
         * ```
         */
        data: EclipseCoords,
        /**
         * ### Description
         * Array of additional data about the eclipse
         * ```
         * ```
         */
        attributes: LunEclipseAttributes2
    }

    interface NodAps extends Flag, Error {
        /**
         * ### Description
         * Object containing ascending node, descending node, aphelion and perihelion values
         * Depending on the specific object and the method flag used, the values can be either "mean" or "osculating"
         * ```
         * ```
         */
        data: {
            /**
             * ### Description
             * Array of ascending node values returned by the calculation
             * By default the values are in ecliptic coordinates (longitude, latitude, distance)
             * If `SEFLG_SPEED` or `SEFLG_SPEED3` are used, the daily speeds for each value are also retured, otherwise they are 0
             * If `SEFLG_EQUATORIAL` is used, the values are in equatorial coordinates instead (right ascension, declination, distance)
             * If `SELFG_XYZ` is used, the values are in cartesian coordinates instead (X, Y, Z)
             * ```
             * ```
             */
            ascending: CalcData2;
            /**
             * ### Description
             * Array of descending node values returned by the calculation
             * By default the values are in ecliptic coordinates (longitude, latitude, distance)
             * If `SEFLG_SPEED` or `SEFLG_SPEED3` are used, the daily speeds for each value are also retured, otherwise they are 0
             * If `SEFLG_EQUATORIAL` is used, the values are in equatorial coordinates instead (right ascension, declination, distance)
             * If `SELFG_XYZ` is used, the values are in cartesian coordinates instead (X, Y, Z)
             * ```
             * ```
             */
            descending: CalcData2;
            /**
             * ### Description
             * Array of perihelion node values returned by the calculation
             * By default the values are in ecliptic coordinates (longitude, latitude, distance)
             * If `SEFLG_SPEED` or `SEFLG_SPEED3` are used, the daily speeds for each value are also retured, otherwise they are 0
             * If `SEFLG_EQUATORIAL` is used, the values are in equatorial coordinates instead (right ascension, declination, distance)
             * If `SELFG_XYZ` is used, the values are in cartesian coordinates instead (X, Y, Z)
             * ```
             * ```
             */
            perihelion: CalcData2;
            /**
             * ### Description
             * Array of aphelion values returned by the calculation
             * By default the values are in ecliptic coordinates (longitude, latitude, distance)
             * If `SEFLG_SPEED` or `SEFLG_SPEED3` are used, the daily speeds for each value are also retured, otherwise they are 0
             * If `SEFLG_EQUATORIAL` is used, the values are in equatorial coordinates instead (right ascension, declination, distance)
             * If `SELFG_XYZ` is used, the values are in cartesian coordinates instead (X, Y, Z)
             * if `SE_NODBIT_FOPOINT` is used, the values are the object's second focus instead
             * ```
             * ```
             */
            aphelion: CalcData2;
        };
    }

    interface Pheno extends Flag, Error {
        /**
         * ### Description
         * Array containing data for planetary phenomena
         * ```
         * ```
         */
        data: PhenoData;
    }

    interface RefracExtended {
        /**
         * ### Description
         * Converted altitude value
         * ```
         * ```
         */
        data: number;
        /**
         * ### Description
         * Array containing additional output from altitude conversion
         * ```
         * ```
         */
        extended: RefracExtendedData;
    }

    interface RiseTrans extends Flag, Error {
        /**
         * ### Description
         * Time of transit in julian days in universal time
         * ```
         * ```
         */
        data: number;
    }

    interface SolEclipseHow extends Flag, Error {
        /**
         * ### Description
         * Array of data about the solar eclipse
         * ```
         * ```
         */
        data: EclipseAttributes2;
    }

    interface SolEclipseWhenLoc extends Flag, Error {
        /**
         * ### Description
         * Array of eclipse timings
         * ```
         * ```
         */
        data: EclipseTimes4;
        /**
         * ### Description
         * Array of additional data about the solar eclipse
         * ```
         * ```
         */
        attributes: EclipseAttributes2;
    }

    interface SolEclipseWhere extends Flag, Error {
        /**
         * ### Description
         * Array of eclipse coordinates
         * ```
         * ```
         */
        data: EclipseCoords;
        /**
         * ### Description
         * Array of additional data about the solar eclipse
         * ```
         * ```
         */
        attributes: EclipseAttributes2;
    }

    interface SplitDeg {
        /**
         * ### Description
         * Degrees value
         * ```
         * ```
         */
        degree: number;
        /**
         * ### Description
         * Minutes value
         * ```
         * ```
         */
        minute: number;
        /**
         * ### Description
         * Seconds value
         * ```
         * ```
         */
        second: number;
        /**
         * ### Description
         * Seconds fraction value
         * ```
         * ```
         */
        fraction: number;
        /**
         * ### Description
         * Zodiac sign or nakshatra number
         * ```
         * ```
         */
        sign: number;
    }

    interface TimeEqu extends Flag, Error {
        /**
         * ### Description
         * Value of the equation of time (difference between LMT and LAT)
         * ```
         * ```
         */
        data: number;
    }

    interface UtcToJd extends Flag, Error {
        /**
         * ### Description
         * Array containing julian day in both ephemeris and universal time
         * ```
         * ```
         */
        data: JdEtUd;
    }

    interface VisLimitMag extends Flag, Error {
        /**
         * ### Description
         * Array containing the altitude, azimuth and magnitude data of the object along with the altitude and azimuth of the sun and the moon
         * ```
         * ```
         */
        data: VisLimitMagData;
    }

    interface Cross extends Error {
        /**
         * ### Description
         * Date when the next crossing happens in julian days
         * The julian day value is in universal time when using the `_ut` variant of the function, otherwise its in ephemeris/terrestrial time
         * ```
         * ```
         */
        date: number;
    }

    interface NodeCross extends Cross {
        /**
         * ### Description
         * Ecliptic longitude where the crossing happens
         * ```
         * ```
         */
        longitude: number;
        /**
         * ### Description
         * Ecliptic latitude margin of precision for the crossing date
         * ```
         * ```
         */
        latitude: number;
    }

    /*
	┌──────────────────────────────────────────────────┬───────────┬──────────────────────────────────────────────────┐
	│┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼│   Types   │┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼│
	└──────────────────────────────────────────────────┴───────────┴──────────────────────────────────────────────────┘
	*/

    type OrbitalElementsData = [
        /**
         * Semimajor axis
         */
        a: number,
        /**
         * Eccentricity
         */
        e: number,
        /**
         * Inclination
         */
        i: number,
        /**
         * Longitude of ascending node
         */
        Ω: number,
        /**
         * Argument of periapsis
         */
        ω: number,
        /**
         * Longitude of periapsis
         */
        ϖ: number,
        /**
         * Mean anomaly at epoch
         */
        M0: number,
        /**
         * True anomaly at epoch
         */
        v0: number,
        /**
         * Eccentric anomaly at epoch
         */
        E0: number,
        /**
         * Mean longitude at epoch
         */
        L0: number,
        /**
         * Sidereal orbital period in tropical years
         */
        sidereal_period: number,
        /**
         * Mean daily motion
         */
        daily_motion: number,
        /**
         * Tropical period in years
         */
        tropical_period: number,
        /**
         * Synodic period in days
         * Negative, if inner planet (Venus, Mercury, Aten asteroids) or Moon
         */
        synodic_period: number,
        /**
         * Time of perihelion passage
         */
        perihelion_passage: number,
        /**
         * Perihelion distance
         */
        perihelion_distance: number,
        /**
         * Aphelion distance
         */
        aphelion_distance: number
    ]

    type CalcData = [
        /**
         * (`λ`) Ecliptic longitude
         * (`α`) Equatorial right ascension if `SEFLG_EQUATORIAL`
         * (`x`) Cartesian X if `SEFLG_XYZ`
         * (`ε`) True obliquity of the ecliptic if object ID is `SE_ECL_NUT`
         */
        lon: number,
        /**
         * (`β`) Ecliptic latitude
         * (`δ`) Equatorial declination if `SEFLG_EQUATORIAL`
         * (`y`) Cartesian Y if `SEFLG_XYZ`
         * (`ε`) Mean obliquity of the ecliptic if object ID is `SE_ECL_NUT`
         */
        lat: number,
        /**
         * (`au`) Distance in AU
         * (`z`) Cartesian Z if `SEFLG_XYZ`
         * (`Δψ`) Nutation in longitude if oject ID is `SE_ECL_NUT`
         */
        dist: number,
        /**
         * (`λs`) Ecliptic longitude daily speed
         * (`αs`) Equatorial right ascension daily speed if `SEFLG_EQUATORIAL`
         * (`xs`) Cartesian daily speed if `SEFLG_XYZ`
         * (`Δε`) Nutation in obliquity if oject ID is `SE_ECL_NUT`
         */
        lonSpd: number,
        /**
         * (`βs`) Ecliptic latitude daily speed
         * (`δs`) Equatorial declination daily speed if `SEFLG_EQUATORIAL`
         * (`ys`) Cartesian Y daily speed if `SEFLG_XYZ`
         */
        latSpd: number,
        /**
         * (`aus`) Distance daily speed in AU
         * (`zs`) Cartesian Z daily speed if `SEFLG_XYZ`
         */
        distSpd: number
    ]

    type CalcData2 = [
        /**
         * (`λ`) Ecliptic longitude
         * (`α`) Equatorial right ascension if `SEFLG_EQUATORIAL`
         * (`x`) Cartesian X if `SEFLG_XYZ`
         */
        lon: number,
        /**
         * (`β`) Ecliptic latitude
         * (`δ`) Equatorial declination if `SEFLG_EQUATORIAL`
         * (`y`) Cartesian Y if `SEFLG_XYZ`
         */
        lat: number,
        /**
         * (`au`) Distance in AU
         * (`z`) Cartesian Z if `SEFLG_XYZ`
         */
        dist: number,
        /**
         * (`λs`) Ecliptic longitude daily speed
         * (`αs`) Equatorial right ascension daily speed if `SEFLG_EQUATORIAL`
         * (`xs`) Cartesian daily speed if `SEFLG_XYZ`
         */
        lonSpd: number,
        /**
         * (`βs`) Ecliptic latitude daily speed
         * (`δs`) Equatorial declination daily speed if `SEFLG_EQUATORIAL`
         * (`ys`) Cartesian Y daily speed if `SEFLG_XYZ`
         */
        latSpd: number,
        /**
         * (`aus`) Distance daily speed in AU
         * (`zs`) Cartesian Z daily speed if `SEFLG_XYZ`
         */
        distSpd: number
    ]

    type HeliacalPhenoData = [
        /**
         * Topocentric altitude of object in degrees (unrefracted)
         */
        AltO: number,
        /**
         * Apparent altitude of object in degrees (refracted)
         */
        AppAltO: number,
        /**
         * Geocentric altitude of object in degrees
         */
        GeoAltO: number,
        /**
         * Azimuth of object in degrees
         */
        AziO: number,
        /**
         * Topocentric altitude of Sun in degrees
         */
        AltS: number,
        /**
         * Azimuth of Sun in degrees
         */
        AziS: number,
        /**
         * Actual topocentric arcus visionis in degrees
         */
        TAVact: number,
        /**
         * Actual (geocentric) arcus visionis in degrees
         */
        ARCVact: number,
        /**
         * Actual difference between object's and sun's azimuth in degrees
         */
        DAZact: number,
        /**
         * Actual longitude difference between object and sun in degrees
         */
        ARCLact: number,
        /**
         * Extinction coefficient
         */
        kact: number,
        /**
         * Smallest topocentric arcus visionis in degrees
         */
        minTAV: number,
        /**
         * First time object is visible:number, according to VR in JD
         */
        TfistVR: number,
        /**
         * optimum time the object is visible:number, according to VR in JD
         */
        TbVR: number,
        /**
         * last time object is visible:number, according to VR in JD
         */
        TlastVR: number,
        /**
         * best time the object is visible:number, according to Yallop in JD
         */
        TbYallop: number,
        /**
         * crescent width of Moon in degrees
         */
        WMoon: number,
        /**
         * q-test value of Yallop
         */
        qYal: number,
        /**
         * q-test criterion of Yallop
         */
        qCrit: number,
        /**
         * parallax of object in degrees
         */
        ParO: number,
        /**
         * magnitude of object
         */
        Magn: number,
        /**
         * rise/set time of object in JD
         */
        RiseO: number,
        /**
         * rise/set time of Sun in JD
         */
        RiseS: number,
        /**
         * rise/set time of object minus rise/set time of Sun in JD
         */
        Lag: number,
        /**
         * visibility duration in JD
         */
        TvisVR: number,
        /**
         * crescent length of Moon in degrees
         */
        LMoon: number,
        /**
         * CVAact in degrees
         */
        CVAact: number,
        /**
         * Illum in percentage
         */
        Illum: number,
        /**
         * CVAact in degrees
         */
        CVAact: number,
        /**
         * MSk
         */
        MSk: number
    ]

    type HeliacalData = [
        /**
         * Start visibility in JD
         */
        vis_start: number,
        /**
         * Optimum visibility in JD (zero if hel_flag >= SE_HELFLAG_AV)
         */
        vis_opt: number,
        /**
         * End of visibility in JD (zero if hel_flag >= SE_HELFLAG_AV)
         */
        vis_end: number
    ]

    type AzaltRev = [
        /**
         * (λ) Ecliptic longitude if SE_HOR2ECL
         * (α) Equatorial right ascension if SE_HOR2EQU
         */
        lon: number,
        /**
         * (β) Ecliptic latitude if SE_HOR2ECL
         * (δ) Equatorial declination if SE_HOR2EQU
         */
        lat: number
    ]

    type Azalt = [
        /**
         * Azimuth
         */
        az: number,
        /**
         * True altitude
         */
        alt: number,
        /**
         * Apparent altitude (with refraction)
         */
        ap: number
    ]

    type CoTransSp = [
        ...cotrans: CoTrans,
        /**
         * Daily speed for lon
         */
        lonSpd: number,
        /**
         * Daily speed for lat
         */
        latSpd: number,
        /**
         * Daily speed for dist (unchanged)
         */
        distSpd: number
    ]

    type CoTrans = [
        /**
         * (λ) Ecliptic longitude or (α) Equatorial right ascension
         */
        lon: number,
        /**
         * (β) Ecliptic latitude or (δ) Equatorial declination
         */
        lat: number,
        /**
         * Distance in AU (unchanged)
         */
        dist: number,
    ]

    type HouseSystems =
        "B"
        | "Y"
        | "X"
        | "H"
        | "C"
        | "F"
        | "A"
        | "E"
        | "D"
        | "N"
        | "G"
        | "I"
        | "i"
        | "K"
        | "U"
        | "M"
        | "P"
        | "T"
        | "O"
        | "L"
        | "Q"
        | "R"
        | "S"
        | "V"
        | "W";

    type HousesList = [
        /**
         * 1st House
         */
        house_1: number,
        /**
         * 2nd House
         */
        house_2: number,
        /**
         * 3rd House
         */
        house_3: number,
        /**
         * 4th House
         */
        house_4: number,
        /**
         * 5th House
         */
        house_5: number,
        /**
         * 6th House
         */
        house_6: number,
        /**
         * 7th House
         */
        house_7: number,
        /**
         * 8th House
         */
        house_8: number,
        /**
         * 9th House
         */
        house_9: number,
        /**
         * 10th House
         */
        house_10: number,
        /**
         * 11th House
         */
        house_11: number,
        /**
         * 12th House
         */
        house_12: number,
    ]

    type PointsList = [
        /**
         * Longitude of the Ascendant
         */
        asc: number,
        /**
         * Longitude of the Midheaven
         */
        mc: number,
        /**
         * Right Ascension of the Midheaven
         */
        armc: number,
        /**
         * Longitude of the Vertex
         */
        vertex: number,
        /**
         * Longitude of the Equatorial Ascendant
         */
        equasc: number,
        /**
         * Longitude of Walter Koch's Co-Ascendant
         */
        coasc1: number,
        /**
         * Longitude of Michael Munkasey's Co-Ascendant
         */
        coasc2: number,
        /**
         * Longitude of Michael Munkasey's Polar Ascendant
         */
        polasc: number
    ]

    type HousesSpeeds = [
        /**
         * Momentary speed for the 1st House
         */
        house_1_speed: number,
        /**
         * Momentary speed for the 2nd House
         */
        house_2_speed: number,
        /**
         * Momentary speed for the 3rd House
         */
        house_3_speed: number,
        /**
         * Momentary speed for the 4th House
         */
        house_4_speed: number,
        /**
         * Momentary speed for the 5th House
         */
        house_5_speed: number,
        /**
         * Momentary speed for the 6th House
         */
        house_6_speed: number,
        /**
         * Momentary speed for the 7th House
         */
        house_7_speed: number,
        /**
         * Momentary speed for the 8th House
         */
        house_8_speed: number,
        /**
         * Momentary speed for the 9th House
         */
        house_9_speed: number,
        /**
         * Momentary speed for the 10th House
         */
        house_10_speed: number,
        /**
         * Momentary speed for the 11th House
         */
        house_11_speed: number,
        /**
         * Momentary speed for the 12th House
         */
        house_12_speed: number,
    ]

    type PointsSpeeds = [
        /**
         * Momentary speed of the Ascendant
         */
        asc_speed: number,
        /**
         * Momentary speed of the Midheaven
         */
        mc_speed: number,
        /**
         * Momentary speed in Right Ascension of the Midheaven
         */
        armc_speed: number,
        /**
         * Momentary speed of the Vertex
         */
        vertex_speed: number,
        /**
         * Momentary speed of the Equatorial Ascendant
         */
        equasc_speed: number,
        /**
         * Momentary speed of Walter Koch's Co-Ascendant
         */
        coasc1_speed: number,
        /**
         * Momentary speed of Michael Munkasey's Co-Ascendant
         */
        coasc2_speed: number,
        /**
         * Momentary speed of Michael Munkasey's Polar Ascendant
         */
        polasc_speed: number
    ]

    type GauquelinHousesList = [
        ...houses: HousesList,
        /**
         * 13th House
         */
        house_13: number,
        /**
         * 14th House
         */
        house_14: number,
        /**
         * 15th House
         */
        house_15: number,
        /**
         * 16th House
         */
        house_16: number,
        /**
         * 17th House
         */
        house_17: number,
        /**
         * 18th House
         */
        house_18: number,
        /**
         * 19th House
         */
        house_19: number,
        /**
         * 20th House
         */
        house_20: number,
        /**
         * 21th House
         */
        house_21: number,
        /**
         * 22th House
         */
        house_22: number,
        /**
         * 23th House
         */
        house_23: number,
        /**
         * 24th House
         */
        house_24: number,
        /**
         * 25th House
         */
        house_25: number,
        /**
         * 26th House
         */
        house_26: number,
        /**
         * 27th House
         */
        house_27: number,
        /**
         * 28th House
         */
        house_28: number,
        /**
         * 29th House
         */
        house_29: number,
        /**
         * 30th House
         */
        house_30: number,
        /**
         * 31th House
         */
        house_31: number,
        /**
         * 32th House
         */
        house_32: number,
        /**
         * 33th House
         */
        house_33: number,
        /**
         * 34th House
         */
        house_34: number,
        /**
         * 35th House
         */
        house_35: number,
        /**
         * 36th House
         */
        house_36: number,
    ]

    type GauquelinHousesSpeeds = [
        ...houses: HousesSpeeds,
        /**
         * Momentary speed for the 13th House
         */
        house_13_speed: number,
        /**
         * Momentary speed for the 14th House
         */
        house_14_speed: number,
        /**
         * Momentary speed for the 15th House
         */
        house_15_speed: number,
        /**
         * Momentary speed for the 16th House
         */
        house_16_speed: number,
        /**
         * Momentary speed for the 17th House
         */
        house_17_speed: number,
        /**
         * Momentary speed for the 18th House
         */
        house_18_speed: number,
        /**
         * Momentary speed for the 19th House
         */
        house_19_speed: number,
        /**
         * Momentary speed for the 20th House
         */
        house_20_speed: number,
        /**
         * Momentary speed for the 21th House
         */
        house_21_speed: number,
        /**
         * Momentary speed for the 22th House
         */
        house_22_speed: number,
        /**
         * Momentary speed for the 23th House
         */
        house_23_speed: number,
        /**
         * Momentary speed for the 24th House
         */
        house_24_speed: number,
        /**
         * Momentary speed for the 25th House
         */
        house_25_speed: number,
        /**
         * Momentary speed for the 26th House
         */
        house_26_speed: number,
        /**
         * Momentary speed for the 27th House
         */
        house_27_speed: number,
        /**
         * Momentary speed for the 28th House
         */
        house_28_speed: number,
        /**
         * Momentary speed for the 29th House
         */
        house_29_speed: number,
        /**
         * Momentary speed for the 30th House
         */
        house_30_speed: number,
        /**
         * Momentary speed for the 31th House
         */
        house_31_speed: number,
        /**
         * Momentary speed for the 32th House
         */
        house_32_speed: number,
        /**
         * Momentary speed for the 33th House
         */
        house_33_speed: number,
        /**
         * Momentary speed for the 34th House
         */
        house_34_speed: number,
        /**
         * Momentary speed for the 35th House
         */
        house_35_speed: number,
        /**
         * Momentary speed for the 36th House
         */
        house_36_speed: number,
    ]

    type EclipseTimes = [
        /**
         * time of maximum eclipse in jd
         */
        eclipse_max: number,
        /**
         * Unused
         */
        _: number,
        /**
         * time of partial phase start
         */
        partial_start: number,
        /**
         * time of partial phase end
         */
        partial_end: number,
        /**
         * time of totality start
         */
        total_start: number,
        /**
         * time of totality end
         */
        total_end: number,
        /**
         * time of penumbral phase start
         */
        penumbral_start: number,
        /**
         * time of penumbral phase end
         */
        penumbral_end: number
    ]

    type EclipseTimes2 = [
        ...times: EclipseTimes,
        /**
         * Time of moonrise, if it occurs during the eclipse
         */
        rise: number,
        /**
         * Time of moonset, if it occurs during the eclipse
         */
        set: number,
    ]

    type EclipseTimes3 = [
        /**
         * time of maximum eclipse in jd
         */
        eclipse_max: number,
        /**
         * time when eclipse takes place at local apparent noon
         */
        local_noon: number,
        /**
         * time of eclipse start
         */
        eclipse_start: number,
        /**
         * time of eclipse end
         */
        eclipse_end: number,
        /**
         * time of totality start
         */
        total_start: number,
        /**
         * time of totality end
         */
        total_end: number,
        /**
         * time of center line start
         */
        center_start: number,
        /**
         * time of center line end
         */
        center_end: number,
        /**
         * time when annular-total eclipse becomes total
         */
        annular_total: number,
        /**
         * time when annular-total eclipse becomes annular again
         */
        total_annular: number
    ]

    type EclipseTimes4 = [
        /**
         * Time of maximum eclipse
         */
        max_eclipse: number,
        /**
         * Time of first contact
         */
        first_contact: number,
        /**
         * Time of second contact
         */
        second_contact: number,
        /**
         * Time of third contact
         */
        third_contact: number,
        /**
         * Time of fourth contact
         */
        fourth_contact: number,
        /**
         * Time of sunrise between first and forth contact
         */
        sunrise: number,
        /**
         * Time of sunset between first and forth contact
         */
        sunset: number
    ]

    type EclipseCoords = [
        /**
         * Geographic longitude of central line
         */
        central_long: number,
        /**
         * Geographic latitude of central line
         */
        central_lat: number,
        /**
         * Geographic longitude of northern limit of umbra
         */
        north_umbra_long: number,
        /**
         * Geographic latitude of northern limit of umbra
         */
        north_umbra_lat: number,
        /**
         * Geographic longitude of southern limit of umbra
         */
        south_umbra_long: number,
        /**
         * Geographic latitude of southern limit of umbra
         */
        south_umbra_lat: number,
        /**
         * Geographic longitude of northern limit of penumbra
         */
        north_penumbra_long: number,
        /**
         * Geographic latitude of northern limit of penumbra
         */
        north_penumbra_lat: number,
        /**
         * Geographic longitude of southern limit of penumbra
         */
        south_penumbra_long: number,
        /**
         * Geographic latitude of southern limit of penumbra
         */
        south_penumbra_lat: number
    ]

    type EclipseAttributes = [
        /**
         * Fraction of solar diameter covered by moon (magnitude)
         */
        solar_diameter: number,
        /**
         * Ratio of lunar diameter to solar one
         */
        lunar_diameter: number,
        /**
         * Fraction of solar disc covered by moon (obscuration)
         */
        solar_disc: number,
        /**
         * Diameter of core shadow in km
         */
        core_shadow: number,
        /**
         * Azimuth of sun at tjd
         */
        sun_azimuth: number,
        /**
         * True altitude of sun above horizon at tjd
         */
        true_altitude: number,
        /**
         * Apparent altitude of sun above horizon at tjd
         */
        mean_altitude: number,
        /**
         * Elongation of moon in degrees
         */
        elongation: number
    ]

    type EclipseAttributes2 = [
        ...attr: EclipseAttributes,
        /**
         * Eclipse magnitude (same as solar_diameter or lunar_diameter depending on the eclipse type)
         */
        mag: number,
        /**
         * Saros series number (if available, otherwise -99999999)
         */
        saros: number,
        /**
         * Saros series member number (if available, otherwise -99999999)
         */
        saros_member: number
    ]

    type LunEclipseAttributes = [
        /**
         * Umbral magnitude at jd
         */
        umbral: number,
        /**
         * Penumbral magnitude
         */
        penumbral: number,
        /**
         * Unused
         */
        _: number,
        /**
         * Unused
         */
        _: number,
        /**
         * Azimuth of the moon at jd
         */
        azimuth: number,
        /**
         * True altitude of the moon above horizon at jd
         */
        true_altitude: number,
        /**
         * Apparent altitude of the moon above horizon at jd
         */
        apparent_altitude: number,
        /**
         * Distance of the moon from opposition in degrees
         */
        distance: number,
        /**
         * Eclipse magnitude (same as umbral magnitude)
         */
        mag: number,
        /**
         * Saros series number (if available, otherwise -99999999)
         */
        saros: number,
        /**
         * Saros series member number (if available, otherwise -99999999)
         */
        saros_member: number
    ]

    type LunEclipseAttributes2 = [
        /**
         * Fraction of object's diameter covered by moon (magnitude)
         */
        object_diameter: number,
        /**
         * Ratio of lunar diameter to object's diameter
         */
        lunar_diameter: number,
        /**
         * Fraction of object's disc covered by moon (obscuration)
         */
        object_disc: number,
        /**
         * Diameter of core shadow in km
         */
        core_shadow: number,
        /**
         * Azimuth of object at tjd
         */
        object_azimuth: number,
        /**
         * True altitude of object above horizon at tjd
         */
        true_altitude: number,
        /**
         * Apparent altitude of object above horizon at tjd
         */
        apparent_altitude: number,
        /**
         * Angular distance of moon from object in degrees
         */
        angular_distance: number,
    ]

    type PhenoData = [
        /**
         * Phase angle (Earth-planet-sun)
         */
        phase_angle: number,
        /**
         * Phase (illumined fraction of disc)
         */
        phase: number,
        /**
         * Elongation of planet
         */
        elongation: number,
        /**
         * Apparent diameter of disc
         */
        diameter: number,
        /**
         * Apparent magnitude
         */
        magnitude: number
    ]

    type RefracExtendedData = [
        /**
         * True altitude if possible, otherwise input value
         */
        true_altitude: number,
        /**
         * Apparent altitude if possible, otherwise input value
         */
        apparent_altitude: number,
        /**
         * Refraction value
         */
        refraction: number,
        /**
         * Dip of the horizon
         */
        dip: number
    ]

    type JdEtUd = [
        /**
         * Julian day in ephemeris/terrestrial time
         */
        et: number,
        /**
         * Julian day in universal time
         */
        ut: number
    ]

    type VisLimitMagData = [
        /**
         * Limiting visual magnitude (object is visible if this value is bigger than the object's magnitude value)
         */
        visual_mag: number,
        /**
         * Altitude of the object
         */
        obj_altitude: number,
        /**
         * Azimuth of the object
         */
        obj_azimuth: number,
        /**
         * Altitude of the sun
         */
        sun_altitude: number,
        /**
         * Azimuth of the sun
         */
        sun_azimuth: number,
        /**
         * Altitude of the moon
         */
        moon_altitude: number,
        /**
         * Azimuth of the moon
         */
        moon_azimuth: number,
        /**
         * The object's magnitude
         */
        magnitude: number
    ]

    /*
	┌──────────────────────────────────────────────────┬───────────┬──────────────────────────────────────────────────┐
	│┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼│ Functions │┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼│
	└──────────────────────────────────────────────────┴───────────┴──────────────────────────────────────────────────┘
	*/

    /**
     * ### Description
     * Compute positions of planets, asteroids, lunar nodes and apogees from universal time
     * ### Params
     * ```
     * • tjd_ut: number // Julian day in universal time
     * • ipl: number // Target object ID
     * • iflag: number // Calculation flags
     * ```
     * ### Returns
     * ```
     * Object {
     *   flag: number, // Computed flags or ERR
     *   error: string, // Error message if ERR or if incompatible flags
     *   data: Array<number> [
     *     lon, // Longitude, right ascension, cartesian X, or true obliquity depending on the flags
     *     lat, // Latitude, declination, cartesian Y, or mean obliquity depending on the flags
     *     dist, // Distance in AU, cartesian Z or nutation in longitude depending on the flags
     *     lonSpd, // Daily speed for lon or nutation in obliquity depending on the flags
     *     latSpd, // Daily speed for lat
     *     distSpd, // Daily speed for dist
     *   ]
     * }
     * ```
     * ### Example
     * ```
     * const flags = constants.SEFLG_SWIEPH | constants.SEFLG_SPEED;
     * const result = calc_ut(2314234, constants.SE_MOON, flags);
     * if(result.flag !== constants.OK) { throw new Error(result.error); }
     * if(result.flag !== flags) { console.log(result.error); }
     * console.log(`Longitude: ${result.data[0]}`);
     * ```
     * &nbsp;
     */
    export function swe_calc_ut(tjd_ut: number, ipl: number, iflag: number): Promise<Calc>;

    /**
     * ### Description
     * Compute positions of planets, asteroids, lunar nodes and apogees from ephemeris time
     * ### Params
     * ```
     * • tjd_et: number // Julian day in terrestrial/ephemeris time
     * • ipl: number // Target object ID
     * • iflag: number // Calculation flags
     * ```
     * ### Returns
     * ```
     * Object {
     *   flag: number, // Computed flags or ERR
     *   error: string, // Error message if ERR or if incompatible flags
     *   data: Array<number> [
     *     lon, // Longitude, right ascension, cartesian X, or true obliquity depending on the flags
     *     lat, // Latitude, declination, cartesian Y, or mean obliquity depending on the flags
     *     dist, // Distance in AU, cartesian Z or nutation in longitude depending on the flags
     *     lonSpd, // Daily speed for lon or nutation in obliquity depending on the flags
     *     latSpd, // Daily speed for lat
     *     distSpd, // Daily speed for dist
     *   ]
     * }
     * ```
     * ### Example
     * ```
     * const flags = constants.SEFLG_SWIEPH | constants.SEFLG_SPEED;
     * const result = calc(2314234, constants.SE_VENUS, flags);
     * if(result.flag === constants.ERR) { throw new Error(result.error); }
     * if(result.flag !== flags) { console.log(result.error); }
     * console.log(`Longitude: ${result.data[0]}`);
     * ```
     * &nbsp;
     */
    export function swe_calc(tjd_et: number, ipl: number, iflag: number): Promise<Calc>;

    /**
     * ### Description
     * Transform between ecliptic and equatorial coordinate systems
     * From equatorial to ecliptic, obliquity must be positive
     * From ecliptic to equatorial, obliquity must be negative
     * Distance is not affected and can be 0
     * ### Params
     * ```
     * • xpo: Array<number> // Input coordinates in ecliptic or equatorial coordinates [lon, lat, dist]
     * • eps: number // Positive or negative obliquity of the ecliptic
     * ```
     * ### Returns
     * ```
     * Array<number> [
     *   lon, // Longitude or right ascension
     *   lat, // Latitude or declination
     *   dist, // Distance in AU (unchanged)
     * ]
     * ```
     * ### Example
     * ```
     * const obliquity = calc(2314234, constants.SE_ECL_NUT, constants.SEFLG_SWIEPH).data[0];
     * const result = cotrans([345, 10, 0], -obliquity);
     * console.log(`Right Ascension: ${result[0]}`);
     * ```
     * &nbsp;
     */
    export function swe_cotrans(xpo: [lon: number, lat: number, dist: number], eps: number): Promise<CoTrans>;

    /**
     * ### Description
     * Obtain the Delta T value for a particular date
     * ### Params
     * ```
     * • tjd: number // Julian day value in Universal Time
     * ```
     * ### Returns
     * ```
     * number // Delta T value
     * ```
     * ### Example
     * ```
     * const deltaT = deltat(2431232); // 0.00032554160173271644
     * ```
     * &nbsp;
     */
    export function swe_deltat(tjd: number): Promise<number>;

    /**
     * ### Description
     * Calculate the positions of a star from universal time
     * ### Params
     * ```
     * • star: string // Name of the star to search for in the sefstars.txt file
     * • tjd_ut: number // Julian day in universal time
     * • iflag: number // Calculation flags
     * ```
     * ### Returns
     * ```
     * Object {
     *   flag: number, // OK or ERR
     *   error: string, // Error message in case of ERR
     *   name: string, // The name of the matched star from the sefstars.txt file
     *   data: Array<number> [
     *     lon, // Longitude, right ascension or cartesian X
     *     lat, // Latitude, declination or cartesian Y
     *     dist, // Distance in AU or cartesian Z
     *     lonSpd, // Daily speed for lon
     *     latSpd, // Daily speed for lat
     *     distSpd, // Daily speed for dist
     *   ]
     * }
     * ```
     * ### Example
     * ```
     * const flags = constants.SEFLG_SWIEPH | constants.SEFLG_SPEED;
     * const result = fixstar_ut("Aldebaran", 2413256, flags);
     * if(result.flag === constants.ERR) { throw new Error(result.error); }
     * if(result.flag !== flags) { console.log(result.error); }
     * console.log(`
     *   Name: ${result.name}
     *   Longitude: ${result.data[0]}
     * `);
     * ```
     * &nbsp;
     */
    export function swe_fixstar_ut(star: string, tjd_ut: number, iflag: number): Promise<FixStar>;

    /**
     * ### Description
     * Calculate the positions of a star from ephemeris/terrestrial time
     * ### Params
     * ```
     * • star: string // Name of the star to search for in the sefstars.txt file
     * • tjd_et: number // Julian day in ephemeris/terrestrial time
     * • iflag: number // Calculation flags
     * ```
     * ### Returns
     * ```
     * Object {
     *   flag: number, // OK or ERR
     *   error: string, // Error message in case of ERR
     *   name: string, // The name of the matched star from the sefstars.txt file
     *   data: Array<number> [
     *     lon, // Longitude, right ascension or cartesian X
     *     lat, // Latitude, declination or cartesian Y
     *     dist, // Distance in AU or cartesian Z
     *     lonSpd, // Daily speed for lon
     *     latSpd, // Daily speed for lat
     *     distSpd, // Daily speed for dist
     *   ]
     * }
     * ```
     * ### Example
     * ```
     * const flags = constants.SEFLG_SWIEPH | constants.SEFLG_SPEED;
     * const result = fixstar("Aldebaran", 2413256, flags);
     * if(result.flag === constants.ERR) { throw new Error(result.error); }
     * if(result.flag !== flags) { console.log(result.error); }
     * console.log(`
     *   Name: ${result.name}
     *   Longitude: ${result.data[0]}
     * `);
     * ```
     * &nbsp;
     */
    export function swe_fixstar(star: string, tjd_et: number, iflag: number): Promise<FixStar>;

    /**
     * ### Description
     * Get ayanamsa value from universal time without nutation
     * ### Params
     * ```
     * • tjd_et: number // Julian day in universal time
     * ```
     * ### Returns
     * ```
     * number // Ayanamsa value for given date
     * ```
     * ### Example
     * ```
     * const ayan = get_ayanamsa_ut(2314234); // 19.493219647880473
     * ```
     * &nbsp;
     */
    export function swe_get_ayanamsa_ut(tjd_ut: number): Promise<number>;

    /**
     * ### Description
     * Get ayanamsa value from ephemeris time without nutation
     * ### Params
     * ```
     * • tjd_et: number // Julian day in ephemeris/terrestrial time
     * ```
     * ### Returns
     * ```
     * number // Ayanamsa value for given date
     * ```
     * ### Example
     * ```
     * const ayan = get_ayanamsa(2314234); // 19.493219620078364
     * ```
     * &nbsp;
     */
    export function swe_get_ayanamsa(tjd_et: number): Promise<number>;

    /**
     * ### Description
     * Get an object's name
     * ### Params
     * ```
     * • ipl: number // Object ID
     * ```
     * ### Returns
     * ```
     * string // Object's name
     * ```
     * ### Example
     * ```
     * const name = get_planet_name(constants.SE_PLUTO); // "Pluto"
     * ```
     * &nbsp;
     */
    export function swe_get_planet_name(ipl: number): Promise<string>;

    /**
     * ### Description
     * Obtain additional data used for calculation of heliacal risings and settings
     * ### Params
     * ```
     * • tjd_ut: number // Julian day in universal time
     * • dgeo: Array<number> // Geographic coordinates [longitude, latitude, elevation]
     * • datm: Array<number> // Atmospheric conditions [pressure, temperature, humidity, meteorological range]
     * • dobs: Array<number> // Observer description [age, sellen ratio, optical type, optical magnification, optical aperture, optical transmission]
     * • object_name: string // Name of fixed star or planet
     * • event_type: number // Event type
     * • hel_flag: number // Calculation flag
     * ```
     * ### Returns
     * ```
     * Object {
     *   flag: number, // OK or ERR
     *   error: string, // Error message if ERR
     *   data: number [
     *     AltO, // topocentric altitude of object in degrees (unrefracted)
     *     AppAltO, // apparent altitude of object in degrees (refracted)
     *     GeoAltO, // geocentric altitude of object in degrees
     *     AziO, // azimuth of object in degrees
     *     AltS, // topocentric altitude of Sun in degrees
     *     AziS, // azimuth of Sun in degrees
     *     TAVact, // actual topocentric arcus visionis in degrees
     *     ARCVact, // actual (geocentric) arcus visionis in degrees
     *     DAZact, // actual difference between object's and sun's azimuth in degrees
     *     ARCLact, // actual longitude difference between object and sun in degrees
     *     kact, // extinction coefficient
     *     minTAV, // smallest topocentric arcus visionis in degrees
     *     TfistVR, // first time object is visible, according to VR in JD
     *     TbVR, // optimum time the object is visible, according to VR in JD
     *     TlastVR, // last time object is visible, according to VR in JD
     *     TbYallop, // best time the object is visible, according to Yallop in JD
     *     WMoon, // crescent width of Moon in degrees
     *     qYal, // q-test value of Yallop
     *     qCrit, // q-test criterion of Yallop
     *     ParO, // parallax of object in degrees
     *     Magn, // magnitude of object
     *     RiseO, // rise/set time of object in JD
     *     RiseS, // rise/set time of Sun in JD
     *     Lag, // rise/set time of object minus rise/set time of Sun in JD
     *     TvisVR, // visibility duration in JD
     *     LMoon, // crescent length of Moon in degrees
     *     CVAact, // CVAact in degrees
     *     Illum, // Illum in percentage
     *     CVAact, // CVAact in degrees
     *     MSk // MSk
     *   ]
     * }
     * ```
     * ### Example
     * ```
     * const result = heliacal_pheno_ut(2415362, [8,47,900], [1000,10,50,-0.15], [21,0,0,0,0,0], "moon", 0, 0);
     * if(result.flag !== constants.OK) { console.log(result.error); }
     * console.log(result.data);
     * ```
     * &nbsp;
     */
    export function swe_heliacal_pheno_ut(tjd_ut: number, dgeo: [longitude: number, latitude: number, elevation: number], datm: [pressure: number, temperature: number, humidity: number, meteorological_range: number], dobs: [age: number, sellen_ratio: number, optical_type: number, optical_magnification: number, optical_aperture: number, optical_transmission: number], object_name: string, event_type: number, hel_flag: number): Promise<HeliacalPheno>;

    /**
     * ### Description
     * Calculate the next heliacal phenomenon after a given start date
     * It works between geographic latitudes -60 and 60
     * ### Params
     * ```
     * • tjd_ut: number // Julian day in universal time
     * • dgeo: Array<number> // Geographic coordinates [longitude, latitude, elevation]
     * • datm: Array<number> // Atmospheric conditions [pressure, temperature, humidity, meteorological range]
     * • dobs: Array<number> // Observer description [age, sellen ratio, optical type, optical magnification, optical aperture, optical transmission]
     * • object_name: string // Name of fixed star or planet
     * • event_type: number // Event type
     * • hel_flag: number // Calculation flag
     * ```
     * ### Returns
     * ```
     * Object {
     *   flag: number, // OK or ERR
     *   error: string, // Error message if ERR
     *   data: number [
     *     vis_start, // Start visibility in JD
     *     vis_opt, // Optimum visibility in JD (zero if hel_flag >= SE_HELFLAG_AV)
     *     vis_end // End of visibility in JD (zero if hel_flag >= SE_HELFLAG_AV)
     *   ]
     * }
     * ```
     * ### Example
     * ```
     * const result = heliacal_ut(2415362, [8,47,900], [1000,10,50,-0.15], [21,0,0,0,0,0], "venus", 0, 0);
     * if(result.flag !== constants.OK) { console.log(result.error); }
     * console.log(`Visibility Start: ${result.data[0]}`);
     * ```
     * &nbsp;
     */
    export function swe_heliacal_ut(tjd_ut: number, dgeo: [longitude: number, latitude: number, elevation: number], datm: [pressure: number, temperature: number, humidity: number, meteorological_range: number], dobs: [age: number, sellen_ratio: number, optical_type: number, optical_magnification: number, optical_aperture: number, optical_transmission: number], object_name: string, event_type: number, hel_flag: number): Promise<Heliacal>;

    /**
     * ### Description
     * Calculate the house position of an object
     * This function attempts to obtain a visually accurate house position by also taking latitude/declination into account
     * ### Params
     * ```
     * • armc: number // Right ascension
     * • geolat: number // Geographic latitude
     * • eps: number // Obliquity of the ecliptic
     * • hsys: string // House system ID
     * • xpin: Array<number> // Object position in ecliptic tropical coordinates [longitude, latitude]
     * ```
     * ### Returns
     * ```
     * Object {
     *   error: string, // Error message if any
     *   data: number // House position including fraction
     * }
     * ```
     * ### Example
     * ```
     * const result = house_pos(50, 45, 23, "p", [256, 2]);
     * if(result.error) { throw new Error(result.error); }
     * console.log(`House: ${Math.floor(result.data)}`);
     * ```
     * &nbsp;
     */
    export function swe_house_pos(armc: number, geolat: number, eps: number, hsys: string, xpin: [longitude: number, latitude: number]): Promise<HousePosition>;

    /**
     * ### Description
     * Calculate houses and other points from right ascension and obliquity
     * This function can be used to calculate houses without a date, such as composite houses
     * ### Params
     * ```
     * • armc: number // Right ascension of the midheaven
     * • geolat: number // Geographic latitude
     * • eps: number // Obliquity of the ecliptic
     * • hsys: string // House system ID
     * • decl?: number // Declination of the Sun (sunshine/makransky houses only)
     * ```
     * ### Returns
     * ```
     * Object {
     *   flag: number, // OK or ERR
     *   data: Object {
     *     houses: Array<number> [
     *       house_1: number, // Longitude of the first house
     *       house_2: number, // Longitude of the second house
     *       house_3: number, // Longitude of the third house
     *       ... // 36 houses if gauquelin sectors, 12 houses otherwise
     *     ],
     *     points: Array<number> [
     *       asc: number, // Ascendant
     *       mc: number, // Midheaven
     *       armc: number, // Right Ascension of the midheaven
     *       vertex: number, // Vertex
     *       equasc: number, // Equatorial Ascendant
     *       coasc1: number, // Co-Ascendant (Walter Koch)
     *       coasc2: number, // Co-Ascendant (Michael Munkasey)
     *       polasc: number, // Polar Ascendant (Michael Munkasey)
     *     ]
     *   }
     * }
     * ```
     * ### Example
     * ```
     * const result = houses_armc(34, 10, 23, "P");
     * if(result.flag !== constants.OK) { console.log("something went wrong, check output") }
     * console.log(`Ascendant: ${result.data.points[0]}`);
     * ```
     * &nbsp;
     */
    export function swe_houses_armc(armc: number, geolat: number, eps: number, hsys: HouseSystems, decl?: number): Promise<Houses<12>>;
    export function swe_houses_armc(armc: number, geolat: number, eps: number, hsys: "G", decl?: number): Promise<Houses<36>>;

    /**
     * ### Description
     * Calculate houses and other points
     * ### Params
     * ```
     * • tjd_ut: number // Julian day in universal time
     * • geolat: number // Geographic latitude
     * • geolon: number // Geographic longitude
     * • hsys: string // House system ID
     * ```
     * ### Returns
     * ```
     * Object {
     *   flag: number, // OK or ERR
     *   data: Object {
     *     houses: Array<number> [
     *       house_1: number, // Longitude of the first house
     *       house_2: number, // Longitude of the second house
     *       house_3: number, // Longitude of the third house
     *       ... // 36 houses if gauquelin sectors, 12 houses otherwise
     *     ],
     *     points: Array<number> [
     *       asc: number, // Ascendant
     *       mc: number, // Midheaven
     *       armc: number, // Right Ascension of the midheaven
     *       vertex: number, // Vertex
     *       equasc: number, // Equatorial Ascendant
     *       coasc1: number, // Co-Ascendant (Walter Koch)
     *       coasc2: number, // Co-Ascendant (Michael Munkasey)
     *       polasc: number, // Polar Ascendant (Michael Munkasey)
     *     ]
     *   }
     * }
     * ```
     * ### Example
     * ```
     * const result = houses(2413654, 35.234, 45.324, "P");
     * if(result.flag !== constants.OK) { console.log("something went wrong, check output") }
     * console.log(`Ascendant: ${result.data.points[0]}`);
     * ```
     * &nbsp;
     */
    export function swe_houses(tjd_ut: number, geolat: number, geolon: number, hsys: HouseSystems): Promise<Houses<12>>;
    export function swe_houses(tjd_ut: number, geolat: number, geolon: number, hsys: "G"): Promise<Houses<36>>;

    /**
     * ### Description
     * Convert julian day in ephemeris/terrestrial time to calendar date
     * ### Params
     * ```
     * • tjd_et: number // Julian day in ephemeris/terrestrial time
     * • gregflag: number // Calendar system, SE_GREG_CAL for gregorian calendar, SE_JUL_CAL for julian calendar
     * ```
     * ### Returns
     * ```
     * Object {
     *   year: number; // Full year
     *   month: number; // Month (1-12)
     *   day: number; // Day (1-31)
     *   hour: number; // Hour (0-23)
     *   minute: number; // Minute (0-59)
     *   second: number; // Second including fraction (0-59.99999)
     * }
     * ```
     * ### Example
     * ```
     * const date = jdet_to_utc(2415423, constants.GREG_CAL);
     * console.log(date);
     * ```
     * &nbsp;
     */
    export function swe_jdet_to_utc(tjd_et: number, gregflag: number): Promise<DateObject2>;

    /**
     * ### Description
     * Convert julian day in universal time to calendar date
     * ### Params
     * ```
     * • tjd_ut: number // Julian day in universal time
     * • gregflag: number // Calendar system, SE_GREG_CAL for gregorian calendar, SE_JUL_CAL for julian calendar
     * ```
     * ### Returns
     * ```
     * Object {
     *   year: number; // Full year
     *   month: number; // Month (1-12)
     *   day: number; // Day (1-31)
     *   hour: number; // Hour (0-23)
     *   minute: number; // Minute (0-59)
     *   second: number; // Second including fraction (0-59.99999)
     * }
     * ```
     * ### Example
     * ```
     * const date = jdut1_to_utc(2415423, constants.GREG_CAL);
     * console.log(date);
     * ```
     * &nbsp;
     */
    export function swe_jdut1_to_utc(tjd_ut: number, gregflag: number): Promise<DateObject2>;

    /**
     * ### Description
     * Convert a calendar date to julian day in universal time
     * ### Params
     * ```
     * • year: number // Full year
     * • month: number // Month (1-12)
     * • day: number // Day (1-31)
     * • hour: number // Hour with fraction (0-23.99999)
     * • gregflag: number // Calendar system, SE_GREG_CAL for gregorian calendar, SE_JUL_CAL for julian calendar
     * ```
     * ### Returns
     * ```
     * number // Julian day value in universal time
     * ```
     * ### Example
     * ```
     * const jd = julday(2010, 5, 25, 14.5, constants.SE_GREG_CAL); // 2455342.1041666665
     * ```
     * &nbsp;
     */
    export function swe_julday(year: number, month: number, day: number, hour: number, gregflag: number): Promise<number>;

    /**
     * ### Description
     * Calculate an object's nodes and apsides from universal time
     * If the calculation method includes `SE_NODBIT_FOPOINT`, the `aphelion` field contains the values for the object's "second focus" instead
     * ### Params
     * ```
     * • tjd_ut: number // Julian day in universal time
     * • ipl: number // Object ID
     * • iflag: number // Calculation flags
     * • method: number // Calculation method flags
     * ```
     * ### Returns
     * ```
     * Object {
     *   flag: number, // Computed flags or ERR
     *   error: string, // Error message in case of error
     *   data: Object {
     *     ascending: Array<number> [
     *       lon, // Longitude, right ascension, or cartesian X
     *       lat, // Latitude, declination or cartesian Y
     *       dist, // Distance in AU or cartesian Z
     *       lonSpd, // Daily speed for lon
     *       latSpd, // Daily speed for lat
     *       distSpd, // Daily speed for dist
     *     ],
     *     descending: Array<number> [
     *       lon, // Longitude, right ascension, or cartesian X
     *       lat, // Latitude, declination or cartesian Y
     *       dist, // Distance in AU or cartesian Z
     *       lonSpd, // Daily speed for lon
     *       latSpd, // Daily speed for lat
     *       distSpd, // Daily speed for dist
     *     ],
     *     perihelion: Array<number> [
     *       lon, // Longitude, right ascension, or cartesian X
     *       lat, // Latitude, declination or cartesian Y
     *       dist, // Distance in AU or cartesian Z
     *       lonSpd, // Daily speed for lon
     *       latSpd, // Daily speed for lat
     *       distSpd, // Daily speed for dist
     *     ],
     *     aphelion: Array<number> [
     *       lon, // Longitude, right ascension, or cartesian X
     *       lat, // Latitude, declination or cartesian Y
     *       dist, // Distance in AU or cartesian Z
     *       lonSpd, // Daily speed for lon
     *       latSpd, // Daily speed for lat
     *       distSpd, // Daily speed for dist
     *     ],
     *   }
     * }
     * ```
     * ### Example
     * ```
     * const flags = constants.SEFLG_SWIEPH;
     * const result = nod_aps_ut(2416547, constants.SE_MARS, flags, 0);
     * if(result.flag !== flags) { console.log(new Error(result.error)); }
     * console.log(`Longitude of the Ascending node: ${result.data.ascending[0]}`)
     * ```
     * &nbsp;
     */
    export function swe_nod_aps_ut(tjd_ut: number, ipl: number, iflag: number, method: number): Promise<NodAps>;

    /**
     * ### Description
     * Compute year, month, day and hour from a julian day number
     * ### Params
     * ```
     * • tjd: number // Julian day in universal time
     * • gregflag: number // Calendar type (SE_JUL_CAL or SE_GREG_CAL)
     * ```
     * ### Returns
     * ```
     * Object {
     *   year: number, // year
     *   month: number, // month (1-12)
     *   day: number, // day (1-31)
     *   hour: number // hour (0-23.999)
     * }
     * ```
     * ### Example
     * ```
     * const date = revjul(2555555, constants.SE_GREG_CAL);
     * console.log(date);
     * ```
     * &nbsp;
     */
    export function swe_revjul(tjd: number, gregflag: number): Promise<DateObject>;

    /**
     * ### Description
     * Set ayanamsa for sidereal mode
     * For predefined ayanamsas, set second and third parameters to 0
     * ### Params
     * ```
     * • sid_mode: number // Ayanamsa ID
     * • t0: number // Reference date in jd_ut for custom ayanamsas
     * • ayan_t0: number // Initial value in degrees for custom ayanamsas
     * ```
     * ### Example
     * ```
     * // set ayanamsa to Lahiri
     * set_sid_mode(constants.SE_SIDM_LAHIRI, 0, 0)
     * // define custom ayanamsa as 25 degrees at J2000
     * set_sid_mode(constants.SE_SIDM_USER, 2451545, 25)
     * ```
     * &nbsp;
     */
    export function swe_set_sid_mode(sid_mode: number, t0: number, ayan_t0: number): Promise<void>;

    /**
     * ### Description
     * Set geographic coordinates for topocentric mode
     * ### Params
     * ```
     * • geolon: number // Geographic longitude in degrees
     * • geolat: number // Geographic latitude in degrees
     * • elevation: number // Elevation in meters
     * ```
     * ### Example
     * ```
     * // set observer to 124'30E, 23'30N, 1250 meters above sea level;
     * set_topo(124.5, 23.5, 1250);
     * // call function with topocentric flag
     * let result = calc(2342341, constants.SE_MOON, constants.SEFLG_SWIEPH | constants.SEFLG_TOPOCTR)
     * ```
     * &nbsp;
     */
    export function swe_set_topo(geolon: number, geolat: number, elevation: number): Promise<void>;

    /**
     * ### Description
     * Calculate sidereal time at the greenwich meridian
     * ### Params
     * ```
     * • tjd_ut: number // Julian day in universal time
     * ```
     * ### Returns
     * ```
     * number // Sidereal time in hours (0-23.99999)
     * ```
     * ### Example
     * ```
     * const time = sidtime(2555555); // 13.176341501003689
     * ```
     * &nbsp;
     */
    export function swe_sidtime(tjd_ut: number): Promise<number>;

    /**
     * ### Description
     * Convert local time to UTC or UTC to local time using a timezone offset
     * ### Params
     * ```
     * • iyear: number // Full year
     * • imonth: number // Month (1-12)
     * • iday: number // Day (1-31)
     * • ihour: number // Hour (0-23)
     * • imin: number // Minute (0-59)
     * • dsec: number // Seconds including fraction (0-59.99999)
     * • d_timezone: number // Timezone offset in decimal hours (0-23.99999)
     * ```
     * ### Returns
     * ```
     * Object {
     *   year: number; // Full year
     *   month: number; // Month (1-12)
     *   day: number; // Day (1-31)
     *   hour: number; // Hour (0-23)
     *   minute: number; // Minute (0-59)
     *   second: number; // Second including fraction (0-59.99999)
     * }
     * ```
     * ### Example
     * ```
     * const result = utc_time_zone(2010, 5, 23, 15, 30, 0, 5.5);
     * console.log(result.hour); // 10;
     * ```
     * &nbsp;
     */
    export function swe_utc_time_zone(iyear: number, imonth: number, iday: number, ihour: number, imin: number, dsec: number, d_timezone: number): Promise<DateObject>;

    /**
     * ### Description
     * Convert UTC date and time to julian day in ephemeris time and julian day in universal time
     * ### Params
     * ```
     * • iyear: number // Full year
     * • imonth: number // Month (1-12)
     * • iday: number // Day (1-31)
     * • ihour: number // Hour (0-23)
     * • imin: number // Minute (0-59)
     * • dsec: number // Seconds including fraction (0-59.99999)
     * • gregflag: number // Calendar system, SE_GREG_CAL for gregorian calendar, SE_JUL_CAL for julian calendar
     * ```
     * ### Returns
     * ```
     * Object {
     *   flag: number, // OK or ERR
     *   error: string, // Error message if ERR
     *   data: Array<number> [
     *     et: number, // Julian day in ephemeris/terrestrial time
     *     ut: number // Julian day in universal time
     *   ]
     * }
     * ```
     * ### Example
     * ```
     * const result = utc_to_jd(2010, 5, 23, 15, 30, 0, constants.SE_GREG_CAL);
     * if(result.flag !== constants.OK) { throw new Error(result.error); }
     * console.log(`JD_ET: ${result.data[0]}`);
     * ```
     * &nbsp;
     */
    export function swe_utc_to_jd(iyear: number, imonth: number, iday: number, ihour: number, imin: number, dsec: number, gregflag: number): Promise<UtcToJd>;

    /**
     * ### Description
     * Determine an object's visibility
     * ### Params
     * ```
     * • tjd_ut: number // Julian day in universal time
     * • dgeo: Array<number> // Geographic coordinates [longitude, latitude, elevation]
     * • datm: Array<number> // Atmospheric conditions [pressure, temperature, humidity, meteorological_range]
     * • dobs: Array<number> // Observer description [age, sellen ratio, optical type, optical magnification, optical aperture, optical transmission]
     * • objectname: string // Name of fixed star or planet
     * • helflag: number // Calculation flags
     * ```
     * ### Returns
     * ```
     * Object {
     *   flag: number, // OK, ERR, -2 if object is below horizon, 1 if scotopic vision or 2 if near limit photopic/scotopic vision
     *   error: string, // Error message if ERR
     *   data: Array<number> [
     *     visual_mag: number, // Limiting visual magnitude (object is visible if this value is bigger than the object's magnitude value)
     *     obj_altitude: number, // Altitude of the object
     *     obj_azimuth: number, // Azimuth of the object
     *     sun_altitude: number, // Altitude of the sun
     *     sun_azimuth: number, // Azimuth of the sun
     *     moon_altitude: number, // Altitude of the moon
     *     moon_azimuth: number, // Azimuth of the moon
     *     magnitude: number // The object's magnitude
     *   ]
     * }
     * ```
     * ### Example
     * ```
     * const result = vis_limit_mag(2555555, [65,47,900], [1000,10,50,-0.15], [21,0,0,0,0,0], "venus", 0);
     * if(result.flag !== constants.OK) { throw new Error(result.error); }
     * console.log(`JD_ET: ${result.data[0]}`);
     * ```
     * &nbsp;
     */
    export function swe_vis_limit_mag(tjd_ut: number, dgeo: [longitude: number, latitude: number, elevation: number], datm: [pressure: number, temperature: number, humidity: number, meteorological_range: number], dobs: [age: number, sellen_ratio: number, optical_type: number, optical_magnification: number, optical_aperture: number, optical_transmission: number], objectname: string, helflag: number): Promise<VisLimitMag>;

    /*
	┌──────────────────────────────────────────────────┬───────────┬──────────────────────────────────────────────────┐
	│┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼│ Constants │┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼│
	└──────────────────────────────────────────────────┴───────────┴──────────────────────────────────────────────────┘
	*/

    /**
     * ### Description
     * Swisseph Constants
     * Contains aliases and predefined constant values used in the swiss ephemeris
     */

    export const OK: 0;
    export const ERR: -1;
    export const SE_AUNIT_TO_KM: 149597870.7;
    export const SE_AUNIT_TO_LIGHTYEAR: 0.000015812507409819728;
    export const SE_AUNIT_TO_PARSEC: 0.000004848136811095274;
    export const SE_JUL_CAL: 0;
    export const SE_GREG_CAL: 1;
    export const SE_ECL_NUT: -1;
    export const SE_SUN: 0;
    export const SE_MOON: 1;
    export const SE_MERCURY: 2;
    export const SE_VENUS: 3;
    export const SE_MARS: 4;
    export const SE_JUPITER: 5;
    export const SE_SATURN: 6;
    export const SE_URANUS: 7;
    export const SE_NEPTUNE: 8;
    export const SE_PLUTO: 9;
    export const SE_MEAN_NODE: 10;
    export const SE_TRUE_NODE: 11;
    export const SE_MEAN_APOG: 12;
    export const SE_OSCU_APOG: 13;
    export const SE_EARTH: 14;
    export const SE_CHIRON: 15;
    export const SE_PHOLUS: 16;
    export const SE_CERES: 17;
    export const SE_PALLAS: 18;
    export const SE_JUNO: 19;
    export const SE_VESTA: 20;
    export const SE_INTP_APOG: 21;
    export const SE_INTP_PERG: 22;
    export const SE_NPLANETS: 23;
    export const SE_PLMOON_OFFSET: 9000;
    export const SE_AST_OFFSET: 10000;
    export const SE_VARUNA: 30000;
    export const SE_FICT_OFFSET: 40;
    export const SE_FICT_OFFSET_1: 39;
    export const SE_FICT_MAX: 999;
    export const SE_NFICT_ELEM: 15;
    export const SE_COMET_OFFSET: 1000;
    export const SE_NALL_NAT_POINTS: 38;
    export const SE_CUPIDO: 40;
    export const SE_HADES: 41;
    export const SE_ZEUS: 42;
    export const SE_KRONOS: 43;
    export const SE_APOLLON: 44;
    export const SE_ADMETOS: 45;
    export const SE_VULKANUS: 46;
    export const SE_POSEIDON: 47;
    export const SE_ISIS: 48;
    export const SE_NIBIRU: 49;
    export const SE_HARRINGTON: 50;
    export const SE_NEPTUNE_LEVERRIER: 51;
    export const SE_NEPTUNE_ADAMS: 52;
    export const SE_PLUTO_LOWELL: 53;
    export const SE_PLUTO_PICKERING: 54;
    export const SE_VULCAN: 55;
    export const SE_WHITE_MOON: 56;
    export const SE_PROSERPINA: 57;
    export const SE_WALDEMATH: 58;
    export const SE_FIXSTAR: -10;
    export const SE_ASC: 0;
    export const SE_MC: 1;
    export const SE_ARMC: 2;
    export const SE_VERTEX: 3;
    export const SE_EQUASC: 4;
    export const SE_COASC1: 5;
    export const SE_COASC2: 6;
    export const SE_POLASC: 7;
    export const SE_NASCMC: 8;
    export const SEFLG_JPLEPH: 1;
    export const SEFLG_SWIEPH: 2;
    export const SEFLG_MOSEPH: 4;
    export const SEFLG_HELCTR: 8;
    export const SEFLG_TRUEPOS: 16;
    export const SEFLG_J2000: 32;
    export const SEFLG_NONUT: 64;
    export const SEFLG_SPEED3: 128;
    export const SEFLG_SPEED: 256;
    export const SEFLG_NOGDEFL: 512;
    export const SEFLG_NOABERR: 1024;
    export const SEFLG_ASTROMETRIC: 1536;
    export const SEFLG_EQUATORIAL: 2048;
    export const SEFLG_XYZ: 4096;
    export const SEFLG_RADIANS: 8192;
    export const SEFLG_BARYCTR: 16384;
    export const SEFLG_TOPOCTR: 32768;
    export const SEFLG_ORBEL_AA: 32768;
    export const SEFLG_TROPICAL: 0;
    export const SEFLG_SIDEREAL: 65536;
    export const SEFLG_ICRS: 131072;
    export const SEFLG_DPSIDEPS_1980: 262144;
    export const SEFLG_JPLHOR: 262144;
    export const SEFLG_JPLHOR_APPROX: 524288;
    export const SEFLG_CENTER_BODY: 1048576;
    export const SEFLG_TEST_PLMOON: 2228280;
    export const SE_SIDBITS: 256;
    export const SE_SIDBIT_ECL_T0: 256;
    export const SE_SIDBIT_SSY_PLANE: 512;
    export const SE_SIDBIT_USER_UT: 1024;
    export const SE_SIDBIT_ECL_DATE: 2048;
    export const SE_SIDBIT_NO_PREC_OFFSET: 4096;
    export const SE_SIDBIT_PREC_ORIG: 8192;
    export const SE_SIDM_FAGAN_BRADLEY: 0;
    export const SE_SIDM_LAHIRI: 1;
    export const SE_SIDM_DELUCE: 2;
    export const SE_SIDM_RAMAN: 3;
    export const SE_SIDM_USHASHASHI: 4;
    export const SE_SIDM_KRISHNAMURTI: 5;
    export const SE_SIDM_DJWHAL_KHUL: 6;
    export const SE_SIDM_YUKTESHWAR: 7;
    export const SE_SIDM_JN_BHASIN: 8;
    export const SE_SIDM_BABYL_KUGLER1: 9;
    export const SE_SIDM_BABYL_KUGLER2: 10;
    export const SE_SIDM_BABYL_KUGLER3: 11;
    export const SE_SIDM_BABYL_HUBER: 12;
    export const SE_SIDM_BABYL_ETPSC: 13;
    export const SE_SIDM_ALDEBARAN_15TAU: 14;
    export const SE_SIDM_HIPPARCHOS: 15;
    export const SE_SIDM_SASSANIAN: 16;
    export const SE_SIDM_GALCENT_0SAG: 17;
    export const SE_SIDM_J2000: 18;
    export const SE_SIDM_J1900: 19;
    export const SE_SIDM_B1950: 20;
    export const SE_SIDM_SURYASIDDHANTA: 21;
    export const SE_SIDM_SURYASIDDHANTA_MSUN: 22;
    export const SE_SIDM_ARYABHATA: 23;
    export const SE_SIDM_ARYABHATA_MSUN: 24;
    export const SE_SIDM_SS_REVATI: 25;
    export const SE_SIDM_SS_CITRA: 26;
    export const SE_SIDM_TRUE_CITRA: 27;
    export const SE_SIDM_TRUE_REVATI: 28;
    export const SE_SIDM_TRUE_PUSHYA: 29;
    export const SE_SIDM_GALCENT_RGILBRAND: 30;
    export const SE_SIDM_GALEQU_IAU1958: 31;
    export const SE_SIDM_GALEQU_TRUE: 32;
    export const SE_SIDM_GALEQU_MULA: 33;
    export const SE_SIDM_GALALIGN_MARDYKS: 34;
    export const SE_SIDM_TRUE_MULA: 35;
    export const SE_SIDM_GALCENT_MULA_WILHELM: 36;
    export const SE_SIDM_ARYABHATA_522: 37;
    export const SE_SIDM_BABYL_BRITTON: 38;
    export const SE_SIDM_TRUE_SHEORAN: 39;
    export const SE_SIDM_GALCENT_COCHRANE: 40;
    export const SE_SIDM_GALEQU_FIORENZA: 41;
    export const SE_SIDM_VALENS_MOON: 42;
    export const SE_SIDM_LAHIRI_1940: 43;
    export const SE_SIDM_LAHIRI_VP285: 44;
    export const SE_SIDM_KRISHNAMURTI_VP291: 45;
    export const SE_SIDM_LAHIRI_ICRC: 46;
    export const SE_SIDM_USER: 255;
    export const SE_NSIDM_PREDEF: 47;
    export const SE_NODBIT_MEAN: 1;
    export const SE_NODBIT_OSCU: 2;
    export const SE_NODBIT_OSCU_BAR: 4;
    export const SE_NODBIT_FOPOINT: 256;
    export const SEFLG_DEFAULTEPH: 2;
    export const SE_MAX_STNAME: 256;
    export const SE_ECL_CENTRAL: 1;
    export const SE_ECL_NONCENTRAL: 2;
    export const SE_ECL_TOTAL: 4;
    export const SE_ECL_ANNULAR: 8;
    export const SE_ECL_PARTIAL: 16;
    export const SE_ECL_ANNULAR_TOTAL: 32;
    export const SE_ECL_HYBRID: 32;
    export const SE_ECL_PENUMBRAL: 64;
    export const SE_ECL_ALLTYPES_SOLAR: 63;
    export const SE_ECL_ALLTYPES_LUNAR: 84;
    export const SE_ECL_VISIBLE: 128;
    export const SE_ECL_MAX_VISIBLE: 256;
    export const SE_ECL_1ST_VISIBLE: 512;
    export const SE_ECL_PARTBEG_VISIBLE: 512;
    export const SE_ECL_2ND_VISIBLE: 1024;
    export const SE_ECL_TOTBEG_VISIBLE: 1024;
    export const SE_ECL_3RD_VISIBLE: 2048;
    export const SE_ECL_TOTEND_VISIBLE: 2048;
    export const SE_ECL_4TH_VISIBLE: 4096;
    export const SE_ECL_PARTEND_VISIBLE: 4096;
    export const SE_ECL_PENUMBBEG_VISIBLE: 8192;
    export const SE_ECL_PENUMBEND_VISIBLE: 16384;
    export const SE_ECL_OCC_BEG_DAYLIGHT: 8192;
    export const SE_ECL_OCC_END_DAYLIGHT: 16384;
    export const SE_ECL_ONE_TRY: 32768;
    export const SE_CALC_RISE: 1;
    export const SE_CALC_SET: 2;
    export const SE_CALC_MTRANSIT: 4;
    export const SE_CALC_ITRANSIT: 8;
    export const SE_BIT_DISC_CENTER: 256;
    export const SE_BIT_DISC_BOTTOM: 8192;
    export const SE_BIT_GEOCTR_NO_ECL_LAT: 128;
    export const SE_BIT_NO_REFRACTION: 512;
    export const SE_BIT_CIVIL_TWILIGHT: 1024;
    export const SE_BIT_NAUTIC_TWILIGHT: 2048;
    export const SE_BIT_ASTRO_TWILIGHT: 4096;
    export const SE_BIT_FIXED_DISC_SIZE: 16384;
    export const SE_BIT_FORCE_SLOW_METHOD: 32768;
    export const SE_BIT_HINDU_RISING: 896;
    export const SE_ECL2HOR: 0;
    export const SE_EQU2HOR: 1;
    export const SE_HOR2ECL: 0;
    export const SE_HOR2EQU: 1;
    export const SE_TRUE_TO_APP: 0;
    export const SE_APP_TO_TRUE: 1;
    export const SE_DE_NUMBER: 431;
    export const SE_FNAME_DE200: "de200.eph";
    export const SE_FNAME_DE403: "de403.eph";
    export const SE_FNAME_DE404: "de404.eph";
    export const SE_FNAME_DE405: "de405.eph";
    export const SE_FNAME_DE406: "de406.eph";
    export const SE_FNAME_DE431: "de431.eph";
    export const SE_FNAME_DFT: "de431.eph";
    export const SE_FNAME_DFT2: "de406.eph";
    export const SE_STARFILE_OLD: "fixstars.cat";
    export const SE_STARFILE: "sefstars.txt";
    export const SE_ASTNAMFILE: "seasnam.txt";
    export const SE_FICTFILE: "seorbel.txt";
    export const SE_SPLIT_DEG_ROUND_SEC: 1;
    export const SE_SPLIT_DEG_ROUND_MIN: 2;
    export const SE_SPLIT_DEG_ROUND_DEG: 4;
    export const SE_SPLIT_DEG_ZODIACAL: 8;
    export const SE_SPLIT_DEG_NAKSHATRA: 1024;
    export const SE_SPLIT_DEG_KEEP_SIGN: 16;
    export const SE_SPLIT_DEG_KEEP_DEG: 32;
    export const SE_HELIACAL_RISING: 1;
    export const SE_HELIACAL_SETTING: 2;
    export const SE_MORNING_FIRST: 1;
    export const SE_EVENING_LAST: 2;
    export const SE_EVENING_FIRST: 3;
    export const SE_MORNING_LAST: 4;
    export const SE_ACRONYCHAL_RISING: 5;
    export const SE_ACRONYCHAL_SETTING: 6;
    export const SE_COSMICAL_SETTING: 6;
    export const SE_HELFLAG_LONG_SEARCH: 128;
    export const SE_HELFLAG_HIGH_PRECISION: 256;
    export const SE_HELFLAG_OPTICAL_PARAMS: 512;
    export const SE_HELFLAG_NO_DETAILS: 1024;
    export const SE_HELFLAG_SEARCH_1_PERIOD: 2048;
    export const SE_HELFLAG_VISLIM_DARK: 4096;
    export const SE_HELFLAG_VISLIM_NOMOON: 8192;
    export const SE_HELFLAG_VISLIM_PHOTOPIC: 16384;
    export const SE_HELFLAG_VISLIM_SCOTOPIC: 32768;
    export const SE_HELFLAG_AV: 65536;
    export const SE_HELFLAG_AVKIND_VR: 65536;
    export const SE_HELFLAG_AVKIND_PTO: 131072;
    export const SE_HELFLAG_AVKIND_MIN7: 262144;
    export const SE_HELFLAG_AVKIND_MIN9: 524288;
    export const SE_HELFLAG_AVKIND: 983040;
    export const TJD_INVALID: 99999999;
    export const SIMULATE_VICTORVB: 1;
    export const SE_PHOTOPIC_FLAG: 0;
    export const SE_SCOTOPIC_FLAG: 1;
    export const SE_MIXEDOPIC_FLAG: 2;
    export const SE_TIDAL_DE200: -23.8946;
    export const SE_TIDAL_DE403: -25.58;
    export const SE_TIDAL_DE404: -25.58;
    export const SE_TIDAL_DE405: -25.826;
    export const SE_TIDAL_DE406: -25.826;
    export const SE_TIDAL_DE421: -25.85;
    export const SE_TIDAL_DE422: -25.85;
    export const SE_TIDAL_DE430: -25.82;
    export const SE_TIDAL_DE431: -25.8;
    export const SE_TIDAL_26: -26;
    export const SE_TIDAL_STEPHENSON_2016: -25.85;
    export const SE_TIDAL_DEFAULT: -25.8;
    export const SE_TIDAL_AUTOMATIC: 999999;
    export const SE_TIDAL_MOSEPH: -25.58;
    export const SE_TIDAL_SWIEPH: -25.8;
    export const SE_TIDAL_JPLEPH: -25.8;
    export const SE_DELTAT_AUTOMATIC: 0.0000000001;
    export const SE_MODEL_DELTAT: 0;
    export const SE_MODEL_PREC_LONGTERM: 1;
    export const SE_MODEL_PREC_SHORTTERM: 2;
    export const SE_MODEL_NUT: 3;
    export const SE_MODEL_BIAS: 4;
    export const SE_MODEL_JPLHOR_MODE: 5;
    export const SE_MODEL_JPLHORA_MODE: 6;
    export const SE_MODEL_SIDT: 7;
    export const NSE_MODELS: 8;
    export const SEMOD_NPREC: 11;
    export const SEMOD_PREC_IAU_1976: 1;
    export const SEMOD_PREC_LASKAR_1986: 2;
    export const SEMOD_PREC_WILL_EPS_LASK: 3;
    export const SEMOD_PREC_WILLIAMS_1994: 4;
    export const SEMOD_PREC_SIMON_1994: 5;
    export const SEMOD_PREC_IAU_2000: 6;
    export const SEMOD_PREC_BRETAGNON_2003: 7;
    export const SEMOD_PREC_IAU_2006: 8;
    export const SEMOD_PREC_VONDRAK_2011: 9;
    export const SEMOD_PREC_OWEN_1990: 10;
    export const SEMOD_PREC_NEWCOMB: 11;
    export const SEMOD_PREC_DEFAULT: 9;
    export const SEMOD_PREC_DEFAULT_SHORT: 9;
    export const SEMOD_NNUT: 5;
    export const SEMOD_NUT_IAU_1980: 1;
    export const SEMOD_NUT_IAU_CORR_1987: 2;
    export const SEMOD_NUT_IAU_2000A: 3;
    export const SEMOD_NUT_IAU_2000B: 4;
    export const SEMOD_NUT_WOOLARD: 5;
    export const SEMOD_NUT_DEFAULT: 4;
    export const SEMOD_NSIDT: 4;
    export const SEMOD_SIDT_IAU_1976: 1;
    export const SEMOD_SIDT_IAU_2006: 2;
    export const SEMOD_SIDT_IERS_CONV_2010: 3;
    export const SEMOD_SIDT_LONGTERM: 4;
    export const SEMOD_SIDT_DEFAULT: 4;
    export const SEMOD_NBIAS: 3;
    export const SEMOD_BIAS_NONE: 1;
    export const SEMOD_BIAS_IAU2000: 2;
    export const SEMOD_BIAS_IAU2006: 3;
    export const SEMOD_BIAS_DEFAULT: 3;
    export const SEMOD_NJPLHOR: 2;
    export const SEMOD_JPLHOR_LONG_AGREEMENT: 1;
    export const SEMOD_JPLHOR_DEFAULT: 1;
    export const SEMOD_NJPLHORA: 3;
    export const SEMOD_JPLHORA_1: 1;
    export const SEMOD_JPLHORA_2: 2;
    export const SEMOD_JPLHORA_3: 3;
    export const SEMOD_JPLHORA_DEFAULT: 3;
    export const SEMOD_NDELTAT: 5;
    export const SEMOD_DELTAT_STEPHENSON_MORRISON_1984: 1;
    export const SEMOD_DELTAT_STEPHENSON_1997: 2;
    export const SEMOD_DELTAT_STEPHENSON_MORRISON_2004: 3;
    export const SEMOD_DELTAT_ESPENAK_MEEUS_2006: 4;
    export const SEMOD_DELTAT_STEPHENSON_ETC_2016: 5;
    export const SEMOD_DELTAT_DEFAULT: 5;

}
