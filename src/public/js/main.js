const socket = io();

let user;
const chatbox = document.querySelector("#chatbox");

//sweetalers
Swal.fire({
    title: "Identificate",
    input: "text",
    text: "Ingresa tu nombre para identificarte en el chat",
    //valida que el usuario este registrado para enviar mensaje
    inputValidator: (value) => {
      return !value && "Debes ingresar un nombre!";
    },
    //evita que con un click porfuera me deje entrar al chat
    allowOutsideClick: false,
    //hago que aparezca el usuario que envia el mensaje
  }).then((res) => {
    user = res.value;
    // console.log(res.value);
    socket.emit("inicio", "Inicio de sesion");
  });
  

  //logica de envio con enter
  chatbox.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      if (chatbox.value.trim().length > 0) {
        console.log(chatbox.value);
        socket.emit("message", { message: chatbox.value, user });
        chatbox.value = "";
      }
    }
  });
  

  //sweetalert de nuevo cliente conectado
  socket.on("connected", (data) => {
    if (user !== undefined) {
      Swal.fire({
        text: "Nuevo cliente conectado",
        toast: true,
        position: "top-right",
      });
    }
  });
  
  socket.on("messageLogs", (data) => {
    let log = document.querySelector("#messageLogs");
    let messages = "";
  
    data.forEach((message) => {
      messages =
        messages + `<strong>${message.user}</strong>: ${message.message} <br>`;
    });
  
    log.innerHTML = messages;
  });




  //Darkmode

  const toggleButton = document.getElementById('toggle-button')

  toggleButton.addEventListener('change', () => {
    document.body.classList.toggle('dark')
  })