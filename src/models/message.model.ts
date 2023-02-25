import { Schema, model } from "mongoose"
import { MessageDocument } from "../types";

const MessageSchema = new Schema<MessageDocument>(
  {
    conversationId: {
      type: String,
    },
    sender: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);

export default model<MessageDocument>("chat-message", MessageSchema);