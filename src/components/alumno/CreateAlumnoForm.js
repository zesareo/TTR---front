import React from 'react';
import { Fragment } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useState } from 'react';
import Button from '@material-ui/core/Button';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Error from '../shared/Error';

import AlumnoService from '../../services/AlumnoService';
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

const CreateAlumnoForm = ({
  setOpenCreateModal,
  type,
  alumno,
  setSnack,
  setRefresh
}) => {

  const as = new AlumnoService()

  const initData = type === 'CREATE' ? {
    id: null,
    nombre: '',
    materno: '',
    paterno: '',
    nacimiento: '',
    telefono: '',
    domicilio: '',
    correo: '',
    boleta: '',
    curp: '',
    fecha_ingreso: '',
    rol: 'Alumno',
    contrasena: '',
    confirmcontrasena: ''
  } : alumno;

  const [userData, setUserData] = useState(initData);

  let { id, nombre, materno, paterno, nacimiento, telefono, domicilio, correo, boleta, curp, fecha_ingreso, rol, contrasena, confirmcontrasena } = userData;

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

    if (curp === '') {
      setError(true);
      setErrorMessage('El CURP es obligatorio')
      return;
    }

    if (fecha_ingreso === '') {
      setError(true);
      setErrorMessage('La fecha de ingreso es obligatoria')
      return;
    }

    if (domicilio === '') {
      setError(true);
      setErrorMessage('El domicilio es obligatorio')
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
      boleta,
      fecha_ingreso,
      curp
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
        boleta,
        fecha_ingreso,
        curp
      }

    setLoading(true)


    if (type === 'CREATE') {
      console.log('Creando usuario: ', userToCreate);
      as.createAlumno(userToCreate)
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
              message: 'Error al crear el usuario',
              severity: 'error',
              open: true
            })
          }
        })
    } else {
      console.log('Actualizando usuario: ', userToCreate);
      as.updateAlumno(userToCreate)
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
              message: 'Error al actualizar el usuario',
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
          <p style={{ padding: 10, margin: 10 }}> {type === 'CREATE' ? 'Creando' : 'Actualizando'}  Alumno...</p>
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
            <TextField id="boleta" name="boleta" onChange={handleOnChange} value={boleta} label="Boleta" variant="outlined" />
            <TextField id="curp" name="curp" onChange={handleOnChange} value={curp} label="CURP" variant="outlined" />
            <TextField id="fecha_ingreso" name="fecha_ingreso" type="date" onChange={handleOnChange} value={fecha_ingreso} label="Fecha de Ingreso" variant="outlined" />
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

export default CreateAlumnoForm;