import { Dimensions, Image } from "react-native";
import { PinchGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const imgUri = `https://images.unsplash.com/photo-1666257413362-371a9d4c487e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60`;

const { width, height } = Dimensions.get("window");

const PinchGesture = function () {
  const scale = useSharedValue(1);
  const scaleX = useSharedValue(0);
  const scaleY = useSharedValue(0);

  const onPinchHandler = useAnimatedGestureHandler({
    onActive: (e) => {
      scale.value = e.scale;
      scaleX.value = e.focalX;
      scaleY.value = e.focalY;
    },
    onEnd: () => {
      scale.value = withTiming(1);
    },
  });

  const imageStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: scaleX.value },
        { translateY: scaleY.value },
        { translateX: -width / 2 },
        { translateY: -height / 2 },
        {
          scale: scale.value,
        },
        { translateX: -scaleX.value },
        { translateY: -scaleY.value },
        { translateX: width / 2 },
        { translateY: height / 2 },
      ],
    };
  });

  return (
    <PinchGestureHandler onGestureEvent={onPinchHandler}>
      <Animated.Image
        source={{ uri: imgUri }}
        style={[{ width, height }, imageStyles]}
      />
    </PinchGestureHandler>
  );
};

export default PinchGesture;
