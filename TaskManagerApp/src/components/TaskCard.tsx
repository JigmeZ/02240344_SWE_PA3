import { formatDate } from "../utils/formatDate";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Task } from "../types";
import { StatusBadge } from "./StatusBadge";
import { COLORS } from "../theme/colors";

interface Props {
  task: Task;
  onPress: () => void;
}

export const TaskCard = ({ task, onPress }: Props) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <View style={styles.row}>
      <Text style={styles.title} numberOfLines={1}>
        {task.title}
      </Text>
      <StatusBadge status={task.status} />
    </View>
    {task.description ? (
      <Text style={styles.description} numberOfLines={2}>
        {task.description}
      </Text>
    ) : null}
    <Text style={styles.date}>{formatDate(task.createdAt)}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
    flex: 1,
    marginRight: 8,
  },
  description: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginBottom: 8,
    lineHeight: 19,
  },
  date: { fontSize: 11, color: COLORS.textSoft },
});
