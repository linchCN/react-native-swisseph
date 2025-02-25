"use strict";

const Swisseph = {
  SE_JUL_CAL: 0,
  SE_GREG_CAL: 1,
  // Planet numbers
  SE_ECL_NUT: -1,
  SE_SUN: 0,
  // Base planets
  SE_MOON: 1,
  SE_MERCURY: 2,
  SE_VENUS: 3,
  SE_EARTH: 14,
  SE_MARS: 4,
  SE_JUPITER: 5,
  SE_SATURN: 6,
  SE_URANUS: 7,
  SE_NEPTUNE: 8,
  SE_PLUTO: 9,
  // Moon nodes
  SE_MEAN_NODE: 10,
  SE_TRUE_NODE: 11,
  SE_MEAN_APOG: 12,
  SE_OSCU_APOG: 13,
  SE_INTP_APOG: 21,
  SE_INTP_PERG: 22,
  // Base asteroids
  SE_CHIRON: 15,
  SE_PHOLUS: 16,
  SE_CERES: 17,
  SE_PALLAS: 18,
  SE_JUNO: 19,
  SE_VESTA: 20,
  SE_NPLANETS: 23,
  SE_AST_OFFSET: 10000,
  SE_VARUNA: 30000,
  SE_FICT_OFFSET: 40,
  SE_FICT_OFFSET_1: 39,
  SE_FICT_MAX: 999,
  SE_NFICT_ELEM: 15,
  SE_COMET_OFFSET: 1000,
  SE_NALL_NAT_POINTS: 38,
  // Hamburger or Uranian "planets"
  SE_CUPIDO: 40,
  SE_HADES: 41,
  SE_ZEUS: 42,
  SE_KRONOS: 43,
  SE_APOLLON: 44,
  SE_ADMETOS: 45,
  SE_VULKANUS: 46,
  SE_POSEIDON: 47,
  // Other fictitious bodies
  SE_ISIS: 48,
  SE_NIBIRU: 49,
  SE_HARRINGTON: 50,
  SE_NEPTUNE_LEVERRIER: 51,
  SE_NEPTUNE_ADAMS: 52,
  SE_PLUTO_LOWELL: 53,
  SE_PLUTO_PICKERING: 54,
  SE_VULCAN: 55,
  SE_WHITE_MOON: 56,
  SE_PROSERPINA: 57,
  SE_WALDEMATH: 58,
  SE_FIXSTAR: -10,
  SE_ASC: 0,
  SE_MC: 1,
  SE_ARMC: 2,
  SE_VERTEX: 3,
  SE_EQUASC: 4,
  // "equatorial ascendant"
  SE_COASC1: 5,
  // "co-ascendant" (W. Koch)
  SE_COASC2: 6,
  // "co-ascendant" (M. Munkasey)
  SE_POLASC: 7,
  // "polar ascendant" (M. Munkasey)
  SE_NASCMC: 8,
  /**
   * flag bits for parameter iflag in function swe_calc ()
   * The flag bits are defined in such a way that iflag : 0 delivers what one
   * usually wants:
   *  - the default ephemeris (SWISS EPHEMERIS) is used,
   *  - apparent geocentric positions referring to the true equinox of date
   *    are returned.
   * If not only coordinates, but also speed values are required, use
   * flag : SEFLG_SPEED.
   *
   * The 'L' behind the number indicates that 32-bit integers (Long) are used.
   */
  SEFLG_JPLEPH: 1,
  // use JPL ephemeris
  SEFLG_SWIEPH: 2,
  // use SWISSEPH ephemeris
  SEFLG_MOSEPH: 4,
  // use Moshier ephemeris

  SEFLG_HELCTR: 8,
  // return heliocentric position
  SEFLG_TRUEPOS: 16,
  // return true positions, not apparent
  SEFLG_J2000: 32,
  // no precession, i.e. give J2000 equinox
  SEFLG_NONUT: 64,
  // no nutation, i.e. mean equinox of date
  SEFLG_SPEED3: 128,
  // speed from 3 positions (do not use it, SEFLG_SPEED is faster and more precise.)
  SEFLG_SPEED: 256,
  // high precision speed
  SEFLG_NOGDEFL: 512,
  // turn off gravitational deflection
  SEFLG_NOABERR: 1024,
  // turn off 'annual' aberration of light
  SEFLG_EQUATORIAL: 2048,
  // equatorial positions are wanted

  SEFLG_XYZ: 4096,
  // cartesian, not polar, coordinates
  SEFLG_RADIANS: 8192,
  // coordinates in radians, not degrees
  SEFLG_BARYCTR: 16384,
  // barycentric positions
  SEFLG_TOPOCTR: 32768,
  // topocentric positions
  SEFLG_SIDEREAL: 65536,
  // sidereal positions
  SEFLG_ICRS: 131072,
  // ICRS (DE406 reference frame)

  SE_SIDBITS: 256,
  SE_SIDBIT_ECL_T0: 256,
  // for projection onto ecliptic of t0
  SE_SIDBIT_SSY_PLANE: 512,
  // for projection onto solar system plane

  // Sidereal modes (ayanamsas)
  SE_SIDM_FAGAN_BRADLEY: 0,
  SE_SIDM_LAHIRI: 1,
  SE_SIDM_DELUCE: 2,
  SE_SIDM_RAMAN: 3,
  SE_SIDM_USHASHASHI: 4,
  SE_SIDM_KRISHNAMURTI: 5,
  SE_SIDM_DJWHAL_KHUL: 6,
  SE_SIDM_YUKTESHWAR: 7,
  SE_SIDM_JN_BHASIN: 8,
  SE_SIDM_BABYL_KUGLER1: 9,
  SE_SIDM_BABYL_KUGLER2: 10,
  SE_SIDM_BABYL_KUGLER3: 11,
  SE_SIDM_BABYL_HUBER: 12,
  SE_SIDM_BABYL_ETPSC: 13,
  SE_SIDM_ALDEBARAN_15TAU: 14,
  SE_SIDM_HIPPARCHOS: 15,
  SE_SIDM_SASSANIAN: 16,
  SE_SIDM_GALCENT_0SAG: 17,
  SE_SIDM_J2000: 18,
  SE_SIDM_J1900: 19,
  SE_SIDM_B1950: 20,
  SE_SIDM_USER: 255,
  SE_NSIDM_PREDEF: 21,
  // used for swe_nod_aps ()
  SE_NODBIT_MEAN: 1,
  // mean nodes/apsides
  SE_NODBIT_OSCU: 2,
  // osculating nodes/apsides
  SE_NODBIT_OSCU_BAR: 4,
  // same, but motion about solar system barycenter is considered
  SE_NODBIT_FOPOINT: 256,
  // focal point of orbit instead of aphelion

  // default ephemeris used when no ephemeris flagbit is set
  SEFLG_DEFAULTEPH: 2,
  // Maximum size of fixstar name.
  // The parameter star in swe_fixstar () must allow twice this space for
  // the returned star name.
  SE_MAX_STNAME: 256,
  // defines for eclipse computations
  SE_ECL_CENTRAL: 1,
  SE_ECL_NONCENTRAL: 2,
  SE_ECL_TOTAL: 4,
  SE_ECL_ANNULAR: 8,
  SE_ECL_PARTIAL: 16,
  SE_ECL_ANNULAR_TOTAL: 32,
  SE_ECL_PENUMBRAL: 64,
  SE_ECL_ALLTYPES_SOLAR: 1 | 2 | 4 | 8 | 16 | 32,
  SE_ECL_ALLTYPES_LUNAR: 4 | 16 | 64,
  SE_ECL_VISIBLE: 128,
  SE_ECL_MAX_VISIBLE: 256,
  SE_ECL_1ST_VISIBLE: 512,
  SE_ECL_2ND_VISIBLE: 1024,
  SE_ECL_3RD_VISIBLE: 2048,
  SE_ECL_4TH_VISIBLE: 4096,
  // check if the next conjunction of the moon with a planet is an occultation, don't search further
  SE_ECL_ONE_TRY: 32768,
  // for swe_rise_transit()
  SE_CALC_RISE: 1,
  SE_CALC_SET: 2,
  SE_CALC_MTRANSIT: 4,
  SE_CALC_ITRANSIT: 8,
  // to be or'ed to SE_CALC_RISE/SET, if rise or set of disc center is required
  SE_BIT_DISC_CENTER: 256,
  // to be or'ed to SE_CALC_RISE/SET, if rise or set of lower limb of disc is requried
  SE_BIT_DISC_BOTTOM: 8192,
  // to be or'ed to SE_CALC_RISE/SET, if refraction is to be ignored
  SE_BIT_NO_REFRACTION: 512,
  SE_BIT_CIVIL_TWILIGHT: 1024,
  // to be or'ed to SE_CALC_RISE/SET
  SE_BIT_NAUTIC_TWILIGHT: 2048,
  // to be or'ed to SE_CALC_RISE/SET
  SE_BIT_ASTRO_TWILIGHT: 4096,
  // to be or'ed to SE_CALC_RISE/SET
  // or'ed to SE_CALC_RISE/SET: neglect the effect of distance on disc size
  SE_BIT_FIXED_DISC_SIZE: 16384,
  // for swe_azalt () and swe_azalt_rev ()
  SE_ECL2HOR: 0,
  SE_EQU2HOR: 1,
  SE_HOR2ECL: 0,
  SE_HOR2EQU: 1,
  // for swe_refrac ()
  SE_TRUE_TO_APP: 0,
  SE_APP_TO_TRUE: 1,
  // defines for function swe_split_deg () (in swephlib.c)
  SE_SPLIT_DEG_ROUND_SEC: 1,
  SE_SPLIT_DEG_ROUND_MIN: 2,
  SE_SPLIT_DEG_ROUND_DEG: 4,
  SE_SPLIT_DEG_ZODIACAL: 8,
  // don't round to next sign, e.g. 29.9999999 will be rounded to 29d59'59" (or 29d59' or 29d)
  SE_SPLIT_DEG_KEEP_SIGN: 16,
  // don't round to next degree e.g. 13.9999999 will be rounded to 13d59'59" (or 13d59' or 13d)
  SE_SPLIT_DEG_KEEP_DEG: 32,
  // for heliacal functions
  SE_HELIACAL_RISING: 1,
  SE_HELIACAL_SETTING: 2,
  SE_MORNING_FIRST: 2,
  SE_EVENING_LAST: 2,
  SE_EVENING_FIRST: 3,
  SE_MORNING_LAST: 4,
  SE_ACRONYCHAL_RISING: 5,
  // still not implemented
  SE_ACRONYCHAL_SETTING: 6,
  // still not implemented
  SE_COSMICAL_SETTING: 6,
  SE_HELFLAG_LONG_SEARCH: 128,
  SE_HELFLAG_HIGH_PRECISION: 256,
  SE_HELFLAG_OPTICAL_PARAMS: 512,
  SE_HELFLAG_NO_DETAILS: 1024,
  SE_HELFLAG_SEARCH_1_PERIOD: 2048,
  SE_HELFLAG_VISLIM_DARK: 4096,
  SE_HELFLAG_VISLIM_NOMOON: 8192,
  SE_HELFLAG_VISLIM_PHOTOPIC: 16384,
  SE_HELFLAG_AVKIND_VR: 32768,
  SE_HELFLAG_AVKIND_PTO: 65536,
  SE_HELFLAG_AVKIND_MIN7: 131072,
  SE_HELFLAG_AVKIND_MIN9: 262144,
  SE_HELFLAG_AVKIND: 491520,
  TJD_INVALID: 99999999.0,
  SIMULATE_VICTORVB: 1,
  SE_PHOTOPIC_FLAG: 0,
  SE_SCOTOPIC_FLAG: 1,
  SE_MIXEDOPIC_FLAG: 2
};
export default Swisseph;
//# sourceMappingURL=Swisseph.js.map