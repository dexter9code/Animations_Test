import { useCallback } from "react";
import { View, StyleSheet, Dimensions, Pressable, Text } from "react-native";
import Animated, {
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { ReText } from "react-native-redash";
import Svg, { Circle } from "react-native-svg";

const BACKGROUND_COLOR = "#444bf4";
const BACKGROUND_STROKE_COLOR = "#303858";
const STROKE_COLOR = "#a6e1fa";

const { width, height } = Dimensions.get("window");
const CIRCLE_LENGTH = 1000;
const R = CIRCLE_LENGTH / (2 * Math.PI);

const SvgAnimation = function () {
  const progress = useSharedValue(0);

  const AnimatedCircle = Animated.createAnimatedComponent(Circle);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
  }));

  const progressText = useDerivedValue(() => {
    return `${Math.floor(progress.value * 100)}`;
  });

  const btnPressHandler = useCallback(() => {
    progress.value = withTiming(progress.value > 0 ? 0 : 1, { duration: 3000 });
  });

  return (
    <View style={styles.container}>
      <ReText style={styles.text} text={progressText} />
      <Svg style={{ position: "absolute" }}>
        <Circle
          cx={width / 2}
          cy={height / 2}
          r={R}
          stroke={BACKGROUND_STROKE_COLOR}
          strokeWidth={30}
        />
        <AnimatedCircle
          cx={width / 2}
          cy={height / 2}
          r={R}
          stroke={STROKE_COLOR}
          strokeWidth={15}
          strokeDasharray={CIRCLE_LENGTH}
          animatedProps={animatedProps}
          strokeLinecap={"round"}
        />
      </Svg>
      <Pressable style={styles.btnContainer} onPress={btnPressHandler}>
        <Text style={styles.btnText}>start</Text>
      </Pressable>
    </View>
  );
};

export default SvgAnimation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: BACKGROUND_COLOR,
  },
  text: {
    fontSize: 40,
    color: "white",
    width: 100,
    textAlign: "center",
  },
  btnContainer: {
    position: "absolute",
    bottom: 50,
    width: width * 0.6,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: BACKGROUND_STROKE_COLOR,
    height: 60,
    borderRadius: 25,
    padding: 5,
  },
  btnText: {
    fontSize: 25,
    color: "#f7f7f7",
    textTransform: "uppercase",
  },
});
