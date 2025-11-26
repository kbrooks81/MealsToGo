import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "../../../../components/SearchBar";
import RestaurantInfoCard from "../components/RestaurantInfoCard";

const RestaurantScreen = () => {
  return (
    <>
      <SafeAreaView className="flex-1 bg-bg-secondary" edges={["top", "bottom"]}>
        <View className="p-md">
          <SearchBar />
        </View>
        <View className="flex-1 p-md">
          <RestaurantInfoCard />
        </View>
      </SafeAreaView>
    </>
  )
}

export default RestaurantScreen