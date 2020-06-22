import React from 'react';
import { Fragment } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useState } from 'react';
import Button from '@material-ui/core/Button';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Error from '../shared/Error';

import TramiteFase1Service from '../../services/TramiteFase1Service';
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

const CreateTramiteFase1Form = ({
  setOpenCreateModal,
  type,
  tramiteFase1,
  setSnack,
  setRefresh
}) => {

  const as = new TramiteFase1Service()

  const initData = type === 'CREATE' ? {
    id: null,
    alumno: '',
    tipo_tramite : '',  
    fecha_solicitud: '',  //getDate
    ciclo_escolar: '',
    atributos_dictamen: ''

  } : tramiteFase1;

  const [userData, setUserData] = useState(initData);

  let { id, alumno, tipo_tramite, fecha_solicitud, ciclo_escolar, atributos_dictamen } = userData;

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

    if (alumno === '') {
      setError(true);
      setErrorMessage('El alumno es obligatorio')
      return;
    }

    if (tipo_tramite === '') {
      setError(true);
      setErrorMessage('El tipo de tramite es obligatorio')
      return;
    }

    if (fecha_solicitud === '') {
      setError(true);
      setErrorMessage('La fecha de solicitud es obligatoria')
      return;
    }

    if (ciclo_escolar === '') {
      setError(true);
      setErrorMessage('El ciclo escolar es obligatorio')
      return;
    }

    if (atributos_dictamen === '') {
      setError(true);
      setErrorMessage('La solicitud del dictamen es obligatoria')
      return;
    }


    const userToCreate = type === 'CREATE' ? {      
        id,
        alumno,
        tipo_tramite,
        fecha_solicitud,
        ciclo_escolar,
        atributos_dictamen,
      
    } : {
        
        id,
        alumno,
        tipo_tramite,
        fecha_solicitud,
        ciclo_escolar,
        atributos_dictamen,
      
    } 

    setLoading(true)


    if (type === 'CREATE') {
      console.log('Creando tramite: ', userToCreate);
      as.createTramiteFase1(userToCreate)
        .then(resp => {
          setLoading(false)
          console.log(resp);
          setOpenCreateModal(false)
          if (resp.status === 201) {
            setRefresh(true);
            setSnack({
              message: 'Usuario Creado Correctamente',
              severity: 'success',
              open: true
            })
          }
          else {
            setSnack({
              message: 'Error al crear el tramite',
              severity: 'error',
              open: true
            })
          }
        })
    } else {
      console.log('Actualizando tramite: ', userToCreate);
      as.updateTramiteFase1(userToCreate)
        .then(resp => {
          setLoading(false)
          console.log(resp);
          setOpenCreateModal(false)
          if (resp.status === 200) {
            setRefresh(true);
            setSnack({
              message: 'Usuario Actualizado Correctamente',
              severity: 'success',
              open: true
            })
          }
          else {
            setSnack({
              message: 'Error al actualizar el tramite',
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
          <p style={{ padding: 10, margin: 10 }}> {type === 'CREATE' ? 'Creando' : 'Actualizando'}  TramiteFase1...</p>
        </div>


        :

        <div>
          {error ? <Error message={errorMessage}></Error> : null}
          <form className={classes.root} noValidate autoComplete="off">
            <TextField id="alumno" name="alumno" onChange={handleOnChange} value={alumno} label="Alumno" variant="outlined" />
            <TextField id="tipo_tramite" name="tipo_tramite" onChange={handleOnChange} value={tipo_tramite} label="Tipo de trámite" variant="outlined" />
            <TextField id="fecha_solicitud" name="fecha_solicitud" type="date" onChange={handleOnChange} value={fecha_solicitud} label="Fecha de Solicitud" variant="outlined" />
            <TextField id="cilo_escolar" name="ciclo_escolar" onChange={handleOnChange} value={ciclo_escolar} label="Ciclo escolar" variant="outlined" />
            <TextField id="atributos_dictamen" name="atributos_dictamen" onChange={handleOnChange} value={atributos_dictamen} label="Solicitud de dictamen" variant="outlined" />
            
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

export default CreateTramiteFase1Form;