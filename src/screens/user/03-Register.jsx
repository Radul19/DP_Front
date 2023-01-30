import React, { useState } from "react";
import {
  Text,
  Box,
  Button,
  useTheme,
  FormControl,
  Stack,
  Input,
  WarningOutlineIcon,
  ScrollView,
  InputGroup,
  InputLeftAddon,
  CheckBox,
  Checkbox,
  HStack,
  Pressable,
  Image,
} from "native-base";
import useInput from "../../hooks/useInput";
import { register } from "../../api/user";
import * as ImagePicker from "expo-image-picker";

const code = "1234-5678";
// const inputValues = {
//   name: "Marta Violet",
//   second_name: "Perez Gomez",
//   email: "correo@gmail.com",
//   password: "123123",
//   confirm_password: "123123",
//   card_id: "29519805",
//   admin_bool: false,
//   admin_code: "",
//   selfie:
//     "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII",
//   card_pic:
//     "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII",
// };

const inputValues = {
  name: "",
  second_name: "",
  email: "",
  password: "",
  confirm_password: "",
  card_id: "",
  admin_bool: false,
  admin_code: "",
  selfie: false,
  card_pic: false,
};
const errorValues = {
  name: false,
  second_name: false,
  email: false,
  password: false,
  confirm_password: false,
  card_id: false,
  admin_code: false,
  selfie: false,
  card_pic: false,
};

const checkValues = (item) => {
  const { admin_code, ...obj } = item;
  let bool = true;
  for (const key in obj) {
    if (obj[key].length === 0 && typeof obj[key] === "string") {
      bool = false;
    }
  }
  return bool;
};

const checkError = (item) => {
  let bool = true;
  for (const key in item) {
    if (item[key]) bool = false;
  }
  return bool;
};

const compareObjects = (item1, item2) => {
  return JSON.stringify(item1) === JSON.stringify(item2);
};
const Register = ({ navigation }) => {
  const { btnPrimary, btnSecondary } = useTheme();

  const [spin, setSpin] = useState(false);
  const [inputs, setInputs] = useState(inputValues);
  const [errors, setErrors] = useState({
    ...errorValues,
    // selfie: true,
    // card_pic: true,
  });
  const [submitError, setSubmitError] = useState(false);
  const [openCode, setOpenCode] = useState(false);

  const pressBack = () => {
    navigation.goBack();
  };
  const pressRegister = async () => {
    setSubmitError(false);
    if (!inputs.admin_bool) {
      /// register register normal user
      if (checkError(errors) && checkValues(inputs)) {
        setSpin(true);
        const res = await register(inputs);
        setSpin(false);
        if (res.status === 200) {
          navigation.navigate("Login");
        } else {
          setSubmitError(res.data.msg);
        }
      } else {
        setSubmitError("Ingrese los datos correctamente");
      }
    } else {
      /// register admin
      if (compareObjects(errorValues, errors) && checkValues(inputs)) {
        setSpin(true);
        const res = await register(inputs);
        setSpin(false);
        if (res.status === 200) {
          navigation.navigate("Login");
        } else {
          setSubmitError(res.data.msg);
        }
      }
    }
  };

  const enableAdmin = () => {
    setInputs({ ...inputs, admin_bool: false });
    setOpenCode((prev) => !prev);
  };

  /// Props
  const btnRegisterProps = {
    onPress: pressRegister,
    isLoading: spin,
    isLoadingText: "Enviando datos",
    spinnerPlacement: "end",
    onLongPress: enableAdmin,
    ...btnPrimary,
  };
  const btnBackProps = {
    onPress: pressBack,
    ...btnSecondary,
  };
  const ScrollProps = {
    keyboardShouldPersistTaps: "handled",
    contentContainerStyle: { flexGrow: 1 },
    bg: "darkBlue.900",
    flex: 1,
    py: 2,
  };

  const generalProps = {
    inputs,
    setInputs,
    errors,
    setErrors,
  };
  return (
    <ScrollView {...ScrollProps}>
      <Stack flex={1} w="90%">
        <StackUsername {...generalProps} />
        <StackSecName {...generalProps} />
        <StackEmail {...generalProps} />
        <StackPassword {...generalProps} />
        <StackConfirmPassword {...generalProps} />
        <StackIDCard {...generalProps} />
        <StackCardPic {...generalProps} />
        {!inputs.admin_bool && <StackSelfie {...generalProps} />}

        {openCode && <StackCheckAdmin {...generalProps} />}
      </Stack>
      <FormControl isInvalid={submitError} ml={4}>
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {/* Complete los campos correctamente */}
          {submitError && submitError}
        </FormControl.ErrorMessage>
      </FormControl>

      <Box alignItems="center" mt={6} mb={4}>
        <Button {...btnRegisterProps}>Registrarse</Button>
        <Button {...btnBackProps}>Regresar</Button>
      </Box>
    </ScrollView>
  );
};

