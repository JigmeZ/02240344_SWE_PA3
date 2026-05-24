import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useTasks } from "../../src/hooks/useTasks";
import { useCategories } from "../../src/hooks/useCategories";
import { useTaskStore } from "../../src/store/taskStore";
import { useForm } from "../../src/hooks/useForm";
import { Input } from "../../src/components/Input";
import { Button } from "../../src/components/Button";
import { PickerField } from "../../src/components/PickerField";
import { Toast } from "../../src/components/Toast";
import { COLORS } from "../../src/theme/colors";

const STATUS_OPTIONS = [
  { label: "Todo", value: "todo" },
  { label: "In Progress", value: "in-progress" },
  { label: "Done", value: "done" },
];

const rules = {
  title: (v: string) =>
    v.trim().length < 3 ? "Title must be at least 3 characters" : null,
  status: (v: string) => (!v ? "Please select a status" : null),
};

export default function TaskFormScreen() {
  const { mode, id } = useLocalSearchParams<{ mode: string; id?: string }>();
  const isEdit = mode === "edit";

  const { tasks } = useTaskStore();
  const { createTask, editTask, isLoading, error } = useTasks();
  const { categories, fetchCategories } = useCategories();

  const { values, errors, setValue, validate, reset } = useForm(
    { title: "", description: "", status: "todo", categoryId: "" },
    rules,
  );

  const [toastMsg, setToastMsg] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (isEdit && id) {
      const task = tasks.find((t) => t.id === id);
      if (task) {
        setValue("title", task.title);
        setValue("description", task.description);
        setValue("status", task.status);
        setValue("categoryId", task.categoryId ?? "");
      }
    }
  }, [isEdit, id]);

  useEffect(() => {
    if (categories.length === 0) fetchCategories();
  }, []);

  const categoryOptions = categories.map((c) => ({
    label: c.name,
    value: c.id,
  }));

  const handleSubmit = async () => {
    if (!validate()) return;

    const payload = {
      title: values.title.trim(),
      description: values.description.trim(),
      status: values.status as any,
      categoryId: values.categoryId,
    };

    let success = false;
    if (isEdit && id) {
      success = await editTask(id, payload);
    } else {
      success = await createTask(payload);
    }

    if (success) {
      setToastMsg(isEdit ? "Task updated!" : "Task created!");
      setShowToast(true);
      if (!isEdit) reset();
      setTimeout(() => {
        setShowToast(false);
        router.back();
      }, 1500);
    }
  };

  return (
    // Outer View needed so Toast can float absolutely over everything
    <View style={styles.wrapper}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <View style={styles.card}>
          <Text style={styles.step}>Step 1 of 1</Text>
          <Text style={styles.eyebrow}>
            {isEdit ? "Edit mode" : "Create mode"}
          </Text>
          <Text style={styles.heading}>
            {isEdit ? "Edit Task" : "New Task"}
          </Text>
          <Text style={styles.subheading}>
            Give the task a status, category, and clear description.
          </Text>

          {error ? <Text style={styles.error}>⚠️ {error}</Text> : null}

          <Input
            label="Title"
            value={values.title}
            onChangeText={(v) => setValue("title", v)}
            placeholder="Enter task title"
            error={errors.title}
          />

          <Input
            label="Description"
            value={values.description}
            onChangeText={(v) => setValue("description", v)}
            placeholder="Enter task description (optional)"
            multiline
          />

          <PickerField
            label="Status"
            value={values.status}
            options={STATUS_OPTIONS}
            onSelect={(v) => setValue("status", v)}
            error={errors.status}
          />

          <PickerField
            label="Category (optional)"
            value={values.categoryId}
            options={categoryOptions}
            onSelect={(v) => setValue("categoryId", v)}
          />

          <View style={styles.actions}>
            <Button
              title={isEdit ? "Update Task" : "Create Task"}
              onPress={handleSubmit}
              isLoading={isLoading}
            />
            <Button
              title="Cancel"
              onPress={() => router.back()}
              variant="outline"
            />
          </View>
        </View>
      </ScrollView>

      {/* Toast floats above everything */}
      <Toast message={toastMsg} visible={showToast} type="success" />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 16, paddingBottom: 32 },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 20,
  },
  eyebrow: {
    color: COLORS.accent,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.4,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  heading: {
    fontSize: 24,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 8,
  },
  subheading: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginBottom: 18,
    lineHeight: 20,
  },
  error: {
    color: COLORS.danger,
    fontSize: 13,
    marginBottom: 12,
    textAlign: "center",
  },
  actions: { marginTop: 12, gap: 10 },
});
