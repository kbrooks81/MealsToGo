import React, { useContext } from "react";
import { ActivityIndicator, View } from "react-native";
import { Redirect } from "expo-router";
import { AuthContext } from "@/services/auth/auth.context";

export default function Index() {
  const { user, initializing } = useContext(AuthContext);

  if (initializing) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator animating={true} color={"#5282BD"} size="large" />
      </View>
    );
  }

  if (user) return <Redirect href="/(tabs)" />;

  return <Redirect href="/(auth)/login" />;
}
