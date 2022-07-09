import {consultarApi, eliminar, postear, checkTarea} from "./API.js"
(function(){
    const tareas = document.querySelector(".tareas")
    const newTodo = document.querySelector("#newTodo")
    const itemsLeft = document.querySelector("#itemsLeft")
    const all = document.querySelector("#all")
    const active = document.querySelector("#active")
    const completed = document.querySelector("#completed")
    document.addEventListener('DOMContentLoaded', obtenerRegistros)
    newTodo.addEventListener("change", postearTarea)

    //esto va a disparar cuando se haga click en algun elemeto que este dentro de
    //la etiqueta que contenga la clase tareas
    tareas.addEventListener("click", eliminarTarea)
    tareas.addEventListener("click", check)
    active.addEventListener("click", obtenerActivo)
    all.addEventListener("click", obtenerAll)
    completed.addEventListener("click", obtenerCompleted)
    

    
    
    async function obtenerRegistros(){
        const registros = await consultarApi()
        registros.map(item =>{
            const {descripcion, id, active} = item
            tareas.innerHTML += `<li class="tarea">
            <div id=${id} data-boleano="${active}"></div>
            <p class="des" id="${id}">${descripcion}</p>
            <img src="/images/icon-cross.svg" alt="" srcset="" class="cross" id=${id}>
            </li>`
        })
        checkInicio()
    }
    async function obtenerActivo(){
        tareas.innerHTML=``
        const registros = await consultarApi()
        registros.map(item =>{
            const {descripcion, id, active} = item
            if(item.active == true){
                tareas.innerHTML += `<li class="tarea">
            <div class="checkFalse" id=${id} data-boleano="${active}"></div>
            <p class="des" id="${id}">${descripcion}</p>
            <img src="/images/icon-cross.svg" alt="" srcset="" class="cross" id=${id}>
            </li>`
            console.log(item)
            }
            
        })
    }
    function obtenerAll(){
        tareas.innerHTML=``
        obtenerRegistros()
    }
    async function obtenerCompleted(){
        tareas.innerHTML=``
        const registros = await consultarApi()
        registros.map(item =>{
            const {descripcion, id, active} = item
            if(item.active == false){
                tareas.innerHTML += `<li class="tarea">
            <div class="checkTrue" id=${id} data-boleano="${active}"></div>
            <p class="des" id="${id}">${descripcion}</p>
            <img src="/images/icon-cross.svg" alt="" srcset="" class="cross" id=${id}>
            </li>`
            console.log(item)
            }
        })
        
    }
    function checkInicio(){
        const todaLista = document.querySelectorAll(".tareas li")
        let count = 0
        todaLista.forEach(item =>{
            if(item.firstElementChild.dataset.boleano == "false"){
                item.firstElementChild.className += "checkTrue"
            }else if(item.firstElementChild.dataset.boleano == "true"){
                item.firstElementChild.className += "checkFalse"
            }
            if(item.firstElementChild.dataset.boleano == "true"){
                count++
            }
        })
        itemsLeft.innerHTML = `${count} items left`
    }
    function postearTarea(e){
        e.preventDefault()
        const dato = {
            descripcion:newTodo.value,
            active:true,
            complete:false
        }
        postear(dato)
    }
    function eliminarTarea(e){
        if(e.target.classList.contains("cross")){
            const crossId = parseInt(e.target.id)
            eliminar(crossId)
        }
    }

    function check(e){
        if(e.target.dataset.boleano == "true"){
            const idCheck = e.target.id
            console.log(idCheck)
            const des = e.target.nextElementSibling
            const objTrue = {
                descripcion:des.innerHTML,
                active: false,
                complete: true,
                id:idCheck
            }
            checkTarea(objTrue)
            return
        }
        if(e.target.dataset.boleano == "false"){
            const idCheck = e.target.id
            console.log(idCheck)
            const des = e.target.nextElementSibling
            const objFalse = {
                descripcion:des.innerHTML,
                active: true,
                complete: false,
                id:idCheck
            }
            checkTarea(objFalse)
            return
        }
    }
    
})()