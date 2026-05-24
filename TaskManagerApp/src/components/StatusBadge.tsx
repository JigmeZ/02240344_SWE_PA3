import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TaskStatus } from "../types";
import { STATUS_THEME } from "../theme/colors";

export const StatusBadge = ({ status }: { status: TaskStatus }) => {
  const colors = STATUS_THEME[status];
  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: colors.bg, borderColor: colors.border },
      ]}
    >
      <Text style={[styles.text, { color: colors.text }]}>
        {status === "in-progress"
          ? "In Progress"
          : status.charAt(0).toUpperCase() + status.slice(1)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    alignSelf: "flex-start",
    borderWidth: 1,
  },
  text: { fontSize: 12, fontWeight: "700", letterSpacing: 0.2 },
});
