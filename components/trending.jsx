import * as React from "react";
import { View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { GestureDetector, Gesture ,GestureHandlerRootView,} from 'react-native-gesture-handler';
import Carousel from "react-native-reanimated-carousel";
import { Platform } from "react-native";
import { Easing } from 'react-native';
import { Dimensions } from "react-native";
 const isWeb = Platform.OS === "web";
const window = isWeb
  ? {
    ...Dimensions.get("window"),
    width: 700,
  }
  : Dimensions.get("window");


const PAGE_WIDTH = window.width;




const TrendingItem = ({ pressAnim, source,blur }) => {   
    const animStyle = useAnimatedStyle(() => {
      const scale = interpolate(pressAnim.value, [0, 1], [1, 0.9]);
      const borderRadius = interpolate(pressAnim.value, [0, 1], [0, 30]);
  
      return {
        transform: [{ scale }],
        borderRadius,
      };
    }, []);
  
    return (
      <Animated.View style={[{ flex: 1, overflow: "hidden" }, animStyle]}>
        <Animated.Image
          source={{
            uri: source
          }}
          resizeMode="cover"
          placeholder={blur}
         className="w-full h-full rounded-md"
        />
      </Animated.View>
    );
  };


function Trending({trends}) {
  const [isAutoPlay, setIsAutoPlay] = React.useState(true);
  const pressAnim = useSharedValue(0);
  const animationStyle = React.useCallback(
    (value) => {
      "worklet";

      const zIndex = interpolate(value, [-1, 0, 1], [-1000, 0, 1000]);
      const translateX = interpolate(
        value,
        [-1, 0, 1],
        [-PAGE_WIDTH, 0, PAGE_WIDTH],
      );

      return {
        transform: [{ translateX }],
        zIndex,
      };
    },
    [],
  );

  return (
    <View  style={{ flex: 1 }}>
      <Carousel
        loop={true}
        autoPlay={isAutoPlay}
        style={{  height: 450 }}
        className ="w-full"
        width={PAGE_WIDTH}
        data={trends}
        onScrollStart={() => {
          pressAnim.value = withTiming(1);
        }}
        onScrollEnd={() => {
          pressAnim.value = withTiming(0);
        }}
        renderItem={({ index, item }) => {
          return (
            <TrendingItem
              source={item.urls.regular}
              blur ={item.blur_hash }
              key={index}
              pressAnim={pressAnim}
            />
          );
        }}
        customAnimation={animationStyle}
        scrollAnimationDuration={1600}
      />
    </View>
  );
}



export default Trending;