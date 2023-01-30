import React, { useState } from "react";
import {
  Box,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Spinner,
  Text,
} from "native-base";
import profile from "../../images/profilecard.png";
import cardid from "../../images/cedula.jpg";
import { Dimensions } from "react-native";
import { ArrowLeftThin, ArrowRightThin } from "../../components/IconMonstr";
import { userRequestAction } from "../../api/authorization";

const ww = Dimensions.get("window").width;

const UserRequestsData = ({ navigation: nav, route }) => {
  const { item } = route.params;
  const { user_data, selfie, card_pic } = item;
  const [errorMsg, setError] = useState(false);

  const [denySpin, setDenySpin] = useState(false);
  const [approveSpin, setApproveSpin] = useState(false);

  const onApprove = async () => {
    setError(false);
    setApproveSpin(true);
    const { status } = await userRequestAction(user_data._id, 3);
    setApproveSpin(false);
    if (status === 200) {
      nav.navigate("UserRequests");
    } else {
      setError(true);
    }
  };
  const onDeny = async () => {
    setError(false);
    setDenySpin(true);
    const { status } = await userRequestAction(user_data._id, 0);
    setDenySpin(false);
    if (status === 200) {
      nav.navigate("UserRequests");
    } else {
      setError(true);
    }
  };

  return (
    <ScrollView
      bg="darkBlue.900"
      flex={1}
      {...{ contentContainerStyle: { flexGrow: 1 } }}
    >
      <Box flex={1} p={4}>
        <Text color="light.50" fontSize={24} mb={4}>
          Solicitud de registro
        </Text>
        <HStack>
          <Image
            source={{ uri: selfie }}
            alt="profilepic"
            borderRadius={4}
            size={32}
            bg="blueGray.700"
          />
          <Box ml={4} justifyContent="space-between">
            <Text color="light.50" fontSize={14}>
              {user_data.name}
            </Text>
            <Text color="light.50" fontSize={14}>
              {user_data.second_name}
            </Text>
            <Text color="light.50" fontSize={14}>
              {user_data.card_id}
            </Text>
            <Text color="light.50" fontSize={14}>
              {user_data.email}
            </Text>
          </Box>
        </HStack>
        <Image
          source={{ uri: card_pic }}
          alt="cedula"
          resizeMode="cover"
          w={ww - 32}
          h={(ww - 32) * 0.75}
          my={6}
          borderRadius={4}
          bg="blueGray.700"
        />

        <HStack justifyContent="space-between">
          <Pressable
            {...btnSecondary}
            onPress={onDeny}
            opacity={denySpin ? 0.5 : 1}
            // opacity={0.5}
          >
            {({ isPressed }) => {
              return (
                <>
                  <Text
                    fontWeight="bold"
                    color={isPressed ? "yellow.500" : "light.50"}
                  >
                    {denySpin ? "Rechazando" : "Rechazar"}
                  </Text>
                  {denySpin && <Spinner color="light.50" ml={4} />}
                </>
              );
            }}
          </Pressable>
          <Pressable
            {...btnPrimary}
            onPress={onApprove}
            opacity={approveSpin ? 0.5 : 1}
          >
            {({ isPressed }) => {
              return (
                <>
                  <Text
                    fontWeight="bold"
                    color={isPressed ? "yellow.500" : "darkBlue.900"}
                  >
                    {approveSpin ? "Aprovando" : "Aprovar"}
                  </Text>
                  {approveSpin && <Spinner color="darkBlue.900" ml={4} />}
                </>
              );
            }}
          </Pressable>
        </HStack>
        {errorMsg && <ErrorMessage />}
        <Box h={24}></Box>
        <Box flexDirection="row" mt="auto" justifyContent="space-between">
          <ButtonLeft nav={nav} />
          <ButtonRight nav={nav} />
        </Box>
      </Box>
    </ScrollView>
  );
};

export default UserRequestsData;

const ErrorMessage = () => {
  return (
    <Center mt={2}>
      <CloseIcon color="muted.400" alignSelf="center" />
      <Text color="muted.400" mt={2}>
        Error de conexion, intente nuevamente
      </Text>
    </Center>
  );
};

const btnPrimary = {
  px: 4,
  py: 2,
  w: "45%",
  flexDirection: "row",
  justifyContent: "center",
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
  flexDirection: "row",
  justifyContent: "center",
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
  const pressNext = () => nav.navigate("UserRequestsData");
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
