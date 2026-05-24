import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS } from "../theme/colors";

type Props = {
  title?: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
};

export const EmptyState = ({
  title = "Nothing here yet",
  message,
  actionLabel,
  onAction,
}: Props) => (
  <View style={styles.container}>
    <View style={styles.iconShell}>
      <Text style={styles.icon}>☾</Text>
    </View>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.text}>{message}</Text>
    {actionLabel && onAction ? (
      <TouchableOpacity style={styles.action} onPress={onAction}>
        <Text style={styles.actionText}>{actionLabel}</Text>
      </TouchableOpacity>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  iconShell: {
    width: 72,
    height: 72,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 18,
  },
  icon: { fontSize: 34, color: COLORS.accent },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 8,
    textAlign: "center",
  },
  text: {
    fontSize: 15,
    color: COLORS.textMuted,
    textAlign: "center",
    lineHeight: 22,
    maxWidth: 280,
  },
  action: {
    marginTop: 18,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 999,
    backgroundColor: COLORS.accentStrong,
  },
  actionText: { color: "#fff", fontWeight: "700", fontSize: 14 },
});
