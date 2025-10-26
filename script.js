// document.getElementById("addTaskBtn").addEventListener("click", addTask);

// function addTask() {
//   const input = document.getElementById("taskInput");
//   const taskText = input.value.trim();

//   if (taskText === "") {
//     alert("Please enter a task!");
//     return;
//   }

//   const li = document.createElement("li");
//   li.textContent = taskText;

//   // Toggle complete on click
//   li.addEventListener("click", () => {
//     li.classList.toggle("completed");
//   });

//   // Delete button
//   const deleteBtn = document.createElement("button");
//   deleteBtn.textContent = "Delete";
//   deleteBtn.className = "delete-btn";
//   deleteBtn.onclick = () => li.remove();

//   li.appendChild(deleteBtn);
//   document.getElementById("taskList").appendChild(li);

//   input.value = "";
// }


const input = document.getElementById("taskInput");

document.getElementById("addTaskBtn").addEventListener("click", addTask);


function addTask(){
  const addtable = input.value .trim();
  if (addtable === ""){
    alert("Please enter a task!");
    return
    
  }

} 