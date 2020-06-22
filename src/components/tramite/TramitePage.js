import React from 'react';
import { Fragment } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import TramiteTable from './TramiteTable';
import CreateTramiteModal from './CreateTramiteModal';
import DeleteTramiteModal from './DeleteTramiteModal';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const TramitePage = () => {

  const [openDelete, setOpenDelete] = React.useState(false);
  const [openCreateModal, setOpenCreateModal] = React.useState(false);
  const [refresh, setRefresh] = React.useState(true);
  const [configCreateTramite, setConfigCreateTramite] = React.useState({
    type: '',
    item: null
  });
  const [deleteTramite, setDeleteTramite] = React.useState({
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
      <TramiteTable
        setOpenCreateModal={setOpenCreateModal}
        setOpenDelete={setOpenDelete}
        setDeleteTramite={setDeleteTramite}
        setConfigCreateTramite={setConfigCreateTramite}
        refresh={refresh}
        setRefresh={setRefresh}
      ></TramiteTable>
      <DeleteTramiteModal
        openDelete={openDelete}
        setOpenDelete={setOpenDelete}
        deleteTramite={deleteTramite}
        setDeleteTramite={setDeleteTramite}
        setSnack={setSnack}
        setRefresh={setRefresh}
      ></DeleteTramiteModal>

      <CreateTramiteModal
        openCreateModal={openCreateModal}
        setOpenCreateModal={setOpenCreateModal}
        setSnack={setSnack}
        configCreateTramite={configCreateTramite}
        setRefresh={setRefresh}
      >
      </CreateTramiteModal>

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

export default TramitePage;