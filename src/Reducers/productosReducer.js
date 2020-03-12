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
    EDITAR_PRODUCTOS_EXITO,
    EDITAR_PRODUCTOS_ERROR
} from '../Types'

//Cada reducer tiene su propio state
const initialState = {
    productos: [],
    error: false,
    loading: false,
    productoEliminar: null,
    productoeditar: null
}

export default function(state = initialState, action){
    switch(action.type){

        case AGREGAR_PRODUCTO:
        case DESCARGA_PRODUCTOS:
            return{
                ...state,
                loading: action.payload
            }

        case AGREGAR_PRODUCTO_EXITO:
            return{
                ...state,
                loading: false,
                productos: [...state.productos, action.payload]
            }

        case AGREGAR_PRODUCTO_ERROR:
        case DESCARGA_PRODUCTOS_ERROR:
        case ELIMINAR_PRODUCTOS_ERROR:
        case EDITAR_PRODUCTOS_ERROR:
            return{
                ...state,
                loading: false,
                error: action.payload
            }

        case DESCARGA_PRODUCTOS_EXITO:
            return{
                ...state,
                loading: false,
                error: null,
                productos: action.payload
            }
        
        case ELIMINAR_PRODUCTOS:
            return{
                ...state,
                productoEliminar: action.payload
            }

        case ELIMINAR_PRODUCTOS_EXITO:
            return{
                ...state,
                productos: state.productos.filter( productoFilter => productoFilter.id !== state.productoEliminar ),
                productoEliminar: null
            }
        
        case EDITAR_PRODUCTOS:
            return{
                ...state,
                productoeditar: action.payload
            }

        case EDITAR_PRODUCTOS_EXITO:
            return{
                ...state,
                productoeditar: null,
                productos: state.productos.map(producto =>
                    producto.id === action.payload.id 
                    ? producto = action.payload
                    : producto
                )
            }
        
        default:
            return state
    }
}
