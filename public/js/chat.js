import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js'

// file-upload-with-preview

const upload = new FileUploadWithPreview('upload-images');

// End file-upload-with-preview

// CLIENT_SEND_MASSAGE
const formSendData = document.querySelector(".chat .inner-form")
if (formSendData) {
    formSendData.addEventListener("submit", (e) => {
        e.preventDefault();
        const content = e.target.elements.content.value;
        const images = upload.cachedFileArray;
        if (content || images.length > 0) {
            socket.emit("CLIENT_SEND_MASSAGE", {
                content: content,
                images: images
            });
            e.target.elements.content.value = "";
            upload.clearPreviewPanel()
            socket.emit("CLIENT_SEND_TYPING", "hidden");
        }
    })
}
// END CLIENT_SEND_MASSAGE

// SERVER_RETURN_MESSAGE
socket.on("SERVER_RETURN_MESSAGE", (data) => {

    const body = document.querySelector(".chat .inner-body");
    const myId = document.querySelector("[my-id]").getAttribute("my-id");
    const boxTyping = document.querySelector(".chat .inner-list-typing")
    let htmlFullName="";
    let htmlContent="";
    let htmlmage="";
    const div = document.createElement("div");
    if (myId == data.userId) {
        div.classList.add("inner-outgoing");

    } else {
        div.classList.add("inner-incoming");
        htmlFullName = `
        <div class="inner-name">${data.fullName}</div>
    `;
    }

    if (data.content) {
        htmlContent = `
        <div class="inner-content">${data.content}</div>
    `;
    }

    if (data.images.length > 0) {
        htmlmage = `<div class="inner-images">`
        for(const image of data.images){
            htmlmage+=`<img src="${image}">`;
        }
        htmlmage+=`</div>`;
    }

    div.innerHTML=`
        ${htmlFullName}
        ${htmlContent}
        ${htmlmage}
    `

    body.insertBefore(div, boxTyping);
    bodyChat.scrollTop = bodyChat.scrollHeight;
})
// End SERVER_RETURN_MESSAGE 

// Scroll Chat to Bottom
const bodyChat = document.querySelector(".chat .inner-body");
if (bodyChat) {
    bodyChat.scrollTop = bodyChat.scrollHeight;
}
// End Scroll Chat to Bottom


// Show icon Chat 
//Show Popup
const buttonIcon = document.querySelector('.button-icon');
if (buttonIcon) {
    const tooltip = document.querySelector('.tooltip')
    Popper.createPopper(buttonIcon, tooltip)

    buttonIcon.onclick = () => {
        tooltip.classList.toggle('shown')
    }
}
//End Show Popup

// Show Typing 
var timeOut;
const showtyping = () => {
    socket.emit("CLIENT_SEND_TYPING", "show");
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
        socket.emit("CLIENT_SEND_TYPING", "hidden");
    }, 3000)
}
// End Show Typing


//Insert Icon To Input
const emojiPicker = document.querySelector("emoji-picker")
if (emojiPicker) {
    const inputChat = document.querySelector(".chat .inner-form input[name='content']")
    emojiPicker.addEventListener("emoji-click", (event) => {
        const icon = event.detail.unicode;
        inputChat.value += icon;
        const end = inputChat.value.length;
        inputChat.setSelectionRange(end, end);
        inputChat.focus();
        showtyping();
    });

    // Input Keyup 
    inputChat.addEventListener("keyup", () => {
        showtyping();
    })
    // End Input Keyup 
}
//End Insert Icon To Input
// End Show icon Chat 


// SEVER_RETURN_TYPING
const elementListTyping = document.querySelector(".chat .inner-list-typing");
if (elementListTyping) {
    socket.on("SEVER_RETURN_TYPING", (data) => {
        if (data.type == "show") {
            const existTyping = elementListTyping.querySelector(`[user-id='${data.userId}']`);
            if (!existTyping) {
                const boxTyping = document.createElement("div");
                boxTyping.classList.add("box-typing");
                boxTyping.setAttribute("user-id", data.userId);
                boxTyping.innerHTML = `
                    <div class="inner-name">${data.fullName}</div>
                    <div class="inner-dots"> 
                        <span></span> 
                        <span></span> 
                        <span></span> 
                    </div>
                `;
                elementListTyping.appendChild(boxTyping)
            }

        } else {
            const boxTypingRemove = elementListTyping.querySelector(`[user-id='${data.userId}']`);
            if (boxTypingRemove) {
                elementListTyping.removeChild(boxTypingRemove);
            }
        }
    })
}
// End SEVER_RETURN_TYPING