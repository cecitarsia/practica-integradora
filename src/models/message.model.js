import mongoose from "mongoose";

const messageCollection = "Messages"

const messageSchema = new mongoose.Schema({
    user: { type: String, required: true, max: 200 },
    message: { type: String, required: true }
})

const messageModel = mongoose.model(messageCollection, messageSchema)

export default messageModel