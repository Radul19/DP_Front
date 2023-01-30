import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Center,
  CloseIcon,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Text,
} from "native-base";
import Navbar from "../../components/Navbar";
import profile from "../../images/profilecard.png";
import { ArrRight, ErrorSign, User19 } from "../../components/IconMonstr";
import { getUserRequests } from "../../api/authorization";
import Loader from "../../components/Loader";

const UserRequests = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [emptyData, setEmptyData] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const { data, status } = await getUserRequests();
    setLoading(false);
    /// evaluate status
    if (status === 200) {
      setErrorMsg(false);
      setData(data);
      if (data.length === 0) return setEmptyData(true);
      setData(data);
    } else {
      setErrorMsg(data.msg);
    }
  };

  useEffect(() => {
    fetchData();
    const willFocusSubscription = navigation.addListener("focus", () => {
      fetchData();
    });

    return willFocusSubscription;
  }, []);

  return (
    <>
      <ScrollView
        bg="darkBlue.900"
        flex={1}
        {...{ contentContainerStyle: { flexGrow: 1 } }}
      >
        <Box p={4} flex={1}>
          <HStack alignItems="center" mb={4}>
            <Text color="light.50" fontSize={24} mr={3}>
              Solicitudes
            </Text>
            <Box mt={1}>
              <User19 />
            </Box>
          </HStack>

          <Box w="100%">
            <Loader active={loading} />
            {errorMsg && <ErrorMessage text={errorMsg} />}
            {emptyData && <EmptyMessage />}
            {data.map((item) => (
              <Card item={item} key={item._id} nav={navigation} />
            ))}

            {/* <Card nav={navigation} />
            <Card nav={navigation} />
            <Card nav={navigation} />
            <Card nav={navigation} />
            <Card nav={navigation} />
            <Card nav={navigation} />
            <Card nav={navigation} /> */}
          </Box>
        </Box>
      </ScrollView>
      <Box position="absolute" bottom={0} w="100%">
        <Navbar state={5} />
      </Box>
    </>
  );
};

export default UserRequests;

const Card = ({ nav, item }) => {
  const { user_data, selfie } = item;
  const press = () => nav.navigate("UserRequestsData", { item });
  return (
    <Pressable {...cardProps} onPress={press}>
      {({ isPressed }) => {
        return (
          <>
            <Image
              source={{ uri: selfie }}
              size={16}
              alt="picture"
              borderRadius={4}
              bg="blueGray.800"
            />
            <Box ml={4}>
              <Text
                color={isPressed ? "darkBlue.900" : "light.50"}
                numberOfLines={1}
              >
                {user_data.name + " " + user_data.second_name}
              </Text>
              <Text color={isPressed ? "darkBlue.900" : "light.50"}>
                {user_data.card_id}
              </Text>
              <Text color={isPressed ? "darkBlue.900" : "light.50"}>
                {user_data.email}
              </Text>
            </Box>
            <Box ml="auto">
              <ArrRight
                size={8}
                color={isPressed ? "darkBlue.900" : "#facc15"}
              />
            </Box>
          </>
        );
      }}
    </Pressable>
  );
};

const EmptyMessage = () => {
  return (
    <Center mt={2}>
      <ErrorSign color="muted.400" alignSelf="center" />
      <Text color="muted.400" mt={2}>
        Actualmente no hay peticiones de usuarios
      </Text>
    </Center>
  );
};
const ErrorMessage = ({ text }) => {
  return (
    <Center mt={2}>
      <CloseIcon color="muted.400" alignSelf="center" />
      <Text color="muted.400" mt={2}>
        {text}
      </Text>
    </Center>
  );
};

const cardProps = {
  bg: "blueGray.800",
  my: 2,
  alignItems: "center",
  borderRadius: 4,
  py: 2,
  px: 3,
  flexDirection: "row",
  _pressed: {
    bg: "yellow.500",
  },
};
