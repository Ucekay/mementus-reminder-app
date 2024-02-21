import { useState } from "react";
import { useImmer } from "use-immer";
import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import ListHeader from "../components/ListHeader";
import TaskList from "../components/TaskList";
import NewTaskCard from "../components/NewTaskCard";

import taskData from "../taskData";

import { verifyInstallation } from "nativewind";

function Page() {
  verifyInstallation();
  const [tasks, updateTasks] = useImmer(taskData);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.screen}>
        <StatusBar style="auto" />
        <ListHeader />
        <View className="flex-1">
          <TaskList tasks={tasks} updateTasks={updateTasks} />
          <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={84}>
            <NewTaskCard tasks={tasks} updateTasks={updateTasks} />
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default Page;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#000",
  },
});
