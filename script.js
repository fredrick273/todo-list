const taskinput = document.getElementById("taskname")
const descriptioninput = document.getElementById("description")
const duedatainput = document.getElementById("duedate")
const addtaskbutton = document.getElementById("addtaskbutton")
const listui = document.getElementById("listtable")
const editbuttons = document.querySelectorAll(".editbutton")
const deletebuttons = document.querySelectorAll(".deletebutton")


const obj = {
    itemno:0,
    task:"",
    description:"",
    date:"",

}

function newtaskitem(task,desc,duedate){
    var newtask = {...obj};
    newtask.task = task;
    newtask.description =desc;
    newtask.date = duedate;

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    var id = 0;

    if (tasks.length > 0){
        var taskid = tasks[tasks.length - 1].itemno
        id = taskid + 1
    }

    newtask.itemno = id;
    tasks.push(newtask);
    localStorage.setItem("tasks",JSON.stringify(tasks));
}

function rendertasks(){
    listui.innerHTML = "";
    let tasks = JSON.parse(localStorage.getItem("tasks"))
    if (tasks != null){
        console.log(tasks);
        for (var i =0;i<tasks.length;i++){
            var task = tasks[i];
            console.log(task);
            var itemhtml = `
            <tr class="todo-item">
                    <td>${task.task}</td>
                    <td>${task.description}</td>
                    <td>${task.date}</td>
                    <td>
                        <button onclick="edittask(${task.itemno})"  class="btn btn-edit">Edit</button>
                        <button onclick="deletetask(${task.itemno})" class="btn btn-delete">Done</button>
                    </td>
                </tr>
            `
            listui.innerHTML += itemhtml;
        }
    }
}

addtaskbutton.addEventListener("click", () =>{
    console.log("IS it working");
    const task = taskinput.value;
    const description = descriptioninput.value;
    const duedate = duedatainput.value;

    if (addtaskbutton.getAttribute("editno") == ""){
        newtaskitem(task,description,duedate);
    }else{
        var id = addtaskbutton.getAttribute("editno");
        updatetask(id,task,description,duedate);
        addtaskbutton.innerText = "Add Task";
   
    }
    addtaskbutton.setAttribute("editno","");
    taskinput.value="";
    descriptioninput.value = "";
    duedatainput.value = "";
    rendertasks();
})

function edittask(id){
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    if(tasks != null){
        for (var i =0;i<tasks.length;i++){
            var task = tasks[i];
            if (task.itemno == id){
                taskinput.value = task.task;
                descriptioninput.value = task.description;
                duedatainput.value =  task.date;
                addtaskbutton.setAttribute("editno",id);
                addtaskbutton.innerText = "Edit";
            }
    }}
}

function updatetask(id,task,description,duedate){
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    if(tasks != null){
        for (var i =0;i<tasks.length;i++){
            if (tasks[i].itemno == id){
                tasks[i].task = task;
                tasks[i].description = description;
                tasks[i].date = duedate;
            }
        }
        localStorage.setItem("tasks",JSON.stringify(tasks));
        rendertasks();
    }

}

function deletetask(id){
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    var index = null;
    if(tasks != null){
        for (var i =0;i<tasks.length;i++){
            if (tasks[i].itemno == id){
                index = i;
                break;
            }}
    tasks.splice(i,1);
    localStorage.setItem("tasks",JSON.stringify(tasks));
    rendertasks();
}}

function deleteall(){
    localStorage.setItem("tasks",null);
    rendertasks();
}

document.onload(rendertasks())
