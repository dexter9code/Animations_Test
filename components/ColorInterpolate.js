import { useState } from "react";
import { Dimensions, StyleSheet, Switch, View } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";

const colors = {
  dark: {
    background: "#1e1e1e",
    circle: "#252525",
    text: "#f8f8f8",
  },
  light: {
    background: "#f7f7f7",
    circle: "#fff",
    text: "#1e1e1e",
  },
};

const SWITCH_TRUCK_COLOR = {
  true: "rgba(256,0,256,0.2)",
  false: "rgba(0,0,0,0.1)",
};

const SIZE = Dimensions.get("window").width * 0.7;

const ColorInterpolate = function () {
  const [theme, setTheme] = useState("light");

  const progress = useDerivedValue(() => {
    return theme === "dark" ? withTiming(1) : withTiming(0);
  }, [theme]);

  const reStyles = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [colors.light.background, colors.dark.background]
    );

    return {
      backgroundColor,
    };
  });

  const reCircleStyles = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [colors.light.circle, colors.dark.circle]
    );

    return {
      backgroundColor,
    };
  });

  const reTextStyles = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      [colors.light.text, colors.dark.text]
    );

    return {
      color,
    };
  });

  return (
    <Animated.View style={[styles.container, reStyles]}>
      <Animated.View style={[styles.circle, reCircleStyles]}>
        <Animated.Text style={[styles.text, reTextStyles]}>
          {theme === "dark" ? `DARK` : `LIGHT`}
        </Animated.Text>
        <Switch
          value={theme === "dark"}
          onValueChange={(toggle) => setTheme(toggle ? "dark" : "light")}
          trackColor={SWITCH_TRUCK_COLOR}
          thumbColor={`violet`}
        />
      </Animated.View>
    </Animated.View>
  );
};

export default ColorInterpolate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    width: SIZE,
    height: SIZE,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZE / 2,
    elevation: 6,
  },
  text: {
    fontSize: 35,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
});
