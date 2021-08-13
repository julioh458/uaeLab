
const stringToHTML = (s) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(s, 'text/html');
  return doc.body.firstChild;
}

const renderItem = (item) => {
  const elemento =  stringToHTML(`<div data-id="${item._id}"> <h2> ${item.nombre} </h2></div>`);


  elemento.addEventListener("click", () => {
    console.log(item);
    window.open(`${item.url}`,"_blank");
  });

  return elemento;
};

window.onload = () => {

  
  document.querySelector(".arrow-btn").addEventListener("click", () => {
    window.open(`../html/labs.html?asignatura=${asignatura}`,"_self");
  });



  //Obteniendo valores de la url     
  const valores = window.location.search;

  //Creamos la instancia
  const urlParams = new URLSearchParams(valores);

  //Accedemos a los valores
  let lab = urlParams.get('lab');

  let asignatura = urlParams.get('asignatura');
  

  fetch(`https://serverless-julio458h-gmailcom.vercel.app/api/guias/${lab}`)
    .then(response => response.json())
    .then(data => {

      const labos = document.getElementById('cardsID');
      const template = data.map(renderItem);
      template.forEach(element => labos.appendChild(element));
      //labos.innerHTML = template;
      console.log(data);
    });


};

