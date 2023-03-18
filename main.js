const input = document.querySelector("#input-text");
const date = document.querySelector("#input-date");
const addBtn = document.querySelector(".btn-add");
const ul = document.querySelector("ul");
const empty = document.querySelector(".empty");
const uld = document.querySelector("#done")

addBtn.addEventListener("click", (e)=>{

e.preventDefault();

const text = input.value;
const dateValue = date.value;
let dateArray =[]

if (text !== ""){

  const li = document.createElement("li");
  li.setAttribute("id","li-id")
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
    ul.appendChild(li);
    li.appendChild(div)
    div.appendChild(addDeleteBtn())
    div.appendChild(addDoneBtn())

  console.log({dateArray})
  input.value = "";
  dateValue.value ="";
  empty.style.display = "none";
}

}); 

/**Funcion de la profesora
 * 
 */
function addDeleteBtn () {
  
  const deleteBtn = document.createElement("button");

  deleteBtn.textContent = "X";
  deleteBtn.className = "btn-delete";
  
  deleteBtn.addEventListener("click", (e)=>{
    const item = e.target.parentElement.parentElement;
    const parent =item.parentElement
    console.log({parent})
    item.parentElement.removeChild(item);
    
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

function addDoneBtn(){
  const doneBtn = document.createElement("button");

  doneBtn.textContent = "V";
  doneBtn.className = "btn-done";
  
  doneBtn.addEventListener("click", (e)=>{
    const item = e.target.parentElement.parentElement;
    
    if(e.target.parentElement.parentElement.className!=="done"){
      ul.removeChild(item);
      uld.appendChild(item);
    }
    
    
    
    });
    const items = document.querySelectorAll("li");

    if(items.length === 0){
      empty.style.display ="block";
    }
    return doneBtn
  };

