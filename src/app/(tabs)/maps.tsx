import React, { useContext } from "react";
import { View, ActivityIndicator } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import { useLocalSearchParams } from "expo-router";
import { LocationContext } from "@/services/location/location.context";
import { RestaurantsContext } from "@/services/restaurants/restaurants.context";

const getDeltasFromViewport = (viewport?: any) => {
  if (!viewport?.northeast || !viewport?.southwest) return null;

  const latDelta = Math.abs(viewport.northeast.lat - viewport.southwest.lat);
  const lngDelta = Math.abs(viewport.northeast.lng - viewport.southwest.lng);

  const padding = 1.4;

  const safeLatDelta = Math.max(latDelta * padding, 0.01);
  const safeLngDelta = Math.max(lngDelta * padding, 0.01);

  return { latitudeDelta: safeLatDelta, longitudeDelta: safeLngDelta };
};

export default function MapScreen() {
  const { location, cityKey } = useContext(LocationContext);
  const { restaurants, isLoading } = useContext(RestaurantsContext);

  const params = useLocalSearchParams<{
    lat?: string;
    lng?: string;
    name?: string;
    id?: string;
    cityKey?: string;
  }>();

  const selectedLat = params.lat ? Number(params.lat) : NaN;
  const selectedLng = params.lng ? Number(params.lng) : NaN;
  const selectedName =
    typeof params.name === "string" ? params.name : "Selected restaurant";
  const selectedKey =
    typeof params.id === "string" && params.id.length
      ? params.id
      : `${selectedName}-${selectedLat}-${selectedLng}`;
  const selectedCityKey = params.cityKey ? Number(params.cityKey) : NaN;
  const currentCityKey = cityKey;

  const selectionMatchesCity =
    Number.isFinite(selectedCityKey) && selectedCityKey === currentCityKey;

  const hasSelectedRestaurant =
    selectionMatchesCity &&
    Number.isFinite(selectedLat) &&
    Number.isFinite(selectedLng);

  const hasCityLocation =
    location && Number.isFinite(location.lat) && Number.isFinite(location.lng);

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

  const cityDeltas = getDeltasFromViewport(location?.viewport);

  const latitudeDelta = hasSelectedRestaurant
    ? 0.01
    : (cityDeltas?.latitudeDelta ?? 0.2);

  const longitudeDelta = hasSelectedRestaurant
    ? 0.01
    : (cityDeltas?.longitudeDelta ?? 0.2);

  const region: Region = {
    latitude: centerLat,
    longitude: centerLng,
    latitudeDelta,
    longitudeDelta,
  };

  const markers = hasSelectedRestaurant
    ? [
        {
          key: selectedKey,
          latitude: selectedLat,
          longitude: selectedLng,
          name: selectedName,
        },
      ]
    : restaurants.map((restaurant: any) => ({
        key: restaurant.placeId,
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
