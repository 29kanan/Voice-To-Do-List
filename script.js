const taskList = [];
const listElement = document.getElementById("taskList");
const statusText = document.getElementById("status");

const SpeechRecognition = window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continuous=false;
recognition.lang='en-US';

recognition.onresult=(event)=>{
    const transcript = event.results[0][0].transcript.toLowerCase();
    statusText.innerText = `Heard: "${transcript}"`;
    if(transcript.startsWith("new task")){
        const task = transcript.replace("new task", "").trim();
        if(task){
            addTask(task);
        }
    }
    else if(transcript.startsWith("delete task")){
        const taskNum = parseInt(transcript.split(" ")[2])-1;
        if(!isNaN(taskNum)){
            deleteTask(taskNum);
        }
    }
    else if(transcript.startsWith("mark task")){
        const taskNum = parseInt(transcript.split(" ")[2])-1;
        if(!isNaN(taskNum)){
            markTask(taskNum);
        }
    }
}

function addTask(task){
    taskList.push({text:task, done:false});
    renderTasks();
}

function deleteTask(taskNum){
    if(taskList[taskNum]){
        taskList.splice(taskNum,1);
        renderTasks();    
    }
}

function markTask(taskNum){
    if(taskList[taskNum]){
        taskList[taskNum].done=true;
        renderTasks();
    }
}

function renderTasks(){
    listElement.innerHTML="";
    taskList.forEach((task,idx)=>{
        const li=document.createElement("li");
        li.innerText= `${idx+1}  ${task.text}  ${task.done ? "☑️" : ""}`;
        listElement.appendChild(li);
    });
}

function startVoice(){
    statusText.innerText = "Listening...";
    recognition.start();
}

document.getElementById("startBtn").addEventListener("click",startVoice);