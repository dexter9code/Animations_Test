import { Pressable, View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSpring,
} from "react-native-reanimated";

const SIZE = 70;

const StartedRE = function () {
  const boxOpacity = useSharedValue(1);
  const boxScale = useSharedValue(1);

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: boxOpacity.value,
      transform: [
        {
          scale: boxScale.value,
        },
        {
          rotate: `${boxScale.value * 2 * Math.PI}rad`,
        },
      ],
    };
  }, []);

  function onPressHandler() {
    boxOpacity.value = withRepeat(withTiming(0.5, { duration: 500 }), 2, true);
    boxScale.value = withRepeat(withSpring(2), 2, true);
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={onPressHandler}>
        <Animated.View style={[styles.boxContainer, reanimatedStyle]} />
      </Pressable>
    </View>
  );
};

export default StartedRE;

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
  },
});
