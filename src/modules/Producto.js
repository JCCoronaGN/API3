const mongoose = require("mongoose");

const ProductoSchema = mongoose.Schema({
    nombre : {type: String, require: true, unique: true},
    precio: Number,
    cat : {type : String, enum:['Alimentos', 'Bebidas', 'Otros']},
    desc : String
  },{
    collection: "Productos",
    timestamps: true
})

const Producto = mongoose.model("Producto", ProductoSchema);

module.exports = Producto