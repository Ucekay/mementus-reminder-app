import { View } from "react-native";
import NewTaskInput from "./NewTaskInput";

const NewTaskCard = ({ tasks, updateTasks }) => {
  return (
    <View className="inset-x-0 bottom-0 w-screen rounded-t-[32px] border-2 border-b-0 border-neutral-600 bg-black py-4">
      <View className="h-8 w-screen">
        <View className="mx-auto h-2 w-8 rounded-full bg-neutral-600" />
      </View>
      <NewTaskInput tasks={tasks} updateTasks={updateTasks} />
    </View>
  );
};

export default NewTaskCard;
