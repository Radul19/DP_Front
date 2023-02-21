import { View } from "react-native";
import {
  ArrowBackIcon,
  Avatar,
  Box,
  Button,
  HamburgerIcon,
  InfoIcon,
  Menu,
  Pressable,
  ScrollView,
  Select,
  ShareIcon,
  Text,
  useTheme,
} from "native-base";
import React, { useContext, useRef, useState } from "react";
import profile from "../../images/girl2.png";
import Navbar from "../../components/Navbar";
/// ICONS

import Pin from "../../svg/Pin_alt_fill.svg";
import Edit from "../../svg/Edit_fill.svg";
import Eye from "../../svg/Eye_fill.svg";
import Exit from "../../svg/Sign_out_square_fill.svg";
import {
  ArrowLeftThin,
  ChatIcon,
  Star_Filled,
} from "../../components/IconMonstr";
import { Context } from "../../utils/Context";
import { changeDeliStatus } from "../../api/user";

const colorStatus = ["success.500", "error.500", "yellow.500", "muted.500"];
const textStatus = ["Disponible", "Ocupado", "Ausente", "Inactivo"];

const DeliveryProfile = ({ navigation: nav, route }) => {
  const { userData } = useContext(Context);
  const { user } = route.params;
  return (
    <>
      <ScrollView
        bg="blueGray.800"
        flex={1}
        {...{ contentContainerStyle: { flexGrow: 1 } }}
      >
        {user._id === userData._id ? (
          <OwnContent user={user} nav={nav} />
        ) : (
          <UserContent user={user} test="aaa" nav={nav} />
        )}
      </ScrollView>
      <Box position="absolute" bottom={0} w="100%">
        <Navbar state={user._id === userData._id ? 4 : 1} />
      </Box>
    </>
  );
};

