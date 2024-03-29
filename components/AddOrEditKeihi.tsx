import { useRouter, useSearchParams } from "expo-router";
import { useState } from "react";
import { Platform, StyleSheet } from "react-native";
import { createBudget, deleteBudget, editBudget } from "../api/keihi";
import { initialKeihiState } from "../constants";
import { useAuthValue } from "../context/AuthContext";
import Notice from "./Notice";
import { useEkchanSelector } from "../redux/hooks";
import {
  Pressable,
  Switch,
  Text,
  TextInput,
  View,
} from "./Themed";

export default function AddOrEditKeihi() {
  const { currentUser } = useAuthValue();
  const { budgets } = useEkchanSelector((state) => state.budgets);
  const router = useRouter();
  const searchParams = useSearchParams();

  const [newKeihi, setNewKeihi] = useState<Item>(() => {
    if (!searchParams.id) return initialKeihiState;
    const budget: Item = { ...budgets.filter(({ id }) => id.toString() === searchParams.id)[0] };
    return { ...budget, cost: budget.cost.toString() }
  });
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const mainBtnText = !searchParams.id ? "Add" : "Edit";
  const snackbarText = !searchParams.id ? "Budget Added!" : "Budget Edited!";

  const handleAddOrEdit = async () => {
    if (!currentUser.id) return;
    if (!newKeihi.title || !newKeihi.description || !newKeihi.cost) return; // Todo: set a message;

    let fetchResult;
    try {
      if (!searchParams.id) {
        fetchResult = await createBudget({ uid: currentUser.id, item: newKeihi });
      } else {
        fetchResult = await editBudget({ uid: currentUser.id, item: newKeihi });
      }

      if (fetchResult.status === 400) throw new Error("Failed to create budget");
      setIsSnackbarOpen(true);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async () => {
    try {
      const item = await deleteBudget({ uid: currentUser.id, bid: searchParams.id });
      if (item.status !== 201) throw new Error("Failed to delete budget");
      setIsSnackbarOpen(true);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View style={{ width: "80%" }}>
      <TextInput
        editable={!isSnackbarOpen}
        style={styles.costBox}
        placeholder="Rent"
        placeholderTextColor="gray"
        label="Title"
        onChangeText={(text) => setNewKeihi((prev) => ({ ...prev, title: text}))}
        value={newKeihi.title}
      />

      <TextInput
        editable={!isSnackbarOpen}
        style={styles.costBox}
        placeholder="Paid for dinner"
        placeholderTextColor="gray"
        label="Description"
        onChangeText={(text) => setNewKeihi((prev) => ({ ...prev, description: text}))}
        value={newKeihi.description}
      />

      <TextInput
        editable={!isSnackbarOpen}
        style={[styles.costBox, { textAlign: "right" }]}
        placeholder="50,000"
        placeholderTextColor="gray"
        label="Cost"
        onChangeText={(text) => setNewKeihi((prev) => ({ ...prev, cost: text}))}
        value={newKeihi.cost}
      />

      {/* Paid switch button */}
      <View style={{ margin: 12, gap: 12, display: "flex", flexDirection: "row", justifyContent: "flex-start" }}>
        <Text style={{ fontSize: 20, alignSelf: "center" }}>Paid</Text>

        <Switch
          disabled={isSnackbarOpen}
          trackColor={{false: "#767577", true: "#81b0ff"}}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => setNewKeihi((prev) => ({ ...prev, paid: !prev.paid }))}
          value={newKeihi.paid}
        />
      </View>

      <Pressable
        disabled={isSnackbarOpen}
        style={styles.button}
        onPress={handleAddOrEdit}
      >
        <Text style={styles.text}>
          { mainBtnText }
        </Text>
      </Pressable>

      {
        !searchParams.id ? null : (
          <Pressable style={{ ...styles.button, marginTop: 10, backgroundColor: "#fff" }} onPress={handleDelete}>
            <Text style={{ ...styles.text, color: "red" }}>
              Delete
            </Text>
          </Pressable>
        )
      }

      {
        Platform.OS !== "ios" && (
          <Pressable
            disabled={isSnackbarOpen}
            style={[styles.button, { backgroundColor: "#fff", marginTop: 10 }]}
            onPress={() => router.back()}
          >
            <Text style={[styles.text, { color: "#000" }]}>
              Back
            </Text>
          </Pressable>
        )
      }

      <Notice
        snackbarText={snackbarText}
        isOpen={isSnackbarOpen}
        onDismiss={setIsSnackbarOpen}
        navigate={router.push}
        navigateLocation="/keihi"
      />
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
