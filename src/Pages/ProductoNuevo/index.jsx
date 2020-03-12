import React, { useState } from 'react'

//useDispatch = ejecuta las acciones que tenemos en el action
//useSelector = acceder a el state dentro del componente
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

//Actions de Redux
import { crearNuevoProductoAction } from '../../Actions/productoActions'
import { mostrarAlerta, ocultarAlertaAction } from '../../Actions/alertaActions'

export default function (){

    //state del componente
    const [ nombre, setNombre ] = useState('')
    const [ precio, setPrecio ] = useState(0)

    //utilizar dispatch y te crea una funcion (es una funcion que toma a otra)
    const dispatch = useDispatch()
    const history = useHistory()

    //acceder al state del store
    const cargando = useSelector(state => state.productos.loading)
    const error = useSelector(state => state.productos.error)
    const alertaMensaje = useSelector(state => state.alertas.alerta)

    //Llamar el action de productoAction
    const agregarProducto = producto => dispatch(crearNuevoProductoAction(producto))

    const handleSubmitNuevoProducto = e =>{
        e.preventDefault()

        //validar
        if(nombre.trim === '' || precio <= 0){
            
            const alerta = {
                msg: 'Ambos campos son requeridos!',
                classes: 'alert alert-warning p-2'
            }

            dispatch( mostrarAlerta(alerta) )
            
            return
        }

        //Si hay errores
        dispatch( ocultarAlertaAction(null) )

        //crear!!
        agregarProducto({
            nombre,
            precio
        })

        history.push('/')

    }

    return(
        <div className="card">
            <div className="card-header">
                <h5 className="mb-0">Nuevo Producto <span aria-label="icon" role="img">👍</span></h5>
            </div>
            <div className="card-body">
                <form
                    onSubmit={handleSubmitNuevoProducto}
                >
                    <div className="form-group">
                        <label htmlFor="producto">Producto:</label>
                        <input 
                            type="text" 
                            placeholder="..." 
                            className="form-control" 
                            id="producto"
                            name="nombre"
                            onChange={e => setNombre(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Precio:</label>
                        <input 
                            type="number" 
                            placeholder="$" 
                            className="form-control" 
                            id="exampleInputPassword1"
                            name="nombre"
                            onChange={e => setPrecio( Number(e.target.value) )}
                        />
                    </div>
                    {error ? <p className="alert alert-danger p-2">Ha ocurrido un error!</p> : null}
                    {alertaMensaje ? <p className={alertaMensaje.classes}>{alertaMensaje.msg}</p> : null}
                    <button type="submit" className="btn btn-dark btn-block">{cargando ? 'Cargando...' : 'AGREGAR'}</button>
                </form>
            </div>
        </div>
    )
}
