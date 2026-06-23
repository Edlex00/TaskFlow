import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function TaskForm({
  task,
  setTask,
  onAdd,
}) {
  return (
    <View style={styles.inputRow}>
      <TextInput
        style={styles.input}
        placeholder="Enter Task"
        placeholderTextColor="#888"
        value={task}
        onChangeText={setTask}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={onAdd}
      >
        <MaterialIcons
          name="add"
          size={24}
          color="#fff"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  addButton: {
    width: 50,
    height: 50,
    backgroundColor: "#4F46E5",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});