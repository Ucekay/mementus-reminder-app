import { View, Text, TextInput, Pressable } from "react-native";
import { useState } from "react";

const NewTaskInput = () => {
  const [text, onChangeText] = useState("");
  const [newTask, setNewTask] = useState("");
  handleAdd = () => {
    setNewTask(text);
    onChangeText("");
    console.log(text);
  };
  return (
    <View className="w-full items-center flex-row gap-4 bg-black m-0">
      <View className="h-4 w-4 border rounded-full border-white m-4" />
      <TextInput
        className="grow text-white"
        placeholder="新しいタスクを追加"
        placeholderTextColor="white"
        onChangeText={onChangeText}
        value={text}
      />
      <Pressable
        onPress={handleAdd}
        className="shrink bg-neutral-600 m-4 rounded-md"
      >
        <Text className="text-white my-1 mx-3">追加</Text>
      </Pressable>
    </View>
  );
};

export default NewTaskInput;
