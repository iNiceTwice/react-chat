import { Schema, model } from "mongoose"
import { ConversationDocument } from "../types";


const ConversationSchema = new Schema<ConversationDocument>(
  {
    members: {
      type: [String],
    },
  },
  { timestamps: true }
);

export default model<ConversationDocument>("chat-conversation", ConversationSchema);