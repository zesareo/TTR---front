import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { lighten, makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import Fab from '@material-ui/core/Fab';
import { teal } from '@material-ui/core/colors';

import Spinner from '../shared/Spinner';
import ETSService from '../../services/ETS2Service';
import HelperText from '../../utils/HelperText';

//import { PayPalButton } from 'react-paypal-button'
import { PayPalButton } from "react-paypal-button-v2";

//VERSION ORIGINAL
const paypalOptions = {
  clientId: 'AcJWL0XqPD0xAcRMmjQIy0ts5wDUYsCYIjVL4ZBb5ujHykzwmJqxMNURtGOyRPDSYHUqZ-6mIwWeRgsX',
  intent: 'capture'
}

const buttonStyles = {
  layout: 'vertical',
  shape: 'rect',
}

function createData(ets) {
  return {
    id: ets.id,
    
    turno: ets.turno,
    precio: ets.precio,
    materia: ets.materia,
    fecha: ets.fecha,
    estatus: ets.estatus
  }
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'id', numeric: false, disablePadding: true, label: 'ID' },
  { id: 'turno', numeric: false, disablePadding: false, label: 'Turno' },
  { id: 'materia', numeric: false, disablePadding: false, label: 'Materia' },
  { id: 'fecha', numeric: false, disablePadding: false, label: 'Fecha' },
  { id: 'estatus', numeric: false, disablePadding: false, label: 'Estatus' },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    
    <TableHead>
      <TableRow>

        <TableCell align='center' style={{ fontWeight: 'bold' }}>
          Operaciones
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            style={{ fontWeight: 'bold' }}
            key={headCell.id}
            align='center'
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  title: {
    flex: '1 1 100%',
    fontWeight: 'bold'
  },
  fab: {
    margin: theme.spacing(2),
    size: theme.typography.fontSize
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected, setConfigCreateItem, setOpenCreateModal } = props;

  const handleClickCreate = () => {
    setConfigCreateItem({
      type: 'CREATE',
      item: null
    })
    setOpenCreateModal(true)
  }

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >

      <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
        ETS
      </Typography>


      <Tooltip title="Agregar ETS" aria-label="add">
        <Fab color="primary" className={classes.fab} onClick={handleClickCreate}>
          <Icon className="fas fa-plus" style={{ color: teal, fontSize: 15 }} />
        </Fab>
      </Tooltip>

    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function ETSTable({
  setOpenCreateModal,
  setOpenDelete,
  setDeleteItem,
  setConfigCreateItem,
  refresh,
  setRefresh
}) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('id');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState([]);

  const es = new ETSService();

  React.useEffect(() => {
    if (refresh) {
      setRefresh(false);
      getETS();
    }
  }, [refresh])

  /*
  const onSuccess = (payment) => {
    console.log("Your payment was succeeded!", payment);
  }	        
  const onCancel = (data) => {
    // User pressed "cancel" or close Paypal's popup! 
    console.log('You have cancelled the payment!', data);
  }	        
  const onError = (err) => {
  // The main Paypal's script cannot be loaded or somethings block the loading of that script! 
    console.log("Error!", err);
  // Since the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js" 
  // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear			 
  }		            
  let currency = 'MXN'; // or you can set this value from your props or state
   */

  const getETS = async () => {
    console.log('Getting Data...');
    const ets = await es.getETSs()
    setRows(ets.map(a => createData(a)));
    setLoading(false);

  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClickDelete = (id) => {
    setDeleteItem({ id, del: false })
    setOpenDelete(true);
  }

  const handleClickEdit = (item) => {
    setConfigCreateItem({
      type: 'UPDATE',
      item: item
    })
    setOpenCreateModal(true)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      {loading ? < Spinner /> :
        <Paper className={classes.paper}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            setConfigCreateItem={setConfigCreateItem}
            setOpenCreateModal={setOpenCreateModal}
          />
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size='medium'
              aria-label="enhanced table"

            >
              <EnhancedTableHead
                classes={classes}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.name);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                      >
                        <TableCell align="center">
                          <Tooltip title="Eliminar">
                            <IconButton aria-label="delete" onClick={() => handleClickDelete(row.id)}>
                              <Icon className="fas fa-trash-alt" style={{ color: red[500], fontSize: 18 }} />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Editar">
                            <IconButton aria-label="delete" onClick={() => handleClickEdit(row)}>
                              <Icon className="fas fa-pencil-alt" style={{ fontSize: 18 }} />
                            </IconButton>
                          </Tooltip>

                        </TableCell>

                        <TableCell component="th" id={labelId} scope="row" >
                          {row.id}
                        </TableCell>
                        <TableCell align="center">{row.turno}</TableCell>
                    <TableCell align="center">{row.materia}</TableCell>
                        <TableCell align="center">{row.fecha}</TableCell>
                        <TableCell align="center">{row.estatus}</TableCell>
                        <TableCell align="center"><PayPalButton 
                        paypalOptions={paypalOptions}  
                        buttonStyles={buttonStyles} 
                        amount={row.precio} 
                        onSuccess={(details, data) => {
                          alert("Transaction completed by " + details.payer.name.given_name);
                         }
                        }

                        /> </TableCell>
                        </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15, 20]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      }
    </div>
  );
}
