import React, {useContext} from "react";
import { RestaurantsContext } from "@/services/restaurants/restaurants.context";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RestaurantInfoCard from "@/components/RestaurantInfoCard";
import SearchBar from "@/components/SearchBar";


export default function Index() {
  const { isLoading, error, restaurants } = useContext(RestaurantsContext);

  return (
    <>
      <SafeAreaView className="flex-1 bg-bg-secondary" edges={["top", "bottom"]}>
        <View className="p-md">
          <SearchBar />
        </View>
        <View className="flex-1 pl-sm pr-sm pt-sm">
          <FlatList
            data={restaurants}
            renderItem={({item}) => {
              return <RestaurantInfoCard restaurant={item} />
            }}
            keyExtractor={(item) => item.name}
            contentContainerStyle={{ padding: 16 }}
          />
        </View>
      </SafeAreaView>
    </>
  )
}
