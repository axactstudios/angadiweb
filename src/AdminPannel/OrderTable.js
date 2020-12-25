import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const columns = [
  { id: '_id', label: 'ID', minWidth: 100 },
  { id: 'Status', label: 'Status', minWidth: 100 },
  { id: 'UserID', label: 'userID', minWidth: 100 },
  { id: 'Type', label: 'Type', minWidth: 100 },
  { id: 'Address', label: 'Address', minWidth: 100 },
  { id: 'GrandTotal', label: 'Total', minWidth: 100 },
  { id: 'TimeStamp', label: 'Timestamp', minWidth: 100, format: (value) => { return new Date(value*1000).toString()} },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 500,
  },
  tablehead: {
    fontWeight: "bolder"
  }
});

const OrderTable = (props) => {
  console.log(props.orderDetails);
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const orders = props.orderDetails;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead className={classes.tablehead}>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order, index) => {
              return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  {columns.map((column) => {
                    let value;
                    if (column.id == "_id") {
                      value = <a href={`/edit/order/${order._id}`}>{order._id}</a>
                    } else {
                      value = order.data[column.id];
                    }
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format ? column.format(value["seconds"]) : value}
                      </TableCell>
                    );
                  })}
                  </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15, 20]}
        component="div"
        count={orders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default OrderTable;