import { View } from "react-native";
import NewTaskInput from "./NewTaskInput";

const NewTaskCard = () => {
  return (
    <View className="bottom-0 right-0 left-0 w-screen rounded-t-[32px] border-2 border-b-0 border-neutral-600 bg-black py-4">
      <View className="w-screen h-8">
        <View className="w-8 h-2 bg-neutral-600 rounded-full mx-auto" />
      </View>
      <NewTaskInput />
    </View>
  );
};

export default NewTaskCard;
