import {
  Box,
  Heading,
  Pressable,
  ScrollView,
  SearchIcon,
  Text,
} from "native-base";
import React from "react";
import {
  ArrRight,
  Delivery1,
  ErrorSign,
  Restore,
  User19,
} from "../../components/IconMonstr";
import Navbar from "../../components/Navbar";
import Icon from "../../svg/Bell.svg";

const AdminDashboard = ({ navigation }) => {
  const userOpt = () => navigation.navigate("UserRequests");
  const deliOpt = () => navigation.navigate("DeliRequests");
  const reportOpt = () => navigation.navigate("Complaints");
  const rehabOpt = () => navigation.navigate("SearchUserPage");

  return (
    <>
      <ScrollView
        bg="blueGray.800"
        flex={1}
        {...{ contentContainerStyle: { flexGrow: 1 } }}
      >
        <Box flex={1} bg="darkBlue.900" p={4}>
          <Heading color="light.50">Dashboard de administrador</Heading>
          <Text color="light.50" fontSize="18">
            Seleccione una opcion
          </Text>
          <Box ml={-2} mt={6}>
            <Option
              press={userOpt}
              Icon={User19}
              text="Solicitudes de usuario"
            />
            {/* <Option
              press={deliOpt}
              Icon={Delivery1}
              text="Solicitudes de Delivery"
            /> */}
            <Option press={reportOpt} Icon={ErrorSign} text="Denuncias" />
            {/* <Option press={rehabOpt} Icon={SearchIcon} text="Buscar usuario" /> */}
          </Box>
        </Box>
      </ScrollView>
      <Box position="absolute" bottom={0} w="100%">
        <Navbar state={5} />
      </Box>
    </>
  );
};

export default AdminDashboard;

const Option = ({ Icon, text, press = null }) => {
  return (
    <Pressable {...propsOption} onPress={press}>
      {({ isPressed }) => {
        return (
          <>
            <Icon
              width={28}
              height={28}
              color={isPressed ? "darkBlue.900" : "#facc15"}
            />
            <Text
              color={isPressed ? "darkBlue.900" : "light.50"}
              fontSize="md"
              ml={3}
            >
              {text}
            </Text>
            <Box ml="auto">
              <ArrRight
                size={6}
                color={isPressed ? "darkBlue.900" : "#facc15"}
              />
            </Box>
          </>
        );
      }}
      {/* <Icon /> */}
    </Pressable>
  );
};

const propsOption = {
  flexDir: "row",
  w: "100%",
  mt: 4,
  p: 2,
  alignItems: "center",
  borderRadius: 12,
  _pressed: {
    bg: "yellow.500",
  },
};
