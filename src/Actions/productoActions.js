//ProductoReducer y productoActions usualmente tendran los mismo types

import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    ELIMINAR_PRODUCTOS,
    ELIMINAR_PRODUCTOS_EXITO,
    ELIMINAR_PRODUCTOS_ERROR,
    EDITAR_PRODUCTOS,
    GUARDAR_EDITAR_PRODUCTOS,
    EDITAR_PRODUCTOS_EXITO,
    EDITAR_PRODUCTOS_ERROR
} from '../Types'

import clienteAxios from '../config/axios'

//Alerts
import alertSuccess from '../Components/Sweetalert/alertSuccess'
import alertDanger from '../Components/Sweetalert/alertDanger'


//CREAR PRODUCTOS
export function crearNuevoProductoAction(producto){


    return async (dispatch) => {
        dispatch( agregarProducto() )

        try {
            //insertar en la API
            await clienteAxios.post('/productos', producto)
            //si sale bien actualiza el state
            dispatch(agregarProductoExito(producto))

            alertSuccess()

        } catch (error) {
            console.log(error)
            //si hay error cambiar el state
            dispatch(agregarProductoError(true))

            alertDanger()
        }
    }
}
 

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload: true
})

//si el producto se guarda en la BD
const agregarProductoExito = producto =>({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
})

//si hubo error
const agregarProductoError = estado =>({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
})


//CARGAR PRODUCTOS
export function obtenerProductoAction(){

    return async (dispatch) =>{
        dispatch( descargarProdutos() )

        try {
            const respuesta = await clienteAxios.get('/productos')
            dispatch( descargaExitosa(respuesta.data) )
            
        } catch (error) {
            console.log(error)
            dispatch( descargaError() )
            alertDanger()
        }
    }
}

const descargarProdutos = () => ({
    type: DESCARGA_PRODUCTOS,
    payload: true
})

const descargaExitosa = productos =>({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
})

const descargaError = () =>({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true
})

//ELIMINAR PRODUCTOS
export function eliminarProductoAction(id){

    return async (dispatch) =>{
        dispatch( eliminarProducto(id) )

        try {
            await clienteAxios.delete(`/productos/${id}`)
            dispatch( eliminarProductoExito() )
            alertSuccess()

        } catch (error) {
            console.log(error)
            dispatch( eliminarProductoError() )
            alertDanger()
        }
    }
}

const eliminarProducto = id =>({
    type: ELIMINAR_PRODUCTOS,
    payload: id

})

const eliminarProductoExito = () =>({
    type: ELIMINAR_PRODUCTOS_EXITO
}) 

const eliminarProductoError = () =>({
    type: ELIMINAR_PRODUCTOS_ERROR,
    payload: true
})

//EDITAR PRODUCTOS
export function editarProductos(producto){

    return (dispatch) =>{
        dispatch( obtenerProducto(producto) )
    }
}

const obtenerProducto = producto =>({
    type: EDITAR_PRODUCTOS,
    payload: producto
})

//ENVIAR EL PRODUCTO EDITADO
export function guardarEdicionProductos(producto){

    return async (dispatch) => {
        dispatch( editarGuardarProducto(producto) )

        try {
            await clienteAxios.put(`/productos/${producto.id}`, producto)
            dispatch( editarProductoExito(producto) )
            alertSuccess()

        } catch (error) {
            console.log(error)
            dispatch( editarProductoError() )
            alertDanger()
        }
    }
}

const editarGuardarProducto = () =>({
    type: GUARDAR_EDITAR_PRODUCTOS
})

const editarProductoExito = producto =>({
    type: EDITAR_PRODUCTOS_EXITO,
    payload: producto
})

const editarProductoError = () =>({
    type: EDITAR_PRODUCTOS_ERROR,
    payload: true
})