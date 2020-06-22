import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { yellow } from '@material-ui/core/colors';
import TramiteService from '../../services/TramiteService';
import Spinner from '../shared/Spinner';

export default function DeleteTramiteModal({
  openDelete,
  setOpenDelete,
  deleteTramite,
  setDeleteTramite,
  setSnack,
  setRefresh
}) {

  const as = new TramiteService();

  const [loading, setLoading] = React.useState(false);


  const handleClick = (d) => {
    setDeleteTramite({
      ...deleteTramite,
      del: d
    })
    console.log(deleteTramite)
    if (d) {
      setLoading(true)
      console.log('Delete with ID: ', deleteTramite.id);
      as.deleteTramiteById(deleteTramite.id)
        .then(resp => {
          console.log(resp);
          if (resp.status === 204) {
            setRefresh(true)
            setSnack({
              open: true,
              message: 'Tramite eliminado correctamente',
              severity: 'success'
            })
            setLoading(false)
            setOpenDelete(false);
          } else {
            setSnack({
              open: true,
              message: 'Ocurrió un error al intentar eliminar el trámite',
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
              <span style={{ padding: 10, margin: 10 }}> Eliminando Tramite...</span>
            </> :
            <div>
              <span>El trámite con id {deleteTramite.id} será eliminado. Una vez confirmada, esta acción no podrá revertirse</span>
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
