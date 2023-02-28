import {
  Avatar,
  Box,
  ScrollView,
  Text,
  HamburgerIcon,
  Input,
  Modal,
  FormControl,
  Button,
  useTheme,
  SearchIcon,
  Radio,
  Menu,
  Pressable,
  Slider,
  Select,
  CheckIcon,
  Center,
} from "native-base";
import React, { useCallback, useContext, useState } from "react";
import profile from "../../images/profilecard.png";
import girl from "../../images/girl2.png";
import { LinearGradient } from "expo-linear-gradient";
import { IconFilterDown_Lined, Star_Filled } from "../../components/IconMonstr";
import { Context } from "../../utils/Context";
import { useNavigation } from "@react-navigation/native";
// import vnzljson from "../utils/venezuela2.json";
import places from "../../utils/places.json";
import Navbar from "../../components/Navbar";
import { useEffect } from "react";
import { RefreshControl } from "react-native";
import Loader from "../../components/Loader";
import { getDeliverys } from "../../api/user";
import socket from "../../utils/socket";
import DeliveryCard from "../../components/DeliveryCard";

const colorStatus = ["success.500", "error.500", "yellow.500"];
const textStatus = ["Disponible", "Ocupado", "Ausente"];

/**
  {"chat": {"__v": 0, "_id": "63d72b93b80dab4317a933ff", "createdAt": "2023-01-30T02:29:39.733Z", "default": [], "messages": [], "participants": ["63d61b3eed5229659e97c1f0", "63d6d43d8d77aa73c230610d"], "updatedAt": "2023-01-30T02:29:39.733Z"}, "status": 200}
 *  */

///// MAIN COMPONENT
const Dashboard = ({ navigation }) => {
  /** TEST */
  const { userData } = useContext(Context);

  const [textInpt, setTextInpt] = useState("");
  const [modal, setModal] = useState(false);
  const [deliData, setDeliData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [emptyResult, setEmptyResult] = useState(false);
  const [filters, setFilters] = useState({
    place: {
      country: false,
      state: false,
      city: false,
    },
    del_status: false,
  });

  const ScrollProps = {
    contentContainerStyle: { flexGrow: 1 },
    bg: "darkBlue.900",
    flex: 1,
    stickyHeaderIndices: [1],
  };

  const fetchData = async () => {
    // console.log(filters)
    setEmptyResult(false);
    const { status, data } = await getDeliverys({ text: textInpt, ...filters });
    if (status === 200) {
      setDeliData(data);
    } else if (status === 204) {
      setDeliData([]);
      setEmptyResult(true);
    } else {
      console.log("error");
    }
  };

  useEffect(() => {
    (async () => {
      // setLoading(true);
      const timeoutID = setTimeout(async () => {
        // Send Axios request here
        adminLoading();
      }, 3000);
      return () => clearTimeout(timeoutID);
    })();
  }, [textInpt, filters]);

  useEffect(() => {
    socket.on("found_chat", (chat) => {
      navigation.navigate("Chat", chat);
    });
  }, [socket]);

  const adminLoading = async () => {
    setLoading(true);
    await fetchData();
    setLoading(false);
  };

  const findChat = (deli_id) => {
    socket.emit("find_chat", [userData._id, deli_id]);
  };
  const openModal = async () => {
    // await fetchData()
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };

  const changeText = (text) => {
    // console.log(text);
    setTextInpt(text);
  };

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }, []);

  const filterProps = {
    filters,
    setFilters,
    visible: modal,
    close: closeModal,
    adminLoading,
  };

  return (
    <>
      <ScrollView
        {...ScrollProps}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Header navigation={navigation} />
        <InputCtn openModal={openModal} {...{ textInpt, changeText }} />
        <Loader active={loading} />
        {!loading && (
          <SearchResults
            deliData={deliData}
            findChat={findChat}
            _id={userData._id}
          />
        )}
        {emptyResult && <EmptyText />}
        <FilterModal {...filterProps} />
      </ScrollView>
      <Box position="absolute" bottom={0} w="100%">
        <Navbar state={1} />
      </Box>
    </>
  );
};

export default Dashboard;

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
      <Avatar
        bg="muted.300"
        source={{ uri: userData.profile_pic }}
        onTouchEnd={goProfile}
      />
      <Box {...{ ml: 2 }}>
        <Text {...{ color: "light.50", fontSize: 16 }}>
          {userData.name.split(" ", 1) +
            " " +
            userData.second_name.split(" ", 1)}
        </Text>
        {/* {state && city && (
          <Text {...{ color: "light.50", fontSize: 12 }}>
            {state} - {city}
          </Text>
        )} */}
        <Text {...{ color: "light.50", fontSize: 12 }}>Zulia - Cabimas</Text>
      </Box>
    </Box>
  );
};
///// INPUT
const InputCtn = ({ openModal, textInpt, changeText }) => {
  const { colors } = useTheme();
  const inputProps = {
    onChangeText: changeText,
    value: textInpt,
    placeholder: "Buscar delivery",
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
    pt: 2,
    pb: 6,
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
        <Pressable
          onPress={openModal}
          bg="#ffffff00"
          _pressed={{ bg: "#ffffff30" }}
          p={2}
        >
          <IconFilterDown_Lined size="24" color={colors.yellow[500]} />
        </Pressable>
      </Box>
    </Box>
  );
};

