import {
  Box,
  FormControl,
  Heading,
  HStack,
  Image,
  Input,
  ScrollView,
  Text,
  Pressable,
  Button,
  WarningIcon,
  TextArea,
} from "native-base";
import React from "react";
import { useState } from "react";
import { Dimensions } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { createComplaint } from "../../api/user";
import { Context } from "../../utils/Context";
import { useContext } from "react";

const ww = Dimensions.get("window").width;
const smallw = ww / 2 - 32;
const smallh = (ww / 2 - 32) * 0.5625 + smallw;

const Complaint = ({ navigation, route }) => {
  const { userData } = useContext(Context);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(false);
  const [image2, setImage2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorVal, seterrorVal] = useState(false);

  const pressAccept = async () => {
    seterrorVal(false);
    if (title.length < 2 || description.length < 2 || !image) {
      return seterrorVal(true);
    }
    let target = route.params?.target_id;
    setError(false);
    setLoading(true);
    const { status } = await createComplaint(
      title,
      description,
      userData._id,
      target,
      [image, image2]
    );
    setLoading(false);
    if (status === 200) {
      navigation.goBack();
    } else {
      setError(true);
    }
  };
  const pressCancel = () => {
    navigation.goBack();
  };

  return (
    <ScrollView
      bg="darkBlue.900"
      flex={1}
      {...{ contentContainerStyle: { flexGrow: 1 } }}
    >
      <Box flex={1} p={4}>
        <Heading color="light.50">Crear denuncia</Heading>
        <InptTitle {...{ title, setTitle }} />
        <InptDescription {...{ description, setDescription }} />
        <FormControl mt="2" isRequired>
          <FormControl.Label _text={{ color: "light.50" }}>
            Pruebas
          </FormControl.Label>
        </FormControl>
        <InptImages {...{ image, setImage, image2, setImage2 }} />
        <HStack alignItems="center" mt="auto" mb={4}>
          {errorVal && (
            <>
              <WarningIcon color="error.700" />
              <Text color="error.700" ml={4}>
                Porfavor ingrese todos los datos antes de continuar
              </Text>
            </>
          )}
          {error && (
            <>
              <WarningIcon color="error.700" />
              <Text color="error.700" ml={4}>
                Ha ocurrido un problema al crear la denuncia, intente nuevamente
              </Text>
            </>
          )}
        </HStack>
        <Box>
          <BtnAccept {...{ pressAccept, loading }} />
          <BtnDeny pressCancel={pressCancel} />
        </Box>
      </Box>
    </ScrollView>
  );
};

export default Complaint;

const InptTitle = ({ title, setTitle }) => {
  const iptProps = {
    value: title,
    onChangeText: setTitle,
    placeholder: "Ej: Uso de lenguaje ofensivo",
    bg: "light.50",
    borderWidth: 2,
    _focus: {
      bg: "light.50",
      borderColor: "yellow.500",
      borderWidth: 2,
    },
  };
  return (
    <FormControl my="2" isRequired>
      <FormControl.Label _text={{ color: "light.50" }}>
        Título
      </FormControl.Label>
      <Input {...iptProps} />
    </FormControl>
  );
};
const InptDescription = ({ description, setDescription }) => {
  const iptProps = {
    value: description,
    onChangeText: setDescription,
    placeholder: "Describa el problema...",
    bg: "light.50",
    borderWidth: 2,
    _focus: {
      bg: "light.50",
      borderColor: "yellow.500",
      borderWidth: 2,
    },
  };
  return (
    <FormControl my="2" isRequired>
      <FormControl.Label _text={{ color: "light.50" }}>
        Descripción
      </FormControl.Label>
      <TextArea {...iptProps} />
    </FormControl>
  );
};

const InptImages = ({ image, setImage, image2, setImage2 }) => {
  const pickImage1 = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [2, 4],
      quality: 1,
      base64: true,
    });
    if (!result.canceled) {
      setImage("data:image/png;base64," + result.assets[0].base64);
    }
  };
  const pickImage2 = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
      base64: true,
    });
    if (!result.canceled) {
      setImage2("data:image/png;base64," + result.assets[0].base64);
    }
  };
  return (
    <HStack justifyContent="space-between" mb={4} mt={2}>
      <Pressable {...captureStyle} onPress={pickImage1}>
        {image ? (
          <Image
            source={{ uri: image }}
            alt="proof1"
            bg="muted.500"
            w="100%"
            h="100%"
          />
        ) : (
          <Text color="light.50">Agregar imagen</Text>
        )}
      </Pressable>
      {image && (
        <Pressable {...captureStyle} onPress={pickImage2}>
          {image2 ? (
            <Image source={{ uri: image2 }} alt="proof2" w="100%" h="100%" />
          ) : (
            <Text color="light.50">Agregar imagen</Text>
          )}
        </Pressable>
      )}
    </HStack>
  );
};

const BtnAccept = ({ pressAccept, loading }) => {
  return (
    <Button
      py={2}
      borderRadius={6}
      bg="error.600"
      mb={4}
      onPress={pressAccept}
      isLoading={loading}
      isLoadingText="Creando denuncia..."
      _pressed={{ bg: "error.800" }}
    >
      <Text textAlign="center" color="light.50">
        Denunciar
      </Text>
    </Button>
  );
};
const BtnDeny = ({ pressCancel }) => {
  return (
    <Pressable
      py={2}
      borderRadius={6}
      borderWidth={1}
      borderColor="light.50"
      _pressed={{ opacity: 0.5 }}
      onPress={pressCancel}
    >
      <Text textAlign="center" color="light.50">
        Regresar
      </Text>
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
  _pressed: { opacity: 0.5 },
  overflow: "hidden",
};
