import { usePathname, useRouter } from "expo-router";
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
import { Text, View } from './Themed';
import { ItemProps } from '../types/Keihi';

const KeihiItem = ({ item, onPress, backgroundColor, textColor }: ItemProps) => {
  const createdAt = item.created_at?.slice(0, 10).replace(/-/g, '/') ?? "";

  return (
    <TouchableOpacity onPress={onPress} style={[styles.item, { backgroundColor }]}>
      <Text numberOfLines={1} style={[styles.title, { color: textColor }]}>
        {item.title}
      </Text>

      <Text numberOfLines={1} style={[styles.title, { color: textColor, marginTop: "auto" }]}>
        {item.description}
      </Text>

      <Text style={[styles.title, { color: textColor, marginTop: "auto" }]}>
        {item.cost}
      </Text>

      <View style={styles.textBox}>
        <Text>{createdAt}</Text>

        <Text style={{ color: item.paid ? "#fff" : "#FF5C5C", fontWeight: "bold", marginLeft: 'auto' }}>
          {item.paid ? "Paid" : "Unpaid"}
        </Text>
      </View>
    </TouchableOpacity>
  )
};

// Todo: make this fun
const EmptyList = () => {
  return (
    <Text style={{ fontSize: 28 }}>Any recent purchases?</Text>
  );
}

export const KeihiList = () => {
  const { budgets, pairedBudgets } = useEkchanSelector((state) => state.budgets);
  const { currentUser } = useAuthValue();
  const pathname = usePathname();
  const router = useRouter();

  useShowBudgets({ hasPartner: currentUser.partnerId ? true : false, user: currentUser, deps: pathname });

  const [selectedId, setSelectedId] = useState<string | undefined>("");

  const pairedBudgetList = pairedBudgets && [...pairedBudgets.budgets.currentUser, ...pairedBudgets.budgets.partner];
  console.log(pairedBudgetList);

  const renderItem: ListRenderItem<Item> = ({ item }) => {
    const backgroundColor = item.id === selectedId ? '#343541' : '#272A36';
    const color = !item.paid ? '#fff' : '#828286';

    const goToEdit = () => {
      router.push(`/edit-tsuika/${item.id}`);
    }

    return (
      <KeihiItem
        item={item}
        onPress={goToEdit}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={{ width: 350 }}
        contentContainerStyle={{ alignItems: "center" }}
        data={pairedBudgetList || budgets}
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
    width: 300,
    height: 140,
  },
  title: {
    fontSize: 20,
  },
  textBox: {
    backgroundColor: "transparent",
    marginTop: "auto",
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center"}
});
