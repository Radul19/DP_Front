import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	loginscreen: {
		flex: 1,
		backgroundColor: "#131726",
		// alignItems: "center",
		// justifyContent: "center",
		// padding: 12,
		paddingVertical:24,
		paddingHorizontal:12,
		width: "100%",
	},
	loginheading: {
		fontSize: 26,
		marginBottom: 10,
		color:'#fff'
	},
	logininputContainer: {
		width: "100%",
		// alignItems: "center",
		justifyContent: "center",
	},
	logininput: {
		// borderWidth: 1,
		backgroundColor:'#fff',
		width: "100%",
		padding: 8,
		borderRadius: 2,
	},
	loginbutton: {
		backgroundColor: "#FFC900",
		padding: 12,
		marginTop:'auto',
		// marginVertical: 24,
		width: "100%",
		borderRadius: 6,
		elevation: 1,
	},
	loginbuttonText: {
		textAlign: "center",
		color: "#000",
		// fontWeight: "600",
	},
	chatscreen: {
		backgroundColor: "#131726",
		flex: 1,
		position: "relative",
		// padding: 10,
	},
	chatheading: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#fff",
	},
	chattopContainer: {
		backgroundColor: "#252B42",
		height: 70,
		width: "100%",
		padding: 20,
		justifyContent: "center",
		marginTop:12,
		marginBottom: 15,
		elevation: 2,
		borderRadius:12
	},
	chatheader: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	chatlistContainer: {
		paddingHorizontal: 10,
	},
	chatemptyContainer: {
		width: "100%",
		height: "80%",
		alignItems: "center",
		justifyContent: "center",
	},
	chatemptyText: { fontWeight: "bold", fontSize: 24, paddingBottom: 30,color:'#fff' },
	messagingscreen: {
		flex: 1,
		backgroundColor:'#131726'
	},
	messaginginputContainer: {
		width: "100%",
		maxHeight: 80,
		backgroundColor: "#131726",
		paddingVertical: 12,
		paddingHorizontal: 15,
		justifyContent: "center",
		flexDirection: "row",
	},
	messaginginput: {
		borderWidth: 1,
		borderColor:'#fff',
		backgroundColor:'#fff',
		paddingVertical: 6,
		paddingHorizontal: 12,
		flex: 1,
		// marginRight: 10,
		color:'#000',
		borderTopLeftRadius:5,
		borderTopRightRadius:0,
		borderBottomLeftRadius:5,
		borderBottomRightRadius:0,
	},
	messagingbuttonContainer: {
		width: "15%",
		backgroundColor: "#131726",
		alignItems: "center",
		justifyContent: "center",
		borderColor:"#fff",
		borderWidth:1,
		borderRadius: 10,
		borderTopLeftRadius:0,
		borderTopRightRadius:5,
		borderBottomLeftRadius:0,
		borderBottomRightRadius:5,
	},
	modalbutton: {
		width: "40%",
		height: 45,
		backgroundColor: "green",
		borderRadius: 5,
		alignItems: "center",
		justifyContent: "center",
		color: "#fff",
	},
	modalbuttonContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 24,
	},
	modaltext: {
		color: "#fff",
	},
	modalContainer: {
		alignSelf:'center',
		width: "100%",
		borderTopColor: "#FFC900",
		borderTopWidth: 1,
		elevation: 1,
		height: 400,
		backgroundColor: "#252B42",
		position: "absolute",
		bottom: 0,
		zIndex: 10,
		paddingVertical: 50,
		paddingHorizontal: 20,
	},
	modalinput: {
		padding: 15,
		borderWidth: 1,
		borderColor:'#FFF',
		borderRadius:12,
		backgroundColor:"#fff"
	},
	modalsubheading: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 15,
		textAlign: "center",
		color:'#fff'
	},
	mmessageWrapper: {
		width: "100%",
		alignItems: "flex-start",
		marginBottom: 15,
	},
	mmessage: {
		maxWidth: "50%",
		backgroundColor: "#f5ccc2",
		padding: 15,
		borderRadius: 10,
		marginBottom: 2,
	},
	mvatar: {
		marginRight: 5,
	},
	cchat: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		borderRadius: 5,
		paddingHorizontal: 15,
		backgroundColor: "#252B42",
		height: 80,
		marginBottom: 10,
	},
	cavatar: {
		marginRight: 15,
	},
	cusername: {
		fontSize: 18,
		marginBottom: 5,
		fontWeight: "bold",
		color:'#fff'
	},
	cmessage: {
		fontSize: 14,
		opacity: 0.7,
		color:'#fff'
	},
	crightContainer: {
		flexDirection: "row",
		alignItems:"center",
		justifyContent: "space-between",
		flex: 1,
	},
	ctime: {
		// opacity: 0.5,
		// backgroundColor:'#000',
	},
	mavatar:{
		marginRight:6
	}
});
