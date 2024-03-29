import { StyleSheet } from 'react-native';

import { View } from '../../components/Themed';
import { KeihiList } from '../../components/KeihiList';

export default function KeihiScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.separator} />

      <KeihiList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
