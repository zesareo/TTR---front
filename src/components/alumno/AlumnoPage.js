import React from 'react';
import { Fragment } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import AlumnoTable from './AlumnoTable';
import CreateAlumnoModal from './CreateAlumnoModal';
import DeleteAlumnoModal from './DeleteAlumnoModal';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const AlumnoPage = () => {

  const [openDelete, setOpenDelete] = React.useState(false);
  const [openCreateModal, setOpenCreateModal] = React.useState(false);
  const [refresh, setRefresh] = React.useState(true);
  const [configCreateAlumno, setConfigCreateAlumno] = React.useState({
    type: '',
    item: null
  });
  const [deleteAlumno, setDeleteAlumno] = React.useState({
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
      <AlumnoTable
        setOpenCreateModal={setOpenCreateModal}
        setOpenDelete={setOpenDelete}
        setDeleteAlumno={setDeleteAlumno}
        setConfigCreateAlumno={setConfigCreateAlumno}
        refresh={refresh}
        setRefresh={setRefresh}
      ></AlumnoTable>
      <DeleteAlumnoModal
        openDelete={openDelete}
        setOpenDelete={setOpenDelete}
        deleteAlumno={deleteAlumno}
        setDeleteAlumno={setDeleteAlumno}
        setSnack={setSnack}
        setRefresh={setRefresh}
      ></DeleteAlumnoModal>

      <CreateAlumnoModal
        openCreateModal={openCreateModal}
        setOpenCreateModal={setOpenCreateModal}
        setSnack={setSnack}
        configCreateAlumno={configCreateAlumno}
        setRefresh={setRefresh}
      >
      </CreateAlumnoModal>

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