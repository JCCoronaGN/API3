const mongoose = require("mongoose");
const UniqueValidator = require("mongoose-unique-validator");
const cryto = require("crypto");
const jwt = require("jsonwebtoken");



const SchemaUsuario = mongoose.Schema({
    nombre: {
        type: String,
        unique: [true,"Nombre ya existe"],
        required : true
    },
    email: {
        type: String,
        unique:true,
        required : true,
        match: [/\S+@\S+\.\S+/, "correo inválido"],
        index: true
    },
    username: {
        type: String,
        unique: true,
        required : true,
        lowercase : true,
        match: [/^[a-zA-Z0-9]+$/, "Username inválido"],
        index : true
    },
    hash : String,
    salt : String,
    tarjeta:String,
    tipo: {
        type : String,
        enum: ['Vendedor','Comprador']
    }
},{timestamps: true})

SchemaUsuario.plugin(UniqueValidator, { message : "El usuario ya existe"});
SchemaUsuario.methods.crearContrasena = function(password){
    this.salt = cryto.randomBytes(16).toString("hex");
    this.hash = cryto
        .pbkdf2Sync(password,this.salt,10000,512,"sha512")
        .toString("hex");
}
SchemaUsuario.methods.validarContrasena = function(password){
    const pass =cryto
                    .pbkdf2(password.this.salt,10000,512,"sha512")
                    .toString("hex");
    return pass === this.hash;
}

SchemaUsuario.methods.generarJWT = function(){
    const today = new Date();
    const exp = new Date();

    exp.setDate(today.getDate() + 60);

    return jwt.sign({
        id:this._id,
        username: this.username,
        exp: parseInt(exp.getTime()/1000)
    },process.env.SECRET)
}

SchemaUsuario.methods.toAuthJSON = function(){
    return {
        username: this.username,
        email:this.email,
        token:this.generarJWT()
    }
}

SchemaUsuario.methods.publicData = function(){
    return {
        username : this.username,
        email : this.email,
        nombre : this.nombre,
        tipo:this.tipo
    }

}
const Usuario = mongoose.model("Usuario",SchemaUsuario);

module.exports = Usuario;

