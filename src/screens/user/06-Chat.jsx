import { Dimensions, LogBox, View } from "react-native";
import { useContext, useState } from "react";
import {
  ArrowBackIcon,
  Avatar,
  Box,
  Button,
  Center,
  CloseIcon,
  Heading,
  HStack,
  Image,
  Input,
  Menu,
  Modal,
  Pressable,
  ScrollView,
  Switch,
  Text,
  WarningIcon,
} from "native-base";
import girl from "../../images/girl2.png";
import chatback from "../../images/chatback.png";

/// ICONS
import SendArrow from "../../svg/Send_hor_fill.svg";
import { Context } from "../../utils/Context";
import socket from "../../utils/socket";
import { useEffect } from "react";
import { getMessages } from "../../api/user";
import { Location26, Map5, Paperclip2 } from "../../components/IconMonstr";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import MapViewDirections from "react-native-maps-directions";

const findUser = (arr, _id) => {
  arr.indexOf((item) => item._id === _id);
};
LogBox.ignoreLogs([
  "We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320",
]);

const ww = Dimensions.get("window").width;
const wh = Dimensions.get("window").height;

const Chat = ({ navigation, route }) => {
  const { userData, location } = useContext(Context);
  const [chat, setChat] = useState({
    delivery_id: "",
    participants: [],
    messages: [],
    _id: "",
    live_sharing: false,
  });
  const [partnerPos, setPartnerPos] = useState(0);
  const [imDelivery, setImDelivery] = useState(false);
  const [input, setInput] = useState("");
  const [liveMapModal, setLiveMapModal] = useState({
    open: false,
    latitude: 0,
    longitude: 0,
  });
  // "latitude": 10.399435, "longitude": -71.471385
  const [mapModal, setMapModal] = useState(false);

  const [preview, setPreview] = useState({
    open: false,
    origin: {
      latitude: 0,
      longitude: 0,
    },
    destination: {
      latitude: 0,
      longitude: 0,
    },
  });

  const [updateInterval, setUpdateInterval] = useState(false);
  const [complaintModal, setComplaintModal] = useState(false);

  const startInterval = async () => {
    if (imDelivery) {
      let interv = setInterval(async () => {
        let { coords } = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest,
          maximumAge: 5000,
        });
        socket.emit("delivery_pos", {
          latitude: coords.latitude,
          longitude: coords.longitude,
          chat_id: chat._id,
        });
      }, 10000);
      setUpdateInterval(interv);
    }
  };
  const cleanupInterval = () => {
    clearInterval(updateInterval);
    setUpdateInterval(false);
  };

  const toggleTracking = async () => {
    socket.emit("toggleTracking", {
      state: !chat.live_sharing,
      chat_id: chat._id,
    });
    setChat({ ...chat, live_sharing: !chat.live_sharing });
    if (!chat.live_sharing) {
      startInterval();
    } else {
      cleanupInterval();
    }
  };

  const toggleLiveMap = () => {
    setLiveMapModal({ ...liveMapModal, open: !liveMapModal.open });
  };

  const handleChange = (text) => setInput(text);

  const goBack = () => {
    cleanupInterval();
    socket.emit("leave_chat", chat._id);
    navigation.goBack();
  };

  const sendText = (new_message) => {
    socket.emit("add_message", {
      chat_id: chat._id,
      new_message,
    });
    setChat((prev) => ({ ...prev, messages: [...prev.messages, new_message] }));
    setInput("");
    // setMyText([...myText, input]);
  };
  const pressSend = async () => {
    const new_message = {
      owner: userData._id,
      text: input,
      timestamp: Date.now(),
    };
    sendText(new_message);
  };
  const allIn = async () => {
    let aux = route.params?.chat.participants.findIndex(
      (item) => item._id === userData._id
    );
    setChat(route.params?.chat);
    setPartnerPos(aux === 0 ? 1 : 0);
    setImDelivery(route.params?.chat.delivery_id === userData._id);

    const { status, data } = await getMessages(route.params?.chat._id);
    if (status === 200) {
      setChat((prev) => ({ ...prev, messages: data.messages }));
    }

    if (route.params?.chat.live_sharing) {
      startInterval();
    }

    /** SOCKETS */
    socket.on("update_messages", (thischat) => {
      if (thischat._id === route.params?.chat._id) {
        setChat((prev) => ({ ...prev, messages: thischat.messages }));
      }
    });

    socket.on("update_tracking", (state) => {
      setChat((prev) => ({ ...prev, live_sharing: state }));
    });
    socket.on("update_delivery_pos", ({ latitude, longitude }) => {
      setLiveMapModal((prev) => ({ ...prev, latitude, longitude }));
    });

    return () => clearInterval(updateInterval);
  };

  useEffect(() => {
    allIn();
    return () => clearInterval(updateInterval);
  }, []);

  const menuProps = {
    toggleTracking,
    setMapModal,
    chat,
    imDelivery,
    toggleLiveMap,
    navigation,
    target_id: chat.delivery_id,
  };
  const modalProps = {
    userData,
    mapModal,
    setMapModal,
    sendText,
    imDelivery,
  };

  const previewProps = {
    preview,
    setPreview,
  };

  return (
    <Box flex={1}>
      <MapViewModal {...modalProps} />
      <PreviewModal {...previewProps} />
      <LiveMapModal {...{ liveMapModal, setLiveMapModal }} />
      <Image
        source={chatback}
        alt="background"
        position="absolute"
        resizeMode="cover"
        w="100%"
        h="100%"
      />
      <Box h="64px" alignItems="center" flexDir="row" px={3} bg="darkBlue.900">
        <Pressable
          size={8}
          alignItems="center"
          justifyContent="center"
          bg="#ffffff00"
          onPress={goBack}
          _pressed={{
            opacity:0.5
          }}
        >
          <ArrowBackIcon color="yellow.500" size={6} />
        </Pressable>
        <Box ml="auto" flexDir="row" alignItems="center">
          <Text color="light.50">
            {chat.participants[partnerPos]?.name.split(" ", 1) +
              " " +
              chat.participants[partnerPos]?.second_name.split(" ", 1)}
          </Text>
          {/* <Text color="light.50">{}</Text> */}
          <Avatar
            source={{ uri: chat.participants[partnerPos]?.profile_pic }}
            ml={4}
          ></Avatar>
        </Box>
      </Box>

      <ScrollView flexDir="column-reverse" flex={1}>
        <DisplayMessages
          msg={chat.messages}
          owner_id={userData._id}
          setPreview={setPreview}
        />
      </ScrollView>
      <HStack
        h="64px"
        bg="darkBlue.900"
        alignItems="center"
        px={3}
        justifyContent="space-between"
      >
        {/* <Box p={3} bg={'red.500'} >
          <Paperclip2 />
        </Box> */}
        <MenuButton {...menuProps} />
        <Input
          value={input}
          onChangeText={handleChange}
          w="85%"
          bg="light.50"
          // placeholder="text"
          _focus={{
            bg: "light.50",
            borderColor: "light.50",
          }}
          InputRightElement={<InputRight press={pressSend} />}
        />
      </HStack>
    </Box>
  );
};