//// SEARCH RESULT
const SearchResults = ({ deliData, findChat, _id }) => {
  return (
    <Box px={4} pb={16} bg="darkBlue.900">
      {deliData.map(
        (item) =>
          _id !== item._id && (
            <DeliveryCard key={item._id} user={item} findChat={findChat} />
          )
      )}
    </Box>
  );
};

///// CARD
const Card = ({ user, findChat }) => {
  const { _id, name, second_name, delivery_status, profile_pic } = user;
  const nav = useNavigation();
  const goChat = () => {
    findChat(_id);
    // nav.navigate("Chat");
  };
  const goDeli = () => {
    nav.navigate("DeliveryPage", { user });
  };

  return (
    <Box
      {...{
        flexDirection: "row",
        bg: "blueGray.800",
        borderRadius: 12,
        overflow: "hidden",
        pr: 4,
        my: 2,
      }}
    >
      <Box px={1.5} py={-2} bg={colorStatus[delivery_status]}></Box>
      <Pressable onPress={goDeli} _pressed={{ opacity: 0.5 }}>
        <Avatar
          alignSelf="center"
          my={3}
          mx={2}
          size={16}
          source={{ uri: profile_pic }}
        ></Avatar>
      </Pressable>
      <Pressable
        _pressed={{ opacity: 0.5 }}
        onPress={goChat}
        {...{ flex: 1, justifyContent: "space-evenly" }}
      >
        <Box {...{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text fontSize={16} color="light.50">
            {name.split(" ", 1) + " " + second_name.split(" ", 1)}
          </Text>
          <Box
            {...{
              borderRadius: 12,
              borderWidth: 1,
              borderColor: colorStatus[delivery_status],
              py: 0.5,
              px: 4,
              justifyContent: "center",
            }}
          >
            <Text {...{ fontSize: 10, color: colorStatus[delivery_status] }}>
              {textStatus[delivery_status]}
            </Text>
          </Box>
        </Box>
        <Text color="light.50">Avenida Universidad</Text>
      </Pressable>
      {/* <InfoIcon ml={4} mr={4} alignSelf="center" /> */}
    </Box>
  );
};

///// FILTER MODAL
const FilterModal = ({ visible, close, setFilters, filters }) => {
  const [copyValues, setCopyValues] = useState({
    place: {
      country: false,
      state: false,
      city: false,
    },
    del_status: false,
  });

  const pressCancel = () => {
    setCopyValues(filters);
    close();
  };
  const pressSave = () => {
    setFilters(copyValues);
    close();
  };

  //PROPS
  const propsHeader = {
    backgroundColor: "blueGray.800",
    _text: { color: "light.50", fontSize: 18 },
  };
  const propsBtnCancel = {
    variant: "ghost",
    colorScheme: "blueGray",
    onPress: pressCancel,
    _text: { color: "light.50" },
  };
  const propsBtnSave = {
    onPress: pressSave,
  };
  return (
    <Modal isOpen={visible} onClose={pressCancel}>
      <Modal.Content w="85%" backgroundColor="blueGray.800">
        <Modal.CloseButton />
        <Modal.Header {...propsHeader}>Filtro</Modal.Header>
        <Modal.Body>
          <FilterLocation {...{ copyValues, setCopyValues }} />
          <RadioBtns {...{ copyValues, setCopyValues }} />
          {/* <FilterSlider /> */}
        </Modal.Body>
        <Modal.Footer backgroundColor="blueGray.800">
          <Button.Group space={2}>
            <Button {...propsBtnCancel}>Cancelar</Button>
            <Button {...propsBtnSave}>Guardar</Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
///// RADIO BTNS
const RadioBtns = ({ copyValues, setCopyValues }) => {
  // const [value, setValue] = useState("1");
  const updateValue = (newVal) => {
    setCopyValues((prev) => ({ ...prev, del_status: newVal }));
  };
  const propsRadioAll = {
    value: false,
    my: 2,
    size: "sm",
    _text: { color: "light.50" },
    _checked: {
      borderColor: "primary.500",
      _icon: { color: "primary.500" },
    },
  };
  const propsRadioSuccess = {
    value: 0,
    my: 2,
    size: "sm",
    _text: { color: "light.50" },
    _checked: {
      borderColor: "success.500",
      _icon: { color: "success.500" },
    },
  };
  const propsRadioBusy = {
    value: 1,
    my: 2,
    size: "sm",
    _text: { color: "light.50" },
    _checked: {
      borderColor: "error.500",
      _icon: { color: "error.500" },
    },
  };
  const propsRadioWait = {
    value: 2,
    my: 2,
    size: "sm",
    _text: { color: "light.50" },
    _checked: {
      borderColor: "yellow.500",
      _icon: { color: "yellow.500" },
    },
  };
  return (
    <>
      <Text color="light.50" fontSize={14} mt={2}>
        Estado
      </Text>
      <Radio.Group
        name="myRadioGroup"
        value={copyValues.del_status}
        onChange={updateValue}
      >
        <Radio {...propsRadioAll}>Todos</Radio>
        <Radio {...propsRadioSuccess}>Disponible</Radio>
        <Radio {...propsRadioBusy}>Ocupado</Radio>
        <Radio {...propsRadioWait}>Ausente</Radio>
      </Radio.Group>
    </>
  );
};

///// FILTER SLIDE
const FilterSlider = () => {
  const [sliderValue, setSliderValue] = useState(0);

  return (
    <>
      <Text color="light.50" mb={2} mt={4} fontSize={14}>
        Estrellas
      </Text>
      <Box alignItems="center" w="95%" alignSelf="center">
        <Box flexDirection="row" justifyContent="space-between" w="100%">
          <Star_Filled />
          <Star_Filled />
          <Star_Filled />
          <Star_Filled />
          <Star_Filled />
        </Box>
        <Slider
          mt={1}
          w="100%"
          maxW="300"
          defaultValue={sliderValue}
          minValue={0}
          maxValue={4}
          accessibilityLabel="hello world"
          step={1}
          onChangeEnd={(v) => {
            v && setSliderValue(Math.floor(v));
          }}
        >
          <Slider.Track>
            <Slider.FilledTrack />
          </Slider.Track>
          <Slider.Thumb />
        </Slider>
      </Box>
    </>
  );
};

const FilterLocation = ({ copyValues, setCopyValues }) => {
  const { place } = copyValues;

  const changePlace = (newValue, key) => {
    if (key === "country") {
      setCopyValues({
        ...copyValues,
        place: {
          country: newValue,
          state: false,
          city: false,
        },
      });
    } else {
      setCopyValues({
        ...copyValues,
        place: { ...copyValues.place, [key]: newValue },
      });
    }
  };

  const propsCountry = {
    onValueChange: (itemValue) => changePlace(itemValue, "country"),
    _selectedItem: {
      borderRadius: 6,
      bg: "yellow.500",
      endIcon: <CheckIcon size="5" color="muted.900" ml="auto" />,
    },
    selectedValue: place.country,
    minWidth: "200",
    accessibilityLabel: "Choose Service",
    placeholder: "Selecciona pais",
    borderWidth: 0,
    bg: "light.50",
    color: "light.900",
    mb: 3,
    h: 9,
    _customDropdownIconProps: {
      size: "4",
    },
  };
  const propsState = {
    onValueChange: (itemValue) => changePlace(itemValue, "state"),
    _selectedItem: {
      borderRadius: 6,
      bg: "yellow.500",
      endIcon: <CheckIcon size="5" color="muted.900" ml="auto" />,
    },
    selectedValue: place.state,
    minWidth: "200",
    accessibilityLabel: "Choose Service",
    placeholder: "Selecciona el estado",
    borderWidth: 0,
    bg: "light.50",
    color: "light.900",
    mb: 3,
    h: 9,
    _customDropdownIconProps: {
      size: "4",
    },
  };
  const propsCity = {
    onValueChange: (itemValue) => changePlace(itemValue, "city"),
    _selectedItem: {
      borderRadius: 6,
      bg: "yellow.500",
      endIcon: <CheckIcon size="5" color="muted.900" ml="auto" />,
    },
    selectedValue: place.city,
    minWidth: "200",
    accessibilityLabel: "Choose Service",
    placeholder: "Selecciona la ciudad",
    borderWidth: 0,
    bg: "light.50",
    color: "light.900",
    mb: 3,
    h: 9,
    _customDropdownIconProps: {
      size: "4",
    },
  };

  return (
    <Box>
      <Text color="light.50" mb={2}>
        Ubicacion
      </Text>
      <Select {...propsCountry}>
        <Select.Item label="Venezuela" value="Venezuela" />
        <Select.Item label="Sin ubicación" value={false} />
      </Select>
      {place.country === "Venezuela" && (
        <Select {...propsState}>
          {places.map((item, index) => (
            <Select.Item label={item.state} value={item.state} key={index} />
          ))}
        </Select>
      )}
      {/* {place.state.length > 0 && ( */}
      {place.state && (
        <Select {...propsCity}>
          {places.map((item) => {
            if (item.state === place.state) {
              return item.cities.map((item2, index) => (
                <Select.Item
                  label={item2.city}
                  value={item2.city}
                  key={index}
                />
              ));
            }
          })}
        </Select>
      )}
    </Box>
  );
};

const EmptyText = () => {
  return (
    <Center mt={-12}>
      <Text color="muted.500">{"No se han encontrado resultados "}</Text>
    </Center>
  );
};
