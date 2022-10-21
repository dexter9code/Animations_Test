import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import Page from "./Page";

const PAGE_DATA = [
  { id: 23, title: `Freedom` },
  { id: 28, title: `Is` },
  { id: 25, title: `Myth` },
  { id: 29, title: `My-Guy` },
];

const MainScreen = function () {
  const scrollX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((e) => {
    scrollX.value = e.contentOffset.x;
  });

  return (
    <Animated.ScrollView
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      horizontal
      pagingEnabled
      style={styles.container}
    >
      {PAGE_DATA.map((page, i) => (
        <Page key={page.id} title={page.title} index={i} scrollx={scrollX} />
      ))}
    </Animated.ScrollView>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
});
