import React from 'react';
import { StyleSheet } from 'react-native';
import { KeihiList } from '../components/KeihiList';

import { Text, View } from '../components/Themed';

export default function Keihi() {
  return (
    <View style={styles.getStartedContainer}>
      <Text
        style={styles.getStartedText}
        lightColor="rgba(0,0,0,0.8)"
        darkColor="rgba(255,255,255,0.8)"
      >
        {new Date().toISOString().split("T")[0]}
      </Text>

      <KeihiList />
    </View>
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    marginHorizontal: 50,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
});
