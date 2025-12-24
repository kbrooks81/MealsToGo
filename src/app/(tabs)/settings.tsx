import React, { useContext, useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import { AuthContext } from "@/services/auth/auth.context";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Settings() {
  const router = useRouter();
  const { user, initializing, signOut, updateDisplayName } =
    useContext(AuthContext);

  const [displayName, setDisplayName] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!initializing && !user) router.replace("/(auth)/login");
    if (user?.displayName) setDisplayName(user.displayName);
  }, [initializing, user, router]);

  if (!user) return <View className="flex-1 bg-white" />;

  const save = async () => {
    setBusy(true);
    setMsg(null);
    try {
      await updateDisplayName(displayName);
      setMsg("Saved!");
    } catch (e: any) {
      setMsg(e?.message ?? "Failed to save.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "left", "right"]}>
      <View className="flex-1 bg-white p-4">
        <Text className="text-xl font-bold mb-4">Settings</Text>

        <View className="p-3 rounded-lg bg-gray-100 mb-4">
          <Text className="text-gray-700">Email</Text>
          <Text className="font-semibold">{user.email}</Text>
        </View>

        <Text className="font-semibold mb-2">Display name</Text>
        <TextInput
          value={displayName}
          onChangeText={setDisplayName}
          placeholder="Your name"
          className="border border-gray-300 rounded-lg px-3 py-3 mb-3"
        />

        <Pressable
          disabled={busy}
          onPress={save}
          className="bg-black rounded-lg px-3 py-3"
        >
          <Text className="text-white text-center font-semibold">
            {busy ? "Saving..." : "Save"}
          </Text>
        </Pressable>

        {msg ? <Text className="mt-3 text-gray-700">{msg}</Text> : null}

        <Pressable
          onPress={signOut}
          className="bg-red-600 rounded-lg px-3 py-3 mt-6"
        >
          <Text className="text-white text-center font-semibold">Sign Out</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
