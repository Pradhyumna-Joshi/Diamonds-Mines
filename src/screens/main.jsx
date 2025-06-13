import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import Block from "../components/block";
import { BlurView } from "expo-blur";
import { Audio } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Animated, { FadeIn, FadeInUp } from "react-native-reanimated";
const Main = () => {
  const navigation = useNavigation();

  const [list, setList] = useState();
  const [score, setScore] = useState(0);
  const [modal, setModal] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [noGems, setNoGems] = useState(8);
  const [noMines, setNoMines] = useState(1);
  const [multiplier, setMultiplier] = useState(noMines);
  const [gemsFound, setGemsFound] = useState(0);
  const handleClick = (id) => {
    const updatedList = list.map((item) =>
      item.id === id ? { ...item, isClicked: !item.isClicked } : item
    );

    const selectedItem = updatedList.find((item) => item.id === id);
    if (selectedItem.value === 1) {
      setScore((prev) => prev + 1 * multiplier);
      setGemsFound((prev) => prev + 1);
      if (gemsFound + 1 === noGems) {
        revealAll();
      }
      setList(updatedList);
    } else {
      revealAll();
    }
    console.log(selectedItem);
  };

  useEffect(() => {
    handleRestart();
  }, []);

  useEffect(() => {
    if (gemsFound === noGems) playSound();
  }, [score]);

  const generateList = (gems, mines) => {
    const temp = [];
    let i = 1;
    for (i; i <= gems; i++) {
      temp.push({
        id: i,
        isClicked: false,
        image: "GEMSTONE",
        value: 1,
      });
    }

    for (; i <= gems + mines; i++) {
      temp.push({
        id: i,
        isClicked: false,
        image: "MINE",
        value: 0,
      });
    }

    const shuffled = shuffleList(temp);
    console.log(shuffled);
    setList(shuffled);
  };

  const shuffleList = (inputList) => {
    const temp = [...inputList];
    for (let i = temp.length - 1; i > 0; i--) {
      const index = Math.floor(Math.random() * (i + 1));
      let a = temp[i];
      temp[i] = temp[index];
      temp[index] = a;
    }
    return temp;
  };

  const handleRestart = () => {
    playSound("restart");
    setScore(0);
    setGemsFound(0);
    setModal(false);
    setDisabled(false);
    generateList(noGems, noMines);
  };

  const handleGameLost = () => {
    setDisabled(true);
    setTimeout(() => {
      setModal(true);
    }, 1500);
  };

  const playSound = async (value) => {
    const MUSIC =
      value === "restart"
        ? require("../../assets/gameintro.wav")
        : gemsFound === noGems
        ? require("../../assets/gamecomplete.wav")
        : value === 1
        ? require("../../assets/click.wav")
        : require("../../assets/explosion.wav");
    const { sound } = await Audio.Sound.createAsync(MUSIC);
    await sound.playAsync();
  };

  const revealAll = () => {
    const temp = list.map((item) => ({ ...item, isClicked: true }));
    setList(temp);
    handleGameLost();
  };

  const handleCount = (input) => {
    if (input === "gems") {
      if (noGems !== 8) {
        let temp_gems = noGems + 1;
        let temp_mines = noMines - 1;
        setNoGems(temp_gems);
        setNoMines(temp_mines);
        setMultiplier(temp_mines * 2);
        generateList(temp_gems, temp_mines);
      } else {
        Alert.alert("Maximum Limit", "Maximum no of gems can be 8");
      }
    } else {
      if (noMines !== 8) {
        let temp_gems = noGems - 1;
        let temp_mines = noMines + 1;
        setNoMines(temp_mines);
        setNoGems(temp_gems);
        setMultiplier(temp_mines * 2);
        generateList(temp_gems, temp_mines);
      } else {
        Alert.alert("Maximum Limit", "Maximum no of mines can be 8");
      }
    }
  };

  return (
    <View className="flex-1 justify-center bg-black ">
      {(modal || gemsFound === noGems) && (
        <View className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-70 z-10" />
      )}
      {modal && (
        <View className="absolute w-[84%] mx-auto z-10 h-[300px] right-[8%]  top-[25%] p-4 rounded-2xl bg-red-400 opacity-100 justify-center items-center ">
          <Text className="text-center text-2xl ">Ooooppps...try again</Text>
          <Text className="text-center text-5xl ">your score</Text>
          <Text className="text-center text-5xl mt-5">{score}</Text>
          <TouchableOpacity
            onPress={() => handleRestart()}
            className="bg-red-600 border-r-8 border-b-8 border-red-300 p-7 mt-8 w-1/2 rounded-3xl"
          >
            <Text className="text-2xl text-white font-extrabold text-center">
              Restart
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {gemsFound === noGems && (
        <View className="absolute w-[84%] mx-auto z-10 h-[300px] right-[8%] top-[25%] p-4 rounded-2xl bg-green-500 opacity-100 justify-center items-center ">
          <Text className="text-center text-2xl ">Hurrayyy...</Text>
          <Text className="text-center text-5xl ">You Won...</Text>

          <TouchableOpacity
            onPress={() => handleRestart()}
            className="bg-green-600 border-r-8 border-b-8 border-green-300 p-7 mt-8 w-1/2 rounded-3xl"
          >
            <Text className="text-2xl text-white font-extrabold text-center">
              Restart
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="absolute bg-slate-500 rounded-full  top-20 left-4 p-2"
      >
        <Ionicons name="arrow-back" size={32} color={""} />
      </TouchableOpacity>
      <View className="absolute flex-row gap-x-5 items-center  bg-slate-700 border-r-4  border-b-4 border-slate-400 rounded-2xl  top-20 right-5 py-4 px-10">
        <Image
          style={{ width: 24, height: 24 }}
          source={require("../../assets/gemstone.png")}
        />
        <Text className="text-3xl text-white ">{score}</Text>
      </View>

      <View className="h-[50%]">
        <FlatList
          data={list}
          numColumns={3}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <Block
              item={item}
              index={index}
              onClick={() =>
                !modal &&
                !item.isClicked &&
                playSound(item.value) &&
                handleClick(item.id)
              }
              disabled={modal}
            />
          )}
        />
      </View>
      <View className="flex-row w-full bg-slate-700 items-center justify-between rounded-2xl">
        <TouchableOpacity
          onPress={() => handleCount("gems")}
          className="flex-row w-1/4 items-center gap-x-7 bg-slate-500 p-4 rounded-l-2xl "
        >
          <Image
            style={{ width: 32, height: 32 }}
            source={require("../../assets/gemstone.png")}
          />
          <Text className="text-3xl text-white">{noGems}</Text>
        </TouchableOpacity>

        <Text className="text-3xl text-center text-green-400 font-extrabold">
          {multiplier}x
        </Text>

        <TouchableOpacity
          onPress={() => handleCount("mines")}
          className="flex-row w-1/4 items-center gap-x-7 bg-slate-500 p-4  rounded-r-2xl"
        >
          <Text className="text-3xl text-white">{noMines}</Text>
          <Image
            style={{ width: 32, height: 32 }}
            source={require("../../assets/mine.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Main;
