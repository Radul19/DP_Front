import {
  Box,
  Center,
  CloseIcon,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Text,
} from "native-base";
import { useEffect } from "react";
import { useState } from "react";
import { getComplaints } from "../../api/authorization";
import { ErrorSign } from "../../components/IconMonstr";
import Loader from "../../components/Loader";
import Navbar from "../../components/Navbar";
import profile from "../../images/profilecard.png";

const Complaints = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [emptyData, setEmptyData] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const { data, status } = await getComplaints();
    setLoading(false);
    /// evaluate status
    if (status === 200) {
      setErrorMsg(false);
      setData(data);
      if (data.length === 0) return setEmptyData(true);
      setData(data);
    } else {
      setErrorMsg(true);
    }
  };

  useEffect(() => {
    // fetchData();
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
        <Box flex={1} p={4}>
          <HStack alignItems="center" mb={4}>
            <Text color="light.50" fontSize={24} mr={3}>
              Denuncias
            </Text>
            <Box mt={2}>
              <ErrorSign />
            </Box>
          </HStack>
          <Box w="100%">
            <Loader active={loading} />
            {errorMsg && <ErrorMessage text={errorMsg} />}
            {emptyData && <EmptyMessage />}
            {data.map((item) => (
              <Card item={item} key={item._id} nav={navigation} />
            ))}
          </Box>
        </Box>
      </ScrollView>
      <Box position="absolute" bottom={0} w="100%">
        <Navbar state={5} />
      </Box>
    </>
  );
};
export default Complaints;

const Card = ({ nav, item }) => {
  const press = () => nav.navigate("ComplaintsData",item);
  return (
    <Pressable onPress={press} {...cardStyle}>
      {({ isPressed }) => {
        const textC = isPressed ? "darkBlue.900" : "light.50";
        return (
          <>
            <Box alignItems="center" w="20%">
              <Image
                source={{uri:item.creator.profile_pic}}
                {...{
                  alt: "profile",
                  size: 16,
                  borderRadius: 4,
                  mb: 2,
                }}
              />
              <Text color={textC}>
                {item.creator.name.split(" ", 1) +
                  " " +
                  item.creator.second_name.split(" ", 1)}
              </Text>
            </Box>
            <Box flex={1} ml={3} justifyContent="space-between">
              <Text fontSize={16} numberOfLines={2} color={textC}>
                {item.title}
              </Text>
              <Text fontSize={12} numberOfLines={3} color={textC}>
                {item.description}
              </Text>
            </Box>
          </>
        );
      }}
    </Pressable>
  );
};
const cardStyle = {
  bg: "blueGray.800",
  borderRadius: 4,
  flexDirection: "row",
  py: 3,
  px: 3,
  _pressed: {
    bg: "yellow.500",
  },
  mb: 4,
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
      <CloseIcon color="error.700" alignSelf="center" />
      <Text color="error.700" mt={2}>
        Ha ocurrido un error al cargar los datos, intente nuevamente
      </Text>
    </Center>
  );
};
