// Variables
//const baseDeDatos = [];

/*async function cargaProductos() {
    const response = await fetch('/catalogo.json');
    const baseJson = await response.json();
    baseDeDatos = baseJson;
  }
  cargaProductos();*/


const baseDeDatos = [
    {
        "id": 1,
        "nombre": "Radio",
        "codigo": "1001",
        "precio": 18000,
        "stock": 1,
        "imagen": "images/radio.jpg",
        "descripcion": "Radio en buen estado. Funciona a pila y a electricidad."
    },
    {
        "id": 2,
        "nombre": "Selz",
        "codigo": "1002",
        "precio": 500,
        "stock": 20,
        "imagen": "images/selz.jpg",
        "descripcion": "Exquisitas galletas saladas."
    },
    {
        "id": 3,
        "nombre": "Trolls",
        "codigo": "1003",
        "precio": 12500,
        "stock": 2,
        "imagen": "images/trolls.jpg",
        "descripcion": "Juguete vintage nuevo. Incluye accesorios."
    },
    {
        "id": 4,
        "nombre": "Asesoría Judicial",
        "codigo": "1004",
        "precio": 50000,
        "stock": 4,
        "imagen": "images/1.jpg",
        "descripcion": "Contamos con los mejores abogados de la región."
    },
    {
        "id": 5,
        "nombre": "Vinilo",
        "codigo": "1005",
        "precio": 5000,
        "stock": 5,
        "imagen": "images/vinilo.png",
        "descripcion": "Vinilo antiguo usado. Buen estado."
    },
    {
        "id": 6,
        "nombre": "Computador Mac",
        "codigo": "1006",
        "precio": 500000,
        "stock": 6,
        "imagen": "images/2.jpg",
        "descripcion": "Computador Mac nuevo."
    },
    {
        "id": 7,
        "nombre": "Arriendo oficina",
        "codigo": "1007",
        "precio": 250000,
        "stock": 20,
        "imagen": "images/3.jpg",
        "descripcion": "Oficina para arriendo en pleno centro de la ciudad."
    },
    {
        "id": 8,
        "nombre": "Televisor",
        "codigo": "1008",
        "precio": 200000,
        "stock": 20,
        "imagen": "images/tv.jpg",
        "descripcion": "Smart tv LG."
    },
    {
        "id": 9,
        "nombre": "Celular",
        "codigo": "1009",
        "precio": 100000,
        "stock": 0,
        "imagen": "images/cel.jpg",
        "descripcion": "Celular nuevo motorola."
    },
    {
        "id": 10,
        "nombre": "Torta manjar",
        "codigo": "1010",
        "precio": 20000,
        "stock": 0,
        "imagen": "images/torta.jpg",
        "descripcion": "Exquisita torta de manjar."
    }

];
/* CREACION DE JSON A PARTIR DE ARREGLO
const datosJson = JSON.stringify(baseDeDatos);

// Crear el Blob
const blob = new Blob([datosJson], {type: 'application/json'});

// Crear una URL para el Blob
const url = URL.createObjectURL(blob);

// Crear un enlace y descargar el archivo
const enlaceDescarga = document.createElement('a');
enlaceDescarga.href = url;
enlaceDescarga.download = 'catalogo.json';
document.body.appendChild(enlaceDescarga);
enlaceDescarga.click();
*/


let carrito = [];
const divisa = '$';
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMiva = document.querySelector('#iva');
const DOMbruto = document.querySelector('#bruto');
const DOMenvio = document.querySelector('#envio');
const DOMapagar = document.querySelector('#apagar')
const DOMbotonVaciar = document.querySelector('#boton-vaciar');
const DOMabrirPagar = document.querySelector('#abrirPagar');
const DOMboleta = document.querySelector('#boleta')

// Funciones

/**
 * Dibuja todos los productos a partir de la base de datos. No confundir con el carrito
 */
