import { Link } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, TextInput } from "react-native";
import { login } from "../../api/auth";
import Notice from "../../components/Notice";
import { Pressable, Text, View } from "../../components/Themed";
import { useAuthValue } from "../../context/AuthContext";
import Loading from "../../screens/Loading";

export default function SignIn() {
  const { authError, currentUser, isUserLoading, setCurrentUser, setAuthError } = useAuthValue();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) return;

    const userData = await login({ email, password, type: "access" });

    if (userData.status !== 200) return setAuthError(true);

    setCurrentUser(() => ({
      id: userData.user.id,
      email: userData.user.email,
      name: userData.user.name,
      partnerId: userData.user.partner_id,
      token: userData.token,
    }));
  }

  if (!currentUser.token && isUserLoading ) return <Loading />

  return (
    <View style={{
      height: "100%",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      }}
    >
      <Image
        source={require("../../assets/images/eongnimk.gif")}
        style={{width: 250, height: 250}}
      />

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

        <Pressable
          android_ripple={{ color: "green" }}
          style={({ pressed }) => [
            styles.loginBtn,
            pressed ? styles.pressedItem : null
          ]}
          onPress={handleLogin}
        >
          <Text style={styles.loginBtnText}>Login</Text>
        </Pressable>
      </View>

      <Pressable style={{ marginTop: 10 }}>
        <Text style={{ color: "white" }}>Don't have an account?</Text>
        <Link style={styles.signUpLink} href={"/(auth)/sign-up"}>Sign Up</Link>
      </Pressable>

      <Notice
        isOpen={authError}
        snackbarText="Failed to login. Please check your email/password. If you cannot login, try resetting your password"
        onDismiss={setAuthError}
      />
    </View>
  );
}

export const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    fontWeight: "bold",
  },
  signUpLink: {
    color: "white",
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
  },
  pressedItem: {
    opacity: 0.6
  }
});
