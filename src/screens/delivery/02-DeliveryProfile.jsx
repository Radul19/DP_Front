import { ScrollView, Text } from "native-base";
import React from "react";

const DeliveryProfile = () => {
  return (
    <ScrollView
      bg="blueGray.800"
      flex={1}
      {...{ contentContainerStyle: { flexGrow: 1 } }}
    >
      <Text>Delivery Profile</Text>
    </ScrollView>
  );
};

export default DeliveryProfile;
