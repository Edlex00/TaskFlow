import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "../../lib/supabase";

type Task = {
  id: string;
  title: string;
  completed: boolean;
  created_at?: string;
};

export default function App() {
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async (): Promise<void> => {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setTasks((data as Task[]) || []);
  };

  const addTask = async (): Promise<void> => {
    if (!task.trim()) return;

    const { error } = await supabase
      .from("tasks")
      .insert([
        {
          title: task.trim(),
          completed: false,
        },
      ]);

    if (error) {
      console.log(error);
      return;
    }

    setTask("");
    await loadTasks();
  };

  const toggleTask = async (item: Task): Promise<void> => {
    const { error } = await supabase
      .from("tasks")
      .update({
        completed: !item.completed,
      })
      .eq("id", item.id);

    if (error) {
      console.log(error);
      return;
    }

    await loadTasks();
  };

  const deleteTask = async (id: string): Promise<void> => {
    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", id);

    if (error) {
      console.log(error);
      return;
    }

    await loadTasks();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={headerStyles.headerContainer}>
        <Text style={headerStyles.headerTitle}>TaskFlow</Text>
      </View>

      <View style={styles.inputRow}>
        <TextInput
          placeholder="Enter Task"
          placeholderTextColor="#888"
          style={styles.input}
          value={task}
          onChangeText={setTask}
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={addTask}
        >
          <MaterialIcons
            name="add"
            size={24}
            color="#fff"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.taskContainer}>
        {tasks.map((item: Task) => (
          <TouchableOpacity
            key={item.id}
            style={styles.taskRow}
            onPress={() => toggleTask(item)}
            onLongPress={() => deleteTask(item.id)}
          >
            <MaterialIcons
              name={
                item.completed
                  ? "check-box"
                  : "check-box-outline-blank"
              }
              size={24}
              color="#555"
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
        ))}
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
  completedText: {
    textDecorationLine: "line-through",
    color: "#888",
  },
});