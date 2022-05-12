const socket=io("http://localhost:8000");

const form= document.getElementById("sendbox")

const messageInput= document.getElementById("messageinp")

const messagecontainer = document.querySelector(".container");

// var namee=prompt("Enter Name:");
while(!namee){
    var namee=prompt('Enter Name');
    if(namee != null && namee !="")
    {
        break;        
    }
    else if(namee=="")
    {
        alert('Entry Required');
    }
}

socket.emit("user-joined", namee);

// var audio1= new Audio('itune.mp3');
// var audio2= new Audio('/Users/vaibhavkaura/Documents/Programs/Competetive Programming/Web Development/Project Chat App/backend');

// const appendd= (message, position)=>{
//     const messageElement= document.createElement('div');
//     messageElement.innerText=message;
//     messageElement.classList.add('message');
//     messageElement.classList.add(position);
//     messagecontainer.append(messageElement);
// }



socket.on("joined", namee =>{
    if(namee!=null){
        const messageElement= document.createElement('div');
        messageElement.innerText=`${namee} joined the chat`;
        messageElement.classList.add('message');
        messageElement.classList.add('centre');
        messagecontainer.append(messageElement);
        // audio1.play();
    }
});

socket.on('receive', data=>{
    const messageElement= document.createElement('div');
        messageElement.innerText=`${data.name}: ${data.message}`;
        messageElement.classList.add('message');
        messageElement.classList.add('left');
        messagecontainer.append(messageElement);
        // audio1.play();
});

socket.on('leave', namee=>{
    const messageElement= document.createElement('div');
    messageElement.innerText=`${namee} left the chatroom`;
    messageElement.classList.add('message');
    messageElement.classList.add('centre');
    messagecontainer.append(messageElement);
});

form.addEventListener('submit', (e)=>{
    e.preventDefault;
    const message=messageInput.value;
    const messageElement= document.createElement('div');
    messageElement.innerText=`You: ${message}`;
    messageElement.classList.add('message');
    messageElement.classList.add('right');
    messagecontainer.append(messageElement);
    socket.emit('Send-msg', message);
    messageInput.value="";
    // audio2.play();
})