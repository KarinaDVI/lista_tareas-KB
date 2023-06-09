const input = document.querySelector("#input-text");
const date = document.querySelector("#input-date");
const addBtn = document.querySelector(".btn-add");
const btnHist = document.querySelector(".show-hist");
const ul = document.querySelector("ul");
const empty = document.querySelector(".empty");
const uld = document.querySelector(".done")
const hist = document.querySelector("#hist")
const historial = document.querySelector(".container-hist")
const btnMore = document.querySelector(".btn-more")
const btnMoreHide = document.querySelector("#btn-more-hide")
let today = new Date();

let textArray =["Date,Task,State"]
let state;

/**
 * @returns Botón de agregar tarea
 */
addBtn.addEventListener("click", (e)=>{

e.preventDefault();

const text = input.value;
const dateValue = date.value;

if (text !== "" && dateValue !==""){

  const li = document.createElement("li");
  const p = document.createElement("p");
  const dp =document.createElement("p")
  const div = document.createElement("div")

  div.className="div-btn";
  p.textContent = text;
  dp.textContent = dateValue;
  dp.className="date-text";
  p.className="task-text";


    
  li.appendChild(dp);
  li.appendChild(p);
  div.appendChild(addDeleteBtn());
  div.appendChild(addDoneBtn());
  li.appendChild(div);
  ul.appendChild(li);

  show(dateValue,text, "pending")
    
  
  input.value = "";
  dateValue.value ="";
  empty.style.display = "none";
}

}); 

/**Funcion de la profesora
 * 
 */

/**Borrado de tarea */
function addDeleteBtn () {
  
  const deleteBtn = document.createElement("button");

  deleteBtn.textContent = "X";
  deleteBtn.className = "btn-delete";
  
  /**Botón de borrado de tarea */
  deleteBtn.addEventListener("click", (e)=>{
    const item = e.target.parentElement.parentElement;
    item.parentElement.removeChild(item);
    show(item.children[0].innerText,item.children[1].innerText,"deleted at "+today.toLocaleString())
    const items = document.querySelectorAll("li");

    if(items.length === 0){
      empty.style.display ="block";
    }
  })
  return deleteBtn
};


/**
 * 
 * @returns Funcion para agregar un boton de tarea hecha
 */

function addDoneBtn(){
  const doneBtn = document.createElement("button");

  doneBtn.textContent = "V";
  doneBtn.className = "btn-done";

  /** Evento para botón de tarea hecha */
  doneBtn.addEventListener("click", (e)=>{
    const item = e.target.parentElement.parentElement;
    
    if(e.target.parentElement.parentElement.parentElement.className!=="done"){
      try{
        ul.removeChild(item);
      }
      catch(error){
        console.log("no hay nada para eliminar1");
      }
        
        uld.appendChild(item);
        show(item.children[0].innerText,item.children[1].innerText, "done")
       // console.log(item.children[0].innerText+" "+item.children[1].innerText+" done");
    }
    else{
      try{
        uld.removeChild(item);

      }catch(error){
        console.log("no hay nada para remover2");
      }
      ul.appendChild(item);
      show(item.children[0].innerText,item.children[1].innerText, "pending")
    }
    });

    const items = document.querySelectorAll("li");
    if(items.length === 0){
      empty.style.display ="block";
    }
    return doneBtn
  };


  //Función para agregar hijos a padres(no la usé)
function appendChilds(parent,dateValue,text,state) {
  //chequear si el argumento pasado a la función es un nodo válido
  if (parent.nodeType !== undefined) {
    textArray.push(textValue+" "+text+" "+state)
    const pDate = document.createElement("p");
    pDate.innerText = dateValue+" "+text+" "+state;
    
    //Agrega el hijo al padre
    parent.appendChild(pDate);
  }
  return textArray
}

  /**Para llenar el array */
function show(date, text, state){
  
  textArray.push(date+","+text+","+state)
  //console.log(textArray)
  return textArray;

}


/** 
 @returns Función para mostrar en el historial 
 solo las tareas que se hayan hecho más de 5 veces
 */

historial.addEventListener("mouseenter",(e)=>{
    //console.log("pase por el div del historial")

    hist.innerHTML = ""
    //console.log(textArray)
    let splited1=[]
    /*Divide el array original en 3 partes y toma el texto para
    ponerlo en otro array */
    textArray.forEach(element=>{
      splited = element.split(",")
      splited1.push(splited[1])
    })
    const lie=document.getElementById("hist").innerHTML=`<li><p>Tareas</p></li>`
    
    /**Muestra las hechas mas de 5 veces */
    
    Object.entries(conteo(splited1)).forEach(([key, value])=>{
      if(value>5){

        const lih = document.createElement("li");
        const spi = document.createElement("span")
        const ptx = document.createElement("p")
        spi.textContent=key
        spi.appendChild(addRedoBtn(key))
        //console.log(ptx)
        ptx.appendChild(spi)
        lih.appendChild(ptx)
        hist.appendChild(lih);
        hist.style.display = "block"

      }
      })
    })
    
/**
 * 
 * @param {} array 
 * @returns Función para tener un 
 * historial completo(detalles de tareas altas, bajas y hechas):
 */

  btnMore.addEventListener("click",(e)=>{
    //console.log("pase por el div del historial")
    btnMore.style.display = "none"
    btnMoreHide.style.display = "block"
    textArray.forEach((element)=>{
    //console.log(element)
    const lih = document.createElement("li");
    const sph = document.createElement("span")
    const spi = document.createElement("span")
    const spj = document.createElement("span")
    const ptx = document.createElement("p")
    let splited = element.split(",")
   
    sph.textContent = splited[0]
    sph.className="date-text"
    spi.textContent = splited[1]

    spi.className="text-text"
    splited[3]?spj.textContent = splited[2]+", "+splited[3]:spj.textContent = splited[2]
    spj.className="state-text"
     
    ptx.classList="p-flex"
    ptx.appendChild(sph)
    ptx.appendChild(spi)
    splited[0].includes("Date")?null:spi.appendChild(addRedoBtn(splited[1]))
    
    ptx.appendChild(spj)
    
    //console.log(ptx)
    lih.appendChild(ptx)
    hist.appendChild(lih);
    hist.style.display = "block" 
    
  });
})


function conteo(array){
  return array.reduce((a,b)=>(a[b]? a[b]+=1 : a[b] = 1, a),{});
}

/**
 * 
 * @param {} text 
 * @returns Agrega botón para copiar tarea al input
 */
function addRedoBtn(text){
  const btnRe = document.createElement("button")
  btnRe.className="btn-redo";
  btnRe.innerHTML="&#10064"
  btnRe.addEventListener("click",(e)=>{
  input.value="";
  input.value=text;
  
})

return btnRe;
}


//Oculta el historial al pasar el mouse por él
historial.addEventListener("mouseleave",(e)=>{
  //setTimeout(function(){
    hist.style.display = "none"
    btnMoreHide.style.display = "none"
    btnMore.style.display = "block"
  //},5000)
  
  }); 
  /**
   * @return Función para ocultar detalles
   */
  btnMoreHide.addEventListener("click",(e)=>{
    //setTimeout(function(){
      btnMore.style.display = "block"
      btnMoreHide.style.display = "none"
      hist.style.display = "none"
    //},5000)
    
    }); 


