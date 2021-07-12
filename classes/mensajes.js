
class Mensajes {

    constructor() {
        this.mensajes = [];
    }

    agregarMensaje(mensaje) {


        this.mensajes.push(mensaje);
        return this.mensajes;

    }

    getMensajes() {
        return this.mensajes;
    }


}


module.exports = {
    Mensajes
}