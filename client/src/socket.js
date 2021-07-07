import io from "socket.io-client";
import store from "./store";
import {
  removeOfflineUser,
  addOnlineUser,
  markReadConversation,
} from "./store/conversations";
import { receivedNewMessage } from "./store/utils/thunkCreators";

const socket = io(window.location.origin, { autoConnect: false });

socket.on("connect", () => {
  console.log("connected to server");

  socket.on("add-online-user", (id) => {
    store.dispatch(addOnlineUser(id));
  });

  socket.on("remove-offline-user", (id) => {
    store.dispatch(removeOfflineUser(id));
  });
  socket.on("new-message", (data) => {
    store.dispatch(receivedNewMessage(data.message, data.sender));
  });

  socket.on("open-conversation", (conversationId) => {
    store.dispatch(markReadConversation(conversationId));
  });
});

export const tryConnectSocket = () => {
  if (!socket.connected) {
    socket.connect();
  }
};

export default socket;
