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
import '../Styles/adminPanel.css';

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
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const orders = props.details;
  const columns = props.columns

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
                  style={{ width: column.maxWidth }}
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
                    } else if (column.id == "name") {
                      value = <a href={`/edit/dish/${order._id}`} style={{textDecoration: "none"}}><img src={order.data["url"]} width="50px" height="50px" /> &nbsp; {order.data["name"]}</a>
                    } else if (column.id == "action") {
                      value = <div className="edit-button-group">
                                <a href={`/edit/dish/${order._id}`}><button>Edit</button></a>
                                <button style={{border: "1px solid tomato", color: "tomato"}}>Delete</button>
                              </div>
                    } else {
                      value = order.data[column.id];
                    }
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format ? column.format(value) : value}
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
        rowsPerPageOptions={[10, 20]}
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