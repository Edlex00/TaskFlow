import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Toast from "react-native-toast-message";

import TaskForm from "../../components/TaskForm";
import TaskItem from "../../components/TaskItem";
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

  const loadTasks = async () => {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);

      Toast.show({
        type: "error",
        text1: "Load Failed",
        text2: "Unable to load tasks",
      });

      return;
    }

    setTasks((data as Task[]) || []);
  };

  const addTask = async () => {
    if (!task.trim()) return;

    const taskTitle = task.trim();

    const { error } = await supabase
      .from("tasks")
      .insert([
        {
          title: taskTitle,
          completed: false,
        },
      ]);

    if (error) {
      console.log(error);

      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to add task",
      });

      return;
    }

    setTask("");
    await loadTasks();

    Toast.show({
      type: "success",
      text1: "Task Added",
      text2: taskTitle + " added successfully",
    });
  };

  const toggleTask = async (item: Task) => {
    const { error } = await supabase
      .from("tasks")
      .update({
        completed: !item.completed,
      })
      .eq("id", item.id);

    if (error) {
      console.log(error);

      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to update task",
      });

      return;
    }

    await loadTasks();

    Toast.show({
      type: "success",
      text1: "Task Updated",
      text2: item.title + " updated successfully",
    });
  };

  const deleteTask = async (id: string) => {
    const taskToDelete = tasks.find(
      (task) => task.id === id
    );

    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", id);

    if (error) {
      console.log(error);

      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to delete task",
      });

      return;
    }

    await loadTasks();

    Toast.show({
      type: "success",
      text1: "Task Deleted",
      text2:
        (taskToDelete?.title || "Task") +
        " deleted successfully",
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>TaskFlow</Text>
      </View>

      <TaskForm
        task={task}
        setTask={setTask}
        onAdd={addTask}
      />

      <View style={styles.taskContainer}>
        {tasks.map((item) => (
          <TaskItem
            key={item.id}
            item={item}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        ))}
      </View>

      <Toast />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  header: {
    marginBottom: 25,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#222",
  },
  taskContainer: {
    marginTop: 5,
  },
});