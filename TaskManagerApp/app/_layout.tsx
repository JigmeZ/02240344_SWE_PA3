import { useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useAuthStore } from "../src/store/authStore";
import { useTaskStore } from "../src/store/taskStore";
import { COLORS } from "../src/theme/colors";

export default function RootLayout() {
  const { rehydrate } = useAuthStore();
  const { rehydrateFilter } = useTaskStore();

  useEffect(() => {
    rehydrate();
    rehydrateFilter();
  }, []);

  return (
    <>
      <StatusBar style="light" backgroundColor={COLORS.background} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: COLORS.background },
        }}
      >
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(main)" />
      </Stack>
    </>
  );
}
