import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function TaskItem({
  item,
  onToggle,
  onDelete,
}) {
  return (
    <View style={styles.taskRow}>
      {/* Toggle Task */}
      <TouchableOpacity
        style={styles.taskContent}
        onPress={() => onToggle(item)}
      >
        <MaterialIcons
          name={
            item.completed
              ? "check-box"
              : "check-box-outline-blank"
          }
          size={24}
          color="#4F46E5"
        />

        <Text
          style={[
            styles.taskText,
            item.completed &&
              styles.completedText,
          ]}
        >
          {item.title}
        </Text>
      </TouchableOpacity>

      {/* Delete Button */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(item.id)}
      >
        <MaterialIcons
          name="delete-outline"
          size={24}
          color="#EF4444"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  taskRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F9F9F9",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
  },

  taskContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  taskText: {
    marginLeft: 12,
    fontSize: 16,
    color: "#333",
  },

  completedText: {
    textDecorationLine: "line-through",
    color: "#888",
  },

  deleteButton: {
    padding: 5,
  },
});