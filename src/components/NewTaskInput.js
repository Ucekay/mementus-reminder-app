import { View, Text, TextInput, Pressable } from "react-native";
import { useState, useEffect } from "react";

const NewTaskInput = ({ tasks, updateTasks }) => {
  const [text, onChangeText] = useState("");
  const [newTask, setNewTask] = useState("");
  handleAdd = () => {
    if (text !== "") {
      updateTasks((draft) => {
        draft[draft.length - 1].data.push({
          content: text,
          time: null,
          completed: false,
        });
      });
    }
    onChangeText("");
  };
  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  return (
    <View className="m-0 w-full flex-row items-center gap-4 bg-black">
      <View className="m-4 size-4 rounded-full border border-white" />
      <TextInput
        className="grow text-white"
        placeholder="新しいタスクを追加"
        placeholderTextColor="white"
        onChangeText={onChangeText}
        value={text}
      />
      <Pressable
        onPress={handleAdd}
        className="m-4 shrink rounded-md bg-neutral-600"
      >
        <Text className="mx-3 my-1 text-white">追加</Text>
      </Pressable>
    </View>
  );
};

export default NewTaskInput;
