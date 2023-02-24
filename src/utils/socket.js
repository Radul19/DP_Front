import { io } from "socket.io-client";
import url from '../api/url'
const socket = io.connect(url);
// const socket = io.connect("http://192.168.1.109:4000");
export default socket;
