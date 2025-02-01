let input = document.querySelector("#take-input");
    let element = document.querySelector("#main-add-todo");
    let getLocalStorage = ()=>{
      return JSON.parse(localStorage.getItem("element"));
    }

    let addNewDataInArray = (todoArray)=>{
        return localStorage.setItem("element",JSON.stringify(todoArray));
    }
    let todoArray = getLocalStorage()||[];

  let addTodoDynamicElement = (curElem)=>{
    let divElement = document.createElement("div");
      divElement.classList.add("main-todo-div");
      divElement.innerHTML = `<li>${curElem}</li> <button class="delete-btn">Delete</button>`;
      element.append(divElement); 
  }

    let add_element = (e)=>{
        e.preventDefault();
      let inputValue = input.value.trim();
      input.value="";
      if(inputValue===""){
            alert("Fill the Input");
            return;
        }
     else if (!todoArray.includes(inputValue)) {
        
          todoArray.push(inputValue);
          todoArray = [...new Set(todoArray)];
          localStorage.setItem("element", JSON.stringify(todoArray));
         addTodoDynamicElement(inputValue);  
        }
     
        else {
            alert("You Fill The Same Data");
            
        }
        };

    let showTodoList = ()=>{
        todoArray.forEach((curElem) => {
        addTodoDynamicElement(curElem); 
        });
        
    }
    showTodoList();

    let removeTodoElement = (e)=>{
        let removeElement =e.target;
        let findElement = removeElement.previousElementSibling.innerText;
        let parentEle = removeElement.parentElement;
       
        todoArray = todoArray.filter((curTodo)=>{
           return curTodo!==findElement.toLowerCase();
        });
        addNewDataInArray(todoArray);
    
        parentEle.remove();
        
    };
    element.addEventListener("click",(e)=>{
    e.preventDefault();
    if(e.target.classList.contains("delete-btn")){
        removeTodoElement(e);
    }
    
    });

    document.querySelector("#add-btn").addEventListener("click",(e)=>{
        add_element(e);
    });
