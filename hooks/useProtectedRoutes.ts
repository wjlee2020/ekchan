import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

type useProtectedRoutesProp = {
  currentUser: User;
  isUserLoading: boolean;
  setAuthErrorMsg: React.Dispatch<React.SetStateAction<string>>;
  setCurrentUser: React.Dispatch<React.SetStateAction<User>>;
  setIsUserLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function useProtectedRoutes({ currentUser, isUserLoading, setAuthErrorMsg, setCurrentUser, setIsUserLoading }: useProtectedRoutesProp) {
  const segments = useSegments();
  const router = useRouter();

  const readToken = async () => {
    try {
      setIsUserLoading(true);
      const value = await AsyncStorage.getItem("@user");
      if (!value) return;
      const userValue = JSON.parse(value);
      setCurrentUser(userValue);
    } catch (e: unknown) {
    } finally {
      setIsUserLoading(false);
    }
  }

  const storeUser = async (user: User) => {
    if (!user.token) return;
    try {
      await AsyncStorage.setItem("@user", JSON.stringify(user));
    } catch (e) {
      setAuthErrorMsg("Failed to save User Token");
    }
  }

  useEffect(() => {
    AsyncStorage.removeItem("@user");
  }, []);

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !currentUser.token &&
      !inAuthGroup &&
      !isUserLoading
    ) {
      // Redirect to the sign-in page.
      router.replace("/sign-in");
    } else if (currentUser.token && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace("/");
      console.log({ currentUser });
      storeUser(currentUser);
    }
  }, [currentUser, isUserLoading]);
}
