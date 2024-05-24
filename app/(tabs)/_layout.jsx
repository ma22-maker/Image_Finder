import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router/tabs";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "red",
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 72,
          // borderWidth: 1,
          alignItems: "center",
          justifyContent: "center",
          // borderColor:"orange",
          backgroundColor: "#0d0f13",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "home",
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="home"
              size={30}
              color={focused ? "#fd7014" : "white"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "create",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="create"
              size={30}
              color={focused ? "#fd7014" : "white"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favourite"
        options={{
          title: "favourite",
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="heart"
              size={30}
              color={focused ? "#fd7014" : "white"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "settings",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="settings"
              size={30}
              color={focused ? "#fd7014" : "white"}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
