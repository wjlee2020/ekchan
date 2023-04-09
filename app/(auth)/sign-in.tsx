import { Link } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, TextInput } from "react-native";
import { Button } from "react-native-paper";
import { login } from "../../api/auth";
import { ekchanLog } from "../../api/logger";
import Notice from "../../components/Notice";
import { Pressable, Text, View } from "../../components/Themed";
import createLoggerObject from "../../constants/Logger";
import { useAuthValue } from "../../context/AuthContext";
import Loading from "../../screens/Loading";

export default function SignIn() {
  const { authError, currentUser, isUserLoading, setCurrentUser, setAuthError } = useAuthValue();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snackbarText, setSnackbarText] = useState("Failed to login. Please check your email/password. If you cannot login, try resetting your password");

  const handleLogin = async () => {
    if (!email || !password) return;

    try {
      const userData = await login({ email, password, type: "access" });

      if (userData.status === 404) {
        setSnackbarText(userData.msg?.charAt(0).toUpperCase() + userData.msg?.slice(1));
        setAuthError(true);
        throw new Error();
      }

      setCurrentUser(() => ({
        id: userData.user.id,
        email: userData.user.email,
        name: userData.user.name,
        partnerId: userData.user.partner_id,
        token: userData.token,
      }));
    } catch (e) {
      const logBody = createLoggerObject({ name: `Login attempt by: ${email}.`, type: "LOGIN" });
      ekchanLog(logBody);
      setAuthError(true);
    }
  };

  if (!currentUser.token && isUserLoading ) return <Loading />;

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

        <Button
          loading={isUserLoading}
          mode="contained"
          buttonColor="#000"
          style={{ width: 300, marginLeft: "auto", marginRight: "auto" }}
          onPress={handleLogin}
        >
          Login
        </Button>
      </View>

      <Pressable style={{ marginTop: 10 }}>
        <Text style={{ color: "white" }}>Don't have an account?</Text>
        <Link style={styles.signUpLink} href={"/(auth)/sign-up"}>Sign Up</Link>
      </Pressable>

      <Notice
        isOpen={authError}
        snackbarText={snackbarText}
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
