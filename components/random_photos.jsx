import { Text, View,Pressable,Image } from 'react-native'
import React from 'react'

const Randompics = ({id,blur_hash,photo}) => {
  return (
    <Pressable className="mx-2 flex ">
       <Image
       className="w-80 h-96 rounded-xl"
       source={{uri: photo}}
        placeholder={{ blur_hash }}
        contentFit="cover"
        transition={1000}
      />
  </Pressable>
  )
}

export default Randompics