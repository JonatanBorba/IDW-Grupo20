 document.addEventListener("DOMContentLoaded",async() => {
     const tabla = document.querySelector("#tablaUsuarios tbody");

         try {
            const response = await fetch('https://dummyjson.com/users'); 
            if (response.ok){
                const data = await response.json()
                usuarios = data.users;
            
                usuarios.forEach((usuario) => {
                    const fila = document.createElement("tr");
                    fila.innerHTML = `
                        <td>${usuario.firstName}</td>
                        <td>${usuario.lastName}</td>
                        <td>${usuario.email}</td>
                        <td>${usuario.phone}</td>
                        <td>${usuario.username}</td>
                        <td>${usuario.password}</td>

                    `;
                    tablaUsuarios.appendChild(fila);
                });


            }else{
                console.error(response.status);
                throw Error('Error al consltar datos de usuarios');
            }
            

         } catch (error){
            console.error('error:', error);
            alert('Error al cargar los usuarios');
         }
     
        
    });
