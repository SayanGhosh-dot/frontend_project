let inputbox=document.getElementById('inputbox');
let addbtn=document.getElementById('addbtn');
let todolist=document.getElementById('todolist');
let edittodos=null;
 let addtodo=()=>
 {
   let inputtext=inputbox.value.trim();
   if(inputtext.length<=0)
   {
    alert("you must write something in your to do");
   }
   else if(addbtn.value=="Edit")
   {
     editlocaltodos(edittodos.target.previousElementSibling.innerHTML);
      edittodos.target.previousElementSibling.innerHTML=inputtext;
      addbtn.value="Add";
      inputbox.value="";
   }
   else{
    let li=document.createElement('li');
    let p=document.createElement('p');
    p.innerHTML=inputtext;
    li.appendChild(p);

    let editbtn=document.createElement('button');
    editbtn.innerText="Edit";
    editbtn.classList.add('btn','editbtn');
    li.appendChild(editbtn);
    
    let deletebtn=document.createElement('button');
    deletebtn.innerText="Remove";
    deletebtn.classList.add('btn','deletebtn');
    li.appendChild(deletebtn);

    todolist.appendChild(li);
    inputbox.value="";
    savelocaltodos(inputtext);
   }
 }
 let updatetodo=(e)=>{
     if(e.target.innerHTML=="Remove")
     {
      todolist.removeChild(e.target.parentElement);
      deletelocaltodos(e.target.parentElement);
     }
     else if(e.target.innerHTML=="Edit")
     {
      inputbox.value=e.target.previousElementSibling.innerHTML;
      inputbox.focus();
      addbtn.value="Edit";
      edittodos=e;
     }
 }
 let savelocaltodos=(todo)=>
 {
  let todos;
  if(localStorage.getItem("todos")==null)
  {
    todos=[];
  }
  else{
    todos=JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos",JSON.stringify(todos));
  console.log(todos);

 }
 let gettodos=()=>{
  let todos=[];
  if(localStorage.getItem("todos")==null)
  {
    todos=[];
  }
  else{
    todos=JSON.parse(localStorage.getItem("todos"));
    todos.forEach(todo=>{
      let li=document.createElement('li');
    let p=document.createElement('p');
    p.innerHTML=todo;
    li.appendChild(p);

    let editbtn=document.createElement('button');
    editbtn.innerText="Edit";
    editbtn.classList.add('btn','editbtn');
    li.appendChild(editbtn);
    
    let deletebtn=document.createElement('button');
    deletebtn.innerText="Remove";
    deletebtn.classList.add('btn','deletebtn');
    li.appendChild(deletebtn);

    todolist.appendChild(li);

    })

  }
 }
 let deletelocaltodos=(todo)=>{
    
  let todos;
  
    todos=JSON.parse(localStorage.getItem("todos"));
 
  let todotext=todo.children[0].innerHTML;
  let todoindex=todos.indexOf(todotext);
  todos.splice(todoindex,1);
 localStorage.setItem("todos",JSON.stringify(todos));
 }
 let editlocaltodos=(todo)=>{
    let todos=JSON.parse(localStorage.getItem("todos"));
    let todoindex=todos.indexOf(todo);
    todos[todoindex]=inputbox.value;
     localStorage.setItem("todos",JSON.stringify(todos));

 }
document.addEventListener('DOMContentLoaded',gettodos);
addbtn.addEventListener('click',addtodo);
todolist.addEventListener('click',updatetodo);