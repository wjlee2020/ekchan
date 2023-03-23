import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from 'expo-status-bar';
import { Link, useRouter } from "expo-router";

import { Text, View } from "../components/Themed";
import { useAuthValue } from "./context/AuthContext";
import { useEffect } from "react";

export default function LoginScreen() {
  const { currentUser } = useAuthValue();
  const router = useRouter();

  return (
    <SafeAreaProvider>
      <StatusBar
        animated={true}
        backgroundColor="#61dafb"
        hidden
      />

      <View style={{
        height: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 10,
        borderColor: "pink"
        }}
      >
        <Text>Login Here</Text>

        <Link href={"/(auth)/sign-up"}>Sign Up</Link>
      </View>
    </SafeAreaProvider>
  );
}
