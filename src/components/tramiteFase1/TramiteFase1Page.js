import React from 'react';
import { Fragment } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import TramiteFase1Table from './TramiteFase1Table';
import CreateTramiteFase1Modal from './CreateTramiteFase1Modal';
import DeleteTramiteFase1Modal from './DeleteTramiteFase1Modal';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const TramiteFase1Page = () => {

  const [openDelete, setOpenDelete] = React.useState(false);
  const [openCreateModal, setOpenCreateModal] = React.useState(false);
  const [refresh, setRefresh] = React.useState(true);
  const [configCreateTramiteFase1, setConfigCreateTramiteFase1] = React.useState({
    type: '',
    item: null
  });
  const [deleteTramiteFase1, setDeleteTramiteFase1] = React.useState({
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
      <TramiteFase1Table
        setOpenCreateModal={setOpenCreateModal}
        setOpenDelete={setOpenDelete}
        setDeleteTramiteFase1={setDeleteTramiteFase1}
        setConfigCreateTramiteFase1={setConfigCreateTramiteFase1}
        refresh={refresh}
        setRefresh={setRefresh}
      ></TramiteFase1Table>
      <DeleteTramiteFase1Modal
        openDelete={openDelete}
        setOpenDelete={setOpenDelete}
        deleteTramiteFase1={deleteTramiteFase1}
        setDeleteTramiteFase1={setDeleteTramiteFase1}
        setSnack={setSnack}
        setRefresh={setRefresh}
      ></DeleteTramiteFase1Modal>

      <CreateTramiteFase1Modal
        openCreateModal={openCreateModal}
        setOpenCreateModal={setOpenCreateModal}
        setSnack={setSnack}
        configCreateTramiteFase1={configCreateTramiteFase1}
        setRefresh={setRefresh}
      >
      </CreateTramiteFase1Modal>

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

export default TramiteFase1Page;