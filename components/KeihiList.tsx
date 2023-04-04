import { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ListRenderItem,
} from 'react-native';
import { useAuthValue } from '../context/AuthContext';
import useShowBudgets from '../hooks/useShowBudgets';
import { useEkchanSelector } from '../redux/hooks';
import { Text } from './Themed';
import { Item, ItemProps } from '../types/Keihi';

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

// Todo: make this fun
const EmptyList = () => {
  return (
    <Text style={{ fontSize: 28 }}>Any recent purchases?</Text>
  );
}

export const KeihiList = () => {
  const { budgets } = useEkchanSelector((state) => state.budget);
  const { currentUser } = useAuthValue();
  useShowBudgets({ hasPartner: currentUser.partnerId ? true : false, user: currentUser });
  console.log(budgets)

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
        data={budgets}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={selectedId}
        ListEmptyComponent={<EmptyList />}
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
