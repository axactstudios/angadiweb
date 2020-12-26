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
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 580,
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
            {orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order, index) => {
              return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  {columns.map((column) => {
                    let value;
                    if (column.id == "_id") {
                      value = <Link to={`/edit/order/${order._id}`}>{order._id}</Link>
                    } else if (column.id == "name") {
                      value = <Link to={`/edit/dish/${order._id}`} style={{textDecoration: "none"}}><img src={order.data["url"]} width="50px" height="50px" /> &nbsp; {order.data["name"]}</Link>
                    } else if (column.id == "action") {
                      value = <div className="edit-button-group"><Link to={`/edit/dish/${order._id}`}><button>Edit</button></Link></div>
                    } else if (column.id == "id") {
                      value = <Link to={`/orders/from/user/${order.data["id"]}`}>{order.data["id"]}</Link>
                    } else if (column.id == "editcat") {
                      value = <div className="edit-button-group"><Link to={`/edit/category/${order._id}`}><button>Edit</button></Link></div>
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
        rowsPerPageOptions={[5, 10, 20]}
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