export default Chat;

const LeftText = ({ item, setPreview }) => {
  const { origin, destination } = item;
  const openPreview = () => {
    setPreview({ origin, destination, open: true });
  };
  return (
    <>
      {item.map ? (
        <Pressable
          h={250}
          w={175}
          alignSelf="flex-start"
          m={2}
          p={2}
          bg="cyan.900"
          borderRadius={4}
          onPress={openPreview}
          _pressed={{ opacity: 0.5 }}
        >
          <Box pointerEvents="none">
            <MapView
              ani
              style={{ minHeight: 234 }}
              initialRegion={{
                ...origin,
                latitudeDelta: 0.004,
                longitudeDelta: 0.005,
              }}
            >
              <Marker coordinate={origin} title="Origen" />
              <Marker
                coordinate={destination}
                pinColor="blue"
                title="Destino"
              />
            </MapView>
          </Box>
        </Pressable>
      ) : (
        <Box
          m={2}
          px={3}
          py={2}
          maxW="60%"
          minH="32px"
          bg="cyan.900"
          rounded="md"
          justifyContent="center"
          alignSelf="flex-start"
        >
          <Text color="light.50">{item.text}</Text>
        </Box>
      )}
    </>
  );
};
const RightText = ({ item, setPreview }) => {
  const { origin, destination } = item;
  const openPreview = () => {
    setPreview({ origin, destination, open: true });
  };
  return (
    <>
      {item.map ? (
        <Pressable
          h={250}
          w={175}
          alignSelf="flex-end"
          m={2}
          p={2}
          bg="blueGray.900"
          borderRadius={4}
          onPress={openPreview}
          _pressed={{ opacity: 0.5 }}
        >
          <Box pointerEvents="none">
            <MapView
              style={{ minHeight: 234 }}
              initialRegion={{
                ...origin,
                latitudeDelta: 0.009,
                longitudeDelta: 0.009,
              }}
            >
              <MapViewDirections
                origin={origin}
                destination={destination}
                apikey="AIzaSyCCXEysd-cPku4IJ8RhrRcqqxGmwUHSlaY"
                strokeWidth={2}
              />
              <Marker coordinate={item.origin} title="Origen" />
              <Marker
                coordinate={item.destination}
                pinColor="blue"
                title="Destino"
              />
            </MapView>
          </Box>
        </Pressable>
      ) : (
        <Box
          maxW="60%"
          minH="32px"
          bg="blueGray.900"
          m={2}
          rounded="md"
          justifyContent="center"
          alignItems="flex-end"
          px={3}
          py={2}
          alignSelf="flex-end"
        >
          <Text color="light.50">{item.text}</Text>
        </Box>
      )}
    </>
  );
};

