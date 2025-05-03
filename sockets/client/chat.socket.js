const uploadToCloudinary = require("../../helpers/uploadToCloudinary");
const Chat = require("../../models/chat.model")

module.exports = (res) => {
    const userId= res.locals.user.id;
    const fullName=res.locals.user.fullName;
    // SocketIO
    _io.once('connection', (socket) => {
        socket.on("CLIENT_SEND_MASSAGE", async (data) => {
            let images = [];
            for (const imageBuffer of data.images) {
                const link = await uploadToCloudinary(imageBuffer);
                images.push(link);
            }
            // Lưu và db 
            const chat = new Chat({
                user_id: userId,
                content: data.content,
                images: images
            })
            await chat.save();

            // trả về data cho client 
            _io.emit("SERVER_RETURN_MESSAGE", {
                userId: userId,
                fullName: fullName,
                content: data.content,
                images: images
            })
        })

        // Typing
        socket.on("CLIENT_SEND_TYPING", async (type) => {
            socket.broadcast.emit("SEVER_RETURN_TYPING", {
                userId: userId,
                fullName: fullName,
                type: type
            })
        })
    });

}