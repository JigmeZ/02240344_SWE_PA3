import React from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import { useTasks } from "../../src/hooks/useTasks";
import { useTaskStore } from "../../src/store/taskStore";
import { useAuthStore } from "../../src/store/authStore";
import { TaskCard } from "../../src/components/TaskCard";
import { ErrorMessage } from "../../src/components/ErrorMessage";
import { EmptyState } from "../../src/components/EmptyState";
import { Toast } from "../../src/components/Toast";
import { TaskStatus } from "../../src/types";
import { COLORS } from "../../src/theme/colors";

const FILTERS: { label: string; value: TaskStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Todo", value: "todo" },
  { label: "In Progress", value: "in-progress" },
  { label: "Done", value: "done" },
];

export default function TasksScreen() {
  const { tasks, isLoading, error, fetchTasks, success } = useTasks();
  const allTasks = useTaskStore((state) => state.tasks);
  const { filter, searchQuery, setFilter, setSearchQuery } = useTaskStore();
  const { user, logout } = useAuthStore();

  const totalTasks = allTasks.length;
  const doneTasks = allTasks.filter((task) => task.status === "done").length;
  const activeTasks = allTasks.filter((task) => task.status !== "done").length;
  const filteredCount = tasks.length;

  return (
    <View style={styles.container}>
      <View style={styles.topCard}>
        <View>
          <Text style={styles.eyebrow}>dashboard</Text>
          <Text style={styles.greeting}>
            O-HA-YO, {user?.email?.split("@")[0]}
          </Text>
          <Text style={styles.subtitle}>Your tasks.</Text>
        </View>
        <TouchableOpacity onPress={logout}>
          <Text style={styles.logout}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{totalTasks}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{activeTasks}</Text>
          <Text style={styles.statLabel}>Open</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{doneTasks}</Text>
          <Text style={styles.statLabel}>Done</Text>
        </View>
      </View>

      <TextInput
        style={styles.search}
        placeholder="Search tasks..."
        placeholderTextColor={COLORS.textSoft}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <View style={styles.filterRow}>
        {FILTERS.map((f) => (
          <TouchableOpacity
            key={f.value}
            style={[styles.pill, filter === f.value && styles.pillActive]}
            onPress={() => setFilter(f.value)}
          >
            <Text
              style={[
                styles.pillText,
                filter === f.value && styles.pillTextActive,
              ]}
            >
              {f.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionCaption}>
        {filteredCount} {filteredCount === 1 ? "task" : "tasks"} shown
      </Text>

      {/* Content */}
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color={COLORS.accent}
          style={styles.loader}
        />
      ) : error ? (
        <EmptyState
          title="No tasks yet"
          message="Capture your first task to get the board moving."
          actionLabel="Create your first task"
          onAction={() =>
            router.push({
              pathname: "/(main)/task-form",
              params: { mode: "create" },
            })
          }
        />
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskCard
              task={item}
              onPress={() =>
                router.push({
                  pathname: "/(main)/task-detail",
                  params: { id: item.id },
                })
              }
            />
          )}
          ListEmptyComponent={
            <EmptyState message="No tasks yet. Tap + to create one!" />
          }
          contentContainerStyle={
            tasks.length === 0 ? styles.emptyContainer : styles.list
          }
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* FAB - Create new task */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() =>
          router.push({
            pathname: "/(main)/task-form",
            params: { mode: "create" },
          })
        }
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      {/* Success toast */}
      <Toast message={success ?? ""} visible={!!success} type="success" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 16 },
  topCard: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 24,
    padding: 18,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  eyebrow: {
    color: COLORS.accent,
    fontSize: 11,
    letterSpacing: 1.3,
    textTransform: "uppercase",
    fontWeight: "700",
    marginBottom: 6,
  },
  greeting: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.textMuted,
    maxWidth: 240,
    lineHeight: 19,
  },
  logout: { fontSize: 14, color: COLORS.accent, fontWeight: "700" },
  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 12,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 2,
  },
  statLabel: { fontSize: 12, color: COLORS.textMuted, fontWeight: "600" },
  search: {
    backgroundColor: COLORS.surfaceElevated,
    borderRadius: 16,
    padding: 12,
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterRow: { flexDirection: "row", marginBottom: 16, gap: 8 },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: COLORS.surfaceElevated,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  pillActive: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  pillText: { fontSize: 13, color: COLORS.textMuted, fontWeight: "600" },
  pillTextActive: { color: "#fff" },
  sectionCaption: {
    color: COLORS.textSoft,
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 10,
    paddingLeft: 2,
  },
  loader: { marginTop: 60 },
  list: { paddingBottom: 100 },
  emptyContainer: { flexGrow: 1 },
  fab: {
    position: "absolute",
    bottom: 28,
    right: 24,
    backgroundColor: COLORS.accent,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.accent,
    shadowOpacity: 0.35,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  fabText: { color: "#fff", fontSize: 28, lineHeight: 32 },
});
