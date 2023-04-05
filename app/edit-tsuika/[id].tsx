import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import AddOrEditKeihi from '../../components/AddOrEditKeihi';

import { Text, View } from '../../components/Themed';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>経費編集</Text>

      <Text
        style={styles.getStartedText}
        lightColor="rgba(0,0,0,0.8)"
        darkColor="rgba(255,255,255,0.8)">
        何か間違えましたか？
      </Text>

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
