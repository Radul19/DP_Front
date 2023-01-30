import { Box, HStack, Image, Pressable, ScrollView, Text } from "native-base";
import { ErrorSign } from "../../components/IconMonstr";
import Navbar from "../../components/Navbar";
import profile from "../../images/profilecard.png";

const Complaints = ({ navigation }) => {
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
            <Card nav={navigation} />
            <Card nav={navigation} />
            <Card nav={navigation} />
            <Card nav={navigation} />
            <Card nav={navigation} />
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

const Card = ({ nav }) => {
  const press = () => nav.navigate("ComplaintsData");
  return (
    <Pressable onPress={press} {...cardStyle}>
      {({ isPressed }) => {
        const textC = isPressed ? "darkBlue.900" : "light.50";
        return (
          <>
            <Box alignItems="center" w='20%' >
              <Image
                source={profile}
                {...{
                  alt: "profile",
                  size: 16,
                  borderRadius: 4,
                  mb: 2,
                }}
              />
              <Text color={textC}>Roberto Paredes</Text>
            </Box>
            <Box flex={1} ml={3} justifyContent="space-between">
              <Text fontSize={16} numberOfLines={2} color={textC}>
                Some title a some complaint about something
              </Text>
              <Text fontSize={12} numberOfLines={3} color={textC}>
                Some title a some complaint about something Some title a some
                complaint about something Some title a some complaint about
                something Some title a some complaint about something
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
  mb:4
};
