import { Dimensions, StyleSheet, Text, View } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");
const SIZE = width * 0.7;

const Page = function ({ title, index, scrollx }) {
  const inputRange = [(-index - 1) * width, index * width, (index + 1) * width];

  const squareStyles = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollx.value,
      inputRange,
      [0, 1, 0],
      Extrapolate.CLAMP
    );

    const borderRadius = interpolate(
      scrollx.value,
      inputRange,
      [0, SIZE / 2, 0],
      Extrapolate.CLAMP
    );

    return {
      borderRadius,
      transform: [{ scale }],
    };
  });
  const textStyles = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollx.value,
      inputRange,
      [height / 2, 0, -height / 2],
      Extrapolate.CLAMP
    );

    const opacity = interpolate(
      scrollx.value,
      inputRange,
      [-2, 1, -2],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ translateY }],
      opacity,
    };
  });

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: `rgba(255,99,7,0.${index + 5})` },
      ]}
    >
      <Animated.View style={[styles.square, squareStyles]} />
      <Animated.View style={[styles.textContainer, textStyles]}>
        <Text style={styles.text}>{title}</Text>
      </Animated.View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    width,
    height,
    alignItems: "center",
    justifyContent: "center",
  },
  square: {
    width: SIZE,
    height: SIZE,
    backgroundColor: "dodgerblue",
  },
  text: {
    fontSize: 50,
    color: "white",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  textContainer: {
    position: "absolute",
  },
});
