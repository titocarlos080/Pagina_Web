"use srtict"
 const publicaciones= document.querySelector(".publicaciones");
let contador=0;

const createPublicationCode=(nombre,contenido)=>{
    const conteiner = document.createElement("DIV");
    const comentarios = document.createElement("DIV");
    const contenid= document.createElement("DIV");
    const parrafo= document.createElement("p");
    const h3 = document.createElement("H3");
    const btnComentario = document.createElement("INPUT");
    const btnEnviar = document.createElement("INPUT");
    
    conteiner.classList.add("publicacion");
    comentarios.classList.add("comentarios");
    contenid.classList.add("contenido");
    parrafo.classList.add("parrafo");
    h3.classList.add("nombre");
    btnComentario.classList.add("comentario");
    btnEnviar.classList.add("enviar")
    btnEnviar.type="submit";

    btnComentario.setAttribute("placeholder","Introduce un comentario")
    h3.textContent= nombre;
    parrafo.textContent=contenido;

   
    
    contenid.appendChild(parrafo);
    

    conteiner.appendChild(h3);
    comentarios.appendChild(btnComentario);
    comentarios.appendChild(btnEnviar);
    conteiner.appendChild(contenid);
    conteiner.appendChild(comentarios);
    
    return conteiner;
}


const cargarpubli = entry =>{
   if(entry[0].isIntersecting)cargarPublicaciones(4);
}
const observer = new IntersectionObserver(cargarpubli);

 const cargarPublicaciones= async num =>{
     const publicacion= await fetch("informacion.txt");
     const contenido= await publicacion.json();
     const res = contenido.content;   
     const documentfragment= document.createDocumentFragment();
      console.log(res.length)

    for (let i = 0; i < num; i++) {
       
        if(res[contador]!=undefined) {
            const fragment = createPublicationCode(res[contador].nombre,res[contador].contenido)
            documentfragment.appendChild(fragment); 
            if (i==(num-1)) observer.observe(document.querySelector(".publicaciones"));

        }else{
            let noMore= document.createElement("h2");
            noMore.classList.add("mensajeUltimos")
            noMore.textContent="No hay mas publicaciones";
            documentfragment.appendChild(noMore);
            publicaciones.appendChild(documentfragment);  
            break;
        }
        
        
    contador++;
    }
    publicaciones.appendChild(documentfragment);  
     
 }
 cargarPublicaciones(24);
  
