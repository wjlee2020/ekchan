import { Link } from "expo-router";
import { useState } from "react";
import { Image, TextInput } from "react-native";
import { Pressable, Text, View } from "../../components/Themed";
import { signUp } from "../../api/auth";
import { styles } from "./sign-in";
import { useAuthValue } from "../../context/AuthContext";
import Notice from "../../components/Notice";

type NewUser = {
  name: string;
  email: string;
  password: string;
};

export default function SignUp() {
  const { authError, setAuthError } = useAuthValue();
  const [accountInfo, setAccountInfo] = useState<NewUser>({
    email: "",
    name: "",
    password: "",
  });

  const handleAccountRegistration = async () => {
    if (!accountInfo.email || !accountInfo.name || !accountInfo.password) return;
    if (!accountInfo.email.includes("@")) return setAuthError(true);

    try {
      const res = await signUp(accountInfo);
      if (res.status !== 200) throw new Error("failed to create account");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={{
      height: "100%",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      }}
    >
      <Image
        source={require("../../assets/images/lmpihmy.gif")}
        style={{width: 250, height: 250}}
      />

      <View style={{ marginVertical: 8 }}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={accountInfo.name}
          onChangeText={(text) => setAccountInfo((prev) => ({ ...prev, name: text}))}
        />

        <TextInput
          style={styles.input}
          autoCapitalize="none"
          placeholder="Email"
          value={accountInfo.email}
          onChangeText={(text) => setAccountInfo((prev) => ({ ...prev, email: text}))}
        />

        <TextInput
          autoCapitalize="none"
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={accountInfo.password}
          onChangeText={(text) => setAccountInfo((prev) => ({ ...prev, password: text}))}
        />

        <Pressable style={[styles.loginBtn]} onPress={handleAccountRegistration}>
          <Text style={styles.loginBtnText}>Create Account</Text>
        </Pressable>
      </View>

      <Pressable style={{ marginTop: 10 }}>
        <Text>Already have an account?</Text>
        <Link style={styles.signUpLink} href={"/(auth)/sign-in"}>Sign In</Link>
      </Pressable>

      <Notice
        isOpen={authError}
        onDismiss={setAuthError}
        snackbarText="Failed to create your account. Make sure you provided properly formatted email: `name@mail.com`."
      />
    </View>
  );
}
