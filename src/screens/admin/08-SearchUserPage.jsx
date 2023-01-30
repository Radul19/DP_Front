import {
  ScrollView,
  Text,
  Box,
  SearchIcon,
  Heading,
  Input,
  HStack,
  Avatar,
  Pressable,
} from "native-base";
import { useContext } from "react";
import { Context } from "../../utils/Context";
import girl from "../../images/girl2.png";
import { useNavigation } from "@react-navigation/native";

const colorStatus = ["success.500", "error.500", "yellow.500"];

const SearchUserPage = ({ navigation }) => {
  return (
    <ScrollView
      bg="darkBlue.900"
      flex={1}
      contentContainerStyle={{ flexGrow: 1 }}
      stickyHeaderIndices={[1]}
    >
      {/* <Header navigation={navigation} /> */}
      <HStack p={4} bg="blueGray.800" alignItems="center">
        <Heading color="light.50">Buscador de Usuarios</Heading>
        {/* <SearchIcon ml={4} /> */}
      </HStack>
      <InputCtn />
      <SearchResults />
    </ScrollView>
  );
};

export default SearchUserPage;

///// HEADER
const Header = ({ navigation }) => {
  const { location, userData } = useContext(Context);
  const { state, country, city } = location;

  const goProfile = () => {
    navigation.navigate("Profile");
  };

  return (
    <Box
      {...{
        px: 4,
        py: 6,
        flexDirection: "row",
        alignItems: "center",
        bg: "blueGray.800",
      }}
    >
      <Text color="light.50" fontSize="lg">
        Big Title Here
      </Text>
      {/* <HamburgerIcon color="yellow.500" ml="auto" mr={2} size={5} /> */}
      <Menu
        w="190"
        bg="blueGray.800"
        trigger={(triggerProps) => {
          return (
            <Pressable
              ml="auto"
              mr={2}
              accessibilityLabel="More options menu"
              {...triggerProps}
            >
              <HamburgerIcon color="yellow.500" size={5} />
            </Pressable>
          );
        }}
      >
        <Menu.Group title="Opciones" _title={{ color: "light.50" }}>
          <Menu.Item
            _text={{ color: "light.50" }}
            {...{ borderTopWidth: 1, borderTopColor: "blueGray.600" }}
          >
            Opcion uno
          </Menu.Item>
          <Menu.Item
            _text={{ color: "light.50" }}
            {...{ borderTopWidth: 1, borderTopColor: "blueGray.600" }}
          >
            Opcion dos
          </Menu.Item>
          <Menu.Item
            _text={{ color: "light.50" }}
            {...{ borderTopWidth: 1, borderTopColor: "blueGray.600", mb: -1 }}
          >
            Opcion tres
          </Menu.Item>
        </Menu.Group>
      </Menu>
    </Box>
  );
};
///// INPUT
const InputCtn = () => {
  const inputProps = {
    placeholder: "Buscar usuario",
    bg: "light.50",
    borderWidth: 2,
    InputLeftElement: <SearchIcon size={5} ml="2" color="muted.400" />,
    _focus: {
      bg: "light.50",
      borderColor: "yellow.500",
      borderWidth: 2,
    },
  };
  const resultTextCtnProps = {
    bg: {
      linearGradient: {
        colors: [
          "darkBlue.900",
          "darkBlue.900",
          "darkBlue.900",
          "darkBlue.900",
          "transparent",
        ],
        start: [0, 0],
        end: [0, 1],
      },
    },
    flexDirection: "row",
    pt: 4,
    pb: 8,
    mb: -4,
    px: 2,
    alignItems: "center",
    justifyContent: "space-between",
  };
  return (
    <Box bg="#fff11100">
      <Input {...inputProps} type="text" />
      <Box {...resultTextCtnProps}>
        <Text color="light.50">Resultados de Busqueda</Text>
      </Box>
    </Box>
  );
};

//// SEARCH RESULT
const SearchResults = () => {
  return (
    <Box px={4} pb={16} bg="darkBlue.900">
      <Card status={0} />
      <Card status={1} />
      <Card status={2} />
      <Card status={0} />
      <Card status={1} />
      <Card status={2} />
      <Card status={0} />
      <Card status={1} />
      <Card status={2} />
      <Card status={0} />
      <Card status={1} />
      <Card status={2} />
      <Card status={0} />
      <Card status={1} />
      <Card status={2} />
      <Card status={0} />
      <Card status={1} />
      <Card status={2} />
    </Box>
  );
};

///// CARD
const Card = () => {
  const nav = useNavigation();
  const goChat = () => {
    nav.navigate("Chat");
  };
  const goUser = () => {
    nav.navigate("UserDataPage");
  };

  return (
    <Pressable
      onPress={goUser}
      {...{
        flexDirection: "row",
        bg: "blueGray.800",
        borderRadius: 12,
        overflow: "hidden",
        pr: 4,
        my: 2,
        _pressed: { bg: "yellow.500" },
      }}
    >
      {({ isPressed }) => {
        const textC = isPressed ? "darkBlue.900" : "light.50";
        return (
          <>
            <Avatar my={3} mx={4} size={16} source={girl} />
            <Box justifyContent="space-evenly">
              <Text fontSize={16} color={textC}>
                Dane Joe
              </Text>
              <Text color={textC}>29234987</Text>
              <Text color={textC}>Zulia - Cabimas</Text>
            </Box>
          </>
        );
      }}
    </Pressable>
  );
};
