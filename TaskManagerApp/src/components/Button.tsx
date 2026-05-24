import React from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { COLORS } from "../theme/colors";

interface Props {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
  variant?: "primary" | "danger" | "outline";
  disabled?: boolean;
}

export const Button = ({
  title,
  onPress,
  isLoading,
  variant = "primary",
  disabled,
}: Props) => {
  const bgColor =
    variant === "danger"
      ? COLORS.danger
      : variant === "outline"
        ? COLORS.surface
        : COLORS.accentStrong;

  const textColor = variant === "outline" ? COLORS.accent : "#fff";
  const borderColor = variant === "outline" ? COLORS.accent : "transparent";

  return (
    <TouchableOpacity
      style={[
        styles.btn,
        {
          backgroundColor: bgColor,
          borderColor,
          opacity: disabled || isLoading ? 0.6 : 1,
        },
      ]}
      onPress={onPress}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text style={[styles.text, { color: textColor }]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
    borderWidth: 1.5,
    marginVertical: 6,
  },
  text: { fontWeight: "600", fontSize: 15 },
});
