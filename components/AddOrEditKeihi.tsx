import { useSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { createBudget } from "../api/keihi";
import { initialKeihiState } from "../constants/Colors";
import { useAuthValue } from "../context/AuthContext";
import {
  Pressable,
  Switch,
  Text,
  TextInput,
  View,
} from "./Themed";
import { useEkchanSelector } from "../redux/hooks";

export default function AddOrEditKeihi() {
  const { currentUser } = useAuthValue();
  const { budgets } = useEkchanSelector((state) => state.budgets)
  const searchParams = useSearchParams();
  const [newKeihi, setNewKeihi] = useState<Item>(() => {
    if (!searchParams.id) return initialKeihiState;
    const budget = { ...budgets.filter(({ id }) => id.toString() === searchParams.id)[0] };
    return {
      id: budget.id,
      title: budget.title,
      description: budget.description,
      cost: budget.cost.toString(),
      paid: budget.paid
    }
  });

  const handleAddOrEdit = async () => {
    if (!currentUser.id) return;
    if (!newKeihi.title || !newKeihi.description || !newKeihi.cost) return; // Todo: set a message;
    // send newKeihi
    try {
      const item = await createBudget({ uid: currentUser.id, item: newKeihi });
      if (item.status !== 200) throw new Error("Failed to create budget");
    } catch (e) {
      console.error(e);
    } finally {
      setNewKeihi(initialKeihiState);
    }
  };

  return (
    <View style={{ width: "80%" }}>
      <TextInput
        style={styles.costBox}
        placeholder="Rent"
        placeholderTextColor="gray"
        label="Title"
        onChangeText={(text) => setNewKeihi((prev) => ({ ...prev, title: text}))}
        value={newKeihi.title}
      />

      <TextInput
        style={styles.costBox}
        placeholder="Paid for dinner"
        placeholderTextColor="gray"
        label="Description"
        onChangeText={(text) => setNewKeihi((prev) => ({ ...prev, description: text}))}
        value={newKeihi.description}
      />

      <TextInput
        style={styles.costBox}
        placeholder="50,000"
        placeholderTextColor="gray"
        label="Cost"
        onChangeText={(text) => setNewKeihi((prev) => ({ ...prev, cost: text}))}
        value={newKeihi.cost}
      />

      {/* Paid switch button */}
      <View style={{ margin: 12, gap: 12 }}>
        <Text style={{ fontSize: 20 }}>Paid</Text>
        <Switch
          trackColor={{false: "#767577", true: "#81b0ff"}}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => setNewKeihi((prev) => ({ ...prev, paid: !prev.paid }))}
          value={newKeihi.paid}
        />
      </View>

      <Pressable style={styles.button} onPress={handleAddOrEdit}>
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
    color: "white",
    fontWeight: "bold",
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
