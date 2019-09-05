require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name             = 'RNSwisseph'
  s.version          = package['version']
  s.summary          = package['description']
  s.license          = package['license']
  s.homepage         = package['homepage']
  s.authors          = 'linch'
  s.platforms        = { :ios => "9.0", :tvos => "9.2" }
  s.source           = { :git => 'https://github.com/linchenhuicn/react-native-swisseph.git', :tag => "v#{s.version}" }
  s.source_files     = 'ios/**/*.{h,m,c}'
  s.resources        = "android/src/main/assets/*.*"
  s.dependency         'React'
end
