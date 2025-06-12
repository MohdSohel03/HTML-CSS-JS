        document.addEventListener("DOMContentLoaded", loadTasks);

        document.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            addTask();
            }
        });

        function addTask() {
            let taskInput = document.getElementById("taskInput");
            let taskValue = taskInput.value.trim();
            if (taskValue === "") return;

            let taskList = document.getElementById("taskList");
            let li = document.createElement("li");
            li.innerHTML = `${taskValue} <button class='delete' onclick='removeTask(this)'>X</button>`;
            taskList.appendChild(li);
            
            saveTasks();
            taskInput.value = "";
        }

        function removeTask(button) {
            button.parentElement.remove();
            saveTasks();
        }

        function saveTasks() {
            let tasks = [];
            document.querySelectorAll("#taskList li").forEach(li => {
                tasks.push(li.textContent.replace("X", "").trim());
            });
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }

        function loadTasks() {
            let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            let taskList = document.getElementById("taskList");
            tasks.forEach(task => {
                let li = document.createElement("li");
                li.innerHTML = `${task} <button class='delete' onclick='removeTask(this)'>X</button>`;
                taskList.appendChild(li);
            });
        }