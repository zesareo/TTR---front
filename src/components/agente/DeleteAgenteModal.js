import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { yellow } from '@material-ui/core/colors';
import AgenteService from '../../services/AgenteService';
import Spinner from '../shared/Spinner';

export default function DeleteAgenteModal({
  openDelete,
  setOpenDelete,
  deleteAgente,
  setDeleteAgente,
  setSnack,
  setRefresh
}) {

  const as = new AgenteService();

  const [loading, setLoading] = React.useState(false);


  const handleClick = (d) => {
    setDeleteAgente({
      ...deleteAgente,
      del: d
    })
    console.log(deleteAgente)
    if (d) {
      setLoading(true)
      console.log('Delete with ID: ', deleteAgente.id);
      as.deleteAgenteById(deleteAgente.id)
        .then(resp => {
          console.log(resp);
          if (resp.status === 204) {
            setRefresh(true)
            setSnack({
              open: true,
              message: 'Agente eliminado correctamente',
              severity: 'success'
            })
            setLoading(false)
            setOpenDelete(false);
          } else {
            setSnack({
              open: true,
              message: 'Ocurrió un error al intentar eliminar el usuario',
              severity: 'error'
            })
            setLoading(false)
            setOpenDelete(false);
          }
        })

    } else {
      setOpenDelete(false);
    }
  };



  return (
    <div>
      <Dialog
        open={openDelete}
        onClose={() => handleClick(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Icon className="fas fa-exclamation-circle" style={{ color: yellow[800], fontSize: 19, marginRight: 10 }} />
          {"Confirmación de eliminación"}
        </DialogTitle>
        <DialogContent>

          {loading ?
            <>
              <Spinner></Spinner>
              <div style={{ fontSize: 15, margin: 'auto 0', }}>Eliminando Agente</div>
            </> :
            <div>
              <span>El usuario con id {deleteAgente.id} será eliminado. Una vez confirmada, esta acción no podrá revertirse</span>
            </div>
          }

          {/* <DialogContentText id="alert-dialog-description">
            

          </DialogContentText> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClick(false)} color="primary" autoFocus>
            Cancelar
          </Button>
          <Button onClick={() => handleClick(true)} color="primary" >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>


    </div>
  );
}
