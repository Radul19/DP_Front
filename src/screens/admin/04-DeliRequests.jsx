import React from "react";
import {
  Box,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Text,
} from "native-base";
import Navbar from "../../components/Navbar";
import profile from "../../images/profilecard.png";
import { ArrRight, Delivery1 } from "../../components/IconMonstr";

const UserRequests = ({ navigation }) => {
  return (
    <>
      <ScrollView
        bg="darkBlue.900"
        flex={1}
        {...{ contentContainerStyle: { flexGrow: 1 } }}
      >
        <Box p={4} flex={1}>
          <HStack alignItems="center" mb={4} >
            <Text color="light.50" fontSize={24} mr={3}>
              Solicitudes
            </Text>
            <Box mt={1}>
              <Delivery1 />
            </Box>
          </HStack>
          <Box w="100%">
            <Card nav={navigation} />
            <Card nav={navigation} />
            <Card nav={navigation} />
            <Card nav={navigation} />
            <Card nav={navigation} />
            <Card nav={navigation} />
            <Card nav={navigation} />
          </Box>
        </Box>
      </ScrollView>
      <Box position="absolute" bottom={0} w="100%">
        <Navbar state={5} />
      </Box>
    </>
  );
};

export default UserRequests;

const Card = ({ nav }) => {
  const press = () => nav.navigate("DeliRequestsData");
  return (
    <Pressable {...cardProps} onPress={press}>
      {({ isPressed }) => {
        return (
          <>
            <Image source={profile} size={16} alt="picture" borderRadius={4} />
            <Box ml={4}>
              <Text color={isPressed ? "darkBlue.900" : "light.50"}>
                Fernando Pepe
              </Text>
              <Text color={isPressed ? "darkBlue.900" : "light.50"}>
                29519805
              </Text>
              <Text color={isPressed ? "darkBlue.900" : "light.50"}>
                Zulia - Cabimas
              </Text>
            </Box>
            <Box ml="auto">
              <ArrRight
                size={8}
                color={isPressed ? "darkBlue.900" : "#facc15"}
              />
            </Box>
          </>
        );
      }}
    </Pressable>
  );
};

const cardProps = {
  bg: "blueGray.800",
  my: 2,
  alignItems: "center",
  borderRadius: 4,
  py: 2,
  px: 3,
  flexDirection: "row",
  _pressed: {
    bg: "yellow.500",
  },
};
