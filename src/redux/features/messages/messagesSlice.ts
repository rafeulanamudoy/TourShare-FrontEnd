// src/redux/slices/messagesSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Message = {
  _id: string;
  sender: string;
  message: string;
  createdAt: string;
};

export type MessagesState = {
  messages: Message[];
};

const initialState: MessagesState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
    },
    clearMessage: (state) => {
      state.messages = [];
    },
  },
});

export const { addMessage, setMessages, clearMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
