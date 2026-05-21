let input = document.getElementById("taskInput");
let addBtn = document.getElementById("addBtn");
let taskList = document.getElementById("taskList");

let tasks = [];

// تحميل المهام من LocalStorage
let savedTasks = JSON.parse(localStorage.getItem("tasks"));

if(savedTasks){

    tasks = savedTasks;

    tasks.forEach(function(task){

        addTaskToPage(task);

    });

}

// إضافة مهمة جديدة
addBtn.onclick = function(){

    let taskText = input.value;

    if(taskText !== ""){

        tasks.push(taskText);

        localStorage.setItem(
            "tasks",
            JSON.stringify(tasks)
        );

        addTaskToPage(taskText);

        input.value = "";

    }

};

// إنشاء المهمة داخل الصفحة
function addTaskToPage(taskText){

    let li = document.createElement("li");

    li.textContent = taskText;

    // تعليم المهمة كمكتملة
    li.onclick = function(){

        li.classList.toggle("done");

    };

    // زر الحذف
    let deleteBtn = document.createElement("button");

    deleteBtn.textContent = "حذف";

    deleteBtn.onclick = function(event){

        event.stopPropagation();

        li.remove();

        tasks = tasks.filter(function(task){

            return task !== taskText;

        });

        localStorage.setItem(
            "tasks",
            JSON.stringify(tasks)
        );

    };

    li.appendChild(deleteBtn);

    taskList.appendChild(li);

}