import { Box, HStack, Image, Pressable, ScrollView, Text } from "native-base";
import profile from "../../images/profilecard.png";
import profile2 from "../../images/girl2.png";
import Navbar from "../../components/Navbar";
import { Dimensions } from "react-native";
import User_Card from "./User_Card";
import { useState } from "react";
import { ArrowLeftThin, ArrowRightThin } from "../../components/IconMonstr";

const ww = Dimensions.get("window").width;
const smallw = ww / 2 - 32;
const smallh = (ww / 2 - 32) * 0.5625 + smallw;

const ComplaintsData = ({ navigation }) => {
  const user1 = {
    name: "Fernando Pepe",
    card_id: "19519519",
    place: "Zulia - Cabimas",
    email: "fernando@gmail.com",
    profile_pic: profile,
  };
  const user2 = {
    name: "Amanda Faye",
    card_id: "19217217",
    place: "Zulia - Cabimas",
    email: "amanda@gmail.com",
    profile_pic: profile,
  };

  const [cardDisplay, setCardDisplay] = useState(false);
  const [userDisplay, setUserDisplay] = useState(user1);

  const onCardLeft = () => {
    setCardDisplay(false);
    setUserDisplay(user2);
  };
  const onCardRight = () => {
    setCardDisplay(true);
    setUserDisplay(user1);
  };

  return (
    <>
      <ScrollView
        bg="darkBlue.900"
        flex={1}
        {...{ contentContainerStyle: { flexGrow: 1 } }}
      >
        <Box flex={1} p={4}>
          <Text color="light.50" fontSize={24} mb={4}>
            Denuncia de XXXX
          </Text>
          <Text color="light.50" fontSize={18} mb={2}>
            Some title a some complaint about something
          </Text>
          <Text color="light.50">
            Some title a some complaint about something Some title a some
            complaint about something Some title a some complaint about
            something Some title a some complaint about something
          </Text>
          <HStack justifyContent="space-between" my={4}>
            <Box {...captureStyle}>
              <Text color="light.50">Imagen</Text>
            </Box>
            <Box {...captureStyle}>
              <Text color="light.50">Imagen</Text>
            </Box>
          </HStack>
          {/** BTNS */}
          <HStack justifyContent="space-between" mt={8}  zIndex={100}>
            <Pressable {...btn1} onPress={onCardLeft}>
              <Text color="light.50">Denunciante</Text>
            </Pressable>
            <Pressable {...btn2} onPress={onCardRight}>
              <Text color="light.50">Denunciado</Text>
            </Pressable>
          </HStack>
          {/** CARD DISPLAY  */}
          <Box
            w="100%"
            p={4}
            borderBottomRadius={4}
            bg={cardDisplay ? "darkBlue.900" : "blueGray.800"}
            borderWidth={1}
            borderColor={cardDisplay ? "light.50" : "blueGray.800"}
            mb={6}
          >
            <User_Card user={userDisplay} />
          </Box>

          {/** APPROVE OR DENY */}
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
          {/** END BTNS */}
          <Box flexDirection="row" mt="auto" justifyContent="space-between">
            <ButtonLeft nav={navigation} />
            <ButtonRight nav={navigation} />
          </Box>
        </Box>
      </ScrollView>
    </>
  );
};

export default ComplaintsData;

const ButtonLeft = ({ nav }) => {
  const pressBack = () => nav.navigate("Complaints");
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
  const pressNext = () => nav.navigate("ComplaintsData");
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

const captureStyle = {
  borderWidth: 1,
  borderColor: "light.50",
  borderRadius: 4,
  h: smallh,
  w: smallw,
  alignItems: "center",
  justifyContent: "center",
};

const btn1 = {
  bg: "blueGray.800",
  px: 4,
  py: 2,
  borderTopRadius: 4,
  borderWidth: 1,
  borderColor: "blueGray.800",
};
const btn2 = {
  bg: "darkBlue.900",
  px: 4,
  py: 2,
  borderTopRadius: 4,
  borderWidth: 1,
  borderTopColor: "light.50",
  borderLeftColor: "light.50",
  borderRightColor: "light.50",
  borderBottomColor: "darkBlue.900",
};

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

const buttonStyles = {
  flexDirection: "row",
  py: 2,
  alignItems: "center",
};