function renderizarProductos() {
    baseDeDatos.forEach((info) => {
        // Estructura
        const miNodo = document.createElement('div');
        miNodo.classList.add('card', 'col-lg-4', 'col-sm-12');
        // Bod
        const miNodoCardBody = document.createElement('div');
        miNodoCardBody.classList.add('card-body', 'd-flex', 'flex-column');
        // Titulo
        const miNodoTitle = document.createElement('h5');
        miNodoTitle.classList.add('card-title');
        miNodoTitle.textContent = info.nombre;
         // Codigo
        const miNodoCodigo = document.createElement('p');
        miNodoCodigo.classList.add('card-text');
        miNodoCodigo.textContent = `CÓD: ${info.codigo}`;
        // Stock
        const miNodoStock = document.createElement('span');
        miNodoStock.classList.add('position-absolute', 'badge', 'top-5', 'end-0', 'translate-end', 'rounded-pill');
        if (info.stock > 4) {
            miNodoStock.textContent = `Disponible`;
            miNodoStock.classList.add('bg-info','align-self-end');
        } else if (info.stock == 1) {
            miNodoStock.textContent = `¡Último disponible!`;
            miNodoStock.classList.add('bg-danger','align-self-end');
        } else if (info.stock === 0) {
            miNodoStock.textContent = `Sin existencias`;
            miNodoStock.classList.add('bg-dark','align-self-end');
        } else if (1 < info.stock <= 4) {
            miNodoStock.textContent = `¡Sólo ${info.stock} disponibles!`;
            miNodoStock.classList.add('bg-warning','align-self-end');
        }
        // Imagen
        const miNodoImagen = document.createElement('img');
        miNodoImagen.classList.add('img-fluid');
        miNodoImagen.setAttribute('src', info.imagen);
        // Descripcion
        const miNodoDescripcion = document.createElement('p');
        miNodoDescripcion.classList.add('card-text');
        miNodoDescripcion.textContent = info.descripcion;
        // Precio
        const miNodoPrecio = document.createElement('p');
        miNodoPrecio.classList.add('card-text');
        miNodoPrecio.textContent = `${divisa}${info.precio}`;
        // Boton Agregar al carrito
        const miNodoBoton = document.createElement('button');
        miNodoBoton.classList.add('btn', 'btn-primary', 'btn-sm');
        miNodoBoton.setAttribute('marcador', info.id);
        const tr = document.getElementById(info.codigo);
        let incl = carrito.includes(info.id);   
        if (incl === true) {
            miNodoBoton.textContent = `Ya está en el carro`;
            miNodoBoton.classList.add('btn', 'btn-dark', 'btn-sm');
            miNodoBoton.style.cursor = 'no-drop';
        }else {if (info.stock <=0) {
            miNodoBoton.textContent = `Sin stock`;
            miNodoBoton.classList.add('btn', 'btn-dark', 'btn-sm');
            miNodoBoton.style.cursor = 'no-drop';
        }else{
        miNodoBoton.textContent = 'Agregar al carrito';
        miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
        }}
        // Insertamos
        miNodoCardBody.appendChild(miNodoImagen);
        miNodoCardBody.appendChild(miNodoTitle);
        miNodoCardBody.appendChild(miNodoCodigo);
        miNodoCardBody.appendChild(miNodoDescripcion);
        miNodoCardBody.appendChild(miNodoPrecio);
        miNodoCardBody.appendChild(miNodoStock);
        miNodoCardBody.appendChild(miNodoBoton);
        miNodo.appendChild(miNodoCardBody);
        DOMitems.appendChild(miNodo);
    });
}

/**
 * Evento para añadir un producto al carrito de la compra
 */

function anyadirProductoAlCarrito(evento) {
    const id = evento.target.getAttribute('marcador'); 
    let incl = carrito.includes(id);
    
    if(incl === true) {
        document.querySelector('#oculto').style.display = 'block';
        evento.target.removeEventListener(evento.type, anyadirProductoAlCarrito);
        evento.target.textContent = `Ya agregado!`;
        alert(`El producto ya se encuentra en el carrito`);
        evento.target.classList.add('btn-dark');   
        evento.target.style.cursor = 'no-drop';
        renderizarCarrito();
        //producto.stock -= 1;

    } else if(incl === false) {
        // Anyadimos el Nodo a nuestro carrito
        carrito.push(evento.target.getAttribute('marcador'))
        // Cambiar e inhabilitar botón   miNodoBoton.textContent = `Producto añadido`;
        //alert('Producto añadido');
        // Actualizamos el carrito 
        renderizarCarrito();
        // Mostramos div oculto
        document.querySelector('#oculto').style.display = 'block';
        //}
        evento.target.removeEventListener(evento.type, anyadirProductoAlCarrito);
        evento.target.textContent = `Agregado!`;
        evento.target.classList.add('btn-dark');   
        evento.target.style.cursor = 'no-drop';
    }
}


/**
 * Dibuja todos los productos guardados en el carrito
 */

