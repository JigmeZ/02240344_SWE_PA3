import React, { useEffect, useRef } from "react";
import { Animated, Text, StyleSheet } from "react-native";
import { COLORS } from "../theme/colors";

interface Props {
  message: string;
  visible: boolean;
  type?: "success" | "error";
}

export const Toast = ({ message, visible, type = "success" }: Props) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 20,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.toast,
        {
          opacity,
          transform: [{ translateY }],
          backgroundColor:
            type === "success" ? COLORS.successSoft : COLORS.dangerSoft,
        },
      ]}
    >
      <Text style={styles.text}>
        {type === "success" ? "✓  " : "⚠  "}
        {message}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toast: {
    position: "absolute",
    bottom: 40,
    left: 24,
    right: 24,
    padding: 16,
    borderRadius: 16,
    zIndex: 9999,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  text: { color: "#fff", fontSize: 15, fontWeight: "600" },
});
