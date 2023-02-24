import React from "react";
import {
  Text,
  Box,
  FormControl,
  Heading,
  HStack,
  Input,
  Radio,
  ScrollView,
  Image,
  Pressable,
  Button,
  InfoOutlineIcon,
  WarningOutlineIcon,
} from "native-base";
import { useEffect } from "react";
import { useState } from "react";
import { updateUserInfo } from "../../api/authorization";

const UserDataEdit = ({ navigation, route }) => {
  const [data, setData] = useState({
    _id: "",
    name: "",
    second_name: "",
    email: "",
    card_id: "",
    card_pic: "_",
  });

  const [delivery_status, setDelivery_status] = useState(0);
  const [user_type, setUser_type] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    card_id: false,
    second_name: false,
  });

  useEffect(() => {
    const { user_type, delivery_status, ...extraData } = route.params?.user;
    setData(extraData);
    setUser_type(user_type);
    setDelivery_status(delivery_status);
  }, []);

  const change = (text, name) => {
    setData({ ...data, [name]: text });
  };

  const handleName = (text) => {
    if (text.match(/^[a-zA-Z]+$/)) {
      setData({ ...data, name: text });
    }
  };
  const handleSecondName = (text) => {
    if (text.match(/^[a-zA-Z]+$/)) {
      setData({ ...data, second_name: text });
    }
  };

  let emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const handleEmail = (text) => {
    const bool = text.length < 1 || text.match(emailformat);
    setData({ ...data, email: text });
    setErrors({ ...errors, email: !bool });
  };

  const handleID = (text) => {
    if (text.match(/^[0-9]*$/) && text.length < 9) {
      setData({ ...data, card_id: text });
    }
  };

  const updateData = async () => {
    const bool = verifyValues();
    if (!bool) {
      setSubmitError(false);
      const newData = {
        delivery_status,
        user_type,
        ...data,
      };
      setIsLoading(true);
      const { status } = await updateUserInfo(newData);
      setIsLoading(false);
      if (status === 200) {
        navigation.navigate("SearchUserPage");
      } else {
        submitError(
          "Ha ocurrido un error al actualizar los datos, intente nuevamente"
        );
      }
    }
  };

  const verifyValues = () => {
    let bool = false;
    const copyErrors = {
      name: false,
      second_name: false,
      email: false,
      card_id: false,
    };
    if (data.name.length < 3) {
      copyErrors.name = true;
      bool = true;
    }
    if (data.second_name < 3) {
      copyErrors.second_name = true;
      bool = true;
    }
    if (data.card_id.length < 7) {
      copyErrors.card_id = true;
      bool = true;
    }
    setErrors(copyErrors);
    return bool;
  };

  const radioDes = {
    value: 0,
    my: 2,
    size: "sm",
    _text: { color: "light.50" },
    _checked: {
      borderColor: "error.500",
      _icon: { color: "error.500" },
    },
  };
  const radioHab = {
    value: 3,
    my: 2,
    size: "sm",
    _text: { color: "light.50" },
    _checked: {
      borderColor: "success.500",
      _icon: { color: "success.500" },
    },
  };
  const radioAdmin = {
    value: 4,
    my: 2,
    size: "sm",
    _text: { color: "light.50" },
    _checked: {
      borderColor: "primary.500",
      _icon: { color: "primary.500" },
    },
  };
  const radioActive = {
    value: 0,
    my: 2,
    size: "sm",
    _text: { color: "light.50" },
    _checked: {
      borderColor: "success.500",
      _icon: { color: "success.500" },
    },
  };
  const radioBusy = {
    value: 1,
    my: 2,
    size: "sm",
    _text: { color: "light.50" },
    _checked: {
      borderColor: "error.500",
      _icon: { color: "error.500" },
    },
  };
  const radioOut = {
    value: 2,
    my: 2,
    size: "sm",
    _text: { color: "light.50" },
    _checked: {
      borderColor: "primary.500",
      _icon: { color: "primary.500" },
    },
  };
  const radioDeshab = {
    value: 3,
    my: 2,
    size: "sm",
    _text: { color: "light.50" },
    _checked: {
      borderColor: "primary.500",
      _icon: { color: "primary.500" },
    },
  };

  return (
    <ScrollView
      bg="darkBlue.900"
      flex={1}
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <Box p={4}>
        <Heading color="light.50" mb={4}>
          Editar informacion de usuario
        </Heading>
        <Box>
          <FormControl my={2} isInvalid={errors.name}>
            <FormControl.Label _text={{ color: "light.50" }}>
              Nombre
            </FormControl.Label>
            <Input
              {...iptProps}
              placeholder="Nombre de usuario"
              value={data.name}
              onChangeText={handleName}
            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              El nombre de usuario debe contener mínimo 3 caracteres
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl my={2} isInvalid={errors.second_name}>
            <FormControl.Label _text={{ color: "light.50" }}>
              Apellidos
            </FormControl.Label>
            <Input
              {...iptProps}
              placeholder="Apellidos"
              value={data.second_name}
              onChangeText={handleSecondName}
            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              El apellido de usuario debe contener mínimo 3 caracteres
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl my={2} isInvalid={errors.email}>
            <FormControl.Label _text={{ color: "light.50" }}>
              Correo
            </FormControl.Label>
            <Input
              {...iptProps}
              placeholder="ejemplo@gmail.com"
              value={data.email}
              onChangeText={handleEmail}
            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              El formato del correo no es válido
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl my={2} isInvalid={errors.card_id}>
            <FormControl.Label _text={{ color: "light.50" }}>
              Documento de identidad
            </FormControl.Label>
            <Input
              {...iptProps}
              placeholder="12345678"
              value={data.card_id}
              onChangeText={handleID}
            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              El documento de identidad debe contener mínimo 6 dígitos
            </FormControl.ErrorMessage>
          </FormControl>
        </Box>
        <HStack justifyContent="space-between" my={2}>
          <Text color="light.50">Estado de delivery</Text>
          <Text color="light.50">Estado de usuario</Text>
        </HStack>
        <HStack justifyContent="space-between">
          <Radio.Group
            name="delivery_status"
            value={delivery_status}
            onChange={setDelivery_status}
            accessibilityLabel="del"
          >
            <Radio {...radioActive}>Activo</Radio>
            <Radio {...radioBusy}>Ocupado</Radio>
            <Radio {...radioOut}>Ausente</Radio>
            <Radio {...radioDeshab}>Inactivo</Radio>
          </Radio.Group>
          <Radio.Group
            accessibilityLabel="user"
            name="user_type"
            value={user_type}
            onChange={setUser_type}
          >
            <Radio {...radioDes}>Deshabilitado</Radio>
            <Radio {...radioHab}>Habilitado</Radio>
            <Radio {...radioAdmin}>Administrador</Radio>
          </Radio.Group>
        </HStack>
        {data.card_pic.length > 10 && (
          <Box my={4}>
            <Text color="light.50">Imagen del documento de identidad</Text>
            <Image
              my={2}
              borderRadius={2}
              source={{ uri: data.card_pic }}
              w={250}
              h={170}
              alt="card_ic"
              resizeMode="contain"
            />
          </Box>
        )}
        <HStack alignItems="center" my={6} pr={2}>
          {submitError && (
            <>
              <InfoOutlineIcon color="error.500" mr={2} />
              <Text color="error.500">{submitError}</Text>
            </>
          )}
        </HStack>
        <Box mt="auto">
          <Button
            onPress={updateData}
            bg="yellow.500"
            isLoadingText="Actualizando..."
            isLoading={isLoading}
            _text={{ color: "darkBlue.900" }}
            _pressed={{ bg: "yellow.500" }}
          >
            Actualizar
          </Button>
          <Pressable
            my={4}
            p="2"
            borderWidth={1}
            borderColor="light.50"
            borderRadius={2}
            _pressed={{
              opacity: 0.5,
            }}
            onPress={() => {
              navigation.goBack();
            }}
            alignItems="center"
          >
            <Text color="light.50">Regresar</Text>
          </Pressable>
        </Box>
      </Box>
    </ScrollView>
  );
};

export default UserDataEdit;

/**
 * name
 * email
 * card_id
 * secondname
 * usertype
 * delivery_status
 *
 */

const iptProps = {
  p: 2,
  bg: "light.50",
  borderWidth: 2,
  _focus: {
    bg: "light.50",
    borderColor: "yellow.500",
    borderWidth: 2,
  },
};

/**
 * 
 * 
  const [_id, set_id] = useState("");
  const [name, setName] = useState("");
  const [second_name, setSecond_name] = useState("");
  const [email, setEmail] = useState("");
  const [card_id, setCard_id] = useState("");
  const [user_type, setUser_type] = useState(0);
  const [delivery_status, setDelivery_status] = useState(0);

  useEffect(() => {
    // setData(route.params?.user);
    const {
      _id,
      name,
      second_name,
      email,
      card_id,
      user_type,
      delivery_status,
    } = route.params?.user;
    set_id(_id);
    setName(name);
    setSecond_name(second_name);
    setEmail(email);
    setCard_id(card_id);
    setUser_type(user_type);
    setDelivery_status(delivery_status);
  }, []);
 */
