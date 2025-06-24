export async function login(usuarioParam, contrasenaParam) {
    try {
         const response = await fetch('https://dummyjson.com/auth/login',{
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: usuarioParam,
                password: contrasenaParam
            })
         }); 
         if(!response.ok) {
            console.error('Los datos de usuario o contraseña son incorrectos');
            return false;
            
         }
         
         const data = await response.json()
         console.log(data);          
         return data;
        }
        catch (error){
            console.error('Error al iniciar sesión');
            return false;
        }    
}