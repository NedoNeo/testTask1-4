document.addEventListener("DOMContentLoaded", () => {
    const taskAdder = document.querySelector(".task-adder");
    const taskContainer = document.querySelector(".task_container")
   
    class TaskManeger {
        constructor(taskForm) {
            this.taskForm = taskForm,
            this.taskDescription = this.taskForm.querySelector(".task-desrciprion"),
            this.taskButton = this.taskForm.querySelector(".add_button"),
            this.clearButton = this.taskForm.querySelector(".reset_button"),
            this.submitButton = this.taskForm.querySelector(".submit_button")
            
        }

        clear() {
            while (this.taskDescription.firstElementChild) {
                this.taskDescription.removeChild(this.taskDescription.firstElementChild);
            }
        }

        add() {
                let taskDescriptionContent = document.createElement("div");
                taskDescriptionContent.classList.add("sub-task");
                let input = document.createElement("textarea");
                input.classList.add("task-description_area");
                input.name = "taskDescription";
                let title = document.createElement("h2");
                let deleteBtun = document.createElement("button");
                deleteBtun.type =  "button";
                deleteBtun.textContent = "Удалить";
                deleteBtun.classList.add("clear_button");
                title.textContent = `Подзадача`;
    
                taskDescriptionContent.appendChild(title);
                taskDescriptionContent.appendChild(input);
                taskDescriptionContent.appendChild(deleteBtun);
    
            
                this.taskDescription.appendChild(taskDescriptionContent);
        }

        submitForm() {
            const formData =  new FormData(this.taskForm);
            let obj = {};
            formData.forEach((value, key) => {
                if(obj[key]) {
                    obj[key].push(value);
                } else {
                    obj[key] = [value]
                }
            })

            return obj;
        }
    }

    class Task {
        constructor(data, container) {
            this.div = document.createElement('div');
            this.div.classList.add('task');
            this.container = container,
            this.data = data
        }

        create() {
            let grandContainer = document.createElement('div');
            let firstContainer = document.createElement('div');
            let title = document.createElement('h3');
            let description = document.createElement('p');
            grandContainer.classList.add('task-grand-container');
            
            firstContainer.classList.add('task-first-container');
           
            title.textContent = this.data.task_name[0];
            
            description.textContent = this.data.description[0];

            firstContainer.appendChild(title);
            firstContainer.appendChild(description);

            let secondContainer = document.createElement('div');
            let endButton = document.createElement('button');
            let deleteButton = document.createElement('button');

            secondContainer.classList.add('task-second-container');
            
            
            deleteButton.classList.add('delete_button');
            deleteButton.textContent = "Удалить";

            endButton.classList.add('complite_button');
            endButton.textContent = "Завершить";

            secondContainer.appendChild(endButton);
            secondContainer.appendChild(deleteButton);

            let subTask = document.createElement('div');
            grandContainer.appendChild(firstContainer);
            grandContainer.appendChild(secondContainer);


            if(this.data.taskDescription) {
            this.data.taskDescription.forEach((value) => {
                if(value !== "") {
                let subContainer = document.createElement('div');
                let content = document.createElement('p');
                let check = document.createElement('input');

                subContainer.classList.add("sub_container")
                
                check.classList.add("sub_checkbox")
                check.type = "checkbox";
                content.textContent = value;

                subContainer.appendChild(content);
                subContainer.appendChild(check);
                subTask.appendChild(subContainer);
                }
            })
        }

            this.div.appendChild(grandContainer)

            if(subTask.children.length > 0) {
                this.div.appendChild(subTask);
            }
           

        }

        put() {
            this.container.appendChild(this.div);
        }
    }


    let form = new TaskManeger(taskAdder);
    

    form.taskButton.addEventListener("click", () => {
        form.add();
    })

    form.taskForm.addEventListener("input", (ev) => {
        if(ev.target.nodeName === "TEXTAREA") {
            ev.target.style.height = "auto";
            ev.target.style.height = ev.target.scrollHeight + "px";
        }

    } )

    form.taskDescription.addEventListener("click", (ev) => {
        if (ev.target.classList.contains("clear_button")) {
            ev.target.parentElement.remove();
        }
    })

    form.clearButton.addEventListener("click", () => {
        form.clear();
    })

    form.submitButton.addEventListener("click", (ev) => {
        ev.preventDefault();
        let formResult = form.submitForm();
        if((formResult.task_name[0] === "")) {
            let allert_name = form.taskForm.querySelector(".allert_name");
            allert_name.classList.remove("hidden");
            form.taskForm.querySelector(".input_name").addEventListener("focus", () => {
                allert_name.classList.add("hidden");
            },{once: true});

        } else if ((formResult.description[0] === "")) {
            let allert_description = form.taskForm.querySelector(".allert_description");
            allert_description.classList.toggle("hidden");
            form.taskForm.querySelector(".input_description").addEventListener("focus", () => {
                allert_description.classList.toggle("hidden");
            },{once: true})
        }
        else {
            form.clear();
        form.taskForm.reset();
        
        let task = new Task(formResult,taskContainer);
        task.create();
        task.put();
        }
    })

    taskContainer.addEventListener("click", (ev) => {
        let parent = ev.target.closest(".task");
        let childInputs = parent.querySelectorAll(".sub_checkbox");

        if (ev.target.classList.contains("complite_button")) {
            document.querySelector(".complite_task").appendChild(parent);
            childInputs.forEach((child) => {
                child.remove();
            })
            parent.style.textAlign = "left";  
            ev.target.nextElementSibling.remove()
            ev.target.remove()
        } else if (ev.target.classList.contains("delete_button")) {
            ev.target.parentElement.remove();
        }
        else if (ev.target.nodeName === "INPUT") {
            let marker = true;

             for(children of childInputs) {
                if(children.checked && marker !== false) {
                    marker = true;
                } else {
                    marker = false;
                }
            }

            if(marker) {
                document.querySelector(".complite_task").appendChild(parent);
                parent.querySelector(".complite_button").remove()
                parent.querySelector(".delete_button").remove();
                childInputs.forEach((child) => {
                    child.remove();
                })

                parent.style.textAlign = "left";
           }  
        }  

            
        
    })

})