const InputRight = ({ press }) => {
  return (
    <Button
      onPress={press}
      w="15%"
      h="100%"
      bg="darkBlue.900"
      alignItems="center"
      justifyContent="center"
      _pressed={{opacity:0.5,bg:'darkBlue.900'}}
    >
      <SendArrow />
    </Button>
  );
};

const DisplayMessages = ({ msg, owner_id, setPreview }) => {
  return (
    <>
      {msg.map((item) => {
        if (owner_id === item.owner) {
          return (
            <RightText
              item={item}
              key={item.timestamp}
              setPreview={setPreview}
            />
          );
        } else {
          return (
            <LeftText
              item={item}
              key={item.timestamp}
              setPreview={setPreview}
            />
          );
        }
      })}
    </>
  );
};

const MenuButton = ({
  toggleTracking,
  setMapModal,
  imDelivery,
  chat,
  toggleLiveMap,
  navigation,
  target_id,
}) => {
  const openModal = () => {
    setMapModal(true);
  };
  const goComplaint = () => {
    navigation.navigate("Complaint", { target_id });
  };

  return (
    <Menu
      w="250"
      bg="darkBlue.900"
      trigger={(triggerProps) => {
        return (
          <Pressable
            accessibilityLabel="More options menu"
            {...triggerProps}
            p={3}
            // bg={"red.500"}
            _pressed={{ opacity: 0.5 }}
          >
            <Paperclip2 />
          </Pressable>
        );
      }}
    >
      {imDelivery ? (
        <Menu.Item onPress={toggleTracking}>
          <Map5 />
          <Text color="light.50">Auto-localizacion</Text>
          <Switch isChecked={chat.live_sharing} onToggle={toggleTracking} />
        </Menu.Item>
      ) : (
        <Menu.Item onPress={toggleLiveMap} isDisabled={!chat.live_sharing}>
          <Map5 color={chat.live_sharing ? "#facc15" : "muted.400"} />
          <Text color={chat.live_sharing ? "light.50" : "muted.400"}>
            Ver localizacion
          </Text>
        </Menu.Item>
      )}
      <Menu.Item onPress={openModal}>
        <Location26 />
        <Text color="light.50">Enviar mapa</Text>
      </Menu.Item>
      <Menu.Item onPress={goComplaint}>
        <WarningIcon color="#facc15" />
        <Text color="light.50">Denunciar usuario</Text>
      </Menu.Item>
    </Menu>
  );
};
const origin = { latitude: 37.3318456, longitude: -122.0296002 };
const destination = { latitude: 37.771707, longitude: -122.4053769 };

