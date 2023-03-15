import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Item, ItemProps } from '../app/models/Keihi';
import { Pressable, Text, TextInput, View } from './Themed';

export default function AddKehi() {
  const [newKeihi, setNewKeihi] = useState<Item>({
    id: "",
    title: "",
    cost: "",
    paid: false,
  });

  const handleAddKeihi = () => {
    setNewKeihi((prev) => ({ ...prev, id: "" }))
  };

  return (
    <View style={{ width: '80%' }}>
      <TextInput
        style={styles.costBox}
        placeholder="Rent"
        placeholderTextColor="gray"
        label='Item title'
        onChangeText={(text) => setNewKeihi((prev) => ({ ...prev, title: text}))}
      />

      <TextInput
        style={styles.costBox}
        placeholder="50,000"
        placeholderTextColor="gray"
        keyboardType="numeric"
        label='Item cost'
        onChangeText={(text) => setNewKeihi((prev) => ({ ...prev, cost: text}))}
      />

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
    alignItems: 'center',
    marginHorizontal: 50,
    marginBottom: 10
  },
  getStartedText: {
    fontSize: 24,
    lineHeight: 24,
    textAlign: 'center',
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
