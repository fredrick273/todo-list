const input = document.getElementById("input");
const listContainer = document.getElementById("listcontainer");

let count = 0;

setup();

window.addEventListener('keydown',(event)=>{
    if (event.key == "Enter") submit();
})

function submit(){
    if (input.value != ""){
    count++;
    setCookie("Count",String(count));
    (getCookie("Content"))?setCookie("Content",(getCookie("Content")+"+"+input.value)):setCookie("Content",(input.value));
    const newElement = document.createElement("li");
    newElement.id=`list${count}`;
    const text = document.createElement("p");
    text.id=`value${count}`
    text.innerHTML = input.value;
    newElement.appendChild(text);
    const deleteButton = document.createElement("button");
    const completedButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.setAttribute("onclick",`deleteElement(${count})`)
    completedButton.innerHTML = "Completed Task"
    completedButton.setAttribute("onclick",`completed(${count})`)
    newElement.appendChild(deleteButton);
    newElement.appendChild(completedButton);
    listContainer.appendChild(newElement);
    input.value = "";
    

    console.log(document.cookie);
    }
}

function deleteElement(id){
    let content = getCookie("Content").split("+");
    let index = content.indexOf(document.getElementById(`value${id}`).innerHTML);
    content.splice(index,1);
    setCookie("Content",content.join("+"));

    const del = document.getElementById(`list${id}`);
    del.remove();

    console.log(document.cookie);

}

function completed(id){
    const text = document.getElementById(`value${id}`);
    text.style.textDecoration = "line-through";
    (getCookie("Completed"))?setCookie("Completed",(getCookie("Completed")+"+"+text.innerHTML)):setCookie("Completed",(text.innerHTML));

}

function setCookie(name,value){
    let date = new Date;
    date.setTime(date.getTime + 365*24*60*60);
    let expiry = "expires="+date.toUTCString();
    document.cookie = `${name}=${value};${expiry};`;
}

function deleteCookie(name){
    document.cookie = `${name}=${null};expires=Sun, 20 Aug 2000 12:00:00 UTC;`;
}

function getCookie(name){
    let cArray = document.cookie.split("; ");
    let cEach = [];
    cArray.forEach(element => cEach.push(element.split("=")));
    let result = null;
    cEach.forEach(element =>{
        if (element[0] == name){

            result = element[1];
        }
    })
    return result;
}

function setup(){
    if (getCookie("Content")){
    let info = getCookie("Content").split("+");
    count = Number(getCookie("Count"));
    let i = 0;
    info.forEach(element=>{
        i++;
        console.log(element);
        const newElement = document.createElement("li");
        newElement.id=`list${count}`;
        const text = document.createElement("p");
        text.id=`value${count}`
        text.innerHTML = element;
        newElement.appendChild(text);
        const deleteButton = document.createElement("button");
        const completedButton = document.createElement("button");
        deleteButton.innerHTML = "Delete";
        deleteButton.setAttribute("onclick",`deleteElement(${i})`)
        completedButton.innerHTML = "Completed Task"
        completedButton.setAttribute("onclick",`completed(${i})`)
        newElement.appendChild(deleteButton);
        newElement.appendChild(completedButton);
        listContainer.appendChild(newElement);
        if (getCookie("Completed"))
        if (getCookie("Completed").split("+").includes(element)) text.style.textDecoration = "line-through";

    })}}

    
