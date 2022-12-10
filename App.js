import React from "react";

//👇🏻 app screens
import Login from "./screens/Login";
import Messaging from "./screens/Messaging";
import Chat from "./screens/Chat";

//👇🏻 React Navigation configurations
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name='Login'
					component={Login}
					options={loginHeaderOpt}
				/>
				<Stack.Screen
					name='Chat'
					component={Chat}
					options={chatHeaderOpt}
				/>
				<Stack.Screen name='Messaging' component={Messaging} options={messageHeaderOpt} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const loginHeaderOpt = { headerShown: false }
const chatHeaderOpt = {
	title: "Chats",
	headerShown: false,
}
const messageHeaderOpt = {
	headerStyle: {
		backgroundColor: '#131726',
	},
	headerTintColor: '#FFC900',
}