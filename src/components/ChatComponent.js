import { View, Text, Pressable } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../utils/styles";

const ChatComponent = ({ item }) => {
	const navigation = useNavigation();
	const [messages, setMessages] = useState({});

	useLayoutEffect(() => {
		setMessages(item.messages[item.messages.length - 1]);
	}, []);

	const handleNavigation = () => {
		navigation.navigate("Messaging", {
			id: item.id,
			name: item.name,
		});
	};

	return (
		<View style={styles.cchat} onPress={handleNavigation}>
			<Ionicons
				name='person-circle-outline'
				size={45}
				color='#fff'
				style={styles.cavatar}
			/>

			<View style={styles.crightContainer}>
				<View>
					<Text style={styles.cusername}>{item.name}</Text>

					<Text style={styles.cmessage}>
						{messages?.text ? messages.text : "Tap to start chatting"}
					</Text>
				</View>
				<Pressable onPress={handleNavigation} >
					<Ionicons name="chatbubble-ellipses-outline" size={24} color="#FFC900" />

					{/* <Text style={styles.ctime}>
						{messages?.time ? messages.time : "now"}
					</Text> */}
				</Pressable>
			</View>
		</View>
	);
};

export default ChatComponent;
