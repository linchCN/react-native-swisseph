#include "RNSwisseph.h"

namespace swisseph {
double swe_julday(int year, int month, int day, double hour, int gregflag) {
  return ::swe_julday(year, month, day, hour, gregflag);
}

// swe_deltat 实现
double swe_deltat(double tjd) {
  return ::swe_deltat(tjd);
}

// swe_revjul 实现
std::tuple<int, int, int, double> swe_revjul(double julday, int gregflag) {
  int year, month, day;
  double hour;
  ::swe_revjul(julday, gregflag, &year, &month, &day, &hour);
  return std::make_tuple(year, month, day, hour);
}

// swe_utc_time_zone 实现
std::tuple<int, int, int, int, int, double> swe_utc_time_zone(
  int iyear, int imonth, int iday, int ihour, int imin, double isec, double timezone) {
  int oyear, omonth, oday, ohour, omin;
  double osec;
  ::swe_utc_time_zone(iyear, imonth, iday, ihour, imin, isec, timezone, &oyear, &omonth, &oday, &ohour, &omin, &osec);
  return std::make_tuple(oyear, omonth, oday, ohour, omin, osec);
}

std::map<std::string, double> swe_utc_to_jd(int year, int month, int day, int hour, int min, double sec, int gregflag) {
  double dret[2];
  char serr[AS_MAXCH];
  int result = ::swe_utc_to_jd(year, month, day, hour, min, sec, gregflag, dret, serr);
  if (result < 0) {
    throw std::runtime_error(serr);
  }
  return {{"tjd_et", dret[0]}, {"tjd_ut", dret[1]}};
}

std::tuple<int, int, int, int, int, double> swe_jdet_to_utc(double tjd_et, int gregflag) {
  int iyear, imonth, iday, ihour, imin;
  double dsec;
  ::swe_jdet_to_utc(tjd_et, gregflag, &iyear, &imonth, &iday, &ihour, &imin, &dsec);
  return std::make_tuple(iyear, imonth, iday, ihour, imin, dsec);
}

std::tuple<int, int, int, int, int, double> swe_jdut1_to_utc(double tjd_ut, int gregflag) {
  int iyear, imonth, iday, ihour, imin;
  double dsec;
  ::swe_jdut1_to_utc(tjd_ut, gregflag, &iyear, &imonth, &iday, &ihour, &imin, &dsec);
  return std::make_tuple(iyear, imonth, iday, ihour, imin, dsec);
}

void swe_set_topo(double geolon, double geolat, double altitude) {
  ::swe_set_topo(geolon, geolat, altitude);
}

std::string swe_get_planet_name(int ipl) {
  char name[AS_MAXCH];
  ::swe_get_planet_name(ipl, name);
  return std::string(name);
}

std::map<std::string, double> swe_calc_ut(double tjd_ut, int ipl, int iflag) {
  double xx[6];
  char serr[AS_MAXCH];
  int result = ::swe_calc_ut(tjd_ut, ipl, iflag, xx, serr);
  if (result < 0) {
    throw std::runtime_error(serr);
  }
  return {{"longitude", xx[0]}, {"latitude", xx[1]}, {"distance", xx[2]}, {"longitudeSpeed", xx[3]}, {"latitudeSpeed", xx[4]}, {"distanceSpeed", xx[5]}};
}

std::map<std::string, double> swe_cotrans(double longitude, double latitude, double distance, double eps) {
  double xin[3] = {longitude, latitude, distance};
  double xout[3];
  ::swe_cotrans(xin, xout, eps);
  return {{"longitude", xout[0]}, {"latitude", xout[1]}, {"distance", xout[2]}};
}

std::map<std::string, double> swe_calc(double tjd, int ipl, int iflag) {
  double xx[6];
  char serr[AS_MAXCH];
  int result = ::swe_calc(tjd, ipl, iflag, xx, serr);
  if (result < 0) {
    throw std::runtime_error(serr);
  }
  return {{"longitude", xx[0]}, {"latitude", xx[1]}, {"distance", xx[2]}, {"longitudeSpeed", xx[3]}, {"latitudeSpeed", xx[4]}, {"distanceSpeed", xx[5]}};
}

std::map<std::string, std::vector<double>> swe_houses(double tjd_ut, int iflag, double geolat, double geolon,const std::string &hsys) {
  double cusps[13], ascmc[10];
  char hsys_char = hsys[0];
  int result = ::swe_houses_ex(tjd_ut, iflag, geolat, geolon, hsys_char, cusps, ascmc);
  if (result < 0) {
    throw std::runtime_error("Can't calculate houses.");
  }
  return {{"cusp", std::vector<double>(cusps, cusps + 13)}, {"ascmc", std::vector<double>(ascmc, ascmc + 10)}};
}

std::map<std::string, std::vector<double>> swe_houses_armc(double armc, double geolat, double eps,const std::string &hsys) {
  double cusps[13], ascmc[10];
  char hsys_char = hsys[0];
  int result = ::swe_houses_armc(armc, geolat, eps, hsys_char, cusps, ascmc);
  if (result < 0) {
    throw std::runtime_error("Can't calculate houses.");
  }
  return {{"cusp", std::vector<double>(cusps, cusps + 13)}, {"ascmc", std::vector<double>(ascmc, ascmc + 10)}};
}

std::map<std::string, double> swe_house_pos(double armc, double geolat, double eps, const std::string &hsys) {
  double cusps[13];
  char serr[AS_MAXCH];
  char hsys_char = hsys[0];
  double result = ::swe_house_pos(armc, geolat, eps, hsys_char, cusps, serr);
  if (result < 0) {
    throw std::runtime_error(serr);
  }
  return {{"longitude", cusps[0]}, {"latitude", cusps[1]}};
}

std::map<std::string, std::vector<double>> swe_nod_aps_ut(double tjd_ut, int ipl, int iflag,int method) {
  double xnasc[6], xndsc[6], xperi[6], xaphe[6];
  char serr[AS_MAXCH];
  int result = ::swe_nod_aps_ut(tjd_ut, ipl, iflag, method, xnasc, xndsc, xperi,xaphe, serr);
  if (result < 0) {
    throw std::runtime_error(serr);
  }
  return {{"ascending", std::vector<double>(xnasc, xnasc + 6)}, {"descending", std::vector<double>(xndsc, xndsc + 6)},{"perihelion", std::vector<double>(xperi, xperi + 6)},{"aphelion", std::vector<double>(xaphe, xaphe + 6)}};
}


void swe_set_sid_mode(int sid_mode, double t0, double ayan_t0) {
  ::swe_set_sid_mode(sid_mode, t0, ayan_t0);
}

double swe_get_ayanamsa_ut(double tjd_ut) {
  return ::swe_get_ayanamsa_ut(tjd_ut);
}

double swe_sidtime(double tjd_ut) {
  return ::swe_sidtime(tjd_ut);
}

double swe_get_ayanamsa(double tjd_et) {
  return ::swe_get_ayanamsa(tjd_et);
}

std::map<std::string, double> swe_fixstar(const std::string &star, double tjd, int iflag) {
  double xx[6];
  char serr[AS_MAXCH];
  int32 result = ::swe_fixstar(const_cast<char*>(star.c_str()), tjd, iflag, xx, serr);
  if (result < 0) {
    throw std::runtime_error(serr);
  }
  return {{"longitude", xx[0]}, {"latitude", xx[1]}, {"distance", xx[2]}};
}

std::map<std::string, double> swe_fixstar_ut(const std::string &star, double tjd_ut, int iflag) {
  double xx[6];
  char serr[AS_MAXCH];
  int32 result = ::swe_fixstar_ut(const_cast<char*>(star.c_str()), tjd_ut, iflag, xx, serr);
  if (result < 0) {
    throw std::runtime_error(serr);
  }
  return {{"longitude", xx[0]}, {"latitude", xx[1]}, {"distance", xx[2]}};
}


std::vector<double> swe_heliacal_pheno_ut(double tjd_ut, std::vector<double> dgeo, std::vector<double> datm, std::vector<double> dobs, const std::string& object_name, int event_type, int helflag) {
  double darr[50];
  char serr[AS_MAXCH];
  char name[AS_MAXCH];
  std::strncpy(name, object_name.c_str(), AS_MAXCH - 1);
  name[AS_MAXCH - 1] = '\0';

  int32 result = ::swe_heliacal_pheno_ut(tjd_ut, dgeo.data(), datm.data(), dobs.data(), name, event_type, helflag, darr, serr);

  std::vector<double> ret(darr, darr + 31);
  ret.insert(ret.begin(), result);
  return ret;
}

std::vector<double> swe_heliacal_ut(double tjd_ut, std::vector<double> dgeo, std::vector<double> datm, std::vector<double> dobs, const std::string& object_name, int event_type, int helflag) {
  double dret[50];
  char serr[AS_MAXCH];
  char name[AS_MAXCH];
  std::strncpy(name, object_name.c_str(), AS_MAXCH - 1);
  name[AS_MAXCH - 1] = '\0';
  int32 result = ::swe_heliacal_ut(tjd_ut, dgeo.data(), datm.data(), dobs.data(), name, event_type, helflag, dret, serr);

  std::vector<double> ret(dret, dret + 3);
  ret.insert(ret.begin(), result);
  return ret;
}
std::vector<double> swe_vis_limit_mag(double tjd_ut, std::vector<double> dgeo, std::vector<double> datm, std::vector<double> dobs, const std::string& object_name, int helflag) {
  double dret[50];
  char serr[AS_MAXCH];
  char name[AS_MAXCH];
  std::strncpy(name, object_name.c_str(), AS_MAXCH - 1);
  name[AS_MAXCH - 1] = '\0';
  int32 result = ::swe_vis_limit_mag(tjd_ut, dgeo.data(), datm.data(), dobs.data(), name, helflag, dret, serr);

  std::vector<double> ret;
  ret.push_back(result);
  if (result >= 0) {
    ret.insert(ret.end(), dret, dret + 7);
  } else {
    ret.push_back(0); // Add a placeholder for error message
  }
  return ret;
}

void swe_set_ephe_path(const char* path) {
  ::swe_set_ephe_path(const_cast<char*>(path));
}

void swe_close() {
  ::swe_close();
}

std::string getPath(){
  return swed.ephepath;
}
}
