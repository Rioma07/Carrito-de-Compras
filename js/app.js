const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const ListCursos = document.querySelector ('#lista-cursos');
let articulosCarrito = [];

cargarEvenListeners();
function cargarEvenListeners(){
    //cuando agregas un curso presionando " agregar al carrito "
    ListCursos.addEventListener ('click', agregarCurso );
    //elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    vaciarCarritoBtn.addEventListener('click', () => {
       articulosCarrito = [];
       
       limpiarHTML(); //eliminamos todo el html
    })
}


  

//funciones 

function agregarCurso(e){
    e.preventDefault();

if (e.target.classList.contains('agregar-carrito')){
    const cursoSeleccionao = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionao);
}

}

// elimina cursos del carrito
function eliminarCurso(e){
    
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        carritoHTML();

        console.log(articulosCarrito)
}
}



//lee el contenido del html al que le dimos click y extrae la infopm,acion del curso 

function leerDatosCurso(curso){
    console.log(curso);

    //crear un objetocon el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector ('h4').textContent,
        precio: curso.querySelector ('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad : 1
     }

     //revisa si un elemento ya existe en el carrito 

    const existe = articulosCarrito.some ( curso => curso.id === infoCurso.id);
    if(existe){
        const cursos= articulosCarrito.map( curso => {
            if(curso.id === infoCurso.id){
              curso.cantidad++;
              return curso;
            }else{
                return curso;
            }
        });
        articulosCarrito = [...cursos];

    }else{
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

     
    // agrega elemntos al carritos
    
    console.log(articulosCarrito);
    
    carritoHTML();
}

// mustra el carrito de compras em el html

function carritoHTML () {

    //limpiar el html
    limpiarHTML();

    //recorre el carritoy genera el html
    articulosCarrito.forEach(curso => {
const { imagen, titulo, precio, cantidad, id } = curso;
const row = document.createElement("tr");
row.innerHTML = `
<td>
<img src="${imagen}" width = 100 >
</td>
 <td>
     ${titulo}
 </td>
 <td>
     ${precio}
 </td>
 <td>
     ${cantidad}
 </td>

 <td>
 <a href="#" class="borrar-curso" data-id= "${id}"> x </a>
 </td>
 
 `;

 // agrega el html del carrito en el table body
 contenedorCarrito.appendChild(row);
    });
}

//elimina los cirsos del table body

function limpiarHTML(){
    //forma lenta
    //contenedorCarrito.innerHTML = '';

    while(contenedorCarrito.firstChild){
         contenedorCarrito.removeChild(contenedorCarrito.firstChild)

}
}