import { View } from "react-native";
import { useContext, useState } from "react";
import {
  ArrowBackIcon,
  Avatar,
  Box,
  Button,
  Image,
  Input,
  ScrollView,
  Text,
} from "native-base";
import girl from "../../images/girl2.png";
import chatback from "../../images/chatback.png";

/// ICONS
import SendArrow from "../../svg/Send_hor_fill.svg";
import { Context } from "../../utils/Context";
import socket from "../../utils/socket";
import { useEffect } from "react";
import { getMessages } from "../../api/user";

const findUser = (arr, _id) => {
  arr.indexOf((item) => item._id === _id);
};

const Chat = ({ navigation, route }) => {
  const { userData } = useContext(Context);
  const [chat, setChat] = useState({
    participants: [],
    messages: [],
    _id: "",
  });
  const [partnerPos, setPartnerPos] = useState(0);
  const [input, setInput] = useState("");
  const handleChange = (text) => setInput(text);
  const goBack = () => {
    socket.emit("leave_chat", chat._id);
    navigation.goBack();
  };

  const sendText = async () => {
    const new_message = {
      owner: userData._id,
      text: input,
      timestamp: Date.now(),
    };
    socket.emit("add_message", {
      chat_id: chat._id,
      new_message,
    });
    setChat((prev) => ({ ...prev, messages: [...prev.messages, new_message] }));
    setInput("");
    // setMyText([...myText, input]);
  };

  useEffect(() => {
    // console.log(route.params?.chat._id)
    let aux = route.params?.chat.participants.findIndex(
      (item) => item._id === userData._id
    );
    setChat(route.params?.chat);
    setPartnerPos(aux === 0 ? 1 : 0);
    (async () => {
      const { status, data } = await getMessages(route.params?.chat._id);
      if (status === 200) {
        // console.log(data);
        console.log("ok_test");
        setChat((prev) => ({ ...prev, messages: data.messages }));
      }
    })();
    socket.on("update_messages", (thischat) => {
      console.log(userData._id + "This is a user");
      console.log(thischat._id);
      console.log(route.params?.chat._id);
      console.log("############################");
      if (thischat._id === route.params?.chat._id) {
        setChat((prev) => ({ ...prev, messages: thischat.messages }));
      }
    });
  }, []);

  return (
    <Box flex={1}>
      <Image
        source={chatback}
        alt="background"
        position="absolute"
        resizeMode="cover"
        w="100%"
        h="100%"
      />
      <Box h="64px" alignItems="center" flexDir="row" px={3} bg="darkBlue.900">
        <Button
          size={8}
          alignItems="center"
          justifyContent="center"
          bg="#ffffff00"
          onPress={goBack}
        >
          <ArrowBackIcon color="yellow.500" size={6} />
        </Button>
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

      <ScrollView flexDir="column-reverse">
        <DisplayMessages msg={chat.messages} owner_id={userData._id} />
      </ScrollView>
      <Box
        h="64px"
        bg="darkBlue.900"
        alignItems="center"
        px={3}
        justifyContent="center"
      >
        <Input
          value={input}
          onChangeText={handleChange}
          w="100%"
          bg="light.50"
          // placeholder="text"
          _focus={{
            bg: "light.50",
            borderColor: "light.50",
          }}
          InputRightElement={<InputRight press={sendText} />}
        />
      </Box>
    </Box>
  );
};

export default Chat;

const LeftText = ({ text }) => {
  return (
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
      <Text color="light.50">{text}</Text>
    </Box>
  );
};
const RightText = ({ text }) => {
  return (
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
      <Text color="light.50">{text}</Text>
    </Box>
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
    >
      <SendArrow />
    </Button>
  );
};

const DisplayMessages = ({ msg, owner_id }) => {
  return (
    <>
      {msg.map((item) => {
        if (owner_id === item.owner) {
          return <RightText text={item.text} key={item.timestamp} />;
        } else {
          return <LeftText text={item.text} key={item.timestamp} />;
        }
      })}
    </>
  );
};
