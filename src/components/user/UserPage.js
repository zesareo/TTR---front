import React from 'react';
import { Fragment } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import UserTable from './UserTable';
import CreateUserModal from './CreateUserModal';
import DeleteUserModal from './DeleteUserModal';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const UserPage = () => {

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

      <UserTable
        setOpenCreateModal={setOpenCreateModal}
        setOpenDelete={setOpenDelete}
        setDeleteItem={setDeleteItem}
        configCreateItem={configCreateItem}
        setConfigCreateItem={setConfigCreateItem}
        refresh={refresh}
        setRefresh={setRefresh}
      ></UserTable>

      <DeleteUserModal
        openDelete={openDelete}
        setOpenDelete={setOpenDelete}
        deleteItem={deleteItem}
        setDeleteItem={setDeleteItem}
        setSnack={setSnack}
        setRefresh={setRefresh}
      ></DeleteUserModal>

      <CreateUserModal
        openCreateModal={openCreateModal}
        setOpenCreateModal={setOpenCreateModal}
        setSnack={setSnack}
        configCreateItem={configCreateItem}
        setRefresh={setRefresh}
      >
      </CreateUserModal>

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

export default UserPage;