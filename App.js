import React, { useEffect, useState } from "react";
//👇🏻 React Navigation configurations
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider, extendTheme, StatusBar } from "native-base";
import * as Location from "expo-location";

//👇🏻 app screens
import Login2 from "./src/screens/Login";
import Messaging from "./src/screens/Messaging";

// user flow
import Welcome from "./src/screens/user/01-Welcome";
import Login from "./src/screens/user/02-Login";
import Register from "./src/screens/user/03-Register";
import Dashboard from "./src/screens/user/04-Dashboard";
import Profile from "./src/screens/user/05-Profile";
import Chat from "./src/screens/user/06-Chat";
import DeliveryPage from "./src/screens/user/07-DeliveryPage";

import getLocation from "./src/utils/getLocation";
import { Context } from './src/utils/Context'
import DeliveryProfile from "./src/screens/delivery/02-DeliveryProfile";
import AdminDashboard from "./src/screens/admin/01-AdminDashboard";
import UserRequests from "./src/screens/admin/02-UserRequests";
import UserRequestsData from "./src/screens/admin/03-UserRequestsData";
import DeliRequests from "./src/screens/admin/04-DeliRequests";
import DeliRequestsData from "./src/screens/admin/05-DeliRequestsData";
import Complaints from "./src/screens/admin/06-Complaints";
import ComplaintsData from "./src/screens/admin/07-ComplaintsData";
import SearchUserPage from "./src/screens/admin/08-SearchUserPage";
import UserDataPage from "./src/screens/admin/09-UserDataPage";
import ChatList from "./src/screens/user/08-ChatList";

const config = {
	dependencies: {
		// For Expo projects (Bare or managed workflow)
		"linear-gradient": require("expo-linear-gradient").LinearGradient,
		// For non expo projects
		// 'linear-gradient': require('react-native-linear-gradient').default,
	},
};

const Stack = createNativeStackNavigator();

export default function App() {

	const theme = extendTheme({
		btnPrimary: {
			w: "90%",
			bg: "yellow.500",
			mt: "auto",
			mb: 2,
			borderWidth: 1,
			_text: {
				color: "darkBlue.900",
			},
			_pressed: {
				borderWidth: 1,
				bg: "#ffffff00",
				borderColor: "yellow.500",
				_text: { color: "yellow.500" },
			},
		},
		btnSecondary: {
			w: "90%",
			bg: "#ffffff00",
			my: 2,
			_text: {
				color: "light.50",
				underline: true,
			},
			_pressed: {
				bg: "#ffffff00",
				_text: { color: "yellow.500" },
			},
		}
	})

	const [location, setLocation] = useState({
		state: '',
		country: '',
		city: '',
	})

	const [userData, setUserData] = useState({
		name: "",
		second_name: "",
		email: "",
		card_ID: "",
		user_type: 4
	})

	const allContextValue = {
		location, setLocation, userData, setUserData
	}

	const getLocationInfo = async () => {
		let { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== "granted") {
			//   setMsg("error", "Permission to access location was denied");
			return;
		}
		if (location.country.length < 1) {
			// let {coords} = await Location.getCurrentPositionAsync({});
			// const res = await getLocation([coords.longitude, coords.latitude]);
			const res = await getLocation([-71.47, 10.39]);
			setLocation({ ...res, auto: true });
		}
	};

	useEffect(() => {
		getLocationInfo()
	}, [location])


	return (

		<Context.Provider value={{ ...allContextValue }} >
			<NativeBaseProvider theme={theme} config={config} >
				<StatusBar />
				<NavigationContainer>
					<Stack.Navigator screenOptions={{
						headerShown: false
					}} >
						{/* <Stack.Screen name="AdminDashboard" component={AdminDashboard} /> */}

						{/** USER PAGES */}
						<Stack.Group  >
							<Stack.Screen name="Welcome" component={Welcome} />
							<Stack.Screen name='Login' component={Login} />
							<Stack.Screen name="Register" component={Register} />
							<Stack.Screen name="Profile" component={Profile} />
							<Stack.Screen name="Dashboard" component={Dashboard} />
							<Stack.Screen name="Chat" component={Chat} />
							<Stack.Screen name="DeliveryPage" component={DeliveryPage} />
							<Stack.Screen name="ChatList" component={ChatList} />
						</Stack.Group>

						{/** DELIVERY PAGES */}
						<Stack.Group>
							<Stack.Screen name="DeliveryProfile" component={DeliveryProfile} />
						</Stack.Group>
						{/** ADMIN PAGES */}
						<Stack.Group>
							<Stack.Screen name="AdminDashboard" component={AdminDashboard} />
							<Stack.Screen name="UserRequests" component={UserRequests} />
							<Stack.Screen name="UserRequestsData" component={UserRequestsData} />
							<Stack.Screen name="DeliRequests" component={DeliRequests} />
							<Stack.Screen name="DeliRequestsData" component={DeliRequestsData} />
							<Stack.Screen name="Complaints" component={Complaints} />
							<Stack.Screen name="ComplaintsData" component={ComplaintsData} />
							<Stack.Screen name="SearchUserPage" component={SearchUserPage} />
							<Stack.Screen name="UserDataPage" component={UserDataPage} />
						</Stack.Group>


						{/*  */}
						<Stack.Screen
							name='Login2'
							component={Login2}
							options={loginHeaderOpt}
						/>
						{/* <Stack.Screen
							name='Chat'
							component={Chat}
							options={chatHeaderOpt}
						/> */}
						<Stack.Screen name='Messaging' component={Messaging} options={messageHeaderOpt} />
					</Stack.Navigator>
				</NavigationContainer>
			</NativeBaseProvider>
		</Context.Provider>
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