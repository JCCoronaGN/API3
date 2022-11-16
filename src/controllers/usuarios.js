const Usuario = require("../modules/Usuario");

// function login(req,res) {
//     const user = req.body.user;
//     const pass = req.body.pass;

//     Usuario.findOne({username : user})
//         .then(usuario =>{
//             if(usuario.validarContrasena(pass))
//                 res.status(200).send(usuario.toAuthJSON());
//             else
//                 res.status(401).send("Usuario o contraseña incorrectos");
//     })
// }

function login(req,res) {
    const user = req.body.user;
    const pass = req.body.pass;
    passport.authenticate('local',{session:false}, (err,user,info)=>{
        if(err) return err
        if(user) {
            user.token = user.generaJWT();
            return res.json({user:user.toAuthJSON()});
        }else return res.status(422).json(info);
    })(req, res)
}

function agregarUsuario(req,res){
    const usuario = new Usuario(req.body);
    const pass = req.body.password;
    usuario.crearContrasena(pass);
    usuario.save().then(data => res.status(200).send(data))

}

function obtenerUsuarios(req,res) {
    if(!req.auth)
        res.sendStatus(401);
    Usuario.findById(req.auth.id)
        .then( user => {
            res.send(user.publicData());
        })
}

module.exports = {
    login,
    agregarUsuario,
    obtenerUsuarios
}