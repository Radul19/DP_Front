import React from "react";
import { ScrollView, Heading, Box, Text } from "native-base";

const DeliveryForm = () => {
  return (
    <ScrollView
      bg="blueGray.800"
      flex={1}
      {...{ contentContainerStyle: { flexGrow: 1 } }}
    >
      <Box py={6} px={4}>
        <Heading {...{ color: "light.50", fontSize: 24, my: 2 }}>
          Registro de delivery
        </Heading>
        <Text color="light.50">Complete todos los campos</Text>
      </Box>
      <Box
        {...{
          mt: 2,
          bg: "darkBlue.900",
          flex: 1,
          borderTopRadius: 32,
        }}
      >
        {/* <Box
          {...{
            alignSelf: "center",
            w: "30%",
            h: 3,
            borderRadius: 24,
            bg: "red.400",
            mt:6,
          }}
        >
        </Box> */}

        <Text>a</Text>
      </Box>
    </ScrollView>
  );
};

export default DeliveryForm;
