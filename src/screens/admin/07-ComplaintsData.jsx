import {
  Box,
  Button,
  Center,
  HStack,
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  WarningIcon,
} from "native-base";
import profile from "../../images/profilecard.png";
import profile2 from "../../images/girl2.png";
import Navbar from "../../components/Navbar";
import { Dimensions } from "react-native";
import User_Card from "./User_Card";
import { useState } from "react";
import { ArrowLeftThin, ArrowRightThin } from "../../components/IconMonstr";
import { complaintAction } from "../../api/authorization";

const ww = Dimensions.get("window").width;
const wh = Dimensions.get("window").height;
const smallw = ww / 2 - 32;
const smallh = (ww / 2 - 32) * 0.5625 + smallw;

const ComplaintsData = ({ navigation, route }) => {
  const { creator, target, title, description, proofs, _id } = route.params;

  const [cardDisplay, setCardDisplay] = useState(false);
  const [userDisplay, setUserDisplay] = useState(creator);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [error, setError] = useState(false);

  const onCardLeft = () => {
    setCardDisplay(false);
    setUserDisplay(creator);
  };
  const onCardRight = () => {
    setCardDisplay(true);
    setUserDisplay(target);
  };

  const closeModal = () => {
    setModal(false);
  };

  const approve = async () => {
    setError(false);
    setLoading(true);
    const { status } = await complaintAction(_id, target._id, true);
    setLoading(false);
    if (status === 200) {
      navigation.goBack();
    } else {
      setError(true);
    }
  };
  const deny = async () => {
    setError(false);
    setLoading2(true);
    const { status } = await complaintAction(_id, target._id, false);
    setLoading2(false);
    if (status === 200) {
      navigation.goBack();
    } else {
      setError(true);
    }
  };

  return (
    <>
      <ScrollView
        bg="darkBlue.900"
        flex={1}
        {...{ contentContainerStyle: { flexGrow: 1 } }}
      >
        <ModalImage image={modal} onClose={closeModal} />
        <Box flex={1} p={4}>
          <Text color="light.50" fontSize={24} mb={4}>
            Denuncia
          </Text>
          <Text color="light.50" fontSize={18} mb={2}>
            {title}
          </Text>
          <Text color="light.50">{description}</Text>
          <HStack justifyContent="space-between" my={4}>
            <Pressable
              {...captureStyle}
              onPress={() => setModal(proofs[0].pic_url)}
            >
              <Image
                source={{ uri: proofs[0].pic_url }}
                w="100%"
                h="100%"
                alt="proof1"
              />
            </Pressable>
            {proofs[1] && (
              <Pressable
                {...captureStyle}
                onPress={() => setModal(proofs[1].pic_url)}
              >
                <Image
                  source={{ uri: proofs[1].pic_url }}
                  w="100%"
                  h="100%"
                  alt="proof2"
                />
              </Pressable>
            )}
          </HStack>
          {/** BTNS */}
          <HStack justifyContent="space-between" mt={8} zIndex={100}>
            <Pressable {...btn1} onPress={onCardLeft}>
              <Text color="light.50">Denunciante</Text>
            </Pressable>
            <Pressable {...btn2} onPress={onCardRight}>
              <Text color="light.50">Denunciado</Text>
            </Pressable>
          </HStack>
          {/** CARD DISPLAY  */}
          <Box
            w="100%"
            p={4}
            borderBottomRadius={4}
            bg={cardDisplay ? "darkBlue.900" : "blueGray.800"}
            borderWidth={1}
            borderColor={cardDisplay ? "light.50" : "blueGray.800"}
            mb={6}
          >
            <User_Card user={userDisplay} />
          </Box>

          {error && (
            <HStack alignItems="center" mb={5}>
              <WarningIcon color="error.700" />
              <Text color="error.700" ml={4}>
                Ha ocurrido un error al realizar la accion, intente nuevamente
              </Text>
            </HStack>
          )}
          {/** APPROVE OR DENY */}
          <HStack justifyContent="space-between" mb={24}>
            <Button
              {...btnSecondary}
              isLoading={loading2}
              isLoadingText="Rechazando..."
              onPress={deny}
            >
              <Text fontWeight="bold" color="light.50">
                Rechazar
              </Text>
            </Button>
            <Button
              {...btnPrimary}
              isLoading={loading}
              isLoadingText="Aprobando..."
              onPress={approve}
            >
              <Text fontWeight="bold" color="darkBlue.900">
                Aprobar
              </Text>
            </Button>
          </HStack>
          {/** END BTNS */}
          <Box flexDirection="row" mt="auto" justifyContent="space-between">
            <ButtonLeft nav={navigation} />
          </Box>
        </Box>
      </ScrollView>
    </>
  );
};

export default ComplaintsData;

const ButtonLeft = ({ nav }) => {
  const pressBack = () => nav.navigate("Complaints");
  return (
    <Pressable {...buttonStyles} onPress={pressBack}>
      {({ isPressed }) => {
        return (
          <>
            <ArrowLeftThin
              color={isPressed ? "yellow.500" : "light.50"}
              size={4}
            />
            <Text
              color={isPressed ? "yellow.500" : "light.50"}
              fontSize={12}
              ml={3}
            >
              Regresar
            </Text>
          </>
        );
      }}
    </Pressable>
  );
};

const ModalImage = ({ image, onClose }) => {
  return (
    <Modal isOpen={image && true} onClose={onClose} animationPreset="fade">
      <Center>
        <Box w={wh * 0.4} h={wh * 0.8} bg="darkBlue.900">
          <Image w="100%" h="100%" alt="preview" source={{ uri: image }} />
        </Box>
      </Center>
    </Modal>
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
  overflow:'hidden',
  _pressed: { opacity: 0.5 },
};

const btn1 = {
  bg: "blueGray.800",
  px: 4,
  py: 2,
  borderTopRadius: 4,
  borderWidth: 1,
  borderColor: "blueGray.800",
  _pressed: { opacity: 0.5 },
};
const btn2 = {
  bg: "darkBlue.900",
  px: 4,
  py: 2,
  borderTopRadius: 4,
  borderWidth: 1,
  borderTopColor: "light.50",
  borderLeftColor: "light.50",
  borderRightColor: "light.50",
  borderBottomColor: "darkBlue.900",
  _pressed: { opacity: 0.5 },
};

const btnPrimary = {
  px: 4,
  py: 2,
  w: "45%",
  alignItems: "center",
  borderWidth: 1,
  bg: "yellow.500",
  borderColor: "yellow.500",
  borderRadius: 2,
  _pressed: {
    bg: "yellow.500",
    opacity: 0.5,
  },
};
const btnSecondary = {
  px: 4,
  py: 2,
  w: "45%",
  alignItems: "center",
  borderWidth: 1,
  borderColor: "light.50",
  borderRadius: 2,
  bg: "#ffffff00",
  _pressed: {
    bg: "#ffffff00",
    opacity: 0.5,
  },
};

const buttonStyles = {
  flexDirection: "row",
  py: 2,
  alignItems: "center",
};
