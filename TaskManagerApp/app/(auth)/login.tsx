import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import { useAuth } from "../../src/hooks/useAuth";
import { useForm } from "../../src/hooks/useForm";
import { Input } from "../../src/components/Input";
import { Button } from "../../src/components/Button";
import { COLORS } from "../../src/theme/colors";

const rules = {
  email: (v: string) => (!v.includes("@") ? "Enter a valid email" : null),
  password: (v: string) =>
    v.length < 6 ? "Password must be at least 6 characters" : null,
};

export default function LoginScreen() {
  const { login, isLoading, error } = useAuth();
  const { values, errors, setValue, validate } = useForm(
    { email: "", password: "" },
    rules,
  );

  const handleLogin = async () => {
    if (!validate()) return;
    await login(values.email, values.password);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>Task manager</Text>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>
          Sign in.
        </Text>
      </View>

      <View style={styles.card}>
        <Input
          label="Email"
          value={values.email}
          onChangeText={(v) => setValue("email", v)}
          placeholder="Jigme206@example.com"
          error={errors.email}
        />
        <Input
          label="Password"
          value={values.password}
          onChangeText={(v) => setValue("password", v)}
          placeholder="••••••••"
          secureTextEntry
          error={errors.password}
        />

        {error ? <Text style={styles.error}> {error}</Text> : null}

        <Button title="Sign In" onPress={handleLogin} isLoading={isLoading} />

        <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
          <Text style={styles.link}>
            Don't have an account? <Text style={styles.linkBold}>Sign up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: COLORS.background,
  },
  hero: { marginBottom: 18 },
  eyebrow: {
    color: COLORS.accent,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.4,
    textTransform: "uppercase",
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 8,
  },
  subtitle: { fontSize: 15, color: COLORS.textMuted, lineHeight: 22 },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  error: {
    color: COLORS.danger,
    fontSize: 13,
    marginBottom: 8,
    textAlign: "center",
  },
  link: {
    textAlign: "center",
    marginTop: 20,
    color: COLORS.textMuted,
    fontSize: 14,
  },
  linkBold: { color: COLORS.accent, fontWeight: "700" },
});
