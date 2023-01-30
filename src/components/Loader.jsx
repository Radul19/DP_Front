import React from "react";
import { HStack, Spinner, Text } from "native-base";

const Loader = ({ active }) => {
  return (
    <>
      {active && (
        <HStack space={2} justifyContent="center" my={2} >
          <Spinner accessibilityLabel="Loading" color='muted.500'   />
          <Text color="muted.500" fontSize="md">
            Cargando...
          </Text>
        </HStack>
      )}
    </>
  );
};

export default Loader;
