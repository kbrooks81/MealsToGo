// src/app/(tabs)/maps.tsx
import React, { useContext } from "react";
import { View, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useLocalSearchParams } from "expo-router";
import { LocationContext } from "@/services/location/location.context";
import { RestaurantsContext } from "@/services/restaurants/restaurants.context";

export default function MapScreen() {
  const { location } = useContext(LocationContext);
  const { restaurants, isLoading } = useContext(RestaurantsContext);

  // params from router when user taps a specific restaurant
  const params = useLocalSearchParams<{
    lat?: string;
    lng?: string;
    name?: string;
  }>();

  const selectedLat = params.lat ? parseFloat(params.lat as string) : undefined;
  const selectedLng = params.lng ? parseFloat(params.lng as string) : undefined;
  const selectedName = (params.name as string) || "Selected restaurant";
  const hasSelectedRestaurant = selectedLat != null && selectedLng != null;

  // still loading location / restaurants?
  if (!location || isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-bg-primary">
        <ActivityIndicator />
      </View>
    );
  }

  // CENTER of the map:
  // - if we have a selected restaurant, center on it
  // - otherwise center on the city location from LocationContext
  const centerLat = hasSelectedRestaurant ? selectedLat! : location.lat;
  const centerLng = hasSelectedRestaurant ? selectedLng! : location.lng;

  // changing this key forces MapView to remount with new initialRegion
  const mapKey = `${centerLat}-${centerLng}-${hasSelectedRestaurant ? "one" : "all"}`;

  // MARKERS:
  const markers = hasSelectedRestaurant
    ? [
        {
          key: selectedName,
          latitude: selectedLat!,
          longitude: selectedLng!,
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
      <MapView
        key={mapKey}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: centerLat,
          longitude: centerLng,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
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
