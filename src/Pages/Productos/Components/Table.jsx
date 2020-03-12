import React from 'react';
import { Link, useHistory} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { eliminarProductoAction, editarProductos } from '../../../Actions/productoActions'
import Swal from 'sweetalert2'

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#343a40',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});


/*************************************/
export default function ({productos}) {
  const classes = useStyles();

  const dispatch = useDispatch()
  const history = useHistory()

  const confirmarEliminar = id => {

    Swal.fire({
        title: 'Desea eliminarlo?',
        text: "Seguro que deseas eliminar?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3f51b5',
        cancelButtonColor: '#404040',
        confirmButtonText: '👍',
        cancelButtonText: '❌'
      }).then((result) => {
            if (result.value) {

                dispatch( eliminarProductoAction(id) )
    
            }
        })
    }

    //Redirigir
    const redireccionarEdicion = producto => {
      dispatch(editarProductos(producto))
      history.push(`/producto/editar/${producto.id}`)
    }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Nombre</StyledTableCell>
            <StyledTableCell>Precio</StyledTableCell>
            <StyledTableCell align="center" colSpan="2"><DragIndicatorIcon/></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productos.map((productos, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {productos.nombre}
              </StyledTableCell>
              <StyledTableCell>${productos.precio}</StyledTableCell>
              <StyledTableCell align="center">
                <Link to="#" onClick={ () => redireccionarEdicion(productos) }>
                    <IconButton aria-label="edit" color="primary">
                    <EditIcon />
                    </IconButton>
                </Link>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Link to="#" onClick={() => confirmarEliminar(productos.id)}>
                    <IconButton aria-label="delete" color="secondary">
                    <DeleteIcon />
                    </IconButton>
                </Link>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
