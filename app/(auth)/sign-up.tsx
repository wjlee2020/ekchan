import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Image, TextInput } from "react-native";
import { Pressable, Text, View } from "../../components/Themed";
import { signUp } from "../../api/auth";
import { styles } from "./sign-in";
import { useAuthValue } from "../../context/AuthContext";
import Notice from "../../components/Notice";
import { Button } from "react-native-paper";

type NewUser = {
  name: string;
  email: string;
  password: string;
};

export default function SignUp() {
  const { authError, setAuthError } = useAuthValue();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [accountInfo, setAccountInfo] = useState<NewUser>({
    email: "",
    name: "",
    password: "",
  });
  const [snackbarText, setSnackbarText] = useState("Failed to create your account. Make sure you provided properly formatted email: `name@mail.com`.");

  const handleAccountRegistration = async () => {
    if (!accountInfo.email || !accountInfo.name || !accountInfo.password) return;
    if (!accountInfo.email.includes("@")) return setAuthError(true);

    try {
      setIsLoading(true);
      const res = await signUp(accountInfo);

      if (res.status === 400) {
        setSnackbarText(res.msg?.charAt(0).toUpperCase() + res.msg?.slice(1));
        return setAuthError(true);
      }

      router.push("/sign-in");
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
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

        <Button
          loading={isLoading}
          mode="contained"
          buttonColor="#000"
          style={{ width: 300, marginLeft: "auto", marginRight: "auto" }}
          onPress={handleAccountRegistration}
        >
          Create Account
        </Button>
      </View>

      <Pressable style={{ marginTop: 10 }}>
        <Text>Already have an account?</Text>

        <Link style={styles.signUpLink} href={"/(auth)/sign-in"}>Sign In</Link>
      </Pressable>

      <Notice
        isOpen={authError}
        onDismiss={setAuthError}
        snackbarText={snackbarText}
      />
    </View>
  );
}
