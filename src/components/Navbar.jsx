import { View } from "react-native";
import React, { useContext } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  Bell,
  Bell_Fill,
  Chat_Alt_3,
  Chat_Alt_3_Fill,
  Home_Fill,
  Home_Icon,
  User_Alt,
  User_Alt_Fill,
} from "./IconFigma";
import { Box, Pressable } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { Context } from "../utils/Context";
import { DashboardFilled, DashboardLined } from "./IconMonstr";

const Navbar = ({ state = 1 }) => {
  const { navigate } = useNavigation();
  const { userData } = useContext(Context);
  const goHome = () => {
    navigate("Dashboard");
  };
  const goNotify = () => {
    navigate('Notifications')
  };
  const goChat = () => {
    navigate("ChatList");
  };
  const goProfile = () => {
    navigate("Profile");
  };
  const goAdminDashboard = () => {
    navigate("AdminDashboard");
  };

  return (
    <Box
      {...{
        bg: "blueGray.800",
        flexDir: "row",
        px: 8,
        py: 2,
        w: "95%",
        alignItems: "center",
        justifyContent: "space-between",
        alignSelf: "center",
        borderRadius: 18,
        mb: 3,
        shadow: "9",
      }}
    >
      <Pressable onPress={goHome} {...btnProps} >
        {state === 1 ? <Home_Fill /> : <Home_Icon />}
      </Pressable>
      <Pressable onPress={goNotify} {...btnProps}>
        {state === 2 ? <Bell_Fill /> : <Bell />}
      </Pressable>
      <Pressable onPress={goChat} {...btnProps}>
        {state === 3 ? <Chat_Alt_3_Fill /> : <Chat_Alt_3 />}
      </Pressable>
      <Pressable onPress={goProfile} {...btnProps}>
        {state === 4 ? <User_Alt_Fill /> : <User_Alt />}
      </Pressable>
      {userData.user_type === 4 ? (
        <Pressable onPress={goAdminDashboard} {...btnProps}>
          {state === 5 ? <DashboardFilled /> : <DashboardLined />}
        </Pressable>
      ) : null}
    </Box>
  );
};

export default Navbar;

const btnProps = {
  p:0.5,
  borderRadius:8,
  _pressed:{
    opacity:40
  }
}