export default Register;

const StackUsername = ({ inputs, setInputs, errors, setErrors }) => {
  const name = "name";
  const handleChange = (text) => setInputs({ ...inputs, [name]: text });

  const iptUsername = {
    value: inputs[name],
    onChangeText: handleChange,
    placeholder: "Ej: Marta Violet",
    bg: "light.50",
    borderWidth: 2,
    _focus: {
      bg: "light.50",
      borderColor: "yellow.500",
      borderWidth: 2,
    },
  };
  return (
    <FormControl mx="4" my="2">
      <FormControl.Label _text={{ color: "light.50" }}>
        Nombre
      </FormControl.Label>
      <Input {...iptUsername} />
      {/* <FormControl.HelperText>
        Must be atleast 6 characters.
      </FormControl.HelperText>
      <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
        Atleast 6 characters are required.
      </FormControl.ErrorMessage> */}
    </FormControl>
  );
};

const StackSecName = ({ inputs, setInputs, errors, setErrors }) => {
  const name = "second_name";
  const handleChange = (text) => setInputs({ ...inputs, [name]: text });
  /// PROPS
  const iptEmail = {
    value: inputs[name],
    onChangeText: handleChange,
    placeholder: "Ej: Perez Gomez",
    bg: "light.50",
    borderWidth: 2,
    _focus: {
      bg: "light.50",
      borderColor: "yellow.500",
      borderWidth: 2,
    },
  };
  return (
    <FormControl mx="4" my="2">
      <FormControl.Label _text={{ color: "light.50" }}>
        Apellidos
      </FormControl.Label>
      <Input {...iptEmail} type="" />
    </FormControl>
  );
};

const StackEmail = ({ inputs, setInputs, errors, setErrors }) => {
  let emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const name = "email";
  const handleChange = (text) => {
    const bool = text.length < 1 || text.match(emailformat);
    setInputs({ ...inputs, [name]: text });
    setErrors({ ...errors, [name]: !bool });
  };

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
    <FormControl isInvalid={errors[name]} mx="4" my="2">
      <FormControl.Label _text={{ color: "light.50" }}>
        Correo
      </FormControl.Label>
      <Input {...iptEmail} type="" />
      {/* <FormControl.HelperText>
        Must be atleast 6 characters.
      </FormControl.HelperText> */}
      <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
        Atleast 6 characters are required.
      </FormControl.ErrorMessage>
    </FormControl>
  );
};

const StackPassword = ({ inputs, setInputs, errors, setErrors }) => {
  const name = "password";
  const handleChange = (text) => {
    const bool = text.length < 6 && text.length > 0;
    setInputs({ ...inputs, [name]: text });
    setErrors({ ...errors, [name]: bool });
  };
  const iptPassword = {
    value: inputs[name],
    onChangeText: handleChange,
    type: "password",
    defaultValue: "",
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
    <FormControl mx="4" my="2" isInvalid={errors[name]}>
      <FormControl.Label _text={{ color: "light.50" }}>
        Password
      </FormControl.Label>
      <Input {...iptPassword} />
      <FormControl.HelperText>Mínimo 6 caracteres</FormControl.HelperText>
      <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
        La contraseña no contiene mas de 6 caracteres
      </FormControl.ErrorMessage>
    </FormControl>
  );
};

const StackConfirmPassword = ({ inputs, setInputs, errors, setErrors }) => {
  const name = "confirm_password";
  const handleChange = (text) => {
    const bool = inputs.password !== text;
    setInputs({ ...inputs, [name]: text });
    setErrors({ ...errors, [name]: bool });
  };

  const iptPassword = {
    value: inputs[name],
    onChangeText: handleChange,
    type: "password",
    defaultValue: "",
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
    <FormControl mx="4" my="2" isInvalid={errors[name]}>
      <FormControl.Label _text={{ color: "light.50" }}>
        Confirmar Contraseña
      </FormControl.Label>
      <Input {...iptPassword} />
      {/* <FormControl.HelperText>
        Must be atleast 6 characters.
      </FormControl.HelperText> */}
      <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
        Las contrasñas no coinciden
      </FormControl.ErrorMessage>
    </FormControl>
  );
};

