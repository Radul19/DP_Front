import React from "react";
import { Box, Button, HStack, Image, Text } from "native-base";

const User_Card = ({ user }) => {
  const { name, card_id, place, email, profile_pic } = user;
  return (
    <HStack>
      <Image source={profile_pic} alt="profilepic" borderRadius={4} size={32} />
      <Box ml={4} justifyContent="space-between">
        <Text color="light.50" fontSize={18}>
          {name}
        </Text>
        <Text {...textStyle}>{card_id}</Text>
        <Text {...textStyle}>{place}</Text>
        <Text {...textStyle}>{email}</Text>
      </Box>
      
    </HStack>
  );
};

export default User_Card;

const textStyle = {
  color: "light.50",
  fontSize: 14,
};
