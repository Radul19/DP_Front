import { io } from "socket.io-client";
// const socket = io.connect("https://dp-back.vercel.app");
const socket = io.connect("http://192.168.1.109:4000");
export default socket;
