import * as React from 'react';
import PropTypes from 'prop-types';
import {
    Alert,
    Box,
    Paper,
    Snackbar,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {visuallyHidden} from '@mui/utils';
import Link from 'next/link';
import {remove as removeBook} from '../pages/requests/utils';

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

const headCells = [
    {
        id: 'num',
        numeric: true,
        disablePadding: true,
        label: '#',
    },
    {
        id: 'title',
        numeric: true,
        disablePadding: true,
        label: 'Title',
    },
    {
        id: 'author',
        numeric: true,
        disablePadding: false,
        label: 'Author',
    },
    {
        id: 'startDate',
        numeric: true,
        disablePadding: false,
        label: 'Start Date',
    },
    {
        id: 'endDate',
        numeric: true,
        disablePadding: false,
        label: 'End Date',
    },
    {
        id: 'language',
        numeric: true,
        disablePadding: false,
        label: 'Language',
    },
    {
        id: 'countries',
        numeric: true,
        disablePadding: false,
        label: 'Countries',
    },
    {
        id: 'actions',
        numeric: true,
        disablePadding: false,
        label: 'Actions',
    },
];

function EnhancedTableHead(props) {
    const {order, orderBy, onRequestSort} = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const EnhancedTable = ({rows = []}) => {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);
    const [isNotificationOpened, setIsNotificationOpened] = React.useState(false);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleRemove = (id) => {

        removeBook(id)
            .then((data) => console.log(data))
            .then(() => setIsNotificationOpened(true))
            .catch((error => console.log(error)));
    };

    const handleCloseNotification = () => {
        setIsNotificationOpened(false);
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <Box sx={{width: '100%'}}>
            <Paper sx={{width: '100%', mb: 2}}>
                <TableContainer>
                    <Table
                        sx={{minWidth: 750}}
                        aria-labelledby="tableTitle"
                        size='medium'
                    >
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {rows.sort(getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    return (
                                        <TableRow
                                            hover
                                            // onClick={(event) => handleClick(event, row.name)}
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row._id}
                                        >
                                            <TableCell align="left">{index + 1}</TableCell>
                                            <TableCell
                                                align="right"
                                                component="th"
                                                scope="row"
                                                padding="none"
                                            >
                                                <Link href={`/books/${row._id}`}>{row.title}</Link>
                                            </TableCell>
                                            <TableCell align="right">{row.author}</TableCell>
                                            <TableCell align="right">{row.startDate}</TableCell>
                                            <TableCell align="right">{row.endDate}</TableCell>
                                            <TableCell align="right">{row.language}</TableCell>
                                            <TableCell align="right">{row.countries.join(', ')}</TableCell>
                                            <TableCell align="right" onClick={e => handleRemove(row._id)}><DeleteIcon
                                                color="primary"/></TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: 40*emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6}/>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 50, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <Snackbar open={isNotificationOpened} autoHideDuration={5000} onClose={handleCloseNotification}>
                <Alert onClose={handleCloseNotification} severity="success" sx={{width: '100%'}}>
                    Book removed!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default EnhancedTable;