import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Animated from "react-native-reanimated";
const Splash = () => {
  const navigation = useNavigation();

  return (
    <>
      <View className="flex-1 bg-slate-900 ">
        <Image
          source={require("../../assets/minebg.jpg")}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
        />
      </View>
      <View className="top-[32%] w-full gap-y-2 text-center absolute items-center">
        <Text className=" text-7xl text-start  font-bold text-orange-400">
          m💣ne
        </Text>
        <Text className=" text-7xl text-center   font-bold text-orange-400">
          sweeper
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("main")}
          className="bg-green-600 border-r-4 border-b-4 border-green-300 p-7 mt-8 w-1/2 rounded-3xl"
        >
          <Text className="text-2xl text-white font-extrabold text-center">
            start game
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Splash;
