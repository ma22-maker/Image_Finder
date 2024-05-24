import { Text, View,Pressable,ImageBackground } from 'react-native'
// import LottieView from 'lottie-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react'

const Collections = ({ title, id, photo ,blur_hash}) => {
  return (
    <Pressable className="mx-2 flex ">
    <ImageBackground source={{uri : photo}} placeholder={blur_hash} resizeMode='cover' imageStyle={{ borderTopRightRadius: 100 ,borderRadius:10}} className="flex-1 w-60 p-20 h-96">
     <LinearGradient
      colors={['#374147','transparent']}
      start={{ x: 0.5, y: 1 }}
      end={{ x: 0.5, y: 0 }}
      className="absolute bottom-0 p-[120px] rounded-e-full"
   /> 
    <Text className="text-[#fefefe] absolute bottom-4 inset-x-1/2 text-center text-base">{title}</Text>
    </ImageBackground> 
  </Pressable>
  )
}

export default Collections