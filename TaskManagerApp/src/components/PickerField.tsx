import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
} from "react-native";
import { COLORS } from "../theme/colors";

interface Option {
  label: string;
  value: string;
}

interface Props {
  label: string;
  value: string;
  options: Option[];
  onSelect: (value: string) => void;
  error?: string;
}

export const PickerField = ({
  label,
  value,
  options,
  onSelect,
  error,
}: Props) => {
  const [visible, setVisible] = useState(false);
  const selected = options.find((o) => o.value === value);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={[styles.selector, error ? styles.selectorError : null]}
        onPress={() => setVisible(true)}
      >
        <Text style={selected ? styles.selectedText : styles.placeholder}>
          {selected ? selected.label : "Select..."}
        </Text>
        <Text style={styles.arrow}>▾</Text>
      </TouchableOpacity>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Modal visible={visible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setVisible(false)}
        >
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>{label}</Text>
            <ScrollView>
              {options.map((item, index) => (
                <TouchableOpacity
                  key={`${item.value}-${index}`}
                  style={[
                    styles.option,
                    item.value === value && styles.optionActive,
                  ]}
                  onPress={() => {
                    onSelect(item.value);
                    setVisible(false);
                  }}
                >
                  <Text
                    style={[
                      styles.optionText,
                      item.value === value && styles.optionTextActive,
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 14 },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.textMuted,
    marginBottom: 6,
  },
  selector: {
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 14,
    padding: 12,
    backgroundColor: COLORS.surfaceElevated,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectorError: { borderColor: COLORS.danger },
  selectedText: { fontSize: 15, color: COLORS.text },
  placeholder: { fontSize: 15, color: COLORS.textSoft },
  arrow: { color: COLORS.textMuted, fontSize: 16 },
  error: { color: COLORS.danger, fontSize: 12, marginTop: 4 },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(2, 6, 23, 0.75)",
    justifyContent: "center",
    padding: 24,
  },
  modal: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 16,
    maxHeight: 320,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 12,
  },
  option: {
    padding: 14,
    borderRadius: 10,
    marginBottom: 6,
    backgroundColor: COLORS.surfaceElevated,
  },
  optionActive: { backgroundColor: COLORS.accentSoft },
  optionText: { fontSize: 15, color: COLORS.textMuted },
  optionTextActive: { color: COLORS.text, fontWeight: "600" },
});
