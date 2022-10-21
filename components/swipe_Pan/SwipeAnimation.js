import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useState, useRef } from "react";
import { ScrollView } from "react-native-gesture-handler";
import ListItem from "./ListItem";

const TITLE = [
  { id: 1, title: `Workout in the morning` },
  { id: 2, title: `Read book ` },
  { id: 3, title: `Writing the code` },
  { id: 4, title: `Bug fix` },
  { id: 5, title: `Play games` },
];

const SwipeAnimation = function () {
  const [tasks, setTasks] = useState(TITLE);

  const onDismissHandler = (id) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };

  const scrollViewRef = useRef(null);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>tasks</Text>
      <ScrollView style={{ flex: 1 }} ref={scrollViewRef}>
        {tasks.map((item) => (
          <ListItem
            task={item}
            key={item.id}
            onDismiss={onDismissHandler}
            simultaneousHandlers={scrollViewRef}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SwipeAnimation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafbff",
  },
  text: {
    fontSize: 40,
    padding: 15,
    textAlign: "center",
    textTransform: "uppercase",
  },
});
