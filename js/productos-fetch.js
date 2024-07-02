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
 * Funcion que permite crear un elemento <tr> para la tabla de productos
 * por medio del uso de template string de JS.
 */
async function showProductos(){
    let productos =  await fetchData(BASEURL+'/api/productos/', 'GET');
    const tableProductos = document.querySelector('#list-table-producto tbody');
    tableProductos.innerHTML='';
    productos.forEach((producto, index) => {
      let tr = `<tr>
      <td>${producto.nombre}</td>
      <td>${producto.categoria}</td>
      <td>${producto.marca}</td>
      <td>${producto.precio}</td>
      
                    <td>
                        <button class="btn-cac" onclick='updateProducto(${producto.id_producto})'><i class="fa fa-pencil" ></button></i>
                        <button class="btn-cac" onclick='deleteProducto(${producto.id_producto})'><i class="fa fa-trash" ></button></i>
                    </td>
                  </tr>`;
      tableProductos.insertAdjacentHTML("beforeend",tr);
    });
  }
  /**
 * Función para comunicarse con el servidor para poder Crear o Actualizar
 * un registro de Producto
 * @returns 
 */
async function saveProducto(){
    const idProducto = document.querySelector('#id-producto').value;
    const nombre = document.querySelector('#nombre').value;
    const categoria = document.querySelector('#categoria').value;
    const marca = document.querySelector('#marca').value;
    const precio = document.querySelector('#precio').value;
    
    
    //VALIDACION DE FORMULARIO
    if (!nombre|| !categoria|| !marca || !precio ) {
      Swal.fire({
          title: 'Error!',
          text: 'Por favor completa todos los campos.',
          icon: 'error',
          confirmButtonText: 'Cerrar'
      });
      return;
    }
    // Crea un objeto con los datos del producto
    const productoData = {
        nombre:nombre,
        categoria:categoria,
        marca:marca,
        precio:precio,
        
    };
  let result = null;
  // Si hay un idProducto, realiza una petición PUT para actualizar el producto  existente
  if(idProducto!==""){
    result = await fetchData(`${BASEURL}/api/productos/${idProducto}`, 'PUT', productoData);
  }else{
    // Si no hay idProducto, realiza una petición POST para crear un nuevo producto
    result = await fetchData(`${BASEURL}/api/productos/`, 'POST', productoData);
  }
  
  const formProducto = document.querySelector('#form-producto');
  formProducto.reset();
  Swal.fire({
    title: 'Exito!',
    text: result.message,
    icon: 'success',
    confirmButtonText: 'Cerrar'
  })
  showProductos();
}
  
/**
 * Function que permite eliminar una producto del array del localstorage
 * de acuedo al indice del mismo
 * @param {number} id posición del array que se va a eliminar
 */
function deleteProducto(id){
    Swal.fire({
        title: "Esta seguro de eliminar el producto?",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
    }).then(async (result) => {
        if (result.isConfirmed) {
          let response = await fetchData(`${BASEURL}/api/productos/${id}`, 'DELETE');
          showProductos();
          Swal.fire(response.message, "", "success");
        }
    });
    
}

/**
 * Function que permite cargar el formulario con los datos del producto
 * para su edición
 * @param {number} id Id del producto que se quiere editar
 */
async function updateProducto(id){
    //Buscamos en el servidor del producto de acuerdo al id
    let response = await fetchData(`${BASEURL}/api/productos/${id}`, 'GET');
    const idProducto = document.querySelector('#id-producto');
    const nombre = document.querySelector('#nombre');
    const marca = document.querySelector('#marca');
    const categoria = document.querySelector('#categoria');
    const precio = document.querySelector('#precio');
    
    idProducto.value = response.id_producto;
    nombre.value = response.nombre;
    marca.value = response.marca;
    categoria.value = response.categoria;
    precio.value = response.precio;
    
}
  
// Escuchar el evento 'DOMContentLoaded' que se dispara cuando el 
// contenido del DOM ha sido completamente cargado y parseado.
document.addEventListener('DOMContentLoaded',function(){
    const btnSaveProducto = document.querySelector('#btn-save-producto');
    //ASOCIAR UNA FUNCION AL EVENTO CLICK DEL BOTON
    btnSaveProducto.addEventListener('click',saveProducto);
    showProductos();
});




