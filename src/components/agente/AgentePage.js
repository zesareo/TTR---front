import React from 'react';
import { Fragment } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import AgenteTable from './AgenteTable';
import CreateAgenteModal from './CreateAgenteModal';
import DeleteAgenteModal from './DeleteAgenteModal';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const AlumnoPage = () => {

  const [openDelete, setOpenDelete] = React.useState(false);
  const [openCreateModal, setOpenCreateModal] = React.useState(false);
  const [refresh, setRefresh] = React.useState(true);
  const [configCreateAgente, setConfigCreateAgente] = React.useState({
    type: '',
    item: null
  });
  const [deleteAgente, setDeleteAgente] = React.useState({
    id: null,
    del: false
  });
  const [snack, setSnack] = React.useState({
    open: false,
    message: '',
    severity: ''
  });

  const handleCloseSnack = () => {
    setSnack({
      open: false,
      message: ''
    })
  }

  return (
    <Fragment>

      <AgenteTable
        setOpenCreateModal={setOpenCreateModal}
        setOpenDelete={setOpenDelete}
        setDeleteAgente={setDeleteAgente}
        setConfigCreateAgente={setConfigCreateAgente}
        refresh={refresh}
        setRefresh={setRefresh}
      ></AgenteTable>

      <DeleteAgenteModal
        openDelete={openDelete}
        setOpenDelete={setOpenDelete}
        deleteAgente={deleteAgente}
        setDeleteAgente={setDeleteAgente}
        setSnack={setSnack}
        setRefresh={setRefresh}
      ></DeleteAgenteModal>

      <CreateAgenteModal
        openCreateModal={openCreateModal}
        setOpenCreateModal={setOpenCreateModal}
        setSnack={setSnack}
        configCreateAgente={configCreateAgente}
        setRefresh={setRefresh}
      >
      </CreateAgenteModal>

      <Snackbar
        open={snack.open}
        autoHideDuration={6000}
        onClose={handleCloseSnack}
      >
        <Alert
          onClose={handleCloseSnack}
          severity={snack.severity}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </Fragment>
  );
}

export default AlumnoPage;