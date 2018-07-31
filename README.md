
# Swiss Ephemeris binding for react-native

## Getting started

`$ npm install react-native-swisseph --save`

### Mostly automatic installation

`$ react-native link react-native-swisseph`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-swisseph` and add `RNSwisseph.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNSwisseph.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNSwissephPackage;` to the imports at the top of the file
  - Add `new RNSwissephPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-swisseph'
  	project(':react-native-swisseph').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-swisseph/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-swisseph')
  	```



### Configure
Open your project in xcode
Right click your project root and select "Add Files to ..."
Select "../node_modules/react-native-swisseph/SwissEphemeris/include" folder  and click "OK"


## Usage
#### Example:
```javascript

    import swisseph from 'react-native-swisseph';

    //Getting julian day
    async julday() {
        let task1 = async () => swisseph.swe_julday(2012, 1, 1, 0, swisseph.SE_GREG_CAL).then(
            (result) => {
                return result;
            }
        );
        let task2 = async () => swisseph.swe_julday(1987, 2, 4, 10, swisseph.SE_GREG_CAL).then(
            (result) => {
                return result;
            }
        );
        let task3 = async () => swisseph.swe_julday(2003, 6, 1, 23, swisseph.SE_GREG_CAL).then(
            (result) => {

                return result;
            }
        );

        let [result1, result2, result3] = await Promise.all([
            task1(), task2(), task3()
        ]);
        let message = [
            ...this.state.message,
            "julday():" +JSON.stringify({
                'julday1' : result1,
                'julday2' : result2,
                'julday3' : result3
            })

        ];


        this.setState({
            message: message
        });

    }


    // Sun position
    async swe_calc_ut() {
        let flag = swisseph.SEFLG_SPEED | swisseph.SEFLG_MOSEPH;

        swisseph.swe_julday(2012, 1, 1, 0, swisseph.SE_GREG_CAL).then(
            (jul_ut) => {
                swisseph.swe_calc_ut (jul_ut, swisseph.SE_SUN, flag).then(
                    (result) => {
                        this.setState({
                            message: [
                                ...this.state.message,
                                "swe_calc_ut():" + JSON.stringify(result)
                            ]
                        });
                    }
                )


            }
        );

    }


```


## Documentation
See [Programming interface](http://www.astro.com/swisseph/swephprg.htm)  to the Swiss Ephemeris for more details.


## References
1.[Swiss Ephemeris](http://www.astro.com/swisseph/)
2.[swisseph-java](http://th-mack.de/download/index.html)
3.[Swiss Ephemeris binding for node.js](https://github.com/mivion/swisseph)


## License
The license for this project is the same as original Swiss Ephemeris.
