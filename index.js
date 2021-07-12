
let app = require('express')();
let server = require('http').createServer(app);
let io = require('socket.io')(server,{ cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const {Usuarios} = require ('../ChatSocket/classes/usuarios'); 
usuarios = new Usuarios();
 
io.on('connection', (socket) => {
 
  socket.on('disconnect', function(){
    let usuariosEliminado = usuarios.borrarUsuario(socket.user_name);
    io.emit('user-out', usuariosEliminado); 
    io.emit('users-updated', usuarios.getUsuarios());   
    console.log("llego disconnect", usuariosEliminado); 
  });
 
  socket.on('entrar', (usuario) => {
    socket.join(usuario.sala);
    socket.user_name = usuario.correo;
    let usuariosConectados = usuarios.agregarUsuario(usuario);
    io.emit('users-changed', usuariosConectados); 
    let salas= usuarios.getSalas();
    io.emit('salas-changed', salas); 
    console.log("se ha unido a la sala: " +usuario.sala );
    console.log(usuario);   
  });
  
  socket.on('send-message', (mensaje) => {
    console.log("enviando a sala: ", mensaje.usuario.sala);
    console.log("enviado por: ", mensaje.usuario.nombre);
    io.sockets.in(mensaje.usuario.sala).emit('mensaje', mensaje);
    console.log(mensaje);    
  });

    // Mensajes privados
    socket.on('mensajePrivado', (mensaje) => {

      socket.to(socket.id).emit('mensajePrivado', mensaje);
      console.log(mensaje);
      console.log(socket.id);

    });



});
 
var port = process.env.PORT || 3001;
 
server.listen(port, function(){
   console.log('listening in http://localhost:' + port);
});