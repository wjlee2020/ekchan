import { useState } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { GestureEvent, PanGestureHandler, PinchGestureHandler, PinchGestureHandlerEventPayload } from 'react-native-gesture-handler';
import Svg, { Circle, Line } from 'react-native-svg';


import { View } from "../../components/Themed";

export default function EkchanWorld() {
  const [scale, setScale] = useState(1);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);

  const onPanGestureEvent = (event: any) => {
    console.log(event);
  };

  return (
    <PanGestureHandler onGestureEvent={onPanGestureEvent}>
      <PinchGestureHandler>
        <Animated.View style={{ transform: [{ scale: scale }] }}>
          <Svg>
            <Circle cx="50" cy="50" r="25" fill="green" />
            <Circle cx="100" cy="100" r="25" fill="red" />
            <Line x1="50" y1="50" x2="100" y2="100" stroke="black" />
          </Svg>
        </Animated.View>
      </PinchGestureHandler>
    </PanGestureHandler>
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
