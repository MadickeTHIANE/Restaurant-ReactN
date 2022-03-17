import { StyleSheet, View, Text, Pressable } from "react-native";

export default function Card({ name, address, score, menu, openModal }) {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => openModal(menu)}>
        <Text>{name}</Text>
      </Pressable>
      <Text>{address}</Text>
      <Text>{score}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 5,
  },
});
