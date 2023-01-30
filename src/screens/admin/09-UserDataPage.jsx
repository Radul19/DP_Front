import {
  ArrowBackIcon,
  Avatar,
  Box,
  Button,
  HStack,
  Pressable,
  ScrollView,
  ShareIcon,
  Text,
  useTheme,
} from "native-base";
import { ChatIcon, Star_Filled } from "../../components/IconMonstr";
import Navbar from "../../components/Navbar";

import profile from "../../images/girl2.png";

const UserDataPage = ({ navigation }) => {
  const { btnPrimary } = useTheme();
  const goChat = () => {
    navigation.navigate("Chat");
  };
  return (
    <>
      <ScrollView
        bg="blueGray.800"
        flex={1}
        {...{ contentContainerStyle: { flexGrow: 1 } }}
      >
        <Box flex={1}>
          <Header navigation={navigation} />
          <Box {...propsContent}>
            <Text color="light.50" mt="30%" fontSize={26}>
              Dane Joe
            </Text>
            <Box flexDir="row" w="50%" justifyContent="space-between" my={2}>
              <Star_Filled key={1} />
              <Star_Filled key={2} />
              <Star_Filled key={3} />
              <Star_Filled key={4} />
              <Star_Filled key={5} />
            </Box>
            <Text color="light.50" mt={2} mb={6}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque id mi tellus. Donec id facilisis nisl. Vestibulum
              vitae est blandit, cursus tortor a, scelerisque sapien.
            </Text>
            <Button
              {...btnPrimary}
              {...{
                mt: 0,
                mb: 8,
                w: "100%",
                flexDirection: "row-reverse",
                _text: { fontWeight: "bold", color: "black", mr: 2 },
              }}
              onPress={goChat}
              endIcon={<ChatIcon color="#000" size={5} />}
            >
              Iniciar Chat
            </Button>
            <Box px={2} w="100%">
              <Box flexDir="row" w="100%">
                <Text fontSize={16} mr={4} color="light.50">
                  Status:
                </Text>
                <Box
                  {...{
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: "success.500",
                    py: 0.5,
                    px: 6,
                    justifyContent: "center",
                  }}
                >
                  <Text {...{ fontSize: 10, color: "success.500" }}>
                    Disponible
                  </Text>
                </Box>
              </Box>
              <Text fontSize={16} color="light.50" w="100%" mt={4}>
                Reseñas: 293
              </Text>
              <Text fontSize={16} color="light.50" w="100%" mt={4}>
                Pedidos cancelados: 23
              </Text>
              <Text fontSize={16} color="light.50" w="100%" mt={4}>
                Pedidos completados: 415
              </Text>
            </Box>
          </Box>
          <HStack {...propsStack}>
            <Btn text="Rehabilitar" />
            <Btn text="Deshabilitar" />
          </HStack>
          <HStack {...propsStack} pb={24} flexDir="row-reverse">
            <Btn text="Eliminar Usuario" />
            <Btn text="Privilegios" isDisabled={true} />
          </HStack>
        </Box>
      </ScrollView>
      <Box position="absolute" bottom={0} w="100%">
        <Navbar state={5} />
      </Box>
    </>
  );
};

export default UserDataPage;

const Header = ({ navigation }) => {
  return (
    <Box {...propsHeader}>
      <Pressable
        size={8}
        bg="#ffffff00"
        onPress={() => {
          navigation.goBack();
        }}
      >
        <ArrowBackIcon {...{ color: "yellow.500", size: 6 }} />
      </Pressable>

      <Avatar {...avatarProps} />
      <ShareIcon size={6} color="yellow.500" />
    </Box>
  );
};

const Btn = ({ text, isDisabled }) => {
  return (
    <Pressable
      {...btnProps}
      isDisabled={isDisabled}
      opacity={isDisabled ? 0.5 : 1}
    >
      <Text color="light.50">{text}</Text>
    </Pressable>
  );
};

const propsHeader = {
  flexDir: "row",
  justifyContent: "space-between",
  pt: 4,
  px: 4,
};

const avatarProps = {
  source: profile,
  size: "2xl",
  mt: 4,
};

const propsContent = {
  flex: 1,
  mt: "-25%",
  bg: "darkBlue.900",
  zIndex: -1,
  alignItems: "center",
  px: 3,
  pb: 4,
};

const propsStack = {
  bg: "darkBlue.900",
  px: 4,
  pt: 6,
  justifyContent: "space-between",
};

const btnProps = {
  bg: "muted.700",
  px: 4,
  py: 2,
  w: "45%",
  alignItems: "center",
  borderRadius: 4,
  _pressed: {
    opacity: 0.5,
  },
};
