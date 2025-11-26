import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "../../../../components/SearchBar";
import RestaurantInfoCard from "../components/RestaurantInfoCard";

const RestaurantScreen = () => {
  return (
    <>
      <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
        <View style={styles.search}>
          <SearchBar />
        </View>
        <View style={styles.list}>
          <RestaurantInfoCard />
        </View>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  search: {
    padding: 16,
  },
  list: {
    flex: 1,
    padding: 16,
  }
});

export default RestaurantScreen