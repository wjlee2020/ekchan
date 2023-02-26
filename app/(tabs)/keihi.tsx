import { StyleSheet } from 'react-native';

import { Text, View } from '../../components/Themed';
import Keihi from '../../screens/Keihi';

export default function KeihiScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Keihi</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Keihi />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