const UserContent = ({ user, nav, test }) => {
  const { name, second_name, profile_pic, email, delivery_status } = user;
  const { btnPrimary } = useTheme();

  const goChat = () => {
    nav.navigate("Chat");
  };
  return (
    <Box flex={1}>
      <Header nav={nav} selfie={profile_pic} />
      <Box {...propsContent}>
        <Text color="light.50" mt="30%" fontSize={26} mb={1}>
          {name.split(" ", 1) + second_name.split(" ", 1)}
        </Text>
        <Text color="light.50" mb={4}>
          {email}
        </Text>
        {/* <Box flexDir="row" w="50%" justifyContent="space-between" >
              <Star_Filled key={1} />
              <Star_Filled key={2} />
              <Star_Filled key={3} />
              <Star_Filled key={4} />
              <Star_Filled key={5} />
            </Box> */}
        {/* <Text color="light.50" mt={2} mb={6}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque id mi tellus. Donec id facilisis nisl. Vestibulum
              vitae est blandit, cursus tortor a, scelerisque sapien.
            </Text> */}
        <Button
          {...btnPrimary}
          {...{
            mt: 0,
            mb: 8,
            w: "100%",
            flexDirection: "row-reverse",
            _text: { fontWeight: "bold", color: "black", mr: 2 },
          }}
          onPress={goChat}
          endIcon={<ChatIcon color="#000" size={5} />}
        >
          Iniciar Chat
        </Button>
        <Box px={2} w="100%">
          <Box flexDir="row" w="100%">
            <Text fontSize={16} mr={4} color="light.50">
              Status:
            </Text>
            <Box
              {...{
                borderRadius: 12,
                borderWidth: 1,
                borderColor: colorStatus[delivery_status],
                py: 0.5,
                px: 6,
                justifyContent: "center",
              }}
            >
              <Text {...{ fontSize: 10, color: colorStatus[delivery_status] }}>
                {textStatus[delivery_status]}
              </Text>
            </Box>
          </Box>
          {/* <Text fontSize={16} color="light.50" w="100%" mt={4}>
            Reseñas: 293
          </Text>
          <Text fontSize={16} color="light.50" w="100%" mt={4}>
            Pedidos cancelados: 23
          </Text>
          <Text fontSize={16} color="light.50" w="100%" mt={4}>
            Pedidos completados: 415
          </Text> */}
        </Box>
      </Box>
    </Box>
  );
};
const OwnContent = ({ user, nav }) => {
  const { name, second_name, profile_pic, email, delivery_status, _id } = user;
  const { btnPrimary } = useTheme();

  const [statusMenu, setStatusMenu] = useState(delivery_status);
  const [statusSpin, setStatusSpin] = useState(false);

  const onChangeStatus = async () => {
    const num = statusMenu < 4 ? statusMenu + 1 : 0;
    setStatusSpin(true);
    const { status, data } = await changeDeliStatus(_id, num);
    setStatusSpin(false);
    if (status === 200) {
      setStatusMenu(num);
    }
  };

  const goProfile = () => nav.navigate("Profile");

  return (
    <Box flex={1}>
      <Header nav={nav} selfie={profile_pic} />
      <Box {...propsContent}>
        <Text color="light.50" mt="30%" fontSize={26} mb={1}>
          {name.split(" ", 1) + second_name.split(" ", 1)}
        </Text>
        <Text color="light.50" mb={6}>
          {email}
        </Text>

        {/* <Box flexDir="row" w="50%" justifyContent="space-between" >
              <Star_Filled key={1} />
              <Star_Filled key={2} />
              <Star_Filled key={3} />
              <Star_Filled key={4} />
              <Star_Filled key={5} />
            </Box> */}
        {/* <Text color="light.50" mt={2} mb={6}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque id mi tellus. Donec id facilisis nisl. Vestibulum
              vitae est blandit, cursus tortor a, scelerisque sapien.
            </Text> */}

        <Box px={2} w="100%">
          <Box flexDir="row" w="100%" py={2} alignItems="center">
            <Text fontSize={16} mr={4} color="light.50">
              Status:
            </Text>
            <Button
              _loading={{ _text: { color: colorStatus[statusMenu] } }}
              isLoading={statusSpin}
              isLoadingText="Actualizando..."
              onPress={onChangeStatus}
              spinnerPlacement="end"
              _icon={{ color: colorStatus[statusMenu] }}
              {...{
                borderRadius: 12,
                borderWidth: 1,
                borderColor: colorStatus[statusMenu],
                py: 1,
                px: 6,
                justifyContent: "center",
                bg: "#fffddd00",
              }}
            >
              <Text {...{ fontSize: 14, color: colorStatus[statusMenu] }}>
                {textStatus[statusMenu]}
              </Text>
            </Button>
          </Box>

          {/* <Text fontSize={16} color="light.50" w="100%" mt={4}>
            Reseñas: 293
          </Text>
          <Text fontSize={16} color="light.50" w="100%" mt={4}>
            Pedidos cancelados: 23
          </Text>
          <Text fontSize={16} color="light.50" w="100%" mt={4}>
            Pedidos completados: 415
          </Text> */}
        </Box>
        <Pressable
          alignSelf="flex-start"
          flexDir="row"
          alignItems="center"
          mt="auto"
          onPress={goProfile}
          _pressed={{ opacity: 0.5 }}
        >
          <ArrowLeftThin size={3} />
          <Text ml={3} color="yellow.500">
            Regresar al perfil
          </Text>
        </Pressable>
      </Box>
    </Box>
  );
};
const Header = ({ nav, selfie }) => {
  return (
    <Box>
      <Box {...propsHeader}>
        <Button
          size={8}
          bg="#ffffff00"
          onPress={() => {
            nav.goBack();
          }}
        >
          <ArrowBackIcon {...{ color: "yellow.500", size: 6 }} />
        </Button>

        <Avatar {...avatarProps} source={{ uri: selfie }} />
        <ShareIcon size={6} color="yellow.500" />
      </Box>
    </Box>
  );
};

const Option = ({ Icon, text }) => {
  return (
    <Box {...propsOption}>
      {/* <Icon /> */}
      <Icon width={28} height={28} />
      <Text color="light.50" fontSize="md" ml={3}>
        {text}
      </Text>
    </Box>
  );
};

const propsHeader = {
  flexDir: "row",
  justifyContent: "space-between",
  pt: 4,
  px: 4,
};

const avatarProps = {
  size: "2xl",
  mt: 4,
  bg: "muted.500",
};

const propsContent = {
  flex: 1,
  mt: "-25%",
  bg: "darkBlue.900",
  zIndex: -1,
  alignItems: "center",
  px: 3,
  pb: 24,
};

const propsOption = {
  flexDir: "row",
  w: "100%",
  mt: 2,
  pb: 2,
  ml: 2,
  alignItems: "center",
};

export default DeliveryProfile;
