import { useState } from "react";
import { StyleSheet } from "react-native";
import { createBudget } from "../api/keihi";
import { Pressable, Text, TextInput, View } from "./Themed";
import { useAuthValue } from "../context/AuthContext";

export default function AddKehi() {
  const { currentUser } = useAuthValue();
  const [newKeihi, setNewKeihi] = useState<Item>({
    id: "",
    title: "",
    description: "",
    cost: "",
    paid: false,
  });

  // Todo: send newKeihi

  const handleAddKeihi = async () => {
    if (!currentUser.id) return;
    if (!newKeihi.title || !newKeihi.description || !newKeihi.cost) return; // Todo: set a message;
    // send newKeihi
    const item = await createBudget({ uid: currentUser.id, item: newKeihi });
    // Todo: set Item to keihi context/store
    console.log({ item });
  };

  return (
    <View style={{ width: "80%" }}>
      <TextInput
        style={styles.costBox}
        placeholder="Rent"
        placeholderTextColor="gray"
        label="Title"
        onChangeText={(text) => setNewKeihi((prev) => ({ ...prev, title: text}))}
      />

      <TextInput
        style={styles.costBox}
        placeholder="Paid for dinner"
        placeholderTextColor="gray"
        label="Description"
        onChangeText={(text) => setNewKeihi((prev) => ({ ...prev, description: text}))}
      />

      <TextInput
        style={styles.costBox}
        placeholder="50,000"
        placeholderTextColor="gray"
        keyboardType="numeric"
        label="Cost"
        onChangeText={(text) => setNewKeihi((prev) => ({ ...prev, cost: text}))}
      />

    {/* Paid switch button */}

    <Pressable style={styles.button} onPress={handleAddKeihi}>
      <Text style={styles.text}>
        Add
      </Text>
    </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50,
    marginBottom: 10
  },
  getStartedText: {
    fontSize: 24,
    lineHeight: 24,
    textAlign: "center",
  },
  costBox: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
  },
  button: {
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
    marginLeft: "auto",
    marginRight: "auto",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
