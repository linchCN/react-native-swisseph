#ifndef SWISSEPH_H
#define SWISSEPH_H
extern "C" {
  #include "swephexp.h"
  #include "sweph.h"
}
#include <tuple>
#include <map>
#include <string>
#include <vector>

namespace swisseph {
  double swe_julday(int year, int month, int day, double hour, int gregflag);
  double swe_deltat(double tjd);
  std::tuple<int, int, int, double> swe_revjul(double julday, int gregflag);
  std::tuple<int, int, int, int, int, double> swe_utc_time_zone(int iyear, int imonth, int iday, int ihour, int imin, double isec, double timezone);
  std::map<std::string, double> swe_utc_to_jd(int year, int month, int day, int hour, int min, double sec, int gregflag);
  std::tuple<int, int, int, int, int, double> swe_jdet_to_utc(double tjd_et, int gregflag);
  std::tuple<int, int, int, int, int, double> swe_jdut1_to_utc(double tjd_ut, int gregflag);
  void swe_set_topo(double geolon, double geolat, double altitude);
  std::string swe_get_planet_name(int ipl);
  std::map<std::string, double> swe_calc_ut(double tjd_ut, int ipl, int iflag);
  std::map<std::string, double> swe_cotrans(double longitude, double latitude, double distance, double eps);
  std::map<std::string, double> swe_calc(double tjd, int ipl, int iflag);
  std::map<std::string, std::vector<double>> swe_houses(double tjd_ut, int iflag, double geolat, double geolon, const std::string &hsys);
  std::map<std::string, std::vector<double>> swe_houses_armc(double armc, double geolat, double eps, const std::string &hsys);
  std::map<std::string, double> swe_house_pos(double armc, double geolat, double eps, const std::string &hsys);
  std::map<std::string, std::vector<double>> swe_nod_aps_ut(double tjd_ut, int ipl, int iflag,int method);
  void swe_set_sid_mode(int sid_mode, double t0, double ayan_t0);
  double swe_get_ayanamsa_ut(double tjd_ut);
  double swe_sidtime(double tjd_ut);
  double swe_get_ayanamsa(double tjd_et);
  std::map<std::string, double> swe_fixstar(const std::string &star, double tjd, int iflag);
  std::map<std::string, double> swe_fixstar_ut(const std::string &star, double tjd_ut, int iflag);
  std::vector<double> swe_heliacal_pheno_ut(double tjd_ut, std::vector<double> dgeo, std::vector<double> datm, std::vector<double> dobs, const std::string& object_name, int event_type, int helflag);
  std::vector<double> swe_heliacal_ut(double tjd_ut, std::vector<double> dgeo, std::vector<double> datm, std::vector<double> dobs, const std::string& object_name, int event_type, int helflag);
  std::vector<double> swe_vis_limit_mag(double tjd_ut, std::vector<double> dgeo, std::vector<double> datm, std::vector<double> dobs, const std::string& object_name, int helflag);
  void swe_set_ephe_path(const char* path);
  void swe_close();
  std::string getPath();
}

#endif /* SWISSEPH_H */
