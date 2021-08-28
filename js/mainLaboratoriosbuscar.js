document.querySelector(".arrow-btn").addEventListener("click", () => {
  window.open(`../html/laboratorios.html`,"_self");
});


const stringToHTML = (s) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(s, 'text/html');
  return doc.body.firstChild;
}

const renderItem = (item) => {
  const elemento =  stringToHTML(`<div data-id="${item._id}"> <h2> ${item.nombre} </h2></div>`);


  elemento.addEventListener("click", () => {
    console.log(item);
    window.open(``,"_self");
  });

  elemento.addEventListener("click", () => {
        

    Swal.fire({
      title: `${item.nombre}`,
      showDenyButton: true,
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonText: `Editar`,
      denyButtonText: `Eliminar`,
      cancelButtonText: 'Cancelar',
      footer: `<a class="url" href="../html/labs.html?asignatura=${item._id}" target="_self">Entrar</a>`,
    }).then((result) => {
      console.log(result);
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        window.open(`../html/materialBiblioteca.html?material=${item._id}`, "_self")
      } else if (result.isDenied) {
        Swal.fire('Material eliminado', '', 'info')
      } 
    })

  })

  return elemento;
};

window.onload = () => {



  //Obteniendo valores de la url     
  const valores = window.location.search;

  //Creamos la instancia
  const urlParams = new URLSearchParams(valores);

  //Accedemos a los valores
  window.buscar = urlParams.get('nombre');


  fetch(`https://serverless-julio458h-gmailcom.vercel.app/api/asignaturas/nombre/${buscar}`)
       .then(response => response.json())
       .then(data => {
         const asignaturas = document.getElementById('cardsID');
         const template = data.map(renderItem);
         template.forEach(element => asignaturas.appendChild(element));
         //asignaturas.innerHTML = template;
         console.log(data);
       });

       const submit = document.getElementById("aceptar");
  
       submit.addEventListener("click", () =>{
         const valores = document.getElementById("busc").value;
         window.open(`../html/laboratoriosbuscar.html?nombre=${valores}`,"_self");
       }); 
       

};

