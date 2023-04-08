import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import { MD3Colors, IconButton } from 'react-native-paper';
import AddOrEditKeihi from '../components/AddOrEditKeihi';

import { Text, View } from '../components/Themed';

export default function AddEditKeihiScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <IconButton
        icon="close"
        iconColor={MD3Colors.secondary100}
        size={30}
        onPress={() => router.replace("/keihi")}
        style={{ position: "absolute", left: 10, top: 10 }}
      />

      <Text style={styles.title}>経費編集</Text>

      <View style={styles.separator} darkColor="#1C1C1C" />

      <AddOrEditKeihi />

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
    gap: 10
  },
  getStartedText: {
    fontSize: 24,
    lineHeight: 24,
    textAlign: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    backgroundColor: "#1C1C1C",
    width: '80%',
  },
});
