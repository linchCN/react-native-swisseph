
import { NativeModules } from 'react-native';
import swisseph from "./swisseph"

const { RNSwisseph } = NativeModules;


async function swe_julday(year,mouth,day,hour,flag) {
    return await RNSwisseph.swe_julday(year,mouth,day,hour,flag);
}


async function swe_revjul(julDay,gregflag) {
    return await RNSwisseph.swe_revjul(julDay,gregflag);
}

async function swe_deltat(tjd) {
    return await RNSwisseph.swe_deltat(tjd);
}

async function swe_cotrans(longitude,latitude,distance,eps) {
    return await RNSwisseph.swe_cotrans(longitude,latitude,distance,eps);
}


async function swe_utc_time_zone(year,mouth,day,hour,min,sec,timezone) {
    return await RNSwisseph.swe_utc_time_zone(year,mouth,day,hour,min,sec,timezone);
}

async function swe_utc_to_jd(year,mouth,day,hour,min,sec,gregflag) {
    return await RNSwisseph.swe_utc_to_jd(year,mouth,day,hour,min,sec,gregflag);
}


async function swe_jdet_to_utc(tjdEt,gregflag) {
    return await RNSwisseph.swe_jdet_to_utc(tjdEt,gregflag);
}


async function swe_jdut1_to_utc(tjdUt,gregflag) {
    return await RNSwisseph.swe_jdut1_to_utc(tjdUt,gregflag);
}


async function swe_set_topo(geolon,geolat,altitude) {
    return await RNSwisseph.swe_set_topo(geolon,geolat,altitude);
}


async function swe_get_planet_name(ipl) {
    return await RNSwisseph.swe_get_planet_name(ipl);
}


async function swe_calc_ut(tjd_ut,ipl,iflag) {
    return await RNSwisseph.swe_calc_ut(tjd_ut,ipl,iflag);
}

async function swe_calc(tjd,ipl,iflag) {
    return await RNSwisseph.swe_calc(tjd,ipl,iflag);
}


async function swe_houses(tjd_ut,iflag,geolat,geolon,hsys) {
    return await RNSwisseph.swe_houses(tjd_ut,iflag,geolat,geolon,hsys);
}


async function swe_houses_armc(armc,geolat,eps,hsys) {
    return await RNSwisseph.swe_houses_armc(armc,geolat,eps,hsys);
}

async function swe_house_pos(armc,geolat,eps,hsys) {
    return await RNSwisseph.swe_house_pos(armc,geolat,eps,hsys);
}

async function swe_set_sid_mode(sid_mode,t0,ayan_t0) {
    return await RNSwisseph.swe_set_sid_mode(sid_mode,t0,ayan_t0);
}

async function swe_get_ayanamsa_ut(tjd_ut) {
    return await RNSwisseph.swe_get_ayanamsa_ut(tjd_ut);
}

async function swe_get_ayanamsa(tjd_et) {
    return await RNSwisseph.swe_get_ayanamsa(tjd_et);
}

async function swe_fixstar(star,tjd,iflag) {
    return await RNSwisseph.swe_fixstar(star,tjd,iflag);
}

async function swe_sidtime(tjd_ut) {
    return await RNSwisseph.swe_sidtime(tjd_ut);
}


async function swe_fixstar_ut(star,tjd_ut,iflag) {
    return await RNSwisseph.swe_fixstar_ut(star,tjd_ut,iflag);
}

async function swe_heliacal_ut(tjd_ut,dgeo,datm,dobs,object_name,event_type,helflag) {
    return await RNSwisseph.swe_heliacal_ut(tjd_ut,dgeo,datm,dobs,object_name,event_type,helflag);
}

async function swe_heliacal_pheno_ut(tjd_ut,dgeo,datm,dobs,object_name,event_type,helflag) {
    return await RNSwisseph.swe_heliacal_pheno_ut(tjd_ut,dgeo,datm,dobs,object_name,event_type,helflag);
}

async function swe_vis_limit_mag(tjd_ut,dgeo,datm,dobs,object_name,helflag) {
    return await RNSwisseph.swe_vis_limit_mag(tjd_ut,dgeo,datm,dobs,object_name,helflag);
}

async function swe_nod_aps_ut(tjd_ut,ipl,iflag,method) {
    return await RNSwisseph.swe_nod_aps_ut(tjd_ut,ipl,iflag,method);
}


export default {
    ...swisseph,
    swe_julday,
    swe_deltat,
    swe_revjul,
    swe_utc_time_zone,
    swe_utc_to_jd,
    swe_jdet_to_utc,
    swe_jdut1_to_utc,
    swe_set_topo,
    swe_get_planet_name,
    swe_calc_ut,
    swe_calc,
    swe_houses,
    swe_houses_armc,
    swe_sidtime,
    swe_house_pos,
    swe_set_sid_mode,
    swe_get_ayanamsa_ut,
    swe_get_ayanamsa,
    swe_fixstar,
    swe_fixstar_ut,
    swe_heliacal_ut,
    swe_heliacal_pheno_ut,
    swe_vis_limit_mag,
    swe_nod_aps_ut,
    swe_cotrans
};
