import React from 'react';
import { Fragment } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useState } from 'react';
import Button from '@material-ui/core/Button';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Error from '../shared/Error';

import AgenteService from '../../services/AgenteService';
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

const CreateAgenteForm = ({
  setOpenCreateModal,
  type,
  agente,
  setSnack,
  setRefresh
}) => {

  const as = new AgenteService()

  const initData = type === 'CREATE' ? {
    id: null,
    nombre: '',
    materno: '',
    paterno: '',
    nacimiento: '',
    telefono: '',
    domicilio: '',
    correo: '',
    rol: 'Agente',
    folio: '',
    contrasena: '',
    confirmcontrasena: ''
  } : agente;

  const [userData, setUserData] = useState(initData);

  let { id, nombre, materno, paterno, nacimiento, telefono, domicilio, correo, rol, folio, contrasena, confirmcontrasena } = userData;

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

    if (nombre === '') {
      setError(true);
      setErrorMessage('El nombre es obligatorio')
      return;
    }

    if (materno === '') {
      setError(true);
      setErrorMessage('El apellido materno es obligatorio')
      return;
    }

    if (paterno === '') {
      setError(true);
      setErrorMessage('El apellido paterno es obligatorio')
      return;
    }

    if (nacimiento === '') {
      setError(true);
      setErrorMessage('La fecha de nacimiento es obligatorio')
      return;
    }

    if (domicilio === '') {
      setError(true);
      setErrorMessage('El domicilio es obligatorio')
      return;
    }

    if (folio === '') {
      setError(true);
      setErrorMessage('El folio es obligatorio')
      return;
    }

    if (contrasena === '') {
      setError(true);
      setErrorMessage('La contraseña es obligatoria')
      return;
    }

    if (confirmcontrasena === '') {
      setError(true);
      setErrorMessage('La contraseña es obligatoria')
      return;
    }

    if (contrasena !== confirmcontrasena) {
      setError(true);
      setErrorMessage('Las contraseñas deben ser iguales')
      return;
    }

    const userToCreate = type === 'CREATE' ? {
      usuario: {
        id,
        nombre,
        materno,
        paterno,
        nacimiento,
        telefono: parseInt(telefono),
        domicilio,
        correo,
        rol,
        contrasena
      },
      folio: folio.toString()
    } : {
        usuario: {
          id,
          nombre,
          materno,
          paterno,
          nacimiento,
          telefono: parseInt(telefono),
          domicilio,
          correo,
          rol
        },
        folio: folio.toString()
      }

    setLoading(true)


    if (type === 'CREATE') {
      console.log('Creando agente: ', userToCreate);
      as.createAgente(userToCreate)
        .then(resp => {
          setLoading(false)
          console.log(resp);
          setOpenCreateModal(false)
          if (resp.status === 201) {
            setRefresh(true);
            setSnack({
              message: 'Agente Creado Correctamente',
              severity: 'success',
              open: true
            })
          }
          else {
            setSnack({
              message: 'Error al crear el agente',
              severity: 'error',
              open: true
            })
          }
        })
    } else {
      console.log('Actualizando agente: ', userToCreate);
      as.updateAgente(userToCreate)
        .then(resp => {
          setLoading(false)
          console.log(resp);
          setOpenCreateModal(false)
          if (resp.status === 200) {
            setRefresh(true);
            setSnack({
              message: 'Agente Actualizado Correctamente',
              severity: 'success',
              open: true
            })
          }
          else {
            setSnack({
              message: 'Error al actualizar el agente',
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
          <p style={{ padding: 10, margin: 10 }}> {type === 'CREATE' ? 'Creando' : 'Actualizando'}  Agente...</p>
        </div>


        :

        <div>
          {error ? <Error message={errorMessage}></Error> : null}
          <form className={classes.root} noValidate autoComplete="off">
            <TextField id="nombre" name="nombre" onChange={handleOnChange} value={nombre} label="Nombre" variant="outlined" />
            <TextField id="materno" name="materno" onChange={handleOnChange} value={materno} label="Apellido Materno" variant="outlined" />
            <TextField id="paterno" name="paterno" onChange={handleOnChange} value={paterno} label="Apellido Paterno" variant="outlined" />
            <TextField id="nacimiento" name="nacimiento" type="date" onChange={handleOnChange} value={nacimiento} label="Fecha de Nacimiento" variant="outlined" />
            <TextField id="telefono" name="telefono" onChange={handleOnChange} type="number" value={telefono} label="Teléfono" variant="outlined" />
            <TextField id="domicilio" name="domicilio" onChange={handleOnChange} value={domicilio} label="Domicilio" variant="outlined" />
            <TextField id="correo" name="correo" onChange={handleOnChange} value={correo} label="Correo" variant="outlined" />
            <TextField id="folio" name="folio" onChange={handleOnChange} value={folio} type="number" label="Folio" variant="outlined" />
            {
              type === 'CREATE' ?
                <TextField id="contrasena" name="contrasena" onChange={handleOnChange} type="password" value={contrasena} label="Contraseña" variant="outlined" />
                : null
            }

            {
              type === 'CREATE' ?
                <TextField id="confirmcontrasena" name="confirmcontrasena" onChange={handleOnChange} type="password" value={confirmcontrasena} label="Confirmar Contraseña" variant="outlined" />
                : null

            }



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

export default CreateAgenteForm;