import { Box, Heading, ScrollView, Text } from "native-base";
import { useState, useEffect, useContext, useCallback } from "react";
import { RefreshControl } from "react-native";
import { getMyChat } from "../../api/user";
import DeliveryCard from "../../components/DeliveryCard";
import Loader from "../../components/Loader";
import { Context } from "../../utils/Context";
import socket from "../../utils/socket";

const ChatList = ({ navigation: nav }) => {
  const { userData } = useContext(Context);
  const [chatData, setChatData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [emptyResult, setEmptyResult] = useState(false);

  const fetchData = async () => {
    setChatData([]);
    const { status, data } = await getMyChat(userData._id);
    console.log(data);
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

  return (
    <ScrollView
      bg="darkBlue.900"
      flex={1}
      {...{ contentContainerStyle: { flexGrow: 1 } }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Box flex={1} p={4}>
        <Heading color="light.50">Chats</Heading>
        <Loader active={loading} />
        {emptyResult && <EmptyText />}
        {!loading && (
          <Box px={4} pb={16} bg="darkBlue.900">
            {chatData.map(
              (chat) => {
                const { _id, participants } = chat;
                if (participants[0]._id === userData._id) {

                  return (
                    <DeliveryCard
                      key={_id}
                      user={participants[1]}
                      findChat={findChat}
                    />
                  );
                } else {
                  return (
                    <DeliveryCard
                      key={_id}
                      user={participants[0]}
                      findChat={findChat}
                    />
                  );
                }
              }
              // userData._id !== chat._id && (
              //   <DeliveryCard
              //     key={chat._id}
              //     user={chat}
              //     findChat={findChat}
              //   />
              // )
            )}
          </Box>
        )}
      </Box>
    </ScrollView>
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
