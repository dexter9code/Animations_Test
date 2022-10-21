import { useState, useCallback } from "react";
import { Pressable, View, StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Animated, { FadeIn, FadeOut, Layout } from "react-native-reanimated";

const DATA = new Array(5).fill(0).map((_, i) => ({ id: i }));
const LIST_ITEM_COLOR = "#1798DE";

const LayoutAnimations = function () {
  const [list, setList] = useState(DATA);

  const onAddHandler = useCallback(() => {
    setList((prevValue) => {
      const nextItemId = (prevValue[prevValue.length - 1]?.id ?? 0) + 1;
      return [...prevValue, { id: nextItemId }];
    });
  }, []);

  const onDeleteHandler = (id) => {
    setList((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.floatingButton} onPress={onAddHandler}>
        <Text style={{ color: "white", fontSize: 40, textAlign: "center" }}>
          +
        </Text>
      </Pressable>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 50 }}>
        {list.map((item, i) => {
          return (
            <Animated.View
              entering={FadeIn.delay(100 * i)}
              exiting={FadeOut}
              layout={Layout}
              key={item.id}
              style={styles.listItem}
              onTouchEnd={onDeleteHandler.bind(null, item.id)}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default LayoutAnimations;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listItem: {
    height: 100,
    backgroundColor: LIST_ITEM_COLOR,
    width: "90%",
    marginVertical: 10,
    borderRadius: 20,
    alignSelf: "center",
    // Shadow on Android
    elevation: 5,
    // Shadow on iOS
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
  },
  floatingButton: {
    width: 80,
    aspectRatio: 1,
    backgroundColor: "black",
    borderRadius: 40,
    position: "absolute",
    bottom: 50,
    right: "5%",
    zIndex: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
