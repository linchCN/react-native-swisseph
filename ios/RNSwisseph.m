
#import "RNSwisseph.h"


@implementation RNSwisseph

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}

RCT_EXPORT_MODULE()


#pragma mark - RCT dateTime


/**
 @see http://www.astro.com/swisseph/swephprg.htm#_Toc505244874
 @param year,
        month,
        day ,
        hours ,
        calendar ‘g’[regorian]|’j’[ulian]
 @return value for Julian day
 */
RCT_EXPORT_METHOD(swe_julday:(int) year
                  month:(int) month
                  day : (int) day
                  hour : (double) hour
                  gregflag : (int) gregflag
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
                  ) {
    @try{
        double julday = swe_julday(year, month, day, hour, gregflag);
        resolve([[NSNumber alloc] initWithDouble:julday]);
    }
    @catch(NSException *exception) {
        reject(@"0",exception.reason,nil);
    }
}



/**
 @see http://www.astro.com/swisseph/swephprg.htm#_Toc505244874
 
 @param Julian day number ,
        Gregorian calendar: 1, Julian calendar: 0,
 
 @return year,
         month,
         day ,
         hours
 */
RCT_EXPORT_METHOD(swe_revjul:(double) julday
                  gregflag : (int) gregflag
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
                  ) {
    @try{
        int year,month,day;
        double hour;
        swe_revjul(julday,gregflag,&year, &month, &day, &hour);
        resolve(@{
                  @"year": [[NSNumber alloc] initWithInt:(year)] ,
                  @"month":[[NSNumber alloc] initWithInt:(month)] ,
                  @"day":[[NSNumber alloc] initWithInt:(day)],
                  @"hour":[[NSNumber alloc] initWithDouble:(hour)]
                  });
    }
    @catch(NSException *exception) {
        reject(@"0",exception.reason,nil);
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
 */
RCT_EXPORT_METHOD(swe_utc_time_zone:(int) iyear
                  month : (int) imonth
                  day : (int) iday
                  hour : (int) ihour
                  min : (int) imin
                  sec : (double) isec
                  timezone : (double) timezone
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
                  ) {
    @try{
        int32 oyear,omouth,oday,ohour,omin;
        double osec;
        swe_utc_time_zone(iyear,imonth,iday, ihour, imin, isec,timezone,&oyear,&omouth,&oday,&ohour,&omin,&osec);
        resolve(@{
                  @"year": [[NSNumber alloc] initWithInt:(oyear)] ,
                  @"month":[[NSNumber alloc] initWithInt:(omouth)] ,
                  @"day":[[NSNumber alloc] initWithInt:(oday)],
                  @"hour": [[NSNumber alloc] initWithInt:(ohour)],
                  @"minute":[[NSNumber alloc] initWithInt:(omin)],
                  @"second":[[NSNumber alloc] initWithDouble:(osec)]
                  });
    }
    @catch(NSException *exception) {
        reject(@"0",exception.reason,nil);
    }
}


/**
 *  Calculates the julian day numbers (TT (==ET) and UT1) from a given date.
 *
 * input: date and time (wall clock time), calendar flag.
 * output: an array of doubles with Julian Day number in ET
 *             an error message (on error)
 */
RCT_EXPORT_METHOD(swe_utc_to_jd:(int) year
                  month : (int) month
                  day : (int) day
                  hour : (int) hour
                  min : (int) min
                  sec : (double) sec
                  gregflag : (int) gregflag
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
                  ) {
    @try{
        double dret[2];
        char serr[AS_MAXCH];
        int32 result = swe_utc_to_jd(year,month,day, hour, min, sec,gregflag,dret,serr);
        if(result < 0){
            reject(@"0",[[NSString alloc] initWithUTF8String:serr ],nil);
            
        }
        else{
            resolve(@{
                      @"tjd_et": [[NSNumber alloc] initWithDouble:(dret[0])] ,
                      @"tjd_ut":[[NSNumber alloc] initWithDouble:(dret[1])] ,
                      });
        }
        
    }
    @catch(NSException *exception) {
        reject(@"0",exception.reason,nil);
    }
}



/**
 *  Calculates the UTC date from ET Julian day number
 *
 * input: Julian day number in ET (TT), calendar flag
 * output: year, month, day, hour, min, sec in UTC
 */
RCT_EXPORT_METHOD(swe_jdet_to_utc:(double) tjd_et
                  gregflag : (int) gregflag
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
                  ) {
    @try{
        int32 iyear,imonth,iday,ihour,imin;
        double dsec;
        swe_jdet_to_utc(tjd_et,gregflag,&iyear, &imonth, &iday, &ihour,&imin,&dsec);
        resolve(@{
                  @"year": [[NSNumber alloc] initWithInt:(iyear)] ,
                  @"month":[[NSNumber alloc] initWithInt:(imonth)] ,
                  @"day":[[NSNumber alloc] initWithInt:(iday)],
                  @"hour": [[NSNumber alloc] initWithInt:(ihour)],
                  @"minute":[[NSNumber alloc] initWithInt:(imin)],
                  @"second":[[NSNumber alloc] initWithDouble:(dsec)]
                  });
        
    }
    @catch(NSException *exception) {
        reject(@"0",exception.reason,nil);
    }
}


/**
 * Calculates the UTC date from UT1 (universal time) Julian day number.
 *
 * input: Julian day number in UT (UT1), calendar flag
 * output: year, month, day, hour, min, sec in UTC
 */
RCT_EXPORT_METHOD(swe_jdut1_to_utc:(double) tjd_ut
                  gregflag : (int) gregflag
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
                  ) {
    @try{
        int32 iyear,imonth,iday,ihour,imin;
        double dsec;
        swe_jdut1_to_utc(tjd_ut,gregflag,&iyear, &imonth, &iday, &ihour,&imin,&dsec);
        resolve(@{
                  @"year": [[NSNumber alloc] initWithInt:(iyear)] ,
                  @"month":[[NSNumber alloc] initWithInt:(imonth)] ,
                  @"day":[[NSNumber alloc] initWithInt:(iday)],
                  @"hour": [[NSNumber alloc] initWithInt:(ihour)],
                  @"minute":[[NSNumber alloc] initWithInt:(imin)],
                  @"second":[[NSNumber alloc] initWithDouble:(dsec)]
                  });
        
    }
    @catch(NSException *exception) {
        reject(@"0",exception.reason,nil);
    }
}


#pragma mark - RCT ephemeris

/**
 
 If you want to do calculations relative to the observer on some place on the earth rather than relative to the center of the earth, you will want to set the geographic location with this method.

 @param
     geolon - The Longitude in degrees
     geolat - The Latitude in degrees
     geoalt - The height above sea level in meters

 */
RCT_EXPORT_METHOD(swe_set_topo:(double) geolon
                  geolat : (double) geolat
                  altitude : (double) altitude
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
                  ) {
    @try{
        
        swe_set_topo(geolon,geolat,altitude);
        resolve(nil);
    }
    @catch(NSException *exception) {
        reject(@"0",exception.reason,nil);
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
RCT_EXPORT_METHOD(swe_get_planet_name:(int) ipl
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
                  ) {
    @try{
        char name[AS_MAXCH];
        swe_get_planet_name(ipl,name);
        resolve([[NSString alloc] initWithUTF8String:name]);
    }
    @catch(NSException *exception) {
        reject(@"0",exception.reason,nil);
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
 * @Return longitude,latitude,speedLong,speedLat,speedDist
 *
 */
RCT_EXPORT_METHOD(swe_calc_ut:(double) tjd_ut
                  ipl : (int) ipl
                  iflag : (int) iflag
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
                  ) {
    @try{
        double xx[6];
        char serr[AS_MAXCH];
        int32 result = swe_calc_ut(tjd_ut,ipl,iflag,xx,serr);
        if(result < 0)
        {
            reject(@"0",[[NSString alloc] initWithUTF8String:serr ],nil);
        }
        else{
            resolve(@{
                      @"longitude": [[NSNumber alloc] initWithDouble:(xx[0])] ,
                      @"latitude":[[NSNumber alloc] initWithDouble:(xx[1])] ,
                      @"distance":[[NSNumber alloc] initWithDouble:(xx[2])] ,
                      @"speedLong":[[NSNumber alloc] initWithDouble:(xx[3])] ,
                      @"speedLat":[[NSNumber alloc] initWithDouble:(xx[4])] ,
                      @"speedDist":[[NSNumber alloc] initWithDouble:(xx[5])] ,
                      });
            
        }
        
    }
    @catch(NSException *exception) {
        reject(@"0",exception.reason,nil);
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
RCT_EXPORT_METHOD(swe_calc:(double) tjd
                  ipl : (int) ipl
                  iflag : (int) iflag
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
                  ) {
    @try{
        double xx[6];
        char serr[AS_MAXCH];
        int32 result = swe_calc(tjd,ipl,iflag,xx,serr);
        if(result < 0 ){
            reject(@"0",[[NSString alloc] initWithUTF8String:serr ],nil);
        }
        else {
            resolve(@{
                      @"longitude": [[NSNumber alloc] initWithDouble:(xx[0])] ,
                      @"latitude":[[NSNumber alloc] initWithDouble:(xx[1])] ,
                      @"distance":[[NSNumber alloc] initWithDouble:(xx[2])] ,
                      @"speedLong":[[NSNumber alloc] initWithDouble:(xx[3])] ,
                      @"speedLat":[[NSNumber alloc] initWithDouble:(xx[4])] ,
                      @"speedDist":[[NSNumber alloc] initWithDouble:(xx[5])] ,
                      });
            
        }
    }
    @catch(NSException *exception) {
        reject(@"0",exception.reason,nil);
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
 * @Return cusp - (double[13]) The house cusps are returned here in cusp[1...12] for the houses 1 to 12.
 *         ascmc - (double[10]) The special points like ascendant etc. are returned here. See the list above.
 */
RCT_EXPORT_METHOD(swe_houses:(double) tjd_ut
                  iflag : (int) iflag
                  geolat : (double) geolat
                  geolon : (double) geolon
                  hsys : (NSString *) hsysStr
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
                  ) {
    @try{
        double cusps[13] ,ascmc[10];
        char hsys;
        if(hsysStr.length > 0){
            hsys = [hsysStr characterAtIndex:0];
        }
        int32 result = swe_houses_ex(tjd_ut, iflag, geolat, geolon, hsys, cusps, ascmc);
        if(result < 0){
            reject(@"0",@"Can't calculate houses.",nil);
        }
        else{
            NSMutableArray *cuspArray = [NSMutableArray new];
            NSMutableArray *ascmcArray = [NSMutableArray new];
            for (int i = 0; i<13; i++) {
                [cuspArray addObject:[[NSNumber alloc] initWithDouble:cusps[i]]];
            }
            for (int i = 0; i<10; i++) {
                [ascmcArray addObject:[[NSNumber alloc] initWithDouble:ascmc[i]]];
            }
            
            resolve(@{@"cusp" :cuspArray,@"ascmc" : ascmcArray});
        }
        
        
        
    }
    @catch(NSException *exception) {
        reject(@"0",exception.reason,nil);
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
RCT_EXPORT_METHOD(swe_houses_armc:(double) armc
                  geolat : (double) geolat
                  eps : (double) eps
                  hsys : (NSString *) hsysStr
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
                  ) {
    @try{
        double cusps[13] ,ascmc[10];
        char hsys;
        if(hsysStr.length > 0){
            hsys = [hsysStr characterAtIndex:0];
        }
        int32 result = swe_houses_armc(armc, geolat, eps, hsys, cusps, ascmc);
        if(result < 0){
            reject(@"0",@"Can't calculate houses.",nil);
        }
        else{
            
            NSMutableArray *cuspArray = [NSMutableArray new];
            NSMutableArray *ascmcArray = [NSMutableArray new];
            for (int i = 0; i<13; i++) {
                [cuspArray addObject:[[NSNumber alloc] initWithDouble:cusps[i]]];
            }
            for (int i = 0; i<10; i++) {
                [ascmcArray addObject:[[NSNumber alloc] initWithDouble:ascmc[i]]];
            }
            
            resolve(@{@"cusp" :cuspArray,@"ascmc" : ascmcArray});
        }
    }
    @catch(NSException *exception) {
        reject(@"0",exception.reason,nil);
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
RCT_EXPORT_METHOD(swe_house_pos:(double) armc
                  geolat : (double) geolat
                  eps : (double) eps
                  hsys : (NSString *) hsysStr
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
                  ) {
    @try{
        double cusps[13];
        char serr[AS_MAXCH];
        char hsys;
        if(hsysStr.length > 0){
            hsys = [hsysStr characterAtIndex:0];
        }
        double result = swe_house_pos(armc, geolat, eps, hsys, cusps, serr);
        if(result < 0){
            reject(@"0",[[NSString alloc] initWithUTF8String:serr ],nil);
        }
        else{
            resolve(@{
                      @"longitude": [[NSNumber alloc] initWithDouble:(cusps[0])] ,
                      @"latitude":[[NSNumber alloc] initWithDouble:(cusps[1])]
                      });
        }
        
    
    }
    @catch(NSException *exception) {
        reject(@"0",exception.reason,nil);
    }
}

/**
 * @param sid_mode  One of the above ayanamsha modes plus (optionally) one of the non-standard sidereal calculation modes of SE_SIDBIT_ECL_T0 or SE_SIDBIT_SSY_PLANE.
 * @param t0        Reference date (Julian day), if sid_mode is SE_SIDM_USER
 * @param ayan_t0    Initial ayanamsha at t0, if sid_mode is SE_SIDM_USER. This is (tropical position - sidereal position) at date t0.
 * @param promise
 */
RCT_EXPORT_METHOD(swe_set_sid_mode:(int) sid_mode
                  t0 : (double) t0
                  ayan_t0 : (double) ayan_t0
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
                  ) {
    @try{
        swe_set_sid_mode(sid_mode,t0,ayan_t0);
        
        resolve(nil);
        
        
    }
    @catch(NSException *exception) {
        reject(@"0",exception.reason,nil);
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
RCT_EXPORT_METHOD(swe_get_ayanamsa_ut:(int) tjd_ut
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
                  ) {
    @try{
        double ayanamsa = swe_get_ayanamsa_ut(tjd_ut);
        
        resolve([[NSNumber alloc] initWithDouble:ayanamsa]);
        
        
    }
    @catch(NSException *exception) {
        reject(@"0",exception.reason,nil);
    }
}

/**
 * This calculates the ayanamsha for a given date. You should call swe_set_sid_mode(...) before, where you will set the mode of ayanamsha, as many different ayanamshas are used in the world today.
 *
 * @param tjd_et The date as Julian Day in ET (Ephemeris Time or Dynamic Time)
 
 * @param promise
 */

RCT_EXPORT_METHOD(swe_get_ayanamsa:(int) tjd_et
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
                  ) {
    @try{
        double ayanamsa = swe_get_ayanamsa(tjd_et);
        
        resolve([[NSNumber alloc] initWithDouble:ayanamsa]);
        
        
    }
    @catch(NSException *exception) {
        reject(@"0",exception.reason,nil);
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
RCT_EXPORT_METHOD(swe_fixstar:(char*) star
                  tjd : (double) tjd
                  iflag : (int) iflag
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
                  ) {
    @try{
        double xx[6];
        char serr[AS_MAXCH];
        int32 result = swe_fixstar(star,tjd,iflag,xx,serr);
        if(result < 0){
            reject(@"0",[[NSString alloc] initWithUTF8String:serr ],nil);
        }
        else{
            resolve(@{
                      @"longitude": [[NSNumber alloc] initWithDouble:(xx[0])] ,
                      @"latitude":[[NSNumber alloc] initWithDouble:(xx[1])],
                      @"distance":[[NSNumber alloc] initWithDouble:(xx[2])]
                      });
        }
        
        
    }
    @catch(NSException *exception) {
        reject(@"0",exception.reason,nil);
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
RCT_EXPORT_METHOD(swe_fixstar_ut:(char*) star
                  tjd_ut : (double) tjd_ut
                  iflag : (int) iflag
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
                  ) {
    @try{
        double xx[6];
        char serr[AS_MAXCH];
        int32 result = swe_fixstar_ut(star,tjd_ut,iflag,xx,serr);
        if(result < 0){
            reject(@"0",[[NSString alloc] initWithUTF8String:serr ],nil);
        }
        else{
            resolve(@{
                      @"longitude": [[NSNumber alloc] initWithDouble:(xx[0])] ,
                      @"latitude":[[NSNumber alloc] initWithDouble:(xx[1])],
                      @"distance":[[NSNumber alloc] initWithDouble:(xx[2])]
                      });
        }
        
        
    }
    @catch(NSException *exception) {
        reject(@"0",exception.reason,nil);
    }
}


#pragma mark - RCT swe heliacal




RCT_EXPORT_METHOD(swe_heliacal_ut:(double) tjd_ut
                  dgeo : (NSArray*) dgeoArray
                  datm : (NSArray*) datmArray
                  dobs : (NSArray*) dobsArray
                  object_name : (NSString *) object_name
                  event_type : (int) event_type
                  helflag : (int) helflag
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
                  ) {
    @try{
        double dret[50],dgeo[3],datm[4],dobs[6];
        char serr[AS_MAXCH];
        char name[AS_MAXCH];
        
        for (int i=0; i<[dgeoArray count]; i++) {
            id obj = [dgeoArray objectAtIndex:i];
            if ([obj isKindOfClass:[NSNumber class]]){
                dgeo[i] = [obj doubleValue];
            }
        }
        for (int i=0; i<[datmArray count]; i++) {
            id obj = [datmArray objectAtIndex:i];
            if ([obj isKindOfClass:[NSNumber class]]){
                datm[i] = [obj doubleValue];
            }
        }
        for (int i=0; i<[dobsArray count]; i++) {
            id obj = [dobsArray objectAtIndex:i];
            if ([obj isKindOfClass:[NSNumber class]]){
                dobs[i] = [obj doubleValue];
            }
        }
        
        strcpy(name,[object_name UTF8String]);
        int32 result = swe_heliacal_ut(tjd_ut,dgeo,datm,dobs,name,event_type,helflag,dret,serr);
        if(result < 0){
            reject(@"0",[[NSString alloc] initWithUTF8String:serr ],nil);
        }
        else{
            resolve(@{
                      @"startVisible": [[NSNumber alloc] initWithDouble:(dret[0])] ,
                      @"bestVisible":[[NSNumber alloc] initWithDouble:(dret[1])],
                      @"endVisible":[[NSNumber alloc] initWithDouble:(dret[2])]
                      });
        }
        
        
    }
    @catch(NSException *exception) {
        reject(@"0",exception.reason,nil);
    }
}



RCT_EXPORT_METHOD(swe_heliacal_pheno_ut:(double) tjd_ut
                  dgeo : (NSArray*) dgeoArray
                  datm : (NSArray*) datmArray
                  dobs : (NSArray*) dobsArray
                  object_name : (NSString *) object_name
                  event_type : (int) event_type
                  helflag : (int) helflag
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
                  ) {
    @try{
        double darr[50],dgeo[3],datm[4],dobs[6];
        char serr[AS_MAXCH];
        char name[AS_MAXCH];
        for (int i=0; i<[dgeoArray count]; i++) {
            id obj = [dgeoArray objectAtIndex:i];
            if ([obj isKindOfClass:[NSNumber class]]){
                dgeo[i] = [obj doubleValue];
            }
        }
        for (int i=0; i<[datmArray count]; i++) {
            id obj = [datmArray objectAtIndex:i];
            if ([obj isKindOfClass:[NSNumber class]]){
                datm[i] = [obj doubleValue];
            }
        }
        for (int i=0; i<[dobsArray count]; i++) {
            id obj = [dobsArray objectAtIndex:i];
            if ([obj isKindOfClass:[NSNumber class]]){
                dobs[i] = [obj doubleValue];
            }
        }
        strcpy(name,[object_name UTF8String]);
        int32 result = swe_heliacal_pheno_ut(tjd_ut,dgeo,datm,dobs,name,event_type,helflag,darr,serr);
        if(result < 0){
            reject(@"0",[[NSString alloc] initWithUTF8String:serr ],nil);
        }
        else{
            
            resolve(@{
                      @"tcAltitude": [[NSNumber alloc] initWithDouble:(darr[0])] ,
                      @"tcApparentAltitude":[[NSNumber alloc] initWithDouble:(darr[1])],
                      @"gcAltitude":[[NSNumber alloc] initWithDouble:(darr[2])],
                      @"azimuth":[[NSNumber alloc] initWithDouble:(darr[3])],
                      @"tcSunAltitude":[[NSNumber alloc] initWithDouble:(darr[4])],
                      @"sunAzimuth":[[NSNumber alloc] initWithDouble:(darr[5])],
                      @"tcActualVisibleArc":[[NSNumber alloc] initWithDouble:(darr[6])],
                      @"gcActualVisibleArc":[[NSNumber alloc] initWithDouble:(darr[7])],
                      @"objectToSunAzimuth":[[NSNumber alloc] initWithDouble:(darr[8])],
                      @"objectToSunLongitude":[[NSNumber alloc] initWithDouble:(darr[9])],
                      @"extinction":[[NSNumber alloc] initWithDouble:(darr[10])],
                      @"tcMinVisibleArc":[[NSNumber alloc] initWithDouble:(darr[11])],
                      @"firstVisible":[[NSNumber alloc] initWithDouble:(darr[12])],
                      @"bestVisible":[[NSNumber alloc] initWithDouble:(darr[13])],
                      @"endVisible":[[NSNumber alloc] initWithDouble:(darr[14])],
                      @"yallopBestVisible":[[NSNumber alloc] initWithDouble:(darr[15])],
                      @"moonCresentWidth":[[NSNumber alloc] initWithDouble:(darr[16])],
                      @"yallopValue":[[NSNumber alloc] initWithDouble:(darr[17])],
                      @"yallopCriterion":[[NSNumber alloc] initWithDouble:(darr[18])],
                      @"parallax":[[NSNumber alloc] initWithDouble:(darr[19])],
                      @"magnitude":[[NSNumber alloc] initWithDouble:(darr[20])],
                      @"rise":[[NSNumber alloc] initWithDouble:(darr[21])],
                      @"riseSet":[[NSNumber alloc] initWithDouble:(darr[22])],
                      @"riseObjectToSun":[[NSNumber alloc] initWithDouble:(darr[23])],
                      @"visibleDuration":[[NSNumber alloc] initWithDouble:(darr[24])],
                      @"moonCresetLength":[[NSNumber alloc] initWithDouble:(darr[25])],
                      @"elong":[[NSNumber alloc] initWithDouble:(darr[26])],
                      @"illumination":[[NSNumber alloc] initWithDouble:(darr[27])],
                      @"kOZ":[[NSNumber alloc] initWithDouble:(darr[28])],
                      @"ka":[[NSNumber alloc] initWithDouble:(darr[29])],
                      @"ksumm":[[NSNumber alloc] initWithDouble:(darr[30])],
                      });
        }
        
        
    }
    @catch(NSException *exception) {
        reject(@"0",exception.reason,nil);
    }
}


RCT_EXPORT_METHOD(swe_vis_limit_mag:(double) tjd_ut
                  dgeo : (NSArray*) dgeoArray
                  datm : (NSArray*) datmArray
                  dobs : (NSArray*) dobsArray
                  object_name : (NSString *) object_name
                  helflag : (int) helflag
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
                  ) {
    @try{
        double dret[50],dgeo[3],datm[4],dobs[6];
        char serr[AS_MAXCH];
        char name[AS_MAXCH];
        for (int i=0; i<[dgeoArray count]; i++) {
            id obj = [dgeoArray objectAtIndex:i];
            if ([obj isKindOfClass:[NSNumber class]]){
                dgeo[i] = [obj doubleValue];
            }
        }
        for (int i=0; i<[datmArray count]; i++) {
            id obj = [datmArray objectAtIndex:i];
            if ([obj isKindOfClass:[NSNumber class]]){
                datm[i] = [obj doubleValue];
            }
        }
        for (int i=0; i<[dobsArray count]; i++) {
            id obj = [dobsArray objectAtIndex:i];
            if ([obj isKindOfClass:[NSNumber class]]){
                dobs[i] = [obj doubleValue];
            }
        }
        strcpy(name,[object_name UTF8String]);
        int32 result = swe_vis_limit_mag(tjd_ut,dgeo,datm,dobs,name,helflag,dret,serr);
        if(result < 0){
            reject(@"0",[[NSString alloc] initWithUTF8String:serr ],nil);
        }
        else{
            
            resolve(@{
                      @"vissualMagnitudeLimit": [[NSNumber alloc] initWithDouble:(dret[0])] ,
                      @"AltO":[[NSNumber alloc] initWithDouble:(dret[1])],
                      @"AziO":[[NSNumber alloc] initWithDouble:(dret[2])],
                      @"AltS":[[NSNumber alloc] initWithDouble:(dret[3])],
                      @"AziS":[[NSNumber alloc] initWithDouble:(dret[4])],
                      @"AltM":[[NSNumber alloc] initWithDouble:(dret[5])],
                      @"AziM":[[NSNumber alloc] initWithDouble:(dret[6])]
                      });
        }
        
        
    }
    @catch(NSException *exception) {
        reject(@"0",exception.reason,nil);
    }
}


@end
  
