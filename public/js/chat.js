// CLIENT_SEND_MASSAGE
const formSendData = document.querySelector(".chat .inner-form")
if (formSendData) {
    formSendData.addEventListener("submit", (e) => {
        e.preventDefault();
        const content = e.target.elements.content.value;
        if (content) {
            socket.emit("CLIENT_SEND_MASSAGE", content);
            e.target.elements.content.value = "";
        }
    })
}
// END CLIENT_SEND_MASSAGE

// SERVER_RETURN_MESSAGE
socket.on("SERVER_RETURN_MESSAGE", (data) => {

    const body = document.querySelector(".chat .inner-body");
    const myId = document.querySelector("[my-id]").getAttribute("my-id");
    console.log(data);
    const div = document.createElement("div");
    if (myId == data.userId) {
        div.classList.add("inner-outgoing");
        div.innerHTML = `
        <div class="inner-content">${data.content}</div>
    `;
    } else {
        div.classList.add("inner-incoming");
        div.innerHTML = `
        <div class="inner-name">${data.fullName}</div>
        <div class="inner-content">${data.content}</div>
    `;
    }

    body.appendChild(div);
    bodyChat.scrollTop = bodyChat.scrollHeight;
})
// End SERVER_RETURN_MESSAGE 

// Scroll Chat to Bottom
const bodyChat = document.querySelector(".chat .inner-body");
if(bodyChat){
    bodyChat.scrollTop = bodyChat.scrollHeight;
}
// End Scroll Chat to Bottom