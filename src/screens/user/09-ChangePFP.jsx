import React from "react";
import {
  Box,
  Text,
  ScrollView,
  Heading,
  Center,
  Avatar,
  Pressable,
  Button,
  WarningIcon,
  HStack,
} from "native-base";
import { Pencil_Filled } from "../../components/IconMonstr";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { changePfp } from "../../api/user";
import { useContext } from "react";
import { Context } from "../../utils/Context";

const ChangePFP = ({ navigation }) => {
  const [newImage, setNewImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { userData, setUserData } = useContext(Context);

  const pressAvatar = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setNewImage("data:image/png;base64," + result.assets[0].base64);
      // setInputs((prev) => ({
      //   ...prev,
      //   selfie: "data:image/png;base64," + result.assets[0].base64,
      // }));
      // setImage(result.assets[0].uri);
    }
  };

  const pressCancel = () => {
    setNewImage(false);
    navigation.goBack();
  };
  const pressAccept = async () => {
    setError(false);
    setLoading(true);
    const { status, data } = await changePfp(
      newImage,
      userData._id,
      userData.profile_pic_id
    );
    setLoading(false);
    if (status === 200) {
      const { profile_pic, profile_pic_id } = data;
      setUserData((prev) => ({ ...prev, profile_pic, profile_pic_id }));
      navigation.navigate("Profile");
    } else {
      setError(true);
    }
  };

  return (
    <ScrollView {...ScrollProps}>
      <Box flex={1} p={4}>
        <Heading color="light.50">Cambiar foto de perfil</Heading>
        <Box alignSelf="center" py={12} px={6}>
          <Pressable _pressed={{ opacity: 0.5 }} onPress={pressAvatar}>
            <Avatar
              size={48}
              bg="muted.600"
              source={
                newImage ? { uri: newImage } : { uri: userData.profile_pic }
              }
            />
            <Box {...pencilProps}>
              <Pencil_Filled color="darkBlue.900" />
            </Box>
          </Pressable>
        </Box>
        <HStack alignItems="center" mt="auto" mb={4}>
          {error && (
            <>
              <WarningIcon color="error.700" />
              <Text color="error.700" ml={4}>
                Ha ocurrido un problema al subir la imagen, intente nuevamente
              </Text>
            </>
          )}
        </HStack>
        <Box>
          <BtnAccept {...{ newImage, pressAccept,loading }} />
          <BtnDeny pressCancel={pressCancel} />
        </Box>
      </Box>
    </ScrollView>
  );
};

export default ChangePFP;

const ScrollProps = {
  keyboardShouldPersistTaps: "handled",
  contentContainerStyle: { flexGrow: 1 },
  bg: "darkBlue.900",
  flex: 1,
  pb: 0,
};
const pencilProps = {
  p: 2,
  bg: "yellow.500",
  borderRadius: 100,
  mt: -10,
  mr: 5,
  alignSelf: "flex-end",
};

const BtnAccept = ({ newImage, pressAccept, loading }) => {
  return (
    <Button
      py={2}
      borderRadius={6}
      bg="yellow.500"
      mb={4}
      isDisabled={!newImage}
      onPress={pressAccept}
      isLoading={loading}
      isLoadingText="Guardando cambios..."
    >
      <Text textAlign="center" color="darkBlue.900">
        Guardar Cambios
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