function renderizarCarrito() {

    // Vaciamos todo el html
    DOMcarrito.textContent = '';
    // Quitamos los duplicados
    const carritoSinDuplicados = [...new Set(carrito)];
    // Generamos los Nodos a partir de carrito
    carritoSinDuplicados.forEach((item) => {
        // Obtenemos el item que necesitamos de la variable base de datos
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            // ¿Coincide las id? Solo puede existir un caso
            return itemBaseDatos.id === parseInt(item);
        });
        // Cuenta el número de veces que se repite el producto, no puede ser mayor que el stock
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
            // ¿Coincide las id? Incremento el contador, en caso contrario lo mantengo
            if (itemId === item) {
                if (total + 1 > miItem[0].stock) { // Si el total en el arreglo es mayor al stock, envía alerta
                   // alert(`El producto ${miItem[0].nombre} ya fue agregado al carro. Puedes modificar la cantidad con los botones + y -.`);
                    return total;
                } else {
                return total + 1;
                }
            } else {
                return total;
            }
        }, 0);

/*         const numeroUnidadesItem = carrito.reduce((total, itemId) => {
            // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
           //ORIGINAL -> return itemId === item ? total += 1 : total;
            // VARIACION 1 SIGUE SUMANDO ITEM AL ARRAY CARRITO -> return itemId === item ? Math.min(total + 1, miItem[0].stock) : total;
        }, 0); */

        // Botón de aumentar
        const botonMas = document.createElement('i');
        botonMas.classList.add('bi', 'bi-plus-circle');
        botonMas.style.cursor = 'pointer';
        botonMas.dataset.item = item;
        if (numeroUnidadesItem < miItem[0].stock) {
            botonMas.style.display = ' ';
            botonMas.addEventListener('click', aumentaCantidad);
           // botonMas.addEventListener('click', disminuirStock);
        } else {
            botonMas.style.color = '#BBBBBB';
            botonMas.style.cursor = 'default';
        }
        // Botón de disminuir
        const botonMenos = document.createElement('i');
        botonMenos.classList.add('bi', 'bi-dash-circle');
        botonMenos.style.cursor = 'pointer';
        botonMenos.dataset.item = item;
        botonMenos.addEventListener('click', disminuyeCantidad);
        //botonMenos.addEventListener('click', disminuirStock);


        // Creamos el nodo del item del carrito
        const miNodo = document.createElement('tr');
        miNodo.classList.add('table-light', 'align-items-center');
        const totlinea = miItem[0].precio * numeroUnidadesItem;
        miNodo.innerHTML = `
            <td scope="row" id="${miItem[0].codigo}">${numeroUnidadesItem}</td>
            <td><strong>${miItem[0].nombre}</strong><br><span style="font-size:0.7em;">(COD:${miItem[0].codigo})</span></td>
            <td>${divisa}${miItem[0].precio}</td>
            <td>${divisa} ${totlinea}</td>`;


        // Boton de borrar
        const miBoton = document.createElement('span');
        miBoton.classList.add('badge', 'bg-danger', 'rounded-pill', 'position-relative', 'float');
        miBoton.style.color = 'white';
        miBoton.style.background = 'red';
        miBoton.textContent = 'X';
        miBoton.style.cursor = 'pointer';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);
        // Mezclamos nodos
        miNodo.appendChild(botonMenos);
        miNodo.appendChild(botonMas);
        miNodo.appendChild(miBoton);
        DOMcarrito.appendChild(miNodo);
    });

    // Renderizamos el precio neto en el HTML
    DOMtotal.textContent = divisa + calcularTotal();
    // Calculamos el IVA
    DOMiva.textContent = divisa + calcularTotal()*0.19
    // Calculamos el bruto
    const totalconiva = calcularTotal()*1.19;
    DOMbruto.textContent = divisa + totalconiva
    // Calcula si corresponde cargo envío
    if (totalconiva < 100000) {
        DOMenvio.textContent = divisa + parseInt(totalconiva * 0.05);
    }else{
        DOMenvio.innerHTML = divisa + `0 (¡Conseguiste envío gratuito!)`
    };
    // Calcula total a pagar
    DOMapagar.textContent = divisa + parseInt(totalconiva + DOMenvio.textContent);
}

/**
 * Evento para borrar un elemento del carrito
 */
function borrarItemCarrito(evento) {
    // Obtenemos el producto ID que hay en el boton pulsado
        const id = evento.target.dataset.item;
    // Borramos todos los productos
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
    DOMitems.textContent = ' ';
    renderizarProductos(id);
    // volvemos a renderizar
    renderizarCarrito();
}