const MapViewModal = ({ mapModal, setMapModal, userData, sendText }) => {
  // const [markerData, setMarkerData] = useState(false);
  const [origin, setOrigin] = useState(false);
  const [destination, setDestination] = useState(false);
  const [toggleLoc, setToggleLoc] = useState(false);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState("");
  const onClose = () => {
    setPrice("$0");
    setDestination(false);
    setOrigin(false);
    setMapModal(false);
  };

  const mapPress = (e) => {
    let loc = { ...e.nativeEvent };
    if (toggleLoc) {
      setDestination(loc.coordinate);
    } else {
      setOrigin(loc.coordinate);
    }
    setToggleLoc(!toggleLoc);
  };

  const onSend = async () => {
    const new_message = {
      owner: userData._id,
      text: "",
      timestamp: Date.now(),
      map: true,
      origin,
      destination,
    };
    setLoading(true);
    await sendText(new_message);
    setLoading(false);
    setMapModal(false);
  };

  return (
    <Modal isOpen={mapModal} onClose={onClose} animationPreset="fade">
      <Center>
        <Box {...{ w: "300px", h: "400px", bg: "blueGray.800" }}>
          <Modal.Header
            flexDir="row"
            justifyContent="space-between"
            alignItems="center"
            {...{ bg: "blueGray.800" }}
          >
            <Text color="light.50" fontSize={16}>
              Selecciona una ubicacion
            </Text>
            <Pressable onPress={onClose} _pressed={{ opacity: 0.5 }} px={2}>
              <CloseIcon color="light.50" />
            </Pressable>
          </Modal.Header>
          <MapView
            style={{ minHeight: 350 }}
            initialRegion={{
              latitude: 10.39932,
              longitude: -71.47157,
              latitudeDelta: 0.005,
              longitudeDelta: 0.006,
            }}
            onPress={mapPress}
          >
            {origin && destination && (
              <MapViewDirections
                // origin={origin ? origin : { latitude: 0, longitude: 0 }}
                // destination={
                //   destination ? destination : { latitude: 0, longitude: 0 }
                // }
                origin={origin}
                destination={destination}
                apikey="AIzaSyCCXEysd-cPku4IJ8RhrRcqqxGmwUHSlaY"
                strokeColor="#191919"
                strokeWidth={3}
                onReady={(result) => {
                  let distanceString = result.distance * 1000;
                  setPrice("$" + (distanceString / 1000).toFixed(1));
                }}
              />
            )}
            {origin && (
              <Marker coordinate={origin} title="Origen" pinColor="red" />
            )}
            {destination && (
              <Marker
                coordinate={destination}
                pinColor="blue"
                title="Destino"
              />
            )}
          </MapView>
          <Modal.Footer
            bg="blueGray.800"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text color="light.50">Precio estimado: {price}</Text>
            {/* <Pressable
              onPress={onClose}
              {...{
                borderWidth: 1,
                borderColor: "light.50",
                py: 1,
                px: 2,
                borderRadius: 4,
                _pressed: { opacity: 0.5 },
              }}
            >
              <Text color="light.50">Cancelar</Text>
            </Pressable> */}
            <Button
              isLoading={loading}
              isLoadingText="Enviando..."
              onPress={onSend}
              {...{
                borderWidth: 1,
                borderColor: "yellow.500",
                py: 1,
                px: 2,
                borderRadius: 4,
                bg: "blueGray.800",
                _text: { color: "yellow.500" },
                _pressed:{opacity:0.5}
              }}
            >
              Enviar
            </Button>
          </Modal.Footer>
        </Box>
      </Center>
    </Modal>
  );
};
/**AIzaSyCCXEysd-cPku4IJ8RhrRcqqxGmwUHSlaY */
const PreviewModal = ({ preview, setPreview }) => {
  const { origin, destination } = preview;

  const [price, setPrice] = useState("");
  const onClose = () => {
    setPreview({
      open: false,
      origin: {
        latitude: 0,
        longitude: 0,
      },
      destination: {
        latitude: 0,
        longitude: 0,
      },
    });
  };
  return (
    <Modal isOpen={preview.open} onClose={onClose}>
      <Center>
        <Box h={wh * 0.8} w={ww * 0.9}>
          <Modal.Header
            justifyContent="space-between"
            flexDir="row"
            bg="blueGray.800"
            alignItems="center"
          >
            <Heading color="light.50">Mapa</Heading>
            <Pressable onPress={onClose} _pressed={{ opacity: 0.5 }} p={2}>
              <CloseIcon color="light.50" />
            </Pressable>
          </Modal.Header>
          <MapView
            style={{ minHeight: wh * 0.7 }}
            initialRegion={{
              ...origin,
              latitudeDelta: 0.005,
              longitudeDelta: 0.006,
            }}
          >
            <MapViewDirections
              origin={origin}
              destination={destination}
              apikey="AIzaSyCCXEysd-cPku4IJ8RhrRcqqxGmwUHSlaY"
              strokeColor="#191919"
              strokeWidth={3}
              onReady={(result) => {
                let distanceString = result.distance * 1000;
                setPrice("$" + (distanceString / 1000).toFixed(1));
              }}
            />
            <Marker coordinate={origin} title="Origen" />
            <Marker coordinate={destination} pinColor="blue" title="Destino" />
            {/* <Marker
              coordinate={{
                longitude: preview.longitude,
                latitude: preview.latitude,
            />}} */}
          </MapView>
          <Modal.Footer bg="darkBlue.900" justifyContent="flex-start">
            <Text color="light.50">Precio estimado: {price}</Text>
          </Modal.Footer>
        </Box>
      </Center>
    </Modal>
  );
};

const LiveMapModal = ({ liveMapModal, setLiveMapModal }) => {
  const onClose = () => {
    setLiveMapModal({ ...liveMapModal, open: false });
  };
  return (
    <Modal isOpen={liveMapModal.open} onClose={onClose}>
      <Center>
        <Box h={wh * 0.9} w={ww * 0.9}>
          <Modal.Header
            justifyContent="space-between"
            flexDir="row"
            bg="blueGray.800"
            alignItems="center"
          >
            <Heading color="light.50">Mapa</Heading>
            <Pressable onPress={onClose} _pressed={{ opacity: 0.5 }} p={2}>
              <CloseIcon color="light.50" />
            </Pressable>
          </Modal.Header>
          <MapView
            style={{ minHeight: wh * 0.8 }}
            initialRegion={{
              longitude: -71.4715612,
              latitude: 10.39419,
              // longitude: liveMapModal.longitude,
              // latitude: liveMapModal.latitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.006,
            }}
          >
            <Marker
              coordinate={{
                longitude: -71.4715612,
                latitude: 10.39419,
              }}
            />
          </MapView>
        </Box>
      </Center>
    </Modal>
  );
};

/** -5.099999904632568 */
/** "longitude": -71.4715612 */
