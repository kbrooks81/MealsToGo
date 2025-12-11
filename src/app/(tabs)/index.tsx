import React, { useContext } from "react";
import { RestaurantsContext } from "@/services/restaurants/restaurants.context";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RestaurantInfoCard from "@/components/RestaurantInfoCard";
import SearchBar from "@/components/SearchBar";
import { ActivityIndicator } from "react-native-paper";
import { useRouter } from "expo-router";

export default function Index() {
  const { isLoading, restaurants } = useContext(RestaurantsContext);
  const router = useRouter();

  const handleRestaurantPress = (restaurant: any) => {
    router.push({
      pathname: "/(tabs)/maps",
      params: {
        lng: restaurant.geometry.location.lng,
        lat: restaurant.geometry.location.lat,
        name: restaurant.name,
      },
    });
  };

  return (
    <>
      <SafeAreaView
        className="flex-1 bg-bg-secondary"
        edges={["top", "bottom"]}
      >
        <View className="p-md">
          <SearchBar />
        </View>
        <View className="flex-1 pl-sm pr-sm pt-sm">
          {isLoading && (
            <View className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <ActivityIndicator
                animating={true}
                color={"#5282BD"}
                size="large"
              />
            </View>
          )}

          <FlatList
            data={restaurants}
            renderItem={({ item }) => {
              return (
                <RestaurantInfoCard
                  restaurant={item}
                  onPress={() => handleRestaurantPress(item)}
                />
              );
            }}
            keyExtractor={(item) => item.name}
            contentContainerStyle={{ padding: 16 }}
          />
        </View>
      </SafeAreaView>
    </>
  );
}
