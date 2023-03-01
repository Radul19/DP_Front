import { Box, Heading, Modal, Pressable, ScrollView, Text } from "native-base";
import { useState, useEffect, useContext, useCallback } from "react";
import { RefreshControl } from "react-native";
import { getMyChat } from "../../api/user";
import DeliveryCard from "../../components/DeliveryCard";
import Loader from "../../components/Loader";
import Navbar from "../../components/Navbar";
import { Context } from "../../utils/Context";
import socket from "../../utils/socket";

const ChatList = ({ navigation: nav }) => {
  const { userData } = useContext(Context);
  const [chatData, setChatData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [emptyResult, setEmptyResult] = useState(false);
  const [chatToDel, setChatToDel] = useState(false)

  const fetchData = async () => {
    setChatData([]);
    const { status, data } = await getMyChat(userData._id);
    if (status === 200) {
      setChatData(data);
    } else if (status === 204) {
      setEmptyResult(true);
    } else {
      console.log("error");
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      await fetchData();
      setLoading(false);
    })();
  }, []);

  const findChat = (deli_id) => {
    socket.emit("find_chat", [userData._id, deli_id]);
  };

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }, []);

  const closeModal = ()=>{
    setChatToDel(false)
  }

  return (
    <>
      <ScrollView
        bg="darkBlue.900"
        flex={1}
        {...{ contentContainerStyle: { flexGrow: 1 } }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Box flex={1}>
          <Heading p={4} color="light.50">
            Chats
          </Heading>
          <Loader active={loading} />
          {emptyResult && <EmptyText />}
          {!loading && (
            <Box px={4} pb={16} bg="darkBlue.900">
              {chatData.map((chat) => {
                const { _id, participants } = chat;
                let anotherUser =
                  participants[0]._id === userData._id
                    ? participants[1]
                    : participants[0];
                if (anotherUser.user_type > 1) {
                  return (
                    <DeliveryCard
                      key={_id}
                      user={anotherUser}
                      findChat={findChat}
                      chat_id={_id}
                      refresh={fetchData}
                      chatList={true}
                      setChatToDel={setChatToDel}
                    />
                  );
                }
              })}
            </Box>
          )}
        </Box>
      </ScrollView>
      <Box position="absolute" bottom={0} w="100%">
        <Navbar state={3} />
      </Box>
    </>
  );
};

const EmptyText = () => {
  return (
    <Center mt={-12}>
      <Text color="muted.500">{"No se han encontrado resultados ):"}</Text>
    </Center>
  );
};

export default ChatList;
