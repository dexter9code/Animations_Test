import { View, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import { useCallback } from "react";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");
const THRESHOLD = width / 3;

function PerpectiveAnimation() {
  const scrollX = useSharedValue(0);

  const touchHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.width = scrollX.value;
    },
    onActive: (e, ctx) => {
      scrollX.value = ctx.width + e.translationX;
    },
    onEnd: () => {
      if (scrollX.value <= THRESHOLD) {
        scrollX.value = withSpring(0);
      } else {
        scrollX.value = withTiming(width / 2);
      }
    },
  });

  const onPressHandler = useCallback(() => {
    if (scrollX.value > 0) {
      scrollX.value = withTiming(0);
    } else {
      scrollX.value = withTiming(width / 2);
    }
  });

  const rStyles = useAnimatedStyle(() => {
    const rotate = interpolate(
      scrollX.value,
      [0, width / 2],
      ["0", "5"],
      Extrapolate.CLAMP
    );
    const borderRadius = interpolate(
      scrollX.value,
      [0, width / 2],
      [0, 30],
      Extrapolate.CLAMP
    );

    return {
      transform: [
        { translateX: scrollX.value },
        { perspective: 400 },
        { rotateY: `-${rotate}deg` },
      ],
      borderRadius,
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <PanGestureHandler onGestureEvent={touchHandler}>
        <Animated.View style={[styles.innerContainer, rStyles]}>
          <Ionicons
            name="menu"
            size={40}
            color="#171717"
            onPress={onPressHandler}
          />
        </Animated.View>
      </PanGestureHandler>
    </SafeAreaView>
  );
}

export default PerpectiveAnimation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171717",
  },
  innerContainer: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
});
