import messageModel from "../models/message.model.js";

class MessageManager {

    async addMessage(user, message) {
        try{
            let result = await messageModel.create({ user, message })
            return result;
            } catch (error) {
                console.log(error);
            }
    }
    
    async getMessages() {
        try {
            let messages = await messageModel.find()
            return messages;
        } catch (error) {
            console.log(error)
        }
    }

    async getMessageById(id) {
        try {
            let result = await messageModel.findOne(id);
            return result;
        } catch (error) {
            console.log(error);
        }
    }


    async updateMessage(id, messageToUpdate) {
        try{
            let result = await messageModel.updateOne({ _id: id }, messageToUpdate);
            return result;
            } catch (error) {
                console.log(error);
            }
    }

    async deleteMessage(id) {
        try{
            let result = await messageModel.deleteOne({ _id: id });
            return result;
            } catch (error) {
                console.log(error);
            }
    }

}

export default MessageManager;