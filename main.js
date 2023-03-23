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
today.setHours(0, 0, 0, 0);

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
/*
    if(dateArray.indexOf(dp.textContent)==-1){
      dateArray.push(dateValue);
      console.log({dateArray})
      console.log(dateValue);
        li.appendChild(p);
        li.appendChild(dp);
        ul.appendChild(li);
    }else{
        li.appendChild(p);
        ul.appendChild(li);
    };
    */
    
  li.appendChild(dp);
  li.appendChild(p);
  div.appendChild(addDeleteBtn());
  div.appendChild(addDoneBtn());
  li.appendChild(div);
  ul.appendChild(li);

  show(dateValue,text, "pending")
    
  
/**
 * appendChilds(hist, dateValue, text, state)
 * console.log({textArray})
 */
  
  
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
    show(item.children[0].innerText,item.children[1].innerText,"deleted at "+today.getTime())
    const items = document.querySelectorAll("li");

    if(items.length === 0){
      empty.style.display ="block";
    }
  })
  return deleteBtn
};



/**Funcion mia
 * 
 
function addDeleteBtn () {
  
  const deleteBtn = document.createElement("button");

  deleteBtn.textContent = "X";
  deleteBtn.className = "btn-delete";

  deleteBtn.addEventListener("click", (e)=>{
    if(deleteBtn.parentNode.hasChildNodes()){
      console.log(deleteBtn.parentNode.firstChild.textContent)
      deleteBtn.parentNode.remove((deleteBtn.parentNode.firstChild))
    }
  })
  
return deleteBtn
}
*/
/**
 * 
 * @returns Funcion para agregar un boton de tarea hecha
 */

/** Tarea Hecha */
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
/*       textArray.push(item.children[0].innerText+" "+item.children[1].innerText+" pending")
 */    }
    });

    const items = document.querySelectorAll("li");
    if(items.length === 0){
      empty.style.display ="block";
    }
    return doneBtn
  };
 
/*   textArray.forEach((element)=>{
    const tx=element
    const lih =document.createElement("li");
    const ph = document.createElement("p")
    ph.textContent = tx;
    lih.appendChild(ph)
    hist.appendChild(lih);
  }); */

  //Función para agregar hijos a padres
function appendChilds(parent,dateValue,text,state) {
  //check function argument is an element
  if (parent.nodeType !== undefined) {
    textArray.push(textValue+" "+text+" "+state)
    const pDate = document.createElement("p");
    pDate.innerText = dateValue+" "+text+" "+state;
    
    //finally append child to parent
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
    console.log("pase por el historial")

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
    spj.textContent = splited[2]
    spj.className="state-text"
    ptx.classList="p-flex"
    ptx.appendChild(sph)
    ptx.appendChild(spi)
    ptx.appendChild(spj)
    console.log(ptx)
    lih.appendChild(ptx)
    hist.appendChild(lih);
    hist.style.display = "block"
    
  });
})

//Oculta el historial al pasar el mouse por el
/* historial.addEventListener("mouseleave",(e)=>{
  hist.style.display = "none"
  }); */


