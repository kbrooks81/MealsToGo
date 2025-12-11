import React, { useContext } from "react";
import { View, ActivityIndicator } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import { useLocalSearchParams } from "expo-router";
import { LocationContext } from "@/services/location/location.context";
import { RestaurantsContext } from "@/services/restaurants/restaurants.context";

export default function MapScreen() {
  const { location } = useContext(LocationContext);
  const { restaurants, isLoading } = useContext(RestaurantsContext);

  const params = useLocalSearchParams<{
    lat?: string;
    lng?: string;
    name?: string;
  }>();

  const selectedLat = params.lat ? Number(params.lat) : NaN;
  const selectedLng = params.lng ? Number(params.lng) : NaN;
  const selectedName =
    typeof params.name === "string" ? params.name : "Selected restaurant";

  const hasSelectedRestaurant =
    Number.isFinite(selectedLat) && Number.isFinite(selectedLng);

  const hasCityLocation =
    location &&
    Number.isFinite(location.lat) &&
    Number.isFinite(location.lng);

  if (isLoading || (!hasSelectedRestaurant && !hasCityLocation)) {
    return (
      <View className="flex-1 items-center justify-center bg-bg-primary">
        <ActivityIndicator />
      </View>
    );
  }

  const centerLat = hasSelectedRestaurant
    ? selectedLat
    : (location!.lat as number);

  const centerLng = hasSelectedRestaurant
    ? selectedLng
    : (location!.lng as number);

  const latitudeDelta = hasSelectedRestaurant ? 0.01 : 0.02;
  const longitudeDelta = hasSelectedRestaurant ? 0.01 : 0.02;

  const region: Region = {
    latitude: centerLat,
    longitude: centerLng,
    latitudeDelta,
    longitudeDelta,
  };

  const markers = hasSelectedRestaurant
    ? [
        {
          key: selectedName,
          latitude: selectedLat,
          longitude: selectedLng,
          name: selectedName,
        },
      ]
    : restaurants.map((restaurant: any) => ({
        key: restaurant.name,
        latitude: restaurant.geometry.location.lat,
        longitude: restaurant.geometry.location.lng,
        name: restaurant.name,
      }));

  return (
    <View style={{ flex: 1 }}>
      <MapView style={{ flex: 1 }} region={region}>
        {markers.map((m: any) => (
          <Marker
            key={m.key}
            coordinate={{ latitude: m.latitude, longitude: m.longitude }}
            title={m.name}
          />
        ))}
      </MapView>
    </View>
  );
}
