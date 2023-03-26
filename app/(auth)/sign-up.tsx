import { Link } from "expo-router";
import { StyleSheet, TextInput } from "react-native";
import { Pressable, Text, View } from "../../components/Themed";
import { signUp, testEndpoint } from "../../api/auth";

export default function SignUp() {
  return (
    <View style={{
      height: "100%",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      }}
    >
      <Text style={{ fontSize: 36 }}>Ekchan - Sign Up</Text>

      <View style={{ marginVertical: 8 }}>
        <TextInput
          style={styles.input}
          placeholder="Name"
        />

        <TextInput
          style={styles.input}
          autoCapitalize="none"
          placeholder="Email"
        />

        <TextInput
          autoCapitalize="none"
          style={styles.input}
          placeholder="Password"
          secureTextEntry
        />

        <Pressable style={[styles.loginBtn]} onPress={() => testEndpoint()}>
          <Text style={styles.loginBtnText}>Create Account</Text>
        </Pressable>
      </View>

      <Pressable style={{ marginTop: 10 }}>
        <Text>Already have an account?</Text>
        <Link style={styles.signUpLink} href={"/(auth)/sign-in"}>Sign In</Link>
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
