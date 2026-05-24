import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "./Button";
import { COLORS } from "../theme/colors";

interface Props {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage = ({ message, onRetry }: Props) => (
  <View style={styles.container}>
    <Text style={styles.text}>{message}</Text>
    {onRetry && <Button title="Retry" onPress={onRetry} variant="outline" />}
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, alignItems: "center" },
  text: {
    color: COLORS.danger,
    fontSize: 14,
    textAlign: "center",
    marginBottom: 8,
  },
});
