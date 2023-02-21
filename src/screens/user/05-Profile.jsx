import { View } from "react-native";
import {
  ArrowBackIcon,
  Avatar,
  Box,
  Button,
  Center,
  HamburgerIcon,
  InfoIcon,
  Menu,
  Pressable,
  ScrollView,
  ShareIcon,
  Text,
} from "native-base";
import React, { useContext } from "react";
import profile from "../../images/profilecard.png";
import Navbar from "../../components/Navbar";
/// ICONS

import Pin from "../../svg/Pin_alt_fill.svg";
import Edit from "../../svg/Edit_fill.svg";
import Eye from "../../svg/Eye_fill.svg";
import Exit from "../../svg/Sign_out_square_fill.svg";
import DeliveryCheck from "../../svg/delivery18.svg";
import { Context } from "../../utils/Context";
import { Delivery6, Shield33 } from "../../components/IconMonstr";
import { deleteLocalData, storeLocalData } from "../../components/localStorage";

const Profile = ({ navigation }) => {
  const { userData } = useContext(Context);

  const closeSession = async () => {
    await deleteLocalData("@userLogin");
    navigation.navigate("Login");
  };

  const pressDeliveryForm = () => {
    navigation.navigate("DeliveryPage", { user: userData });
  };

  return (
    <ScrollView
      bg="blueGray.800"
      flex={1}
      {...{ contentContainerStyle: { flexGrow: 1 } }}
    >
      <Header navigation={navigation} selfie={userData.profile_pic} />
      <Box {...propsContent}>
        <Center flexDir="row" mt="30%">
          <Text color="light.50" fontSize={26}>
            {userData.name.split(" ", 1) +
              " " +
              userData.second_name.split(" ", 1)}
          </Text>
          {userData.user_type === 4 ? (
            <Box ml={2}>
              <Shield33 size={4} />
            </Box>
          ) : null}
        </Center>
        {/* 
        <Text color="light.50" mt={4} mb={6}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          id mi tellus. Donec id facilisis nisl. Vestibulum vitae est blandit,
          cursus tortor a, scelerisque sapien.
        </Text> */}
        <Pressable
          {...propsOption}
          onPress={pressDeliveryForm}
          borderWidth={1}
          borderColor="#facc15"
          _pressed={{ bg: "#facc15", opacity: 1 }}
        >
          {({ isPressed }) => {
            return (
              <>
                <Delivery6
                  size={7}
                  color={isPressed ? "darkBlue.900" : "#facc15"}
                />
                <Text
                  fontSize="md"
                  ml={3}
                  color={isPressed ? "darkBlue.900" : "light.50"}
                >
                  Cambiar a perfil de Delivery
                </Text>
              </>
            );
          }}
        </Pressable>
        {/* <Option text="Cambiar ubicacion por defecto" Icon={Pin} />
        <Option text="Editar informacion de perfil" Icon={Edit} /> */}
        <Option text="Cerrar sesion" Icon={Exit} press={closeSession} />
      </Box>
      <Box mt="auto" bg="darkBlue.900">
        <Navbar state={4} />
      </Box>
    </ScrollView>
  );
};

export default Profile;

const Header = ({ navigation, selfie }) => {
  const pressEditPfp = () => navigation.navigate("ChangePFP");
  return (
    <Box>
      <Box {...propsHeader}>
        <Button
          size={8}
          bg="#ffffff00"
          onPress={() => {
            navigation.navigate("Dashboard");
          }}
        >
          <ArrowBackIcon {...{ color: "yellow.500", size: 6 }} />
        </Button>

        <Pressable _pressed={{ opacity: 0.5 }} mt={4} onPress={pressEditPfp}>
          <Avatar size="2xl" source={{ uri: selfie }} />
        </Pressable>
        <Menu
          placement="bottom right"
          w="100%"
          trigger={(triggerProps) => {
            return (
              <Pressable
                alignItems="center"
                justifyContent="center"
                size={8}
                accessibilityLabel="More options menu"
                {...triggerProps}
              >
                <HamburgerIcon color="yellow.500" size={6} />
              </Pressable>
            );
          }}
        >
          <Menu.Group title="Opciones">
            <Menu.Item _text={{ color: "light.50" }}>Opcion 1</Menu.Item>
            <Menu.Item _text={{ color: "light.50" }}>Opcion 2</Menu.Item>
            <Menu.Item _text={{ color: "light.50" }}>Opcion 3</Menu.Item>
          </Menu.Group>
        </Menu>
      </Box>
    </Box>
  );
};

const Option = ({ Icon, text, press = null }) => {
  return (
    <Pressable {...propsOption} onPress={press}>
      {/* <Icon /> */}
      <Icon width={28} height={28} />

      <Text color="light.50" fontSize="md" ml={3}>
        {text}
      </Text>
    </Pressable>
  );
};

const propsOption = {
  flexDir: "row",
  w: "100%",
  mt: 4,
  py: 1,
  px: 2,
  alignItems: "center",
  borderRadius: 6,
  _pressed: { opacity: 0.5 },
};

const propsHeader = {
  flexDir: "row",
  justifyContent: "space-between",
  pt: 4,
  px: 4,
};

const avatarProps = {
  size: "2xl",
};

const propsContent = {
  flex: 1,
  mt: "-25%",
  bg: "darkBlue.900",
  zIndex: -1,
  alignItems: "center",
  px: 3,
};
