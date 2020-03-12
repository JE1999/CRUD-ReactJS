import React, { useEffect } from 'react';

//Table components
import Table from './Components/Table'

//Not found components
import NoData from './Components/noData'

//Redux
import { useDispatch, useSelector } from 'react-redux'
import { obtenerProductoAction } from '../../Actions/productoActions'


export default function () {

  const dispatch = useDispatch()

  useEffect(() =>{

    const cargarProductos = () => dispatch( obtenerProductoAction() )

    cargarProductos()

  }, [dispatch])

  const productos = useSelector( state => state.productos.productos)
  const error = useSelector( state => state.productos.error)
  const cargando = useSelector( state => state.productos.loading)

  return (
    <>
      {error ? <p className="alert alert-danger p-2">Ha ocurrido un error!</p> : null}
      {productos.length === 0 ? <>{ cargando ? <h3 className='text-muted text-center'>Cargando...</h3> : <NoData/> }</> : <Table productos={productos} />}
    </>
  )
}
