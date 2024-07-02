const BASEURL = 'http://127.0.0.1:5000';

/**
 * Función para realizar una petición fetch con JSON.
 * @param {string} url - La URL a la que se realizará la petición.
 * @param {string} method - El método HTTP a usar (GET, POST, PUT, DELETE, etc.).
 * @param {Object} [data=null] - Los datos a enviar en el cuerpo de la petición.
 * @returns {Promise<Object>} - Una promesa que resuelve con la respuesta en formato JSON.
 */
async function fetchData(url, method, data = null) {
  const options = {
      method: method,
      headers: {
          'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : null,  // Si hay datos, los convierte a JSON y los incluye en el cuerpo
  };
  try {
    const response = await fetch(url, options);  // Realiza la petición fetch
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();  // Devuelve la respuesta en formato JSON
  } catch (error) {
    console.error('Fetch error:', error);
    alert('An error occurred while fetching data. Please try again.');
  }
}

/**
 * Funcion que permite crear un elemento <tr> para la tabla de peliculas
 * por medio del uso de template string de JS.
 */
async function showUsuarios(){
    let usuarios =  await fetchData(BASEURL+'/api/usuarios/', 'GET');
    const tableUsuarios = document.querySelector('#list-table-usuarios tbody');
    tableUsuarios.innerHTML='';
    usuarios.forEach((usuario, index) => {
      let tr = `<tr>
      <td>${usuario.firstname}</td>
      <td>${usuario.lastname}</td>
      <td>${usuario.direccion}</td>
      <td>${usuario.email}</td>
      <td>${usuario.password}</td>
      <td>${usuario.interest}</td>
      <td>${usuario.gender}</td>
                    <td>
                        <button class="btn-cac" onclick='updateUsuario(${usuario.id_usuario})'><i class="fa fa-pencil" ></button></i>
                        <button class="btn-cac" onclick='deleteUsuario(${usuario.id_usuario})'><i class="fa fa-trash" ></button></i>
                    </td>
                  </tr>`;
      tableUsuarios.insertAdjacentHTML("beforeend",tr);
    });
  }

/**
 * Función para comunicarse con el servidor para poder Crear o Actualizar
 * un registro de pelicula
 * @returns 
 */
async function saveUsuario(){
    const idUsuario = document.querySelector('#id-usuario').value;
    const firstname = document.querySelector('#firstname').value;
    const lastname = document.querySelector('#lastname').value;
    const direccion = document.querySelector('#direccion').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const interest = document.querySelector('#interest').value;
    const gender = document.querySelector('#gender').value;
    
    //VALIDACION DE FORMULARIO
    if (!firstname || !lastname|| !direccion || !email  || !password || !interest  || !gender) {
      Swal.fire({
          title: 'Error!',
          text: 'Por favor completa todos los campos.',
          icon: 'error',
          confirmButtonText: 'Cerrar'
      });
      return;
    }
    // Crea un objeto con los datos de la película
    const usuarioData = {
        firstname:firstname,
        lastname:lastname,
        direccion:direccion,
        email:email,
        password:password,
        interest:interest,
        gender:gender,
    };
  let result = null;
  // Si hay un idMovie, realiza una petición PUT para actualizar la película existente
  if(idUsuario!==""){
    result = await fetchData(`${BASEURL}/api/usuarios/${idUsuario}`, 'PUT', usuarioData);
  }else{
    // Si no hay idMovie, realiza una petición POST para crear una nueva película
    result = await fetchData(`${BASEURL}/api/usuarios/`, 'POST', usuarioData);
  }
  
  const formRegister = document.querySelector('#formRegister');
  formRegister.reset();
  Swal.fire({
    title: 'Exito!',
    text: result.message,
    icon: 'success',
    confirmButtonText: 'Cerrar'
  })
  showUsuarios();
}
  
/**
 * Function que permite eliminar una pelicula del array del localstorage
 * de acuedo al indice del mismo
 * @param {number} id posición del array que se va a eliminar
 */
function deleteusuario(id){
    Swal.fire({
        title: "Esta seguro de eliminar la pelicula?",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
    }).then(async (result) => {
        if (result.isConfirmed) {
          let response = await fetchData(`${BASEURL}/api/usuarios/${id}`, 'DELETE');
          showUsuarios();
          Swal.fire(response.message, "", "success");
        }
    });
    
}

/**
 * Function que permite cargar el formulario con los datos de la pelicula 
 * para su edición
 * @param {number} id Id de la pelicula que se quiere editar
 */
async function updateUsuario(id){
    //Buscamos en el servidor la pelicula de acuerdo al id
    let response = await fetchData(`${BASEURL}/api/usuarios/${id}`, 'GET');
    const idusuario = document.querySelector('#id-usuario');
    const firstname = document.querySelector('#firstname');
    const lastname = document.querySelector('#lastname');
    const direccion = document.querySelector('#direccion');
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');
    const interest = document.querySelector('#interest');
    const gender = document.querySelector('#gender');
    
    idusuario.value = response.id_usuario;
    firstname.value = response.firstname;
    lastname.value = response.lastname;
    direccion.value = response.direccion;
    email.value = response.email;
    password.value = response.password;
    interest.value = response.interest;
    gender.value = response.gender;
}
  
// Escuchar el evento 'DOMContentLoaded' que se dispara cuando el 
// contenido del DOM ha sido completamente cargado y parseado.
document.addEventListener('DOMContentLoaded',function(){
    const btnSaveUsuario = document.querySelector('#btn-send');
    //ASOCIAR UNA FUNCION AL EVENTO CLICK DEL BOTON
    btnSaveUsuario.addEventListener('click',saveUsuario);
    showUsuarios();
});




