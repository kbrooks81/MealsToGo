import React, { useMemo, useState } from "react";
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
import { sendPasswordResetEmail } from "firebase/auth";
import { firebaseAuth } from "@/services/firebase/firebase";

export default function ResetPasswordScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const canSubmit = useMemo(() => email.trim().length > 3, [email]);

  const submit = async () => {
    setErr(null);
    setSuccess(null);

    const trimmed = email.trim();

    // simple validation
    if (!trimmed.includes("@")) {
      setErr("Please enter a valid email address.");
      return;
    }

    setBusy(true);
    try {
      await sendPasswordResetEmail(firebaseAuth, trimmed);
      setSuccess(
        "If an account exists for that email, you’ll receive a password reset link shortly. Please also check spam/junk."
      );
    } catch (e: any) {
      // Common Firebase errors:
      // auth/user-not-found, auth/invalid-email, auth/too-many-requests
      const code = e?.code as string | undefined;

      if (code === "auth/invalid-email") {
        setErr("That email address is not valid.");
      } else if (code === "auth/too-many-requests") {
        setErr("Too many attempts. Please try again later.");
      } else {
        setErr("Something went wrong. Please try again.");
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <View className="flex-1 bg-[#0B1020]">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View className="flex-1 px-6 pt-20">
          {/* Back */}
          <Pressable
            onPress={() => router.back()}
            className="flex-row items-center mb-8"
          >
            <Ionicons name="chevron-back" size={20} color="white" />
            <Text className="text-white/90 ml-1">Back</Text>
          </Pressable>

          <View className="items-center mb-6">
            <View className="w-14 h-14 rounded-2xl items-center justify-center bg-[#2C54F2]/20 border border-[#2C54F2]/40">
              <Ionicons name="key-outline" size={26} color="#5A7CFF" />
            </View>
          </View>

          <Text className="text-white text-3xl font-extrabold text-center leading-tight">
            Reset your password
          </Text>
          <Text className="text-white/70 text-center mt-3">
            Enter the email tied to your account and we will send a reset link.
          </Text>

          <View className="mt-10 rounded-2xl bg-white/95 overflow-hidden">
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
          </View>

          {err ? (
            <View className="mt-4">
              <Text className="text-red-300 text-center">{err}</Text>
            </View>
          ) : null}

          {success ? (
            <View className="mt-4">
              <Text className="text-green-300 text-center">{success}</Text>
            </View>
          ) : null}

          <Pressable
            onPress={submit}
            disabled={busy || !canSubmit}
            className="mt-8 rounded-2xl overflow-hidden"
          >
            <LinearGradient
              colors={
                busy || !canSubmit
                  ? ["#4B5563", "#374151"]
                  : ["#4B7BFF", "#2C54F2"]
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ paddingVertical: 18, borderRadius: 16 }}
            >
              {busy ? (
                <ActivityIndicator />
              ) : (
                <Text className="text-white text-center text-base font-semibold">
                  Send Reset Link
                </Text>
              )}
            </LinearGradient>
          </Pressable>

          <Text className="text-white/60 text-center mt-6 text-sm">
            If you do not see it, check spam/junk.
          </Text>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
