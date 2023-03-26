import { useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

export default function useProtectedRoutes(user: User) {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user.token &&
      !inAuthGroup
    ) {
      // Redirect to the sign-in page.
      router.replace("/sign-in");
    } else if (user.token && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace("/");
    }
  }, [user]);
}
