// Variables
const baseDeDatos = [
    {
        id: 1,
        nombre: 'Radio',
        codigo: '1001',
        precio: 18000,
        imagen: 'images/radio.jpg',
        descripcion: 'Radio en buen estado. Funciona a pila y a electricidad.'
    },
    {
        id: 2,
        nombre: 'Selz',
        codigo: '1002',
        precio: 500,
        imagen: 'images/selz.jpg',
        descripcion: 'Exquisitas galletas saladas.'
    },
    {
        id: 3,
        nombre: 'Trolls',
        codigo: '1003',
        precio: 12500,
        imagen: 'images/trolls.jpg',
        descripcion: 'Juguete vintage nuevo. Incluye accesorios.'
    },
    {
        id: 4,
        nombre: 'Asesoría Judicial',
        codigo: '1004',
        precio: 50000,
        imagen: 'images/1.jpg',
        descripcion: 'Contamos con los mejores abogados de la región.'
    },
    {
        id: 5,
        nombre: 'Vinilo',
        codigo: '1005',
        precio: 5000,
        imagen: 'images/vinilo.png',
        descripcion: 'Vinilo antiguo usado. Buen estado.'
    },
    {
        id: 6,
        nombre: 'Computador Mac',
        codigo: '1006',
        precio: 500000,
        imagen: 'images/2.jpg',
        descripcion: 'Computador Mac nuevo.'
    },
    {
        id: 7,
        nombre: 'Arriendo oficina',
        codigo: '1007',
        precio: 250000,
        imagen: 'images/3.jpg',
        descripcion: 'Oficina para arriendo en pleno centro de la ciudad.'
    },
    {
        id: 8,
        nombre: 'Televisor',
        codigo: '1008',
        precio: 200000,
        imagen: 'images/tv.jpg',
        descripcion: 'Smart tv LG.'
    },
    {
        id: 9,
        nombre: 'Celular',
        codigo: '1009',
        precio: 100000,
        imagen: 'images/cel.jpg',
        descripcion: 'Celular nuevo motorola.'
    },
    {
        id: 10,
        nombre: 'Torta manjar',
        codigo: '1010',
        precio: 20000,
        imagen: 'images/torta.jpg',
        descripcion: 'Exquisita torta de manjar.'
    }

];

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

// Funciones

/**
 * Dibuja todos los productos a partir de la base de datos. No confundir con el carrito
 */
function renderizarProductos() {
    baseDeDatos.forEach((info) => {
        // Estructura
        const miNodo = document.createElement('div');
        miNodo.classList.add('card', 'col-lg-3', 'col-sm-12');
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
        // Boton 
        const miNodoBoton = document.createElement('button');
        miNodoBoton.classList.add('align-self-end', 'btn', 'btn-primary', 'btn-sm');
        miNodoBoton.textContent = 'Agregar al carrito';
        miNodoBoton.setAttribute('marcador', info.id);
        miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
        // Insertamos
        miNodoCardBody.appendChild(miNodoImagen);
        miNodoCardBody.appendChild(miNodoTitle);
        miNodoCardBody.appendChild(miNodoCodigo);
        miNodoCardBody.appendChild(miNodoDescripcion);
        miNodoCardBody.appendChild(miNodoPrecio);
        miNodoCardBody.appendChild(miNodoBoton);
        miNodo.appendChild(miNodoCardBody);
        DOMitems.appendChild(miNodo);
    });
}

/**
 * Evento para añadir un producto al carrito de la compra
 */
