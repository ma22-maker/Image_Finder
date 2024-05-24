// import { useRouter } from 'expo-router';
import { StatusBar } from "expo-status-bar";
// import 'react-native-gesture-handler';
import {
  Pressable,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import {
  useGetTopics,
  useGetTrends,
  useGetCollections,
  useGetRandomPhotos,
  useGetGeneratedPic
} from "../../hooks/getTopichook";
import { getGreetingTime } from "../../api/helper";
import { MaterialIcons } from "@expo/vector-icons";
import Catagories from "../../components/catagories";
import Trending from "../../components/trending";
import Randompics from "../../components/random_photos";
import Collections from "../../components/collections";

export default function Homeapp() {
  const [searchterm, setSearchterm] = useState("");
  const [greeting, setGreeting] = useState("Hello User");
  const { data: category, error } = useGetTopics();
  const { data: Trends, status } = useGetTrends();
  const { data: collections, isPending } = useGetCollections();
  const { data: RandomPhotos } = useGetRandomPhotos();
  // const { data: GeneratedPic } = useGetGeneratedPic();
  // console.log(GeneratedPic)

  useEffect(() => {
    setGreeting(getGreetingTime()); // Call the helper function on load
    const timer = setInterval(() => {
      setGreeting(getGreetingTime()); // Call the helper function for every one hour to manage the greet
    }, 60 * 60 * 1000);

    return () => clearInterval(timer); // Clean up
  }, []);

  return (
    <SafeAreaView className="bg-[#0d0f13]">
      <ScrollView>
        <View className="flex space-y-6  px-4  my-2">
          <View className="flex flex-row justify-between items-center ">
            <View>
              <Text className="text-3xl  semibold text-[#e6e6e6]">
                {greeting}
              </Text>
            </View>
            <Image
              source={require("../../assets/logo.png")}
              alt="Logo"
              className="w-10 h-10"
              resizeMode="contain"
            />
          </View>
          <View className=" fixed flex flex-row items-center space-x-4 w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-orange-600  focus:border-secondary">
            <TextInput
              className="text-base mt-0.5 text-white flex-1 font-normal pl-2"
              value={searchterm}
              placeholder="Search..."
              placeholderTextColor="#ffffff"
              onChangeText={(e) => setSearchterm(e)}
            />

            {searchterm && (
              <TouchableOpacity onPress={() => setSearchterm("")}>
                <MaterialIcons name="clear" size={24} color="#fd8f4f" />
              </TouchableOpacity>
            )}
          </View>

          <View className="w-full flex-1 pt-3">
            <Text className="text-lg font-normal text-[#e6e6e6] mb-3 pl-2 ">
              Categories
            </Text>
            <FlatList
              horizontal
              // contentContainerStyle ={{paddingHorizontal:''}}
              showsHorizontalScrollIndicator={false}
              data={category}
              keyExtractor={(item) => item.id}
              estimatedItemSize={25}
              renderItem={({ item }) => (
                <Catagories
                  title={item.title}
                  id={item.id}
                  photo={item.photo.thumb}
                />
              )}
            />
          </View>

          <View className=" w-full flex pt-2">
            <Text className="text-lg font-normal text-[#e6e6e6] mb-3 pl-2 ">
              Trending
            </Text>
            <Trending trends={Trends} />
          </View>

          <View className=" w-full flex pt-3 ">
            <Text className="text-lg font-normal text-[#e6e6e6] mb-3 pl-2 ">
              collections
            </Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={collections}
              keyExtractor={(item) => item.id}
              estimatedItemSize={25}
              renderItem={({ item }) => (
                <Collections
                  title={item.title}
                  id={item.id}
                  photo={item.preview_photos[1].urls.regular}
                  blur_hash={item.blur_hash}
                />
              )}
            />
          </View>

          <View className=" w-full flex pt-3">
            <Text className="text-lg font-normal text-[#e6e6e6] mb-3 pl-2 ">
              Radom Photos
            </Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={RandomPhotos}
              keyExtractor={(item) => item.id}
              estimatedItemSize={25}
              renderItem={({ item }) => (
                <Randompics
                  id={item.id}
                  blur_hash={item.blur_hash}
                  photo={item.urls.regular}
                />
              )}
            />
          </View>
          <StatusBar style="auto" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
