const todoform = document.querySelector("form");
const todoinput = document.getElementById('todo-input');
const todolistul = document.getElementById('todo-list');

let alltodos = gettodos();
updatetodolist();
todoform.addEventListener("submit", function(e){
    e.preventDefault();
    addtodo();
})
function addtodo(){
    const todotext = todoinput.value.trim();
    //  alert("test")
    if (todotext.length > 0){
        const todoobject = {
            text: todotext,
            completed: false
        }
        alltodos.push(todoobject);
        updatetodolist();
        savetodos();
        todoinput.value = "";
    }
}
function updatetodolist(){
    todolistul.innerHTML = "";
    alltodos.forEach((todo, todoindex) => {
   todoitem = createtodoitem(todo, todoindex);
  todolistul.append(todoitem);
    })
}
function createtodoitem(todo, todoindex){
    const todoid = "todo-"+todoindex;
    const todoli = document.createElement("li");
    const todotext = todo.text;
   todoli.className = "todo";
   todoli.innerHTML = `
               <input type="checkbox" id="${todoid}">
                <label class="custom-checkbox" for="${todoid}">
                    <i id="check" class="fa-solid fa-check"></i>
                </label>
                <label for="${todoid}" class="todo-text">
                ${todotext}
                </label>
                <button class="delete-button">
                    <i id="trash" class="fa-solid fa-trash"></i>

                </button>
   `
   const deleteButton = todoli.querySelector(".delete-button");
   deleteButton.addEventListener("click", () => {
    deletetodoitem(todoindex)
   })
   const checkbox = todoli.querySelector("input");
   checkbox.addEventListener("change", () => {
    alltodos[todoindex].completed = checkbox.checked;
    savetodos();
   })
   checkbox.checked = todo.completed;
   return todoli;
}
function deletetodoitem(todoindex){
    alltodos = alltodos.filter((_, i) => i !== todoindex);
    savetodos();
    updatetodolist();
}
function savetodos(){
    const todojson = JSON.stringify(alltodos);
    localStorage.setItem("todos", todojson);
}
function gettodos(){
    const todos = localStorage.getItem("todos") || "[]";
    return JSON.parse(todos);
}