function anyadirProductoAlCarrito(evento) {
    // Anyadimos el Nodo a nuestro carrito
    carrito.push(evento.target.getAttribute('marcador'))
    // Actualizamos el carrito 
    renderizarCarrito();
    // Mostramos div oculto
    document.querySelector('#oculto').style.display = 'block';

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
        // Cuenta el número de veces que se repite el producto
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
            // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
            return itemId === item ? total += 1 : total;
        }, 0);

        // Creamos el nodo del item del carrito
        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center', 'lh-sm', 'mx-2');
        const totlinea = miItem[0].precio * numeroUnidadesItem;
        miNodo.innerHTML = `
            <div class="row col-12 text-nowrap" style="font-size:0.8em;">
                <div class="col-1">${numeroUnidadesItem}</div>
                <div class="col-5"><strong>${miItem[0].nombre}</strong><br><span style="font-size:0.7em;">(COD:${miItem[0].codigo})</span></div>
                <div class="col-3 text-right">${divisa}${miItem[0].precio}</div>
                <div class="col-3 text-right">${divisa} ${totlinea}</div>
            </div>`;
        // Boton de borrar
        const miBoton = document.createElement('span');
        miBoton.classList.add('badge', 'bg-danger', 'rounded-pill', 'position-absolute', 'top-10', 'start-100', 'translate-middle', 'float-right');
        miBoton.textContent = 'X';
        miBoton.style.overflow = '-3rem';
        miBoton.style.cursor = 'pointer';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);
        // Mezclamos nodos
        miNodo.appendChild(miBoton);
        DOMcarrito.appendChild(miNodo);
    });

    // Renderizamos el precio neto en el HTML
    DOMtotal.textContent = calcularTotal();
    // Calculamos el IVA
    DOMiva.textContent = calcularTotal()*0.19
    // Calculamos el bruto
    const totalconiva = calcularTotal()*1.19;
    DOMbruto.textContent = totalconiva
    /* Calcula si corresponde cargo envío */
    if (totalconiva < 100000) {
        DOMenvio.textContent = parseInt(totalconiva * 0.05);
    }else{
        DOMenvio.innerHTML = `0 <i>(¡Conseguiste<br>envío gratuito!)</i>`
    };
    // Calcula total a pagar
    DOMapagar.textContent = parseInt(totalconiva) + parseInt(DOMenvio.textContent);
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
    // volvemos a renderizar
    renderizarCarrito();
}

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
function boleta() {
    // Limpiamos boleta
    document.querySelector('#comprados').textContent = '';
    document.querySelector('#resumen').textContent = '';
    // Clonamos productos en carrito
    var clon = DOMcarrito;
    var nuevo = clon.cloneNode(true);
    id = document.getElementById("comprados");
    id.appendChild(nuevo);
    // Cambiamos salto de línea entre nombre producto y código por espacio
    const salto = document.querySelectorAll ('#comprados br');
    for (let i = 0; i < salto.length; i++) {salto[i].outerHTML = `     `;}
    // Eliminamos botón quitar producto de boleta
    const bot = document.querySelectorAll('#comprados .badge');
    for (let i = 0; i < bot.length; i++) {bot[i].style.display = 'none';}
    // Clonamos resuen boleta
    var clon2 = document.querySelector('#resTotal');
    var nuevo2 = clon2.cloneNode(true);
    id2 = document.getElementById("resumen");
    id2.appendChild(nuevo2); 
}
// Lanzamos boleta y formulario al presionar PAGAR
DOMabrirPagar.addEventListener('click', boleta);


// ENVÍO CORREO

function sendMail() {
    var params = {
      nombre: document.getElementById("nombre").value,
      direccion: document.getElementById("calle").value,
      comuna: document.getElementById("comuna").value,
      region: document.getElementById("region").value,
      recibe: document.getElementById("recibe").value,
      correo: document.getElementById("correo").value,
      compra: document.getElementById("comprados").innerHTML,
      resumen: document.getElementById("resumen").innerHTML
    };
  
    const serviceID = "service_ghnmo4w" //"service_zv8n9o8";
    const templateID = "template_mggbvqq" //"template_klc0rtf";
  
      emailjs.send(serviceID, templateID, params)
      .then(res=>{
        document.getElementById("nombre").value = '';
        document.getElementById("calle").value = '';
        document.getElementById("comuna").value = '';
        document.getElementById("region").value = '';
        document.getElementById("recibe").value = '';
        document.getElementById("correo").value = '';
          console.log(res);
          alert("¡Tu mensaje ha sido enviado exitosamente!")
  
      })
      .catch(err=>console.log(err));
  
  }