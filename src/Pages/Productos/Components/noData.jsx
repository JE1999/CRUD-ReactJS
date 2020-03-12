import React from 'react'
import { Link } from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add';

//Images
import ImgNoData from '../../../Images/noData.png'

export default function (){

    return(
        <div align="center">
            <img src={ImgNoData} className="img-fluid" width="500" alt="Imagen datos no encontrados" />
            <h3 className='text-muted'>No se encotraron datos</h3>
            <Link
                to="/producto/nuevo"
                className="btn btn text-white blue-menu mt-3"
            >
            <AddIcon /> AGREGAR
          </Link>
        </div>
    )
}