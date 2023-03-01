import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Box, Text, Pressable, Avatar, Modal } from "native-base";
import { deleteChat } from "../api/user";
import { useContext } from "react";
import { Context } from "../utils/Context";
import { useState } from "react";

const colorStatus = ["success.500", "error.500", "yellow.500"];
const textStatus = ["Disponible", "Ocupado", "Ausente"];

const DeliveryCard = ({ user, findChat,chatList = false,chat_id,refresh }) => {
  const { _id, name, second_name, delivery_status, profile_pic } = user;
  const [modalView, setModalView] = useState(false)
  const {userData} = useContext(Context)
  const nav = useNavigation();
  const goChat = () => {
    findChat(_id);
    // nav.navigate("Chat");
  };
  const goDeli = () => {
    nav.navigate("DeliveryPage", { user });
  };

  const deleteChatAccept = async () =>{
    if(chatList){
      console.log('#deleteChatAccept')
      // setChatToDel(chat_id)
      await deleteChat(chat_id,userData._id)
      refresh()
      setModalView(false)
    }
  }

  const closeModal = ()=>{
    setModalView(false)
  }
  
  const openModal = ()=>{
    setModalView(true)
  }



  return (
    <>
    <DelChatModal {...{modalView,closeModal,deleteChatAccept}} />
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
      {delivery_status < 3 ? (
        <Box px={1.5} py={-2} bg={colorStatus[delivery_status]}></Box>
      ) : (
        <Box px={1.5} py={-2} bg="#ffffff00"></Box>
      )}
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
        onLongPress={openModal}
        {...{ flex: 1, justifyContent: "space-evenly" }}
      >
        <Box {...{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text fontSize={16} color="light.50">
            {name.split(" ", 1) + " " + second_name.split(" ", 1)}
          </Text>
          {delivery_status < 3 && (
            <Box borderColor={colorStatus[delivery_status]} {...statusBoxProps}>
              <Text {...{ fontSize: 10, color: colorStatus[delivery_status] }}>
                {textStatus[delivery_status]}
              </Text>
            </Box>
          )}
        </Box>
        <Text color="light.50">Zulia - Cabimas</Text>
      </Pressable>
      {/* <InfoIcon ml={4} mr={4} alignSelf="center" /> */}
    </Box>
    </>
  );
};

export default DeliveryCard;

const statusBoxProps = {
  borderRadius: 12,
  borderWidth: 1,
  py: 0.5,
  px: 4,
  justifyContent: "center",
};


const DelChatModal = ({modalView,closeModal,deleteChatAccept}) => {

  const accept = ()=>{

  }

  return (
    <Modal isOpen={modalView} onClose={closeModal} >
      <Modal.Content w="85%" bg="blueGray.800">
        <Modal.CloseButton />
        <Modal.Header
          bg="blueGray.800"
          _text={{ color: "light.50", fontSize: 18 }}
        >
          Aviso
        </Modal.Header>
        <Modal.Body>
          <Text color="light.50" textAlign="center">
            Esta seguro que desea elimiar el chat?
          </Text>
          <Box flexDir="row" mt={8} justifyContent="space-between" px="10%">
            <Pressable
              borderWidth={1}
              borderColor="light.50"
              py={1}
              w="40%"
              borderRadius={4}
              alignItems="center"
              _pressed={{opacity:0.5}}
              onPress={closeModal}
            >
              <Text color="light.50" >Cancelar</Text>
            </Pressable>
            <Pressable
              borderWidth={1}
              bg="yellow.500"
              borderColor="yellow.500"
              py={1}
              w="40%"
              borderRadius={4}
              alignItems="center"
              _pressed={{opacity:0.5}}
              onPress={deleteChatAccept}
            >
              <Text color="darkBlue.900" >Aceptar</Text>
            </Pressable>
          </Box>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};
