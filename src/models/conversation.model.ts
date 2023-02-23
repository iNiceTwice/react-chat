import { Schema, model } from "mongoose"

interface Conversation {
  members: Array<string>
}

const ConversationSchema = new Schema<Conversation>(
  {
    members: {
      type: [String],
    },
  },
  { timestamps: true }
);

module.exports = model<Conversation>("chat-conversation", ConversationSchema);