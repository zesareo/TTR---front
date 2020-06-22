import React from 'react';
import { Fragment } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import ETSTable from './ETSTable';
import CreateETSModal from './CreateETSModal';
import DeleteETSModal from './DeleteETSModal';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const ETSPage = () => {

  const [openDelete, setOpenDelete] = React.useState(false);
  const [openCreateModal, setOpenCreateModal] = React.useState(false);
  const [refresh, setRefresh] = React.useState(true);
  const [configCreateItem, setConfigCreateItem] = React.useState({
    type: '',
    item: null
  });
  const [deleteItem, setDeleteItem] = React.useState({
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

      <ETSTable
        setOpenCreateModal={setOpenCreateModal}
        setOpenDelete={setOpenDelete}
        setDeleteItem={setDeleteItem}
        setConfigCreateItem={setConfigCreateItem}
        refresh={refresh}
        setRefresh={setRefresh}
      ></ETSTable>

      <DeleteETSModal
        openDelete={openDelete}
        setOpenDelete={setOpenDelete}
        deleteItem={deleteItem}
        setDeleteItem={setDeleteItem}
        setSnack={setSnack}
        setRefresh={setRefresh}
      ></DeleteETSModal>

      <CreateETSModal
        openCreateModal={openCreateModal}
        setOpenCreateModal={setOpenCreateModal}
        setSnack={setSnack}
        configCreateItem={configCreateItem}
        setRefresh={setRefresh}
      >
      </CreateETSModal>

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

export default ETSPage;