function aumentaCantidad(evento) {
    // Obtenemos el producto ID que hay en el boton pulsado
    const id = evento.target.dataset.item;
    // Volvemos a agregar el producto al carrito (igual que en anyadirProductoalCarrito())
    carrito.push(id);
    // volvemos a renderizar
    renderizarCarrito();
}

function disminuyeCantidad(evento) {
    // Obtenemos el producto ID que hay en el boton pulsado
    const id = evento.target.dataset.item;
    // Buscamos el índice del primer elemento con el id indicado en el carrito
    const index = carrito.indexOf(id);
    // Si encontramos el elemento, lo eliminamos
    if (index > -1) {
        carrito.splice(index, 1);
    }
    // volvemos a renderizar
    renderizarCarrito();
}

/* MANEJO DE STOCK */

//function ajustaStock

/**
 * Calcula el precio total teniendo en cuenta los productos repetidos
 */
function calcularTotal() {
    // Recorremos el array del carrito 
    return carrito.reduce((total, item) => {
        // De cada elemento obtenemos su precio
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        // Los sumamos al total
        return total + miItem[0].precio;
    }, 0);//si deseamos agregar decimales .toFixed(2)
}

/**
 * Vacia el carrito y vuelve a dibujarlo
 */
function vaciarCarrito() {
    // Limpiamos los productos guardados
    carrito = [];
    // Renderizamos los cambios
    renderizarCarrito();
    // Ocultamos div carrito
    document.querySelector('#oculto').style.display = 'none';
}


// Eventos
DOMbotonVaciar.addEventListener('click', vaciarCarrito);

// Inicio
renderizarProductos();
renderizarCarrito();

// BOLETA
// Función que clona div Carrito y Resumen

function boletaNueva(){
    carrito.forEach((item) => {
        const miItemBoleta = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        const miNodoBoleta = document.createElement('tr');

    })
}
function boleta() {
    // Limpiamos boleta
    document.querySelector('#comprados').textContent = '';
    document.querySelector('#resumen').textContent = '';
    // Clonamos productos en carrito
    var clon = document.querySelector('#carro');
    var nuevo = clon.cloneNode(true);
    id = document.getElementById("comprados");
    id.appendChild(nuevo);
    // Eliminamos botón quitar producto de boleta
    const bot = document.querySelectorAll('#comprados .badge');
    for (let i = 0; i < bot.length; i++) {bot[i].style.display = 'none';}
    // Clonamos resumen boleta
    var clon2 = document.querySelector('#resTotal');
    var nuevo2 = clon2.cloneNode(true);
    id2 = document.getElementById("resumen");
    id2.appendChild(nuevo2); 
}
// Lanzamos boleta y formulario al presionar PAGAR
DOMabrirPagar.addEventListener('click', boleta);

/* FUNCIÓN AL TERMINAR CARRO: ENVÍA CORREO Y CORRIGE STOCK 
function finalizaCompra() {
    // Recorrer arreglo carrito
    return carrito.reduce((total, item) => {
        // De cada elemento obtenemos su cantidad
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        // Los sumamos al total
        return total + miItem[0].precio;
    }, 0);
    // Obtener cantidad de cada producto id
    // Actualizar cantidad en arreglo baseDeDatos
    sendMail(); // Envío correo
}*/


// ENVÍO CORREO

function sendMail() {
    // Objeto a enviar: la propiedad es la que se llama desde emailJS
    var params = {
      nombre: document.getElementById("nombre").value,
      direccion: document.getElementById("calle").value,
      comuna: document.getElementById("comuna").value,
      region: document.getElementById("region").value,
      recibe: document.getElementById("recibe").value,
      correo: document.getElementById("correo").value,
      compra: '<html>'+document.getElementById("comprados").innerHTML+'</html>',
      resumen: '<html>'+document.getElementById("resumen").innerHTML+'</html>'
    };
  
    const serviceID = "service_ghnmo4w" //"service_zv8n9o8";
    const templateID = "template_mggbvqq" //"template_klc0rtf";
  
      emailjs.send(serviceID, templateID, params)
    // Limpia el formulario luego del envío. No se limpia el cntenido del carrito
      .then(res=>{
        document.getElementById("nombre").value = '';
        document.getElementById("calle").value = '';
        document.getElementById("comuna").value = '';
        document.getElementById("region").value = '';
        document.getElementById("recibe").value = '';
        document.getElementById("correo").value = '';
          console.log(res); // Registro de respuesta API en consola
          alert("¡Tu mensaje ha sido enviado exitosamente!") // Alerta de envío exitoso
  
      })
      .catch(err=>console.log(err)); // Registro de errores en consola
  
  }