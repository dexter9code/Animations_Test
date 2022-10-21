import { View, StyleSheet, Text, Dimensions } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { FontAwesome5 } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");
const LIST_ITEM_HEIGHT = 70;

const SCROLL_X_THRESHOLD = width * 0.3;

const ListItem = function ({ task, onDismiss, simultaneousHandlers }) {
  const scrollX = useSharedValue(0);
  const itemHeight = useSharedValue(LIST_ITEM_HEIGHT);
  const marginV = useSharedValue(10);
  const itemOpacity = useSharedValue(1);

  const panHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.width = scrollX.value;
    },
    onActive: (event, ctx) => {
      scrollX.value = ctx.width + event.translationX;
    },

    onEnd: (e) => {
      const shouldBeDeleted = scrollX.value < -SCROLL_X_THRESHOLD;
      if (shouldBeDeleted) {
        scrollX.value = withTiming(-width);
        itemHeight.value = withTiming(0);
        marginV.value = withTiming(0);
        itemOpacity.value = withTiming(0, undefined, (finished) => {
          if (finished && onDismiss) {
            runOnJS(onDismiss)(task.id);
          }
        });
      } else {
        scrollX.value = withSpring(0);
      }
    },
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: scrollX.value }],
    };
  });

  const iconStyle = useAnimatedStyle(() => {
    const opacity = scrollX.value < -SCROLL_X_THRESHOLD ? 1 : 0;
    return {
      opacity,
    };
  });

  const hieghtStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      marginVertical: marginV.value,
      opacity: itemOpacity.value,
    };
  });

  return (
    <Animated.View style={[styles.taskContainer, hieghtStyle]}>
      <Animated.View style={[styles.iconContainer, iconStyle]}>
        <FontAwesome5
          name={"trash-alt"}
          size={LIST_ITEM_HEIGHT * 0.4}
          color={"red"}
        />
      </Animated.View>
      <PanGestureHandler
        onGestureEvent={panHandler}
        simultaneousHandlers={simultaneousHandlers}
      >
        <Animated.View style={[styles.taskInnerContainer, rStyle]}>
          <Text style={styles.text}>{task.title}</Text>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  taskContainer: {
    width: "100%",
    alignItems: "center",
  },
  taskInnerContainer: {
    width: "90%",
    height: LIST_ITEM_HEIGHT,
    backgroundColor: "white",
    justifyContent: "center",
    paddingLeft: 23,
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 10,
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
  },
  iconContainer: {
    height: LIST_ITEM_HEIGHT,
    width: LIST_ITEM_HEIGHT,
    position: "absolute",
    right: "5.2%",
    justifyContent: "center",
    alignItems: "center",
  },
});
