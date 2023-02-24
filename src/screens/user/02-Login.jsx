import * as Location from "expo-location";
// import {getCurrentPositionAsync,requestForegroundPermissionsAsync} from 'expo-location'
import {
  Box,
  Button,
  FormControl,
  Heading,
  Input,
  ScrollView,
  Stack,
  Text,
  WarningOutlineIcon,
  useTheme,
  ArrowBackIcon,
  Checkbox,
} from "native-base";
import React, { useContext, useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { login } from "../../api/user";
import { getLocalData, storeLocalData } from "../../components/localStorage";
import { Context } from "../../utils/Context";

const inptInitial = {
  email: "",
  password: "",
};

const ww = Dimensions.get("window").width;
const Login = ({ navigation }) => {
  const { btnPrimary, btnSecondary } = useTheme();
  const { setUserData, location, setLocation } = useContext(Context);
  const [spin, setSpin] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [inputs, setInputs] = useState(inptInitial);
  const [check, setCheck] = useState(false);

  /// ACTIONS
  const pressLogin = async () => {
    const { auto, ...filterLoc } = location;
    setSubmitError(false);
    setSpin(true);
    const { status, data } = await login({ ...inputs, location: filterLoc });
    // const { status, data } = await login({
    //   email: "correox@gmail.com",
    //   password: "123123",
    //   location: filterLoc,
    // });
    setSpin(false);
    if (status === 200) {
      if (check) {
        const stringData = JSON.stringify(data);
        await storeLocalData("@userLogin", stringData);
      }
      setInputs(inptInitial);
      setUserData(data);
      navigation.navigate("Dashboard");
    } else {
      setSubmitError(data.msg);
    }
  };
  /// TEMPORAL
  const pressLogin2 = async () => {
    // const { auto, ...filterLoc } = location;
    // setSubmitError(false);
    // setSpin(true);
    // const { status, data } = await login({
    //   email: "correo@gmail.com",
    //   password: "123123",
    //   location: filterLoc,
    // });
    // setSpin(false);
    // if (status === 200) {
    //   setInputs(inptInitial);
    //   setUserData(data);
    //   navigation.navigate("Dashboard");
    // } else {
    //   setSubmitError(data.msg);
    // }
  };

  const pressBack = () => {
    navigation.navigate("Register");
  };
  /// PROPS
  const btnLoginProps = {
    onPress: pressLogin,
    onLongPress: pressLogin2,
    isLoading: spin,
    isLoadingText: "Iniciando sesión",
    spinnerPlacement: "end",
    ...btnPrimary,
  };
  const btnBackProps = {
    onPress: pressBack,
    ...btnSecondary,
  };
  const ScrollProps = {
    keyboardShouldPersistTaps: "handled",
    contentContainerStyle: { flexGrow: 1 },
    bg: "blueGray.800",
    flex: 1,
    pb: 0,
  };
  const headerProps = { size: "3xl", mt: "auto", color: "light.50" };
  const smallTextProps = { color: "light.50", mb: 4, fontWeight: "thin" };
  const boxCtnProps = {
    flex: 1,
    bg: "darkBlue.900",
    borderTopRadius: 25,
    pt: 2,
    pb: 2,
  };
  return (
    <ScrollView {...ScrollProps}>
      <Box w={ww} h={ww * 0.6} px={4} pt={10}>
        <Heading {...headerProps}>Bienvenido</Heading>
        <Text {...smallTextProps}>Inicia sesion para continuar</Text>
      </Box>
      <Box {...boxCtnProps}>
        <FormControl w="100%">
          <StackEmail {...{ inputs, setInputs }} />
          <StackPassword {...{ inputs, setInputs }} />
        </FormControl>
        <FormControl isInvalid={submitError} pr={6}>
          <FormControl.ErrorMessage
            leftIcon={<WarningOutlineIcon size="xs" mr={2} />}
            ml={4}
          >
            {/* Complete los campos correctamente */}
            {submitError && submitError}
          </FormControl.ErrorMessage>
        </FormControl>
        <StackCheck {...{ check, setCheck }} />
        <Box alignItems={"center"} mt="auto">
          <Button {...btnLoginProps}>Iniciar Sesion</Button>
          <Button {...btnBackProps}>No tienes una cuenta? Registrate</Button>
        </Box>
      </Box>
    </ScrollView>
  );
};

export default Login;

const StackEmail = ({ inputs, setInputs }) => {
  const name = "email";
  const handleChange = (text) => setInputs({ ...inputs, [name]: text });

  const iptEmail = {
    value: inputs[name],
    onChangeText: handleChange,
    placeholder: "correo@gmail.com",
    bg: "light.50",
    borderWidth: 2,
    _focus: {
      bg: "light.50",
      borderColor: "yellow.500",
      borderWidth: 2,
    },
  };
  return (
    <Stack mx="4" my="2">
      <FormControl.Label _text={{ color: "light.50" }}>
        Correo
      </FormControl.Label>
      <Input {...iptEmail} />
      {/* <FormControl.HelperText>
          Must be atleast 6 characters.
        </FormControl.HelperText> */}
      <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
        Atleast 6 characters are required.
      </FormControl.ErrorMessage>
    </Stack>
  );
};

const StackPassword = ({ inputs, setInputs }) => {
  const name = "password";
  const handleChange = (text) => setInputs({ ...inputs, [name]: text });
  const iptPassword = {
    value: inputs[name],
    onChangeText: handleChange,
    type: "password",
    placeholder: "password",
    bg: "light.50",
    borderWidth: 2,
    _focus: {
      bg: "light.50",
      borderColor: "yellow.500",
      borderWidth: 2,
    },
  };
  return (
    <Stack mx="4" my="2">
      <FormControl.Label _text={{ color: "light.50" }}>
        Password
      </FormControl.Label>
      <Input {...iptPassword} />
      <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
        Atleast 6 characters are required.
      </FormControl.ErrorMessage>
    </Stack>
  );
};
const StackCheck = ({ check, setCheck }) => {
  const checkStyles = {
    accessibilityLabel: "This is a dummy checkbox",
    _text: { color: "light.50", fontSize: 12, ml: 0 },
    bg: "light.50",
    _checked: {
      bg: "yellow.500",
      borderColor: "yellow.500",
      _icon: {
        color: "black",
        _pressed: {
          bg: "light.50",
          borderColor: "light.50",
          _icon: { color: "black" },
        },
      },
      _pressed: {
        borderColor: "yellow.500",
        bg: "yellow.300",
      },
    },
    _pressed: {
      bg: "light.50",
      borderColor: "light.50",
      _icon: { color: "black" },
    },
  };
  return (
    <Stack mx={4} mt={4} mb={12}>
      <Checkbox onChange={setCheck} value={check} {...checkStyles}>
        Mantener sesion iniciada
      </Checkbox>
    </Stack>
  );
};
