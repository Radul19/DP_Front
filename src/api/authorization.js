import axios from "axios"
export const url = "http://192.168.1.109:4000/"
// export const url = "https://dp-back.vercel.app/"

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

export const getUserRequests = async (data) => {
    // if (offline) return {
    //     status: 200,
    //     data: {
    //         _id: "63beac15946ef914d796d677",
    //         name: 'Marta Violet',
    //         email: 'correo@gmail.com',
    //         card_ID: '29519805',
    //         password: '$2b$10$VfcIRHDjwvG/pf1EQgYK6u9qYgN0s0GShqOlgCtv2m99tH4Y4bkbi',
    //         user_type: 3,
    //         second_name: 'Perez Gomez',
    //         __v: 0
    //     }
    // }
    let response
    await axios.get(`${url}getUserRequests`).then(res => {
        // console.log(res.data)
        response = res
    }).catch(err => {
        response = catchError(err)
    })

    return response
}
export const userRequestAction = async (user_id,num) => {
    let response
    await axios.post(`${url}userRequestAction`,{user_id,num}).then(res => {
        // console.log(res.data)
        response = res
    }).catch(err => {
        response = catchError(err)
    })

    return response
}

/**
 "_id": {
    "$oid": "63d625d1dc810caae44a4f75"
  },
  "name": "Marta Criolet",
  "email": "correo9@gmail.com",
  "card_id": "29519809",
  "card_pic": "https://res.cloudinary.com/deliveryplanet/image/upload/v1674978768/ddogl1iwz3eqormbppfu.jpg",
  "card_pic_id": "ddogl1iwz3eqormbppfu",
  "password": "$2b$10$Cd2NdNN.sfV.Fw.edqt3pumGfp0PjVNhgISXohl4kAVJ8h3HriQ8S",
  "user_type": 0,
  "second_name": "Perez Gomez",
  "profile_pic": "https://res.cloudinary.com/deliveryplanet/image/upload/v1674949797/user_twylfd.png",
  "profile_pic_id": "_",
  "createdAt": {
    "$date": {
      "$numberLong": "1674978769882"
    }
  },
  "updatedAt": {
    "$date": {
      "$numberLong": "1674979092940"
    }
  },
  "__v": 0
 */