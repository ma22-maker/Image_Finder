import { Text, View,Pressable,ImageBackground } from 'react-native'
import { FlashList } from "@shopify/flash-list";
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react'


const Catagories = ({ title, id, photo }) => {
  return (
    <Pressable className="mx-2 flex ">
      <ImageBackground source={{uri : photo}} resizeMode='cover' imageStyle={{ borderRadius: 18 }} className="flex-1 w-44 p-20">
      <LinearGradient
        colors={['#fe7e2b','transparent']}
        start={{ x: 0.5, y: 1 }}
        end={{ x: 0.5, y: 0 }}
        className="absolute bottom-0 p-[88px] rounded-e-full"
     />
      <Text className="text-[#fefefe] absolute bottom-4 inset-x-1/2 text-center text-base">{title}</Text>
      </ImageBackground> 
    </Pressable>
  )
}

export default Catagories
