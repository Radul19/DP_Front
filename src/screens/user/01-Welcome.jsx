import { Dimensions, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Text,
  Button,
  Image,
  Container,
  useContrastText,
  useTheme,
} from "native-base";
import Logo from "../../images/LogoWelcome.png";
import { getLocalData } from "../../components/localStorage";
import { Context } from "../../utils/Context";

const ww = Dimensions.get("window").width;

const Welcome = ({ navigation }) => {
  const {setUserData} = useContext(Context)
  const { colors, btnPrimary, btnSecondary } = useTheme();

  const [count, setCount] = useState(0);

  const press = () => {
    setCount((prev) => prev + 1);
  };
  const loginPress = () => {
    console.log('logintest')
    navigation.navigate("Login");
  };
  const registerPress = () => {
    navigation.navigate("Register");
  };

  
	const localUser = async () => {
		console.log('this works')
		const data = await getLocalData("@userLogin");
		if (data) {
			console.log('this too')
			const parseData = JSON.parse(data)
			setUserData(parseData);
			navigation.navigate('Dashboard')
		}
	}
  
	useEffect(() => {
		localUser()
	}, [])



  //// PROPS
  const BoxCtnProps = {
    flex: 1,
    alignItems: "center",
    zIndex: 10,
  };

  const TitleProps = {
    fontSize: 48,
    color: colors.light[100],
    pt: 12,
    pb: 4,
    w: "70%",
    textAlign: "center",
    letterSpacing: 2,
    fontWeight: "bold",
  };

  const ImageProps = {
    source: Logo,
    alt: "logo",
    w: ww * 0.9,
    h: ww * 0.5,
    resizeMode: "contain",
  };
  const BoxArc = {
    bg: colors.light[100],
    w: "100%",
    h: "40%",
    position: "absolute",
    bottom: 0,
  };
  const BoxArcIn = {
    borderBottomLeftRadius: 1000,
    bg: "darkBlue.900",
    w: "100%",
    h: "100%",
  };
  const BtnLogin = {
    ...btnPrimary,
    mt: 4,
    w: "80%",
    onPress: loginPress,
  };

  const BtnRegister = {
    onPress: registerPress,
    w: "80%",
    borderRadius: 8,
    bg: "#ffffff00",
    _text: {
      color: colors.light[50],
    },
    mt: 4,
    borderWidth: 1,
    borderColor: "light.50",
    _pressed: {
      bg: "#ffffff00",
      borderColor: "yellow.500",
      _text: { color: "yellow.500" },
    },
  };

  return (
    <Box bg={colors.darkBlue[900]} flex={1}>
      <Box {...BoxCtnProps}>
        <Text {...TitleProps}>Delivery Planet</Text>
        <Image {...ImageProps} />
        <Button {...BtnLogin}>Ingresar Sesion</Button>
        <Button {...BtnRegister}>Registrarse</Button>
      </Box>
      <Box {...BoxArc}>
        <Box {...BoxArcIn} />
      </Box>
    </Box>
  );
};

export default Welcome;

// const st
