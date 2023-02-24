import { Box, Center, Heading, InfoOutlineIcon, Text } from "native-base";
import React from "react";
import Navbar from "../../components/Navbar";

const Notifications = () => {
  return (
    <>
      <Box flex={1} p={4} bg="darkBlue.900">
        <Heading color="light.50">Notificationes</Heading>
        <Center flexDir="row" my={4}>
          <InfoOutlineIcon color="muted.500" mr={4} />
          <Text color="muted.500">Esta pagina está en desarollo</Text>
        </Center>
      </Box>
      <Box bg="darkBlue.900">
        <Navbar state={2} />
      </Box>
    </>
  );
};

export default Notifications;
