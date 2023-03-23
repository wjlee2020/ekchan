import React, { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  ListRenderItem,
} from 'react-native';
import { Item, ItemProps } from '../app/types/Keihi';

const DATA: Item[] = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Rent',
    cost: "67,000",
    paid: true,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Car lease',
    cost: "130,000",
    paid: false,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Groceries',
    cost: "6,000",
    paid: true,
  },
];

const KeihiItem = ({ item, onPress, backgroundColor, textColor }: ItemProps) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, { backgroundColor }]}>
    <>
      <Text style={[styles.title, { color: textColor }]}>
        {item.title}
      </Text>

      <Text style={[styles.title, { color: textColor }]}>
        {item.cost}
      </Text>
    </>

    <Text style={{ color: textColor, marginLeft: 'auto' }}>
      {item.paid ? "Paid" : "Unpaid"}
    </Text>
  </TouchableOpacity>
);

export const KeihiList = () => {
  const [selectedId, setSelectedId] = useState<string | undefined>("");

  const renderItem: ListRenderItem<Item> = ({ item }) => {
    const backgroundColor = item.id === selectedId ? '#343541' : '#272A36';
    const color = !item.paid ? '#fff' : '#828286';

    return (
      <KeihiItem
        item={item}
        onPress={() => setSelectedId(selectedId === item.id ? undefined : item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    width: 200
  },
  title: {
    fontSize: 20,
  },
});
