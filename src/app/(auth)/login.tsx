import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AuthContext } from "@/services/auth/auth.context";

function SpaceBackground() {
  const lines = useMemo(() => Array.from({ length: 10 }, (_, i) => i), []);
  const stars = useMemo(() => {
    const pts = [];
    for (let i = 0; i < 45; i++) {
      pts.push({
        key: `s-${i}`,
        top: Math.random() * 700,
        left: Math.random() * 400,
        size: Math.random() * 2.5 + 1,
        opacity: Math.random() * 0.6 + 0.15,
      });
    }
    return pts;
  }, []);

  return (
    <View className="absolute inset-0">
      <LinearGradient
        colors={["#0B1020", "#070A12", "#05060B"]}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.8, y: 1 }}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      />

      {/* grid */}
      <View className="absolute inset-0 opacity-20">
        {lines.map((i) => (
          <View
            key={`h-${i}`}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              height: 1,
              top: `${(i / (lines.length - 1)) * 100}%`,
              backgroundColor: "white",
              opacity: 0.12,
            }}
          />
        ))}
        {lines.map((i) => (
          <View
            key={`v-${i}`}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              width: 1,
              left: `${(i / (lines.length - 1)) * 100}%`,
              backgroundColor: "white",
              opacity: 0.12,
            }}
          />
        ))}
      </View>

      {/* stars */}
      <View className="absolute inset-0">
        {stars.map((s) => (
          <View
            key={s.key}
            style={{
              position: "absolute",
              top: s.top,
              left: s.left,
              width: s.size,
              height: s.size,
              borderRadius: 999,
              backgroundColor: "white",
              opacity: s.opacity,
            }}
          />
        ))}
      </View>

      {/* vignette */}
      <View
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "black",
          opacity: 0.18,
        }}
      />
    </View>
  );
}

export default function LoginScreen() {
  const router = useRouter();
  const { user, initializing, signIn, signUp } = useContext(AuthContext);

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!initializing && user) router.replace("/(tabs)");
  }, [initializing, user, router]);

  const submit = async () => {
    setErr(null);
    setBusy(true);
    try {
      if (mode === "signin") {
        await signIn(email, password);
      } else {
        await signUp(email, password);
      }
    } catch (e: any) {
      setErr(e?.message ?? "Something went wrong.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <View className="flex-1">
      <SpaceBackground />

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View className="flex-1 px-6 pt-24">
          {/* Logo badge */}
          <View className="items-center mb-6">
            <View className="w-14 h-14 rounded-2xl items-center justify-center bg-[#2C54F2]/20 border border-[#2C54F2]/40">
              <Ionicons name="shield-checkmark" size={26} color="#5A7CFF" />
            </View>
          </View>

          {/* Header */}
          <Text className="text-white text-4xl font-extrabold text-center leading-tight">
            Sign in to your{"\n"}Account
          </Text>

          <View className="flex-row justify-center items-center mt-3">
            <Text className="text-white/70">
              {mode === "signin"
                ? "Don't have an account? "
                : "Already have an account? "}
            </Text>
            <Pressable
              onPress={() => setMode(mode === "signin" ? "signup" : "signin")}
            >
              <Text className="text-[#5A7CFF] font-semibold">
                {mode === "signin" ? "Sign Up" : "Sign In"}
              </Text>
            </Pressable>
          </View>

          {/* Input card */}
          <View className="mt-10 rounded-2xl bg-white/95 overflow-hidden">
            {/* Email row */}
            <View className="flex-row items-center px-4 py-4">
              <Ionicons name="mail-outline" size={18} color="#111827" />
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                placeholderTextColor="#6B7280"
                autoCapitalize="none"
                keyboardType="email-address"
                className="flex-1 ml-3 text-base text-black"
              />
            </View>

            <View className="h-[1px] bg-black/10" />

            {/* Password row */}
            <View className="flex-row items-center px-4 py-4">
              <Ionicons name="lock-closed-outline" size={18} color="#111827" />
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                placeholderTextColor="#6B7280"
                secureTextEntry={!showPw}
                className="flex-1 ml-3 text-base text-black"
              />
              <Pressable onPress={() => setShowPw((v) => !v)} hitSlop={10}>
                <Ionicons
                  name={showPw ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="#6B7280"
                />
              </Pressable>
            </View>
          </View>

          {/* Error */}
          {err ? (
            <View className="mt-4">
              <Text className="text-red-300 text-center">{err}</Text>
            </View>
          ) : null}

          {/* Forgot password */}
          <Pressable
            onPress={() => router.push("/(auth)/reset")}
            className="mt-6"
          >
            <Text className="text-white/80 text-center underline">
              Forgot Your Password?
            </Text>
          </Pressable>

          {/* Button */}
          <Pressable
            onPress={submit}
            disabled={busy}
            className="mt-8 rounded-2xl overflow-hidden"
          >
            <LinearGradient
              colors={busy ? ["#4B5563", "#374151"] : ["#4B7BFF", "#2C54F2"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ paddingVertical: 18, borderRadius: 16 }}
            >
              {busy ? (
                <ActivityIndicator />
              ) : (
                <Text className="text-white text-center text-base font-semibold">
                  {mode === "signin" ? "Log In" : "Create Account"}
                </Text>
              )}
            </LinearGradient>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
