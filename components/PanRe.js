import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";

const SIZE = 70;
const CIRCLE = SIZE * 2;

const PanRe = function () {
  const scrollX = useSharedValue(0);
  const scrollY = useSharedValue(0);

  const panGestureHandler = useAnimatedGestureHandler({
    onStart: (e, context) => {
      context.width = scrollX.value;
      context.height = scrollY.value;
    },
    onActive: (e, ctx) => {
      scrollX.value = ctx.width + e.translationX;
      scrollY.value = ctx.height + e.translationY;
    },
    onEnd: (e) => {
      const distance = Math.sqrt(scrollX.value ** 2 + scrollY.value ** 2);
      if (distance < CIRCLE + SIZE / 2) {
        scrollX.value = withSpring(0);
        scrollY.value = withSpring(0);
      }
    },
  });

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: scrollX.value,
        },
        {
          translateY: scrollY.value,
        },
      ],
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.outerCircle}>
        <PanGestureHandler onGestureEvent={panGestureHandler}>
          <Animated.View style={[styles.boxContainer, reanimatedStyle]} />
        </PanGestureHandler>
      </View>
    </View>
  );
};

export default PanRe;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  boxContainer: {
    width: SIZE,
    height: SIZE,
    backgroundColor: "tomato",
    borderRadius: 25,
  },
  outerCircle: {
    width: CIRCLE * 2,
    height: CIRCLE * 2,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "tomato",
    borderRadius: CIRCLE,
  },
});
