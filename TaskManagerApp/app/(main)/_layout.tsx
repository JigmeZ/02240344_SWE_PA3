import { useEffect } from "react";
import { Stack, router } from "expo-router";
import { useAuthStore } from "../../src/store/authStore";
import { COLORS } from "../../src/theme/colors";

export default function MainLayout() {
  const { user, isLoading } = useAuthStore();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/(auth)/login");
    }
  }, [user, isLoading]);

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.surface },
        headerTintColor: COLORS.text,
        headerTitleStyle: { fontWeight: "700", color: COLORS.text },
        headerShadowVisible: false,
        contentStyle: { backgroundColor: COLORS.background },
      }}
    >
      <Stack.Screen name="tasks" options={{ title: "My Tasks" }} />
      <Stack.Screen name="task-detail" options={{ title: "Task Detail" }} />
      <Stack.Screen name="task-form" options={{ title: "Task Form" }} />
    </Stack>
  );
}
