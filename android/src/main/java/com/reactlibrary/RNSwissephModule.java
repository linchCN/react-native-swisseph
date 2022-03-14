
package com.reactlibrary;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReadableType;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.reactlibrary.util.CopyAssetfiles;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

import swisseph.SDate;
import swisseph.SweDate;
import swisseph.SweHel;
import swisseph.SwissData;
import swisseph.SwissEph;
import swisseph.SwissLib;

public class RNSwissephModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    private static SwissEph sw;

    public RNSwissephModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        initAsset();
        initSwissEph(reactContext);
    }



    @Override
    public String getName() {
        return "RNSwisseph";
    }


    /**
     *
     *
     *
     * @param year
     * @param month
     * @param day
     * @param hour
     * @param gregflag
     * @param promise
     */
    @ReactMethod
    public void swe_julday(int year,int month,int day,double hour,int gregflag,Promise promise){

        try {

            double julDay = SweDate.getJulDay(year,month,day,hour,gregflag == 1);
            promise.resolve(julDay);

        } catch (Exception e){
            promise.reject(e);
        }

    }

    /**
     *
     *
     *
     * @param tjd
     * @param promise
     */
    @ReactMethod
    public void swe_deltat(double tjd,Promise promise){

        try {

            double deltat = SweDate.getDeltaT(tjd);
            promise.resolve(deltat);

        } catch (Exception e){
            promise.reject(e);
        }

    }

    /**
     *
     *
     * @param julDay
     * @param gregflag
     * @param promise
     */
    @ReactMethod
    public void swe_revjul(double julDay,int gregflag,Promise promise){

        try {
            SweDate sweDate = new SweDate();
            sweDate.setJulDay(julDay);
            sweDate.setCalendarType(gregflag == 1 ,false);
            WritableMap result = Arguments.createMap();
            result.putInt("year",sweDate.getYear());
            result.putInt("month",sweDate.getMonth());
            result.putInt("day",sweDate.getDay());
            result.putDouble("hour",sweDate.getHour());
            promise.resolve(result);

        } catch (Exception e){
            promise.reject(e);
        }

    }


    /**
     * transform local time to UTC or UTC to local time
     * input:
     *   iyear ... dsec     date and time
     *   d_timezone         timezone offset
     * output:
     *   iyear_out ... dsec_out
     * For time zones east of Greenwich, d_timezone is positive.
     * For time zones west of Greenwich, d_timezone is negative.
     * For conversion from local time to utc, use +d_timezone.
     * For conversion from utc to local time, use -d_timezone.
     *
     * @param year Year of the input date (UTC)
     * @param month  Month of the input date (UTC, 1 to 12)
     * @param day   Day of the input date (UTC, 1 to 31)
     * @param hour  Hour of the input date (UTC, 0 to 23)
     * @param min   Minute of the input date (UTC, 0 to 59)
     * @param sec    Second of the input date (UTC, 1.0 to less than 61.0)
     * @param timezone Timezone in hours. You can use -d_timezone to reverse the conversion, but you may also use the getUTCFromLocalTime() method for this.
     * @param promise
     *
     *
     * @return The converted date fields
     */
    @ReactMethod
    public void swe_utc_time_zone(int year,int month,int day,int hour,int min,double sec,double timezone,Promise promise){

        try {
            SweDate sweDate = new SweDate();
            SDate date = sweDate.getLocalTimeFromUTC(year,month,day,hour,min,sec,timezone);

            WritableMap result = Arguments.createMap();
            result.putInt("year",date.year);
            result.putInt("month",date.month);
            result.putInt("day",date.day);
            result.putInt("hour",date.hour);
            result.putInt("minute",date.minute);
            result.putDouble("second",date.second);
            promise.resolve(result);

        } catch (Exception e){
            promise.reject(e);
        }

    }

    /*
    * conversion between ecliptical and equatorial polar coordinates.
    */
    @ReactMethod
    public void swe_cotrans(double longitude,double latitude,double distance,double eps,Promise promise){

        try {

            double xin[] = new double[]{longitude,latitude,distance};
            double xout[] =new double[3];

            new SwissLib(new SwissData()).swe_cotrans(xin,xout,eps);

            WritableMap result = Arguments.createMap();
            result.putDouble("longitude",xout[0]);
            result.putDouble("latitude",xout[1]);
            result.putDouble("distance",xout[1]);
            promise.resolve(result);

        } catch (Exception e){
            promise.reject(e);
        }

    }



    /**
     * Calculates the julian day numbers (TT (==ET) and UT1) from a given date.
     *
     * @param year  Year of the input date (UTC)
     * @param month Month of the input date (UTC, 1 to 12)
     * @param day   Day of the input date (UTC, 1 to 31)
     * @param hour  Hour of the input date (UTC, 0 to 23)
     * @param min   Minute of the input date (UTC, 0 to 59)
     * @param sec   Second of the input date (UTC, 1.0 to less than 61.0)
     * @param gregflag  1 == Gregorian calendar, 0 == Julian calendar
     * @param promise
     *
     * @return  Julian day number UT1
     */
    @ReactMethod
    public void swe_utc_to_jd(int year,int month,int day,int hour,int min,double sec,int gregflag,Promise promise){

        try {
            SweDate sweDate = new SweDate();
            double[] datas = sweDate.getJDfromUTC(year,month,day,hour,min,sec,gregflag == 1,true);

            WritableMap result = Arguments.createMap();
            result.putDouble("tjd_et",datas[0]);
            result.putDouble("tjd_ut",datas[1]);
            promise.resolve(result);

        } catch (Exception e){
            promise.reject(e);
        }

    }


    /**
     * Calculates the UTC date from ET Julian day number
     *
     * @param tjdEt Julian day number (ET) to be converted
     * @param gregflag   1 == Gregorian calendar, 0 == Julian calendar
     * @param promise
     *
     * @return  date
     */
    @ReactMethod
    public void swe_jdet_to_utc(double tjdEt,int gregflag,Promise promise){

        try {
            SweDate sweDate = new SweDate();
            SDate date = sweDate.getUTCfromJDET(tjdEt,gregflag == 1);

            WritableMap result = Arguments.createMap();
            result.putInt("year",date.year);
            result.putInt("month",date.month);
            result.putInt("day",date.day);
            result.putInt("hour",date.hour);
            result.putInt("minute",date.minute);
            result.putDouble("second",date.second);
            //return Julian
            promise.resolve(result);

        } catch (Exception e){
            promise.reject(e);
        }

    }


    /**
     * Calculates the UTC date from UT1 (universal time) Julian day number.
     *
     * @param tjdUt Julian day number (UT1) to be converted.
     * @param gregflag  1 == Gregorian calendar, 0 == Julian calendar
     * @param promise
     *
     * @return  date
     */
    @ReactMethod
    public void swe_jdut1_to_utc(double tjdUt,int gregflag,Promise promise){

        try {
            SweDate sweDate = new SweDate();
            SDate date = sweDate.getUTCfromJDUT1(tjdUt,gregflag == 1);

            WritableMap result = Arguments.createMap();
            result.putInt("year",date.year);
            result.putInt("month",date.month);
            result.putInt("day",date.day);
            result.putInt("hour",date.hour);
            result.putInt("minute",date.minute);
            result.putDouble("second",date.second);
            promise.resolve(result);

        } catch (Exception e){
            promise.reject(e);
        }

    }


    /**
     * If you want to do calculations relative to the observer on some place on the earth rather than relative to the center of the earth, you will want to set the geographic location with this method.
     *
     * @param geolon The Longitude in degrees
     * @param geolat  The Latitude in degrees
     * @param altitude  The height above sea level in meters
     * @param promise
     */
    @ReactMethod
    public void swe_set_topo(double geolon,double geolat,double altitude,Promise promise){

        try {
            sw.swe_set_topo(geolon,geolat,altitude);

            promise.resolve(null);

        } catch (Exception e){
            promise.reject(e);
        }

    }




    /**
     * This will return the planet name for the given planet number.
     *
     * @param ipl ipl - The planet number
     * @param promise
     *
     *  @return  name
     */
    @ReactMethod
    public void swe_get_planet_name(int ipl,Promise promise){

        try {
            String name = sw.swe_get_planet_name(ipl);
            promise.resolve(name);

        } catch (Exception e){
            promise.reject(e);
        }

    }



    /**
     * This will return the planet name for the given planet number.
     *
     * @param tjd_ut  The Julian Day number in UT (Universal Time).
     * @param ipl ipl - The planet number
     * @param iflag A flag that contains detailed specification on how the body is to be computed.
     * @param promise
     *
     * @return longitude,latitude,speedLong,speedLat,speedDist
     *
     */
    @ReactMethod
    public void swe_calc_ut(double tjd_ut,int ipl,int iflag,Promise promise){

        try {

            double[] xx = new double[6];
            StringBuffer serr = new StringBuffer();
            int flag = sw.swe_calc_ut(tjd_ut,ipl,iflag,xx,serr);
            if(flag < 0){
                promise.reject("0",serr.toString());
            }
            else{
                WritableMap result = Arguments.createMap();
                result.putDouble("longitude",xx[0]);
                result.putDouble("latitude",xx[1]);
                result.putDouble("distance",xx[2]);
                result.putDouble("speedLong",xx[3]);
                result.putDouble("speedLat",xx[4]);
                result.putDouble("speedDist",xx[5]);
                promise.resolve(result);
            }


        } catch (Exception e){
            promise.reject(e);
        }

    }

    /**
     * This will return the planet name for the given planet number.
     *
     * @param tjd  The Julian Day number in ET
     * @param ipl ipl - The planet number
     * @param iflag A flag that contains detailed specification on how the body is to be computed.
     * @param promise
     *
     * @return longitude,latitude,speedLong,speedLat,speedDist
     *
     */
    @ReactMethod
    public void swe_calc(double tjd,int ipl,int iflag,Promise promise){

        try {

            double[] xx = new double[6];
            StringBuffer serr = new StringBuffer();
            int flag = sw.swe_calc(tjd,ipl,iflag,xx,serr);
            if(flag < 0){
                promise.reject("0",serr.toString());
            }
            else{

                WritableMap result = Arguments.createMap();
                result.putDouble("longitude",xx[0]);
                result.putDouble("latitude",xx[1]);
                result.putDouble("distance",xx[2]);
                result.putDouble("speedLong",xx[3]);
                result.putDouble("speedLat",xx[4]);
                result.putDouble("speedDist",xx[5]);
                promise.resolve(result);
            }



        } catch (Exception e){
            promise.reject(e);
        }

    }


    /**
     * Calculates the house positions and other vital points. The possible house systems are:
     *
     * @param tjd_ut    The Julian Day number in UT
     * @param iflag      An additional flag for calculation. It must be 0 or SEFLG_SIDEREAL and / or SEFLG_RADIANS.
     * @param geolat    The latitude on earth, for which the calculation has to be done.
     * @param geolon    The longitude on earth, for which the calculation has to be done. Eastern longitude and northern latitude is given by positive values, western longitude and southern latitude by negative values.
     * @param hsys      The house system as a character given as an integer
     * @param promise
     *
     * @return cusp - (double[13]) The house cusps are returned here in cusp[1...12] for the houses 1 to 12.
     *         ascmc - (double[10]) The special points like ascendant etc. are returned here. See the list above.
     */
    @ReactMethod
    public void swe_houses(double tjd_ut,int iflag,double geolat,double geolon,String hsys,Promise promise){

        try {

            double[] cusp = new double[13];
            double[] ascmc = new double[10];

            int flag = sw.swe_houses(tjd_ut,iflag,geolat,geolon,hsys.charAt(0),cusp,ascmc);

            if(flag < 0){
                promise.reject("0","Can't calculate houses.");
            }
            else{

                WritableMap result = Arguments.createMap();
                WritableArray cuspArray = Arguments.fromArray(cusp);
                WritableArray ascmcArray = Arguments.fromArray(ascmc);
                result.putArray("cusp",cuspArray);
                result.putArray("ascmc",ascmcArray);
                promise.resolve(result);
            }


        } catch (Exception e){
            promise.reject(e);
        }

    }


    /**
     * Calculates the house positions and other vital points. You would use this method instead of swe_houses, if you do not have a date available, but just the ARMC (sidereal time).
     *
     * @param armc      The ARMC (= sidereal time)
     * @param geolat    The latitude on earth, for which the calculation has to be done.
     * @param eps       The ecliptic obliquity (e.g. xx[0] of swe_calc(...))
     * @param hsys      The house system as a character given as an integer. See swe_houses(...) for a list of all houses.
     * @param promise
     *
     * @return cusp - (double[13]) The house cusps are returned here in cusp[1...12] for the houses 1 to 12.
     *         ascmc - (double[10]) The special points like ascendant etc. are returned here. See the list above.
     */
    @ReactMethod
    public void swe_houses_armc(double armc,double geolat,double eps,String hsys,Promise promise){

        try {

            double[] cusp = new double[13];
            double[] ascmc = new double[10];
            int flag = sw.swe_houses_armc(armc,geolat,eps,hsys.charAt(0),cusp,ascmc);

            if(flag < 0){
                promise.reject("0","Can't calculate houses.");
            }
            else{

                WritableMap result = Arguments.createMap();
                WritableArray cuspArray = Arguments.fromArray(cusp);
                WritableArray ascmcArray = Arguments.fromArray(ascmc);
                result.putArray("cusp",cuspArray);
                result.putArray("ascmc",ascmcArray);
                promise.resolve(result);
            }


        } catch (Exception e){
            promise.reject(e);
        }

    }


    /**
     *  he function returns a value between 1.0 and 12.999999, indicating in which house a planet is and how far from its cusp it is. With Koch houses, the function sometimes returns 0, if the computation was not possible.
     *
     * @param armc      The ARMC (= sidereal time)
     * @param geolat    The latitude on earth, for which the calculation has to be done.
     * @param eps       The ecliptic obliquity (e.g. xx[0] of swe_calc(...))
     * @param hsys      The house system as a character given as an integer. See swe_houses(...) for a list of all houses.
     * @param promise
     *
     *
     * @return longitude,latitude
     */
    @ReactMethod
    public void swe_house_pos(double armc,double geolat,double eps,String hsys,Promise promise){

        try {

            double[] xpin = new double[2];
            StringBuffer serr = new StringBuffer();
            double flag = sw.swe_house_pos(armc,geolat,eps,hsys.charAt(0),xpin,serr);

            if(flag < 0){
                promise.reject("0",serr.toString());
            }
            else{
                WritableMap result = Arguments.createMap();
                result.putDouble("longitude",xpin[0]);
                result.putDouble("latitude",xpin[1]);
                promise.resolve(result);
            }


        } catch (Exception e){
            promise.reject(e);
        }

    }


    /**
     * @param sid_mode  One of the above ayanamsha modes plus (optionally) one of the non-standard sidereal calculation modes of SE_SIDBIT_ECL_T0 or SE_SIDBIT_SSY_PLANE.
     * @param t0        Reference date (Julian day), if sid_mode is SE_SIDM_USER
     * @param ayan_t0    Initial ayanamsha at t0, if sid_mode is SE_SIDM_USER. This is (tropical position - sidereal position) at date t0.
     * @param promise
     */
    @ReactMethod
    public void swe_set_sid_mode(int sid_mode,double t0,double ayan_t0,Promise promise){

        try {

            sw.swe_set_sid_mode(sid_mode,t0,ayan_t0);

            promise.resolve(null);


        } catch (Exception e){
            promise.reject(e);
        }

    }


    /**
     * This calculates the ayanamsha for a given date. You should call swe_set_sid_mode(...) before, where you will set the mode of ayanamsha, as many different ayanamshas are used in the world today.
     *
     * @param tjd_ut    The date as Julian Day in UT (Universal Time)
     * @param promise
     *
     * @return ayanamsa
     */
    @ReactMethod
    public void swe_get_ayanamsa_ut(double tjd_ut,Promise promise){

        try {

            double ayanamsa = sw.swe_get_ayanamsa_ut(tjd_ut);

            promise.resolve(ayanamsa);

        } catch (Exception e){
            promise.reject(e);
        }

    }


    /**
     * This calculates the sidtime for a given date.
     *
     * @param tjd_ut    The date as Julian Day in UT (Universal Time)
     * @param promise
     *
     * @return sidtime
     */
    @ReactMethod
    public void swe_sidtime(double tjd_ut,Promise promise){

        try {

            double sidtime = new SwissLib(new SwissData()).swe_sidtime(tjd_ut);

            promise.resolve(sidtime);

        } catch (Exception e){
            promise.reject(e);
        }

    }


    /**
     * This calculates the ayanamsha for a given date. You should call swe_set_sid_mode(...) before, where you will set the mode of ayanamsha, as many different ayanamshas are used in the world today.
     *
     * @param tjd_et The date as Julian Day in ET (Ephemeris Time or Dynamic Time)

     * @param promise
     */
    @ReactMethod
    public void swe_get_ayanamsa(double tjd_et,Promise promise){

        try {

            double ayanamsa = sw.swe_get_ayanamsa(tjd_et);

            promise.resolve(ayanamsa);

        } catch (Exception e){
            promise.reject(e);
        }

    }


    /**
     * Computes fixed stars. This method is identical to swe_fixstar_ut() with the one exception that the time has to be given in ET (Ephemeris Time or Dynamical Time instead of Universal Time UT). You would get ET by adding deltaT to the UT
     *
     * @param star  star name
     * @param tjd    The Julian Day in UT
     * @param iflag      Any of the SweConst.SEFLG_* flags
     * @param promise
     *
     * @return longitude,latitude,distance
     */
    @ReactMethod
    public void swe_fixstar(String star,double tjd,int iflag,Promise promise){

        try {
            double[] xx = new double[6];
            StringBuffer serr = new StringBuffer();

            int flag = sw.swe_fixstar(new StringBuffer(star),tjd,iflag,xx,serr);
            if(flag < 0){
                promise.reject("0",serr.toString());
            }
            else{
                WritableMap result = Arguments.createMap();
                result.putDouble("longitude",xx[0]);
                result.putDouble("latitude",xx[1]);
                result.putDouble("distance",xx[2]);
                promise.resolve(result);
            }


        } catch (Exception e){
            promise.reject(e);
        }

    }

    /**
     * Computes fixed stars. This method is identical to swe_fixstar() with the one exception that the time has to be given in UT (Universal Time instead of Ephemeris Time or Dynamical Time ET).
     *
     * @param star  star name
     * @param tjd_ut    The Julian Day in UT
     * @param iflag      Any of the SweConst.SEFLG_* flags
     * @param promise
     *
     * @return longitude,latitude,distance
     */
    @ReactMethod
    public void swe_fixstar_ut(String star,double tjd_ut,int iflag,Promise promise){

        try {
            double[] xx = new double[6];
            StringBuffer serr = new StringBuffer();

            int flag = sw.swe_fixstar_ut(new StringBuffer(star),tjd_ut,iflag,xx,serr);
            if(flag < 0){
                promise.reject("0",serr.toString());
            }
            else{
                WritableMap result = Arguments.createMap();
                result.putDouble("longitude",xx[0]);
                result.putDouble("latitude",xx[1]);
                result.putDouble("distance",xx[2]);
                promise.resolve(result);
            }


        } catch (Exception e){
            promise.reject(e);
        }

    }


    @ReactMethod
    public void swe_heliacal_ut(double tjd_ut, ReadableArray dgeoArray, ReadableArray datmArray,ReadableArray dobsArray,String object_name,int event_type, int helflag, Promise promise){

        try {
            double[] dret = new double[50];
            double[] dgeo = new double[3];
            double[] datm = new double[4];
            double[] dobs = new double[6];
            for(int i=0;i<dgeoArray.size();i++){
                if(dgeoArray.getType(i) == ReadableType.Number){
                    dgeo[i] = dgeoArray.getDouble(i);
                }
            }

            for(int i=0;i<datmArray.size();i++){
                if(datmArray.getType(i) == ReadableType.Number){
                    datm[i] = datmArray.getDouble(i);
                }
            }
            for(int i=0;i<dobsArray.size();i++){
                if(dobsArray.getType(i) == ReadableType.Number){
                    dobs[i] = dobsArray.getDouble(i);
                }
            }

            StringBuffer serr = new StringBuffer();
            int flag = new SweHel().swe_heliacal_ut(tjd_ut,dgeo,datm,dobs,new StringBuffer(object_name),event_type,helflag,dret,serr);
            if(flag < 0){
                promise.reject("0",serr.toString());
            }
            else{
                WritableMap result = Arguments.createMap();
                result.putDouble("startVisible",dret[0]);
                result.putDouble("bestVisible",dret[1]);
                result.putDouble("endVisible",dret[2]);
                promise.resolve(result);
            }


        } catch (Exception e){
            promise.reject(e);
        }

    }


    @ReactMethod
    public void swe_heliacal_pheno_ut(double tjd_ut, ReadableArray dgeoArray, ReadableArray datmArray,ReadableArray dobsArray,String object_name,int event_type, int helflag, Promise promise){

        try {
            double[] darr = new double[50];
            double[] dgeo = new double[3];
            double[] datm = new double[4];
            double[] dobs = new double[6];
            for(int i=0;i<dgeoArray.size();i++){
                if(dgeoArray.getType(i) == ReadableType.Number){
                    dgeo[i] = dgeoArray.getDouble(i);
                }
            }

            for(int i=0;i<datmArray.size();i++){
                if(datmArray.getType(i) == ReadableType.Number){
                    datm[i] = datmArray.getDouble(i);
                }
            }
            for(int i=0;i<dobsArray.size();i++){
                if(dobsArray.getType(i) == ReadableType.Number){
                    dobs[i] = dobsArray.getDouble(i);
                }
            }

            StringBuffer serr = new StringBuffer();
            int flag = new SweHel().swe_heliacal_pheno_ut(tjd_ut,dgeo,datm,dobs,new StringBuffer(object_name),event_type,helflag,darr,serr);
            if(flag < 0){
                promise.reject("0",serr.toString());
            }
            else{
                WritableMap result = Arguments.createMap();
                result.putDouble("tcAltitude",darr[0]);
                result.putDouble("tcApparentAltitude",darr[1]);
                result.putDouble("gcAltitude",darr[2]);
                result.putDouble("azimuth",darr[3]);
                result.putDouble("tcSunAltitude",darr[4]);
                result.putDouble("sunAzimuth",darr[5]);
                result.putDouble("tcActualVisibleArc",darr[6]);
                result.putDouble("gcActualVisibleArc",darr[7]);
                result.putDouble("objectToSunAzimuth",darr[8]);
                result.putDouble("objectToSunLongitude",darr[9]);
                result.putDouble("extinction",darr[10]);
                result.putDouble("tcMinVisibleArc",darr[11]);
                result.putDouble("firstVisible",darr[12]);
                result.putDouble("bestVisible",darr[13]);
                result.putDouble("endVisible",darr[14]);
                result.putDouble("yallopBestVisible",darr[15]);
                result.putDouble("moonCresentWidth",darr[16]);
                result.putDouble("yallopValue",darr[17]);
                result.putDouble("yallopCriterion",darr[18]);
                result.putDouble("parallax",darr[19]);
                result.putDouble("magnitude",darr[20]);
                result.putDouble("rise",darr[21]);
                result.putDouble("riseSet",darr[22]);
                result.putDouble("riseObjectToSun",darr[23]);
                result.putDouble("visibleDuration",darr[24]);
                result.putDouble("moonCresetLength",darr[25]);
                result.putDouble("elong",darr[26]);
                result.putDouble("illumination",darr[27]);
                result.putDouble("kOZ",darr[28]);
                result.putDouble("ka",darr[29]);
                result.putDouble("ksumm",darr[30]);
                promise.resolve(result);
            }


        } catch (Exception e){
            promise.reject(e);
        }

    }



    @ReactMethod
    public void swe_vis_limit_mag(double tjd_ut, ReadableArray dgeoArray, ReadableArray datmArray,ReadableArray dobsArray,String object_name, int helflag, Promise promise){

        try {
            double[] dret = new double[50];
            double[] dgeo = new double[3];
            double[] datm = new double[4];
            double[] dobs = new double[6];
            for(int i=0;i<dgeoArray.size();i++){
                if(dgeoArray.getType(i) == ReadableType.Number){
                    dgeo[i] = dgeoArray.getDouble(i);
                }
            }

            for(int i=0;i<datmArray.size();i++){
                if(datmArray.getType(i) == ReadableType.Number){
                    datm[i] = datmArray.getDouble(i);
                }
            }
            for(int i=0;i<dobsArray.size();i++){
                if(dobsArray.getType(i) == ReadableType.Number){
                    dobs[i] = dobsArray.getDouble(i);
                }
            }

            StringBuffer serr = new StringBuffer();
            int flag = new SweHel().swe_vis_limit_mag(tjd_ut,dgeo,datm,dobs,new StringBuffer(object_name),helflag,dret,serr);
            if(flag < 0){
                promise.reject("0",serr.toString());
            }
            else{
                WritableMap result = Arguments.createMap();
                result.putDouble("vissualMagnitudeLimit",dret[0]);
                result.putDouble("AltO",dret[1]);
                result.putDouble("AziO",dret[2]);
                result.putDouble("AltS",dret[3]);
                result.putDouble("AziS",dret[4]);
                result.putDouble("AltM",dret[5]);
                result.putDouble("AziM",dret[6]);
                promise.resolve(result);
            }


        } catch (Exception e){
            promise.reject(e);
        }

    }


    @ReactMethod
    public void swe_nod_aps_ut(double tjd_ut,int ipl,int iflag,int method,Promise promise){
        double[] xnasc = new double[6];
        double[] xndsc = new double[6];
        double[] xperi = new double[6];
        double[] xaphe = new double[6];

        StringBuffer serr = new StringBuffer();
        int flag = sw.swe_nod_aps_ut(tjd_ut,ipl,iflag,method,xnasc,xndsc,xperi,xaphe,serr);
        if(flag < 0){
            promise.reject("0",serr.toString());
        }
        else{
            WritableMap result = Arguments.createMap();
            WritableMap asc = Arguments.createMap();
            asc.putDouble("longitude",xnasc[0]);
            asc.putDouble("latitude",xnasc[1]);
            asc.putDouble("distance",xnasc[2]);
            asc.putDouble("speedLong",xnasc[3]);
            asc.putDouble("speedLat",xnasc[4]);
            asc.putDouble("speedDist",xnasc[5]);
            result.putMap("xnasc",asc);

            WritableMap dsc = Arguments.createMap();
            dsc.putDouble("longitude",xndsc[0]);
            dsc.putDouble("latitude",xndsc[1]);
            dsc.putDouble("distance",xndsc[2]);
            dsc.putDouble("speedLong",xndsc[3]);
            dsc.putDouble("speedLat",xndsc[4]);
            dsc.putDouble("speedDist",xndsc[5]);
            result.putMap("xndsc",dsc);

            WritableMap peri = Arguments.createMap();
            peri.putDouble("longitude",xperi[0]);
            peri.putDouble("latitude",xperi[1]);
            peri.putDouble("distance",xperi[2]);
            peri.putDouble("speedLong",xperi[3]);
            peri.putDouble("speedLat",xperi[4]);
            peri.putDouble("speedDist",xperi[5]);
            result.putMap("xperi",peri);

            WritableMap aphe = Arguments.createMap();
            aphe.putDouble("longitude",xperi[0]);
            aphe.putDouble("latitude",xperi[1]);
            aphe.putDouble("distance",xperi[2]);
            aphe.putDouble("speedLong",xperi[3]);
            aphe.putDouble("speedLat",xperi[4]);
            aphe.putDouble("speedDist",xperi[5]);
            result.putMap("xaphe",aphe);

            promise.resolve(result);
        }
    }



    /**
     * init asset
     */
    public void initAsset() {
        new CopyAssetfiles(".*\\.se1", reactContext).copy();
    }

    /**
     * init swissEph
     */
    public void initSwissEph(ReactApplicationContext reactContext){
        if (RNSwissephModule.sw == null){
            sw = new SwissEph(reactContext.getFilesDir() + File.separator + "/ephe");
        }
    }

}
