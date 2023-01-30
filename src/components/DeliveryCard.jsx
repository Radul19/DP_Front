import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Box, Text, Pressable, Avatar } from "native-base";

const colorStatus = ["success.500", "error.500", "yellow.500"];
const textStatus = ["Disponible", "Ocupado", "Ausente"];

const DeliveryCard = ({ user, findChat }) => {
  const { _id, name, second_name, delivery_status, profile_pic } = user;
  const nav = useNavigation();
  const goChat = () => {
    findChat(_id);
    // nav.navigate("Chat");
  };
  const goDeli = () => {
    nav.navigate("DeliveryPage", { user });
  };
  return (
    <Box
      {...{
        flexDirection: "row",
        bg: "blueGray.800",
        borderRadius: 12,
        overflow: "hidden",
        pr: 4,
        my: 2,
      }}
    >
      <Box px={1.5} py={-2} bg={colorStatus[delivery_status]}></Box>
      <Pressable onPress={goDeli} _pressed={{ opacity: 0.5 }}>
        <Avatar
          alignSelf="center"
          my={3}
          mx={2}
          size={16}
          source={{ uri: profile_pic }}
        ></Avatar>
      </Pressable>
      <Pressable
        _pressed={{ opacity: 0.5 }}
        onPress={goChat}
        {...{ flex: 1, justifyContent: "space-evenly" }}
      >
        <Box {...{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text fontSize={16} color="light.50">
            {name.split(" ", 1) + " " + second_name.split(" ", 1)}
          </Text>
          <Box
            {...{
              borderRadius: 12,
              borderWidth: 1,
              borderColor: colorStatus[delivery_status],
              py: 0.5,
              px: 4,
              justifyContent: "center",
            }}
          >
            <Text {...{ fontSize: 10, color: colorStatus[delivery_status] }}>
              {textStatus[delivery_status]}
            </Text>
          </Box>
        </Box>
        <Text color="light.50">Avenida Universidad</Text>
      </Pressable>
      {/* <InfoIcon ml={4} mr={4} alignSelf="center" /> */}
    </Box>
  );
};

export default DeliveryCard;
