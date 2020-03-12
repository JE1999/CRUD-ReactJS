import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { guardarEdicionProductos } from '../../Actions/productoActions'
import { mostrarAlerta, ocultarAlertaAction } from '../../Actions/alertaActions'

export default function ({history}){

    const [ producto, setProducto ] = useState({
        nombre: '',
        precio: ''
    })

    const dispatch = useDispatch()
    const productosEditar = useSelector( state => state.productos.productoeditar)
    const alertaMensaje = useSelector(state => state.alertas.alerta)

    useEffect(() =>{

        setProducto(productosEditar)
    
    }, [productosEditar])

    if(!productosEditar){
        history.push('/')
        return null
    }

    const { nombre, precio } = productosEditar

    const handleChange = e =>{
        setProducto({
            ...producto,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = e =>{
        e.preventDefault()

        if(producto.nombre.trim() === '' || producto.precio <=0){

            const alerta = {
                msg: 'Ambos campos son requeridos!',
                classes: 'alert alert-warning p-2'
            }

            dispatch( mostrarAlerta(alerta) )

            return
        }
        dispatch( ocultarAlertaAction(null) )
        dispatch( guardarEdicionProductos(producto) )

        history.push('/')
    }

    return(
        <div className="card">
            <div className="card-header">
                <h5 className="mb-0">Editar Producto <span aria-label="icon" role="img">✏️</span></h5>
            </div>
            <div className="card-body">
                <form
                    onSubmit={handleSubmit}
                >
                    <div className="form-group">
                        <label htmlFor="producto">Producto:</label>
                        <input 
                            type="text" 
                            placeholder="..." 
                            className="form-control" 
                            id="producto"
                            name="nombre"
                            defaultValue={nombre}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="precio">Precio:</label>
                        <input 
                            type="number" 
                            placeholder="$" 
                            className="form-control" 
                            id="precio"
                            name="precio"
                            defaultValue={precio}
                            onChange={handleChange}
                        />
                    </div>
                    {alertaMensaje ? <p className={alertaMensaje.classes}>{alertaMensaje.msg}</p> : null}
                    <button type="submit" className="btn btn-dark btn-block">GUARDAR CAMBIOS</button>
                </form>
            </div>
        </div>
    )
}