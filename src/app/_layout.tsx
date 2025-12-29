import { Lato_400Regular } from "@expo-google-fonts/lato";
import { Oswald_400Regular } from "@expo-google-fonts/oswald";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "./globals.css";
import { RestaurantsContextProvider } from "../../services/restaurants/restaurants.context";
import { LocationContextProvider } from "../../services/location/location.context";
import { AuthContextProvider } from "@/services/auth/auth.context";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Oswald_400Regular,
    Lato_400Regular,
  });

  if (!fontsLoaded) return null;

  return (
    <>
      <SafeAreaProvider>
        <AuthContextProvider>
          <LocationContextProvider>
            <RestaurantsContextProvider>
              <Stack
                screenOptions={{
                  headerShown: false,
                }}
              />
            </RestaurantsContextProvider>
            <StatusBar style="dark" />
          </LocationContextProvider>
        </AuthContextProvider>
      </SafeAreaProvider>
    </>
  );
}
