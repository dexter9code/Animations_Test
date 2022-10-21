import { useCallback, useRef } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  View,
} from "react-native";
import { TapGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
  Easing,
  withDelay,
} from "react-native-reanimated";

const TapAnimation = function () {
  const doubleTapRef = useRef();
  const scale = useSharedValue(0);

  const onDoubleTapHanlder = useCallback(() => {
    scale.value = withSpring(1, undefined, (isFinised) => {
      if (isFinised) {
        scale.value = withDelay(500, withSpring(0));
      }
    });
  }, [scale]);

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: Math.max(scale.value, 0) }],
    };
  });

  return (
    <View style={styles.container}>
      <TapGestureHandler
        waitFor={doubleTapRef}
        onActivated={() => {
          console.log(`Single Tap`);
        }}
      >
        <TapGestureHandler
          onActivated={onDoubleTapHanlder}
          ref={doubleTapRef}
          numberOfTaps={2}
          maxDelayMs={250}
        >
          <Animated.View>
            <ImageBackground
              source={require("../assets/macos3.jpg")}
              style={[styles.image]}
            >
              <Animated.Image
                source={require("../assets/heart.png")}
                style={[
                  styles.image,
                  {
                    shadowOffset: { width: 0, height: 15 },
                    shadowOpacity: 0.35,
                    shadowRadius: 35,
                  },
                  rStyle,
                ]}
                resizeMode={"center"}
              />
            </ImageBackground>
          </Animated.View>
        </TapGestureHandler>
      </TapGestureHandler>
    </View>
  );
};

export default TapAnimation;

const { width: SIZE } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: SIZE,
    height: SIZE,
  },
});
