import {
  addNewConvoToStore,
  addOnlineUserToStore,
  addSearchedUsersToStore,
  removeOfflineUserFromStore,
  addMessageToStore,
  updateConversationToStore,
  addNewReceivedConversationToStore,
} from "./utils/reducerFunctions";

// ACTIONS

const GET_CONVERSATIONS = "GET_CONVERSATIONS";
const SET_MESSAGE = "SET_MESSAGE";
const ADD_ONLINE_USER = "ADD_ONLINE_USER";
const REMOVE_OFFLINE_USER = "REMOVE_OFFLINE_USER";
const SET_SEARCHED_USERS = "SET_SEARCHED_USERS";
const CLEAR_SEARCHED_USERS = "CLEAR_SEARCHED_USERS";
const ADD_CONVERSATION = "ADD_CONVERSATION";
const RECEIVE_NEW_CONVERSATION = "RECEIVE_NEW_CONVERSATION";
const UPDATE_CONVERSATION = "UPDATE_CONVERSATION";

// ACTION CREATORS

export const gotConversations = (conversations) => {
  return {
    type: GET_CONVERSATIONS,
    conversations,
  };
};

// If the current user is sending the message, then the sender is null
// If the current user is receiving the message, then the sender info is required
export const setNewMessage = (message, sender) => {
  return {
    type: SET_MESSAGE,
    payload: { message, sender: sender || null },
  };
};

export const addOnlineUser = (id) => {
  return {
    type: ADD_ONLINE_USER,
    id,
  };
};

export const removeOfflineUser = (id) => {
  return {
    type: REMOVE_OFFLINE_USER,
    id,
  };
};

export const setSearchedUsers = (users) => {
  return {
    type: SET_SEARCHED_USERS,
    users,
  };
};

export const clearSearchedUsers = () => {
  return {
    type: CLEAR_SEARCHED_USERS,
  };
};

// add new conversation when sending a new message
export const addConversation = (recipientId, newMessage) => {
  return {
    type: ADD_CONVERSATION,
    payload: { recipientId, newMessage },
  };
};

export const receiveNewConversation = (sender, newMessage) => {
  return {
    type: RECEIVE_NEW_CONVERSATION,
    payload: { sender, newMessage },
  };
};

// update a conversation from the existing list of conversation in the state
export const updateConversation = (updatedConversation) => {
  return {
    type: UPDATE_CONVERSATION,
    updatedConversation,
  };
};

// REDUCER

const reducer = (state = [], action) => {
  switch (action.type) {
    // add reducer to handle update a conversation
    case GET_CONVERSATIONS:
      return action.conversations;
    case SET_MESSAGE:
      return addMessageToStore(state, action.payload);
    case ADD_ONLINE_USER: {
      return addOnlineUserToStore(state, action.id);
    }
    case REMOVE_OFFLINE_USER: {
      return removeOfflineUserFromStore(state, action.id);
    }
    case SET_SEARCHED_USERS:
      return addSearchedUsersToStore(state, action.users);
    case CLEAR_SEARCHED_USERS:
      return state.filter((convo) => convo.id);
    case ADD_CONVERSATION:
      return addNewConvoToStore(
        state,
        action.payload.recipientId,
        action.payload.newMessage
      );
    case RECEIVE_NEW_CONVERSATION:
      return addNewReceivedConversationToStore(
        state,
        action.payload.sender,
        action.payload.newMessage
      );
    case UPDATE_CONVERSATION:
      return updateConversationToStore(state, action.updatedConversation);
    default:
      return state;
  }
};

export default reducer;
