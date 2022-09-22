const socket = io()
let name;
let textarea = document.querySelector('#textarea')
//for file 
let send_file = document.querySelector('#file');




let messageArea = document.querySelector('.message__area')
do {
    name = prompt('Please enter your name: ')
} while(!name)

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

send_file.addEventListener('change', (e) => {
    var data = send_file.files;
    for( let i=0;i<data.length;i++){
        var reader = new FileReader();
        reader.onload = function(evt){
            let file_name = evt.target.result;
            //let fileName = data.name;
            let image  = `<img src=${file_name} alt="Red dot" style="width:100px;" />`;
            sendMessage(image)
        };
        reader.readAsDataURL(data[i]);
    }
    
})





function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    }
    // Append 
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    send_file.value = ''
    scrollToBottom()

    // Send to server 
    socket.emit('message', msg)

}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

// Recieve messages 
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})












function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}