
class Usuarios {

    constructor() {
        this.usuarios = [];
    }

    agregarUsuario(usuario) {

        if(this.usuarios.filter(usuarioActual => usuarioActual.correo === usuario.correo && usuarioActual.sala === usuario.sala)[0] == null)
        {
            console.log("NO existe usuario");
            this.usuarios.push(usuario);
        }
        else
        {
            console.log("SI existe usuario");
        }

        // this.usuarios.push(usuario);
        return this.usuarios.filter(usuario => usuario.sala != "general");

    }

    getUsuario(correo) {
        let usuario = this.usuarios.filter(usuario => usuario.correo === correo)[0];
        return usuario;
    }

    getUsuarios() {
        return this.usuarios.filter(usuario => usuario.sala != "general");
    }

    getUsuariosPorSala(sala) {
        let usuariosEnSala = this.usuarios.filter(usuario => usuario.sala === sala);
        return usuariosEnSala;
    }

    getSalasPorUsuario(correo)
    {
        let salas = this.usuarios.filter(usuario => usuario.correo === correo);
        return salas;
    }

    getSalas()
    {
        let salas = this.usuarios.filter(usuario => usuario.sala != "general");
        return salas;
    }

    borrarUsuario(correo) {

        let usuarioBorrar = this.getUsuario(correo);
        this.usuarios = this.usuarios.filter(usuario => usuario.correo != correo);

        return usuarioBorrar;

    }

    // containsObject(obj, list) {
    //     var i;
    //     for (i = 0; i < list.length; i++) {
    //         if (list[i] === obj) {
    //             return true;
    //         }
    //     }
    
    //     return false;
    // }


}


module.exports = {
    Usuarios
}