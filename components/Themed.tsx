/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import {
  TextInput as DefaultTextInput,
  Text as DefaultText,
  useColorScheme,
  View as DefaultView,
  Button as DefaultButton,
  PressableProps,
  Pressable as DefaultPressable,
  Switch as DefaultSwitch,
} from 'react-native';

import Colors from '../constants/Colors';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
  label?: string;
};

export type ButtonProps = ThemeProps & DefaultButton['props'];
export type TextProps = ThemeProps & DefaultText['props'];
export type TextInputProps = ThemeProps & DefaultTextInput['props'];
export type ViewProps = ThemeProps & DefaultView['props'];
export type SwitchProps = ThemeProps & DefaultSwitch['props'];

export function Button(props: ButtonProps) {
  const { lightColor, darkColor, title, onPress, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return (
    <View style={{ backgroundColor, borderRadius: 5 }}>
      <DefaultButton title={title} onPress={onPress} {...otherProps} />
    </View>
  );
}

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;

  return <DefaultText style={[{ color: "white" }, style]} {...otherProps} />;
}

export function TextInput(props: TextInputProps) {
  const { style, label, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <View>
      <Text style={{ marginLeft: 12, fontSize: 20 }}>{label}</Text>

      <DefaultTextInput style={[{ color }, style]} {...otherProps} />
    </View>
  );
}

export function Switch(props: SwitchProps) {
  return (
    <DefaultSwitch {...props} />
  );
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function Pressable(props: PressableProps) {
  return <DefaultPressable {...props} />
}
