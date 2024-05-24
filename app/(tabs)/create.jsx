import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';

export default function CreateScreen() {
  
  const [Generateterm, setGenerateterm] = useState("");

  return (
    <SafeAreaView className="bg-[#0d0f13]">
      <ScrollView className="flex space-y-6  px-4  my-2">
        <View className="flex  flex-row items-center space-x-4 w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-orange-600  focus:border-secondary">
          <TextInput
            className="text-base mt-0.5 text-white flex-1 font-normal pl-2"
            value={Generateterm}
            placeholder="Generate an Image .."
            placeholderTextColor="#ffffff"
            onChangeText={(e) => setGenerateterm(e)}
          />
              {Generateterm && (
              <TouchableOpacity>
               <Ionicons name="build" size={24} color="orange" />
              </TouchableOpacity>
            )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
