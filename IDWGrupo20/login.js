import {login} from './auth.js'



        document.getElementById("formularioAcceso").addEventListener("submit", async function (event) {
            event.preventDefault();

            const usuario = document.getElementById("usuario").value;
            const contrasena = document.getElementById("contrasena").value;

            const usuarioValidado = await login(usuario, contrasena);    

            if(usuarioValidado){
                sessionStorage.setItem("usuario", usuarioValidado.username);
                sessionStorage.setItem("token", usuarioValidado.accessToken);
                //alert("Iniciaste sesión correctamente");
                window.location.href = "altaSalon.html"; 
            } else {
                alert("Usuario o contraseña incorrectos");
            }    
        });