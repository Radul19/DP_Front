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
  Center,
} from "native-base";
import { useCallback, useContext, useState } from "react";
import { Context } from "../../utils/Context";
import girl from "../../images/girl2.png";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { RefreshControl } from "react-native";
import Navbar from "../../components/Navbar";
import Loader from "../../components/Loader";
import { getUsers } from "../../api/authorization";

const colorStatus = ["success.500", "error.500", "yellow.500"];

const SearchUserPage = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");
  const [emptyResult, setEmptyResult] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const { status, data } = await getUsers(input);
    setLoading(false);
    if (status === 200) {
      setData(data);
    } else if (status === 204) {
      setEmptyResult(true);
    } else {
      console.log("error");
    }
  };

  useEffect(() => {
    const willFocusSubscription = navigation.addListener("focus", () => {
      fetchData();
    });

    return willFocusSubscription;
  }, []);

  useEffect(() => {
    (async () => {
      // setLoading(true);
      const timeoutID = setTimeout(async () => {
        // Send Axios request here
        fetchData();
      }, 3000);
      return () => clearTimeout(timeoutID);
    })();
  }, [input]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }, []);

  return (
    <>
      <ScrollView
        bg="darkBlue.900"
        flex={1}
        contentContainerStyle={{ flexGrow: 1 }}
        stickyHeaderIndices={[1]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* <Header navigation={navigation} /> */}
        <HStack p={4} bg="blueGray.800" alignItems="center">
          <Heading color="light.50">Buscador de Usuarios</Heading>
          {/* <SearchIcon ml={4} /> */}
        </HStack>
        <InputCtn {...{ input, setInput }} />
        <Loader active={loading} />
        {emptyResult && <EmptyText />}
        {!loading && <SearchResults data={data} />}
      </ScrollView>
      <Box position="absolute" bottom={0} w="100%">
        <Navbar state={5} />
      </Box>
    </>
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
const InputCtn = ({ setInput, input }) => {
  const inputProps = {
    value: input,
    onChangeText: setInput,
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
const SearchResults = ({ data }) => {
  return (
    <Box px={4} pb={16} bg="darkBlue.900">
      {data.map((item) => (
        <Card item={item} key={item._id} />
      ))}
    </Box>
  );
};

///// CARD
const Card = ({ item }) => {
  const { name, second_name, profile_pic, card_id, place } = item;
  const nav = useNavigation();

  const goUser = () => {
    nav.navigate("UserDataEdit", { user: item });
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
            <Avatar my={3} mx={4} size={16} source={{ uri: profile_pic }} />
            <Box justifyContent="space-evenly">
              <Text color={textC}>
                {name.split(" ", 1) + " " + second_name.split(" ", 1)}
              </Text>
              <Text color={textC}>{card_id}</Text>
              {place.state && place.city ? (
                <Text color={textC}>{place.state + " - " + place.city}</Text>
              ) : (
                <Text color={textC}>{place.country}</Text>
              )}
            </Box>
          </>
        );
      }}
    </Pressable>
  );
};

const EmptyText = () => {
  return (
    <Center mt={-12}>
      <Text color="muted.500">{"No se han encontrado resultados ):"}</Text>
    </Center>
  );
};
