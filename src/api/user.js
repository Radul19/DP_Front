import axios from "axios"
import url from './url'

const offline = false


/// Funcion general para el catch error que se usa en TODAS las peticiones 
const catchError = async (err) => {
    /// Error
    if (err.response) {
        console.log(err.response)
        // return { data: { msg: "No se ha contactado con el servidor" } }
        return err.response
        /// Error de mala conexion
    } else if (err.request) {
        // console.log(err.request)
        return { data: { msg: "No se ha contactado con el servidor, revise su conexion a internet y vuelva a intentarlo" } }
        /// Error inesperado
    } else {
        // console.log("Error", err.message)
        return { data: { msg: "Ha ocurrido un error inesperado, intente nuevamente" } }
    }
}


export const register = async (data) => {
    if (offline) return {
        status: 200,
    }
    let response
    await axios.post(`${url}register`, data).then(res => {
        // console.log(res.data)
        response = res
    }).catch(err => {
        response = catchError(err)
    })
    return response
}
export const login = async (data) => {
    if (offline) return {
        status: 200,
        data: {
            _id: "63beac15946ef914d796d677",
            name: 'Marta Violet',
            email: 'correo@gmail.com',
            card_ID: '29519805',
            password: '$2b$10$VfcIRHDjwvG/pf1EQgYK6u9qYgN0s0GShqOlgCtv2m99tH4Y4bkbi',
            user_type: 3,
            second_name: 'Perez Gomez',
            __v: 0
        }
    }
    let response
    await axios.post(`${url}login`, data).then(res => {
        // console.log(res.data)
        response = res
    }).catch(err => {
        response = catchError(err)
    })

    return response
}
export const getDeliverys = async (data) => {
    if (offline) return {
        status: 200,
        data: {
            _id: "63beac15946ef914d796d677",
            name: 'Marta Violet',
            email: 'correo@gmail.com',
            card_ID: '29519805',
            password: '$2b$10$VfcIRHDjwvG/pf1EQgYK6u9qYgN0s0GShqOlgCtv2m99tH4Y4bkbi',
            user_type: 3,
            second_name: 'Perez Gomez',
            __v: 0
        }
    }
    let response
    console.log(data)
    await axios.post(`${url}getDeliverys`, data).then(res => {
        // console.log(res.data)
        response = res
    }).catch(err => {
        response = catchError(err)
    })

    return response
}
export const changeDeliStatus = async (_id, num) => {
    let response
    await axios.post(`${url}changeDeliStatus`, { _id, num }).then(res => {
        // console.log(res.data)
        response = res
    }).catch(err => {
        response = catchError(err)
    })

    return response
}
export const getMessages = async (chat_id) => {
    let response
    await axios.post(`${url}getMessages`, { _id: chat_id }).then(res => {
        // console.log(res.data)
        response = res
    }).catch(err => {
        response = catchError(err)
    })

    return response
}
export const getMyChat = async (user_id) => {
    let response
    await axios.post(`${url}getMyChat`, { user_id }).then(res => {
        // console.log(res.data)
        response = res
    }).catch(err => {
        response = catchError(err)
    })

    return response
}

export const changePfp = async (base64, user_id, old_pfp) => {
    let response
    await axios.post(`${url}changePfp`, { base64, user_id, old_pfp }).then(res => {
        // console.log(res.data)
        response = res
    }).catch(err => {
        response = catchError(err)
    })

    return response
}

export const createComplaint = async (title, description, creator, target, images) => {
    let response
    await axios.post(`${url}createComplaint`, { title, description, creator, target, images }).then(res => {
        // console.log(res.data)
        response = res
    }).catch(err => {
        response = catchError(err)
    })

    return response
}


