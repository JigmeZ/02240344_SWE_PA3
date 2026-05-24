import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { COLORS } from "../theme/colors";

interface Props {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  multiline?: boolean;
}

export const Input = ({
  label,
  value,
  onChangeText,
  error,
  placeholder,
  secureTextEntry,
  multiline,
}: Props) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={[
        styles.input,
        error ? styles.inputError : null,
        multiline ? styles.multiline : null,
      ]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#9ca3af"
      secureTextEntry={secureTextEntry}
      multiline={multiline}
    />
    {error ? <Text style={styles.error}>{error}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  container: { marginBottom: 14 },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.textMuted,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 14,
    padding: 12,
    fontSize: 15,
    color: COLORS.text,
    backgroundColor: COLORS.surfaceElevated,
  },
  inputError: { borderColor: "#ef4444" },
  multiline: { height: 100, textAlignVertical: "top" },
  error: { color: COLORS.danger, fontSize: 12, marginTop: 4 },
});