const StackIDCard = ({ inputs, setInputs, errors, setErrors }) => {
  const name = "card_id";
  const handleChange = (text) => {
    // const newText = text.replace('.',"")
    const bool = text.length > 3 || text.length === 0;
    setErrors({ ...errors, [name]: !bool });
    if ((/[0-9]/.test(text) || text.length === 0) && text.length < 9) {
      const withoutLetter = text.replace(/[^0-9]/g, "");
      setInputs({ ...inputs, [name]: withoutLetter });
    }
  };
  const iptIDCard = {
    value: inputs[name],
    onChangeText: handleChange,
    w: "90%",
    placeholder: "12345678",
    bg: "light.50",
    borderWidth: 2,
    keyboardType: "numeric",
    _focus: {
      bg: "light.50",
      borderColor: "yellow.500",
      borderWidth: 2,
    },
  };
  return (
    <FormControl mx="4" my="2" isInvalid={errors[name]}>
      <FormControl.Label _text={{ color: "light.50" }}>
        Cedula de Identidad
      </FormControl.Label>
      <InputGroup
        w={{
          base: "100%",
        }}
      >
        <InputLeftAddon children="V-" w="10%" />
        <Input {...iptIDCard} />
      </InputGroup>
      {/* <FormControl.HelperText>
          Must be atleast 6 characters.
        </FormControl.HelperText> */}
      <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
        Su cédula de identidad es inválida
      </FormControl.ErrorMessage>
    </FormControl>
  );
};
const StackCheckAdmin = ({ inputs, setInputs, errors, setErrors }) => {
  // const [check, setCheck] = useState(false);
  const name = "admin_bool";
  const name2 = "admin_code";
  const toggleCheck = () => {
    setInputs({ ...inputs, [name]: !inputs[name] });
  };
  const handleChange = (text) => {
    setInputs({ ...inputs, [name2]: text });
  };

  const checkCtn = {
    w: "90%",
    // bg: "amber.800",
    alignSelf: "center",
    alignItems: "center",
    my: 4,
  };
  return (
    <HStack {...checkCtn}>
      {inputs[name] && (
        <Input
          {...{
            value: inputs[name2],
            bg: "light.50",
            w: "100px",
            placeholder: "xxxx-xxxx",
            textAlign: "center",
            mr: 6,
            onChangeText: handleChange,
            _focus: { bg: "light.50" },
          }}
        />
      )}
      <Checkbox
        value={inputs[name]}
        accessibilityLabel="admin check"
        {...{
          _text: { color: "light.50", fontSize: 14 },
        }}
        onChange={toggleCheck}
      >
        Código de admin
      </Checkbox>
    </HStack>
  );
};

const StackSelfie = ({ inputs, setInputs, errors, setErrors }) => {
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setInputs((prev) => ({
        ...prev,
        selfie: "data:image/png;base64," + result.assets[0].base64,
      }));
      setErrors({ ...errors, selfie: false });
      // setImage(result.assets[0].uri);
    }
  };

  return (
    <Box mx={4} my={2} w="100%">
      <Text
        color="light.50"
        {...{ fontWeight: "medium", color: "light.50", my: 1 }}
      >
        Selfie
      </Text>
      <Pressable
        onPress={pickImage}
        {...{
          w: 200,
          h: 200,
          borderWidth: 1,
          borderColor: "light.50",
          borderRadius: 4,
          justifyContent: "center",
          alignItems: "center",
          _pressed: {
            borderColor: "yellow.500",
          },
        }}
      >
        {({ isPressed }) => {
          const textC = isPressed ? "yellow.500" : "light.50";
          return (
            <>
              {inputs.selfie ? (
                <Image
                  source={{ uri: inputs.selfie }}
                  w={200}
                  h={200}
                  alt="selfie"
                />
              ) : (
                <Text color={textC}>Seleccionar Imagen</Text>
              )}
            </>
          );
        }}
      </Pressable>
    </Box>
  );
};
const StackCardPic = ({ inputs, setInputs, errors, setErrors }) => {
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 11],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setInputs((prev) => ({
        ...prev,
        card_pic: "data:image/png;base64," + result.assets[0].base64,
      }));
      setErrors({ ...errors, card_pic: false });
      // setImage(result.assets[0].uri);
    }
  };
  return (
    <Box mx={4} my={2} w="100%">
      <Text
        color="light.50"
        {...{ fontWeight: "medium", color: "light.50", my: 1 }}
      >
        Documento de identidad
      </Text>
      <Pressable
        onPress={pickImage}
        {...{
          w: 250,
          h: 170,
          borderWidth: 1,
          borderColor: "light.50",
          borderRadius: 4,
          justifyContent: "center",
          alignItems: "center",
          _pressed: {
            borderColor: "yellow.500",
          },
        }}
      >
        {({ isPressed }) => {
          const textC = isPressed ? "yellow.500" : "light.50";
          return (
            <>
              {inputs.card_pic ? (
                <Image
                  source={{ uri: inputs.card_pic }}
                  w={250}
                  h={170}
                  alt="card_ic"
                  resizeMode="contain"
                />
              ) : (
                <Text color={textC}>Seleccionar Imagen</Text>
              )}
            </>
          );
        }}
      </Pressable>
    </Box>
  );
};
