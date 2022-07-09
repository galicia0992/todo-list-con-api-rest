const url = "http://localhost:3000/actividades"
export const consultarApi = async() =>{
    try {
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export const postear = async(dato) =>{
    try {
        await fetch(url, {
            method:"POST",
            body:JSON.stringify(dato),
            headers:{
                "Content-Type": "application/json"
            }
        })
    } catch (error) {
        console.log(error)
    }
}

export const eliminar = async(id) =>{
    try {
        await fetch(`${url}/${id}`,{
            method:"DELETE",
        })
    } catch (error) {
        console.log(error)
    }
}

export const checkTarea = async(activo) =>{
    try {
        await fetch(`${url}/${activo.id}`,{
            method:"PUT",
            body:JSON.stringify(activo),
            headers: {
                "Content-type": "application/json"
            }
        })
    } catch (error) {
        console.log(error)
    }
}