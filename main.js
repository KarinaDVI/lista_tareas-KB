const input = document.querySelector("#input-text");
const date = document.querySelector("#input-date");
const addBtn = document.querySelector(".btn-add");
const btnHist = document.querySelector(".show-hist");
const ul = document.querySelector("ul");
const empty = document.querySelector(".empty");
const uld = document.querySelector(".done")
const hist = document.querySelector("#hist")
const historial = document.querySelector(".container-hist")
let today = new Date();

let textArray =["Date,Task,State"]
let state;

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

  /** Botón de tarea hecha */
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
        console.log(item.children[0].innerText+" "+item.children[1].innerText+" done");
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
  console.log(textArray)
  return textArray;

}


/**Muestra el historial al pasar el mouse por el div */
/* */
historial.addEventListener("mouseenter",(e)=>{
    //console.log("pase por el div del historial")

    hist.innerHTML = ""
    console.log(textArray)
    textArray.forEach((element)=>{
    console.log(element)
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
    
    console.log(ptx)
    lih.appendChild(ptx)
    hist.appendChild(lih);
    hist.style.display = "block"
    
  });
})
function addRedoBtn(text){
  
  const btnRe = document.createElement("button")
  btnRe.className="btn-redo";
  btnRe.textContent="copy"
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
  //},5000)
  
  }); 


