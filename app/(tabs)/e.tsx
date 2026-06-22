import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={headerStyles.headerContainer}>
        <Text style={headerStyles.headerTitle}>TaskFlow</Text>
      </View>

      {/* Input Row */}
      <View style={styles.inputRow}>
        <TextInput
          placeholder="Enter Task"
          style={styles.input}
          placeholderTextColor="#888"
        />

        <TouchableOpacity style={styles.addButton}>
          <MaterialIcons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Static Tasks */}
      <View style={styles.taskContainer}>
        <View style={styles.taskRow}>
          <MaterialIcons
            name="check-box-outline-blank"
            size={24}
            color="#555"
          />
          <Text style={styles.taskText}>Study React Native</Text>
        </View>

        <View style={styles.taskRow}>
          <MaterialIcons
            name="check-box-outline-blank"
            size={24}
            color="#555"
          />
          <Text style={styles.taskText}>Finish Assignment</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const headerStyles = StyleSheet.create({
  headerContainer: {
    marginBottom: 25,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#222",
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
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
    fontSize: 16,
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
  taskContainer: {
    marginTop: 5,
  },
  taskRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
  },
  taskText: {
    marginLeft: 12,
    fontSize: 16,
    color: "#333",
  },
});