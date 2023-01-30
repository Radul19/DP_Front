import React from "react";
import { Box, HStack, Image, Pressable, ScrollView, Text } from "native-base";
import profile from "../../images/profilecard.png";
import cardid from "../../images/cedula.jpg";
import { Dimensions } from "react-native";
import { ArrowLeftThin, ArrowRightThin } from "../../components/IconMonstr";

const ww = Dimensions.get("window").width;

const UserRequestsData = ({ navigation }) => {
  return (
    <ScrollView
      bg="darkBlue.900"
      flex={1}
      {...{ contentContainerStyle: { flexGrow: 1 } }}
    >
      <Box flex={1} p={4}>
        <Text color="light.50" fontSize={24} mb={4}>
          Solicitud de delivery
        </Text>
        <HStack>
          <Image source={profile} alt="profilepic" borderRadius={4} size={32} />
          <Box ml={4} justifyContent="space-between">
            <Text color="light.50" fontSize={18}>
              Fernando Pepe
            </Text>
            <Text color="light.50" fontSize={14}>
              29519805
            </Text>
            <Text color="light.50" fontSize={14}>
              Zulia - Cabimas
            </Text>
            <Text color="light.50" fontSize={14}>
              fernando@gmail.com
            </Text>
          </Box>
        </HStack>
        <Image
          source={cardid}
          alt="cedula"
          resizeMode="cover"
          w={ww - 32}
          h={(ww - 32) * 0.75}
          my={6}
          borderRadius={4}
        />

        <HStack justifyContent="space-between" mb={24}>
          <Pressable {...btnSecondary}>
            {({ isPressed }) => {
              return (
                <Text
                  fontWeight="bold"
                  color={isPressed ? "yellow.500" : "light.50"}
                >
                  Rechazar
                </Text>
              );
            }}
          </Pressable>
          <Pressable {...btnPrimary}>
            {({ isPressed }) => {
              return (
                <Text
                  fontWeight="bold"
                  color={isPressed ? "yellow.500" : "darkBlue.900"}
                >
                  Aprobar
                </Text>
              );
            }}
          </Pressable>
        </HStack>
        <Box flexDirection="row" mt="auto" justifyContent="space-between">
          <ButtonLeft nav={navigation} />
          <ButtonRight nav={navigation} />
        </Box>
      </Box>
    </ScrollView>
  );
};

export default UserRequestsData;

const btnPrimary = {
  px: 4,
  py: 2,
  w: "45%",
  alignItems: "center",
  borderWidth: 1,
  bg: "yellow.500",
  borderColor: "yellow.500",
  borderRadius: 2,
  _pressed: {
    bg: "#ffffff00",
  },
};
const btnSecondary = {
  px: 4,
  py: 2,
  w: "45%",
  alignItems: "center",
  borderWidth: 1,
  borderColor: "light.50",
  borderRadius: 2,
  _pressed: {
    borderColor: "yellow.500",
  },
};

const ButtonLeft = ({ nav }) => {
  const pressBack = () => nav.navigate("UserRequests");
  return (
    <Pressable {...buttonStyles} onPress={pressBack}>
      {({ isPressed }) => {
        return (
          <>
            <ArrowLeftThin
              color={isPressed ? "yellow.500" : "light.50"}
              size={4}
            />
            <Text
              color={isPressed ? "yellow.500" : "light.50"}
              fontSize={12}
              ml={3}
            >
              Regresar
            </Text>
          </>
        );
      }}
    </Pressable>
  );
};

const ButtonRight = ({ nav }) => {
  const pressNext = () => nav.navigate("DeliRequestsData");
  return (
    <Pressable {...buttonStyles} onPress={pressNext}>
      {({ isPressed }) => {
        return (
          <>
            <Text
              color={isPressed ? "yellow.500" : "light.50"}
              fontSize={12}
              mr={3}
            >
              Siguiente
            </Text>
            <ArrowRightThin
              color={isPressed ? "yellow.500" : "light.50"}
              size={4}
            />
          </>
        );
      }}
    </Pressable>
  );
};

const buttonStyles = {
  flexDirection: "row",
  py: 2,
  alignItems: "center",
};
