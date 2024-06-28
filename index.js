document.addEventListener("DOMContentLoaded", () => {

    function parseObject(obj,cont) {
        for(let key in obj) {
            if(key === "name") {
                continue;
            }
            if(typeof obj[key] === 'object' && obj[key]!== null) {
                let title = document.createElement('p');
                title.textContent = `${key}: `;
                
                let contecst = document.createElement("ul");
                
                let subItem = document.createElement("li");
                subItem.appendChild(title)
                subItem.appendChild(contecst)
                cont.appendChild(subItem);
                parseObject(obj[key], contecst);
            } else {
                if(cont.nodeName === "UL") {
                    let item = document.createElement("li");
                    item.textContent = `${key}: ${obj[key]}`;
                    cont.appendChild(item);
                } else {
                    let element = document.createElement("li");
                    element.textContent = `${key}: ${obj[key]}`;
                cont.appendChild(element);
                }
                
            }
        }

    }


    function getUsers() {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => 
            response.json()
        )
        .then((data) => {
           for(key in data) {
            let userItem = document.createElement("li");
            userItem.classList.add('user_item');
            let nameContainer = document.createElement("div");
            let nameParagraphe = document.createElement("h1");

            nameParagraphe.textContent = data[key].name;
            nameContainer.appendChild(nameParagraphe);
            userItem.appendChild(nameContainer);

            let subContainer = document.createElement("ul");
            subContainer.classList.add('sub-container');
            subContainer.classList.add('hidden');
            userItem.appendChild(subContainer);


            parseObject(data[key], subContainer)
            document.querySelector(".user_list").appendChild(userItem);
           }
        })

    }


    getUsers()
   

    document.querySelector(".user_list").addEventListener("click", (e) => {
        if(e.target.classList.contains('sub-container')) {
            e.target.classList.toggle("hidden");
            
        } else {
            e.target.closest(".user_item").querySelector(".sub-container").classList.toggle("hidden");
        }

        
     }
    )
})