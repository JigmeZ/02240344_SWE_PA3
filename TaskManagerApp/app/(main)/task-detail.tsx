import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useTaskStore } from "../../src/store/taskStore";
import { useTasks } from "../../src/hooks/useTasks";
import { useCategories } from "../../src/hooks/useCategories";
import { StatusBadge } from "../../src/components/StatusBadge";
import { Button } from "../../src/components/Button";
import { ErrorMessage } from "../../src/components/ErrorMessage";
import { Toast } from "../../src/components/Toast";
import { formatDate } from "../../src/utils/formatDate";
import { Task } from "../../src/types";
import { COLORS } from "../../src/theme/colors";

export default function TaskDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { tasks } = useTaskStore();
  const { deleteTask, isLoading, error } = useTasks();
  const { categories } = useCategories();
  const [task, setTask] = useState<Task | null>(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const found = tasks.find((t) => t.id === id);
    if (found) setTask(found);
  }, [id, tasks]);

  const categoryName =
    categories.find((c) => c.id === task?.categoryId)?.name ?? "None";

  const handleDelete = () => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          if (!task) return;
          const success = await deleteTask(task.id);
          if (success) {
            setShowToast(true);
            setTimeout(() => {
              setShowToast(false);
              router.back();
            }, 1500);
          }
        },
      },
    ]);
  };

  if (!task) {
    return (
      <ActivityIndicator size="large" color="#6366f1" style={styles.loader} />
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {error ? <ErrorMessage message={error} /> : null}

      <View style={styles.heroCard}>
        <Text style={styles.eyebrow}>Task overview</Text>
        <StatusBadge status={task.status} />
        <Text style={styles.title}>{task.title}</Text>
        <Text style={styles.description}>
          {task.description || "No description provided."}
        </Text>
      </View>

      <View style={styles.metaGrid}>
        <View style={styles.metaCard}>
          <Text style={styles.metaLabel}>Category</Text>
          <Text style={styles.metaValue}>{categoryName}</Text>
        </View>
        <View style={styles.metaCard}>
          <Text style={styles.metaLabel}>Created</Text>
          <Text style={styles.metaValue}>{formatDate(task.createdAt)}</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <Button
          title="Edit Task"
          onPress={() =>
            router.push({
              pathname: "/(main)/task-form",
              params: { mode: "edit", id: task.id },
            })
          }
        />
        <Button
          title="Delete Task"
          onPress={handleDelete}
          variant="danger"
          isLoading={isLoading}
        />
      </View>

      <Toast message="Task deleted." visible={showToast} type="success" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loader: { marginTop: 80 },
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 16, paddingBottom: 32 },
  heroCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 20,
    marginBottom: 16,
  },
  eyebrow: {
    color: COLORS.accent,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.3,
    textTransform: "uppercase",
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: COLORS.text,
    marginTop: 14,
    marginBottom: 10,
  },
  description: { fontSize: 15, color: COLORS.textMuted, lineHeight: 24 },
  metaGrid: { gap: 12, marginBottom: 16 },
  metaCard: {
    backgroundColor: COLORS.surfaceElevated,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
  },
  metaLabel: {
    fontSize: 12,
    color: COLORS.textSoft,
    fontWeight: "700",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  metaValue: { fontSize: 14, color: COLORS.text, fontWeight: "600" },
  actions: { marginTop: 32, gap: 10 },
});
