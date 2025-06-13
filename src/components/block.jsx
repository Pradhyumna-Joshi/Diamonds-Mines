import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOut,
} from "react-native-reanimated";
const Block = ({ item, index, onClick, disabled }) => {
  const imageMap = {
    GEMSTONE: require("../../assets/gemstone.png"),
    MINE: require("../../assets/mine.png"),
  };
  return (
    <Animated.View
      entering={FadeInDown.delay(100 * index)
        .duration(200)
        .springify()}
      className="flex-1 "
    >
      <TouchableOpacity
        disabled={disabled}
        onPress={onClick}
        className={`flex items-center justify-center  h-[100px] m-1   rounded-xl ${
          item.isClicked
            ? item.value === 0
              ? "bg-red-400 border-r-4 border-b-4 border-red-800"
              : "bg-green-200 border-r-4 border-b-4 border-green-800"
            : "bg-slate-500 border-r-4 border-b-4 border-slate-300"
        }`}
      >
        {item.isClicked ? (
          <Image
            source={imageMap[item.image]}
            style={{ width: 36, height: 36 }}
          />
        ) : (
          <Text></Text>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Block;
