import { Link } from "expo-router";
import { Alert, StyleSheet, TextInput } from "react-native";
import { Pressable, Text, View } from "../../components/Themed";
import { useAuthValue } from "../../app/context/AuthContext";
import { useState } from "react";
import { login } from "../api/auth";

export default function SignIn() {
  const { setCurrentUser } = useAuthValue();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) return;

    const userData = await login({ email, password });
    setCurrentUser(() => ({
      id: userData.user.uid,
      email: userData.user.email,
      token: userData.token,
    }))
  }

  return (
    <View style={{
      height: "100%",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      }}
    >
      <Text style={{ fontSize: 36 }}>Ekchan - Login</Text>

      <View style={{ marginVertical: 8 }}>
        <TextInput
          autoCapitalize="none"
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
        />

        <TextInput
          autoCapitalize="none"
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />

        <Pressable style={[styles.loginBtn]} onPress={handleLogin}>
          <Text style={styles.loginBtnText}>Login</Text>
        </Pressable>
      </View>

      <Pressable style={{ marginTop: 10 }}>
        <Text>Don't have an account?</Text>
        <Link style={styles.signUpLink} href={"/(auth)/sign-up"}>Sign Up</Link>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
  signUpLink: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  loginBtn: {
    width: 300,
    alignSelf: "center",
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  loginBtnText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  }
});
