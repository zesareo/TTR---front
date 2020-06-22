import React from 'react';
import { Fragment } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useState } from 'react';
import Button from '@material-ui/core/Button';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Error from '../shared/Error';

import ETSService from '../../services/ETS2Service';
import Spinner from '../shared/Spinner';

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: 30,
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const CreateUserForm = ({
  setOpenCreateModal,
  type,
  item,
  setSnack,
  setRefresh
}) => {

  const es = new ETSService()

  const initData = type === 'CREATE' ? {
    id: null,
    
    turno: '',
    precio: '',
    materia: '',
    fecha: '',
    estatus: ''
  } : item;

  const [userData, setUserData] = useState(initData);

  let { id, turno, precio, materia, fecha, estatus } = userData;

  const handleOnChange = e => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
  }

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


  const handleSubmit = e => {
    e.preventDefault();

    
    if (turno === '') {
      setError(true);
      setErrorMessage('El turno es obligatorio')
      return;
    }

    if (precio === '') {
      setError(true);
      setErrorMessage('El precio es obligatorio')
      return;
    }

    if (materia === '') {
      setError(true);
      setErrorMessage('La materia es obligatoria')
      return;
    }

    if (fecha === '') {
      setError(true);
      setErrorMessage('La fecha es obligatoria')
      return;
    }

    if (estatus === '') {
      setError(true);
      setErrorMessage('El estatus es obligatorio')
      return;
    }

    const userToCreate = type === 'CREATE' ? {
      id,
    
      turno,
      precio,
      materia,
      fecha,
      estatus,
    } : {
        id,
        
        turno,
        precio,
        materia,
        fecha,
        estatus,
      }

    setLoading(true)


    if (type === 'CREATE') {
      console.log('Creando ETS: ', userToCreate);
      es.createETS(userToCreate)
        .then(resp => {
          setLoading(false)
          console.log(resp);
          setOpenCreateModal(false)
          if (resp.status === 201) {
            setRefresh(true);
            setSnack({
              message: 'ETS Creado Correctamente',
              severity: 'success',
              open: true
            })
          }
          else {
            setSnack({
              message: 'Error al crear el ETS',
              severity: 'error',
              open: true
            })
          }
        })
    } else {
      console.log('Actualizando ETS: ', userToCreate);
      es.updateETS(userToCreate)
        .then(resp => {
          setLoading(false)
          console.log(resp);
          setOpenCreateModal(false)
          if (resp.status === 200) {
            setRefresh(true);
            setSnack({
              message: 'ETS Actualizado Correctamente',
              severity: 'success',
              open: true
            })
          }
          else {
            setSnack({
              message: 'Error al actualizar el ETS',
              severity: 'error',
              open: true
            })
          }
        })
    }


  }


  const classes = useStyles();

  return (
    <Fragment>
      {loading
        ?
        <div style={{ width: 550, height: 270, textAlign: "center" }}>
          <Spinner></Spinner>
          <p style={{ padding: 10, margin: 10 }}> {type === 'CREATE' ? 'Creando' : 'Actualizando'}  ETS...</p>
        </div>


        :

        <div>
          {error ? <Error message={errorMessage}></Error> : null}
          <form className={classes.root} noValidate autoComplete="off">
            <TextField id="turno" name="turno" onChange={handleOnChange} value={turno} label="Turno" variant="outlined" />
            <TextField id="precio" name="precio" onChange={handleOnChange} value={precio} type="number" label="Precio" variant="outlined" />
            <TextField id="materia" name="materia" onChange={handleOnChange} value={materia} label="Materia" variant="outlined" />
            <TextField id="fecha" name="fecha" onChange={handleOnChange} type="date" value={fecha} label="Teléfono" variant="outlined" />
            <TextField id="estatus" name="estatus" onChange={handleOnChange} value={estatus} label="Estatus" variant="outlined" />
          </form>
        </div>

      }

      {
        loading ? null :
          <DialogActions>
            <Button autoFocus onClick={handleSubmit} color="primary">
              {type === 'CREATE' ? 'Crear' : 'Actualizar'}
            </Button>
          </DialogActions>
      }

    </Fragment>
  );
}

export default CreateUserForm;