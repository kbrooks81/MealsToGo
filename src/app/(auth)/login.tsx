import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { AuthContext } from "@/services/auth/auth.context";

export default function LoginScreen() {
  const router = useRouter();
  const { user, initializing, error, signIn, signUp } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    if (!initializing && user) router.replace("/(tabs)/settings");
  }, [initializing, user, router]);

  const run = async (fn: () => Promise<void>) => {
    setBusy(true);
    setLocalError(null);
    try {
      await fn();
    } catch (e: any) {
      setLocalError(e?.message ?? "Something went wrong.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <View className="flex-1 bg-white px-5 justify-center">
      <Text className="text-2xl font-bold mb-2">Sign in</Text>
      <Text className="text-gray-600 mb-6">Access your profile settings.</Text>

      {error || localError ? (
        <View className="mb-4 p-3 rounded-lg bg-red-50">
          <Text className="text-red-700">{error || localError}</Text>
        </View>
      ) : null}

      <TextInput
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="Email"
        className="border border-gray-300 rounded-lg px-3 py-3 mb-3"
      />

      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="Password"
        className="border border-gray-300 rounded-lg px-3 py-3 mb-4"
      />

      <Pressable
        disabled={busy}
        onPress={() => run(() => signIn(email, password))}
        className={`rounded-lg px-3 py-3 ${busy ? "bg-gray-400" : "bg-black"}`}
      >
        {busy ? (
          <ActivityIndicator />
        ) : (
          <Text className="text-white text-center font-semibold">Sign In</Text>
        )}
      </Pressable>

      <Pressable
        disabled={busy}
        onPress={() => run(() => signUp(email, password))}
        className="rounded-lg px-3 py-3 bg-gray-200 mt-3"
      >
        <Text className="text-black text-center font-semibold">
          Create Account
        </Text>
      </Pressable>
    </View>
  );
}
