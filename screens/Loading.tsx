import { Text, View } from "../components/Themed";

export default function Loading() {
  return (
    <View style={{
      height: "100%",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      }}
    >
      <Text>loading...</Text>
    </View>
  )
}