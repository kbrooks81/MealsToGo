import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import close from '../assets/images/close';
import open from '../assets/images/open';
import star from '../assets/images/star';


type RestaurantInfoCardProps = {
  restaurant: any;
  onPress?: () => void;
};

const RestaurantInfoCard = ({ restaurant = {}, onPress, }: RestaurantInfoCardProps) => {
  const {
    name = 'Some Restaurant',
    icon = "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
    photos = [
      "https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg"
    ],
    address = '100 Some Random Street',
    isOpenNow = false,
    rating = 4,
  } = restaurant;

  const ratingArray = Array.from(new Array(Math.floor(rating)));

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View className='bg-bg-primary mb-md p-md rounded-lg shadow-lg overflow-hidden'>
        <Image source={{ uri: photos[0] }} className='w-full h-xl rounded-lg' />
        <View className='p-sm'>
          <Text className='color-text-primary text-body font-heading mt-xs'>{name}</Text>
          
          <View className="flex-row justify-between items-center mt-sm">
              <View className="flex-row">
                  {ratingArray.map((_, index) => (
                      <SvgXml key={index} xml={star} width={20} height={20} />
                  ))}
              </View>

              <View className="flex-row items-center gap-x-lg">
                  {isOpenNow ? (
                      <SvgXml xml={open} width={25} height={25} />
                  ) : (
                      <SvgXml xml={close} width={25} height={25} />
                  )}
                  <Image style={{ width: 20, height: 20 }} source={{ uri: icon }} />
              </View>
          </View>


          <Text className='text-caption font-body'>{address}</Text>
        </View>

      </View>
    </TouchableOpacity>
  );
};

export default RestaurantInfoCard;
