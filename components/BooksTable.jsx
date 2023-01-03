import * as React from 'react';
import PropTypes from 'prop-types';
import {
    Alert,
    Box,
    Paper,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel
} from '@mui/material';
import ConfirmationDialog from "./ConfirmationDialog";
import DeleteIcon from '@mui/icons-material/Delete';
import {visuallyHidden} from '@mui/utils';
import Link from 'next/link';
import dayjs from 'dayjs';
import { useRouter } from 'next/router'
import {remove as removeBook} from '../pages/requests/utils';
import styles from '../styles/BookTable.module.css';

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
        numeric: false,
        disablePadding: true,
        label: 'Title',
    },
    {
        id: 'author',
        numeric: false,
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
        numeric: false,
        disablePadding: false,
        label: 'Language',
    },
    {
        id: 'countries',
        numeric: false,
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

const EnhancedTable = ({rows}) => {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);
    const [isConfirmationOpened, setIsConfirmationOpened] = React.useState(false);
    const [isNotificationOpened, setIsNotificationOpened] = React.useState(false);
    const [rowToRemove, setRowToRemove] = React.useState(null);
    const router = useRouter();

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

    const handleRemoveInitiation = (row) => {
        setIsConfirmationOpened(true);
        setRowToRemove(row);
    };

    const handleRemove = (row) => {
        setRowToRemove(null);
        setIsConfirmationOpened(false);

        removeBook(row._id)
            .then((data) => console.log(data))
            .then(() => {
                setIsNotificationOpened(true);
                setIsConfirmationOpened(false);
                router.reload(window.location.pathname);
            })
            .catch((error => console.log(error)));
    };

    const handleRemoveCancelled = () => {
        setIsConfirmationOpened(false);
        setRowToRemove(null);
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
                                                align="left"
                                                component="th"
                                                scope="row"
                                                padding="none"
                                            >
                                                <Link href={`/books/${row._id}`}>{row.title}</Link>
                                            </TableCell>
                                            <TableCell align="left"
                                                       className={row.author === 'Unknown' ? styles.greyFont : ''}>
                                                {row.author}
                                            </TableCell>
                                            <TableCell align="right"
                                                       className={row.notPrecisedStartDate ? styles.greyFont : ''}>
                                                {row.startDate ? dayjs(row.startDate).format('DD/MM/YYYY') : ''}
                                            </TableCell>
                                            <TableCell align="right"
                                                       className={row.notPrecisedEndDate ? styles.greyFont : ''}>
                                                {row.endDate ? dayjs(row.endDate).format('DD/MM/YYYY') : ''}
                                            </TableCell>
                                            <TableCell align="left">{row.language}</TableCell>
                                            <TableCell align="left">{row.countries.join(', ')}</TableCell>
                                            <TableCell align="right" onClick={() => handleRemoveInitiation(row)}>
                                                <DeleteIcon color="primary"/>
                                            </TableCell>
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
            <ConfirmationDialog
                isOpen={isConfirmationOpened}
                item={rowToRemove}
                confirmAction={handleRemove}
                cancelAction={handleRemoveCancelled}
        />
            <Snackbar open={isNotificationOpened} autoHideDuration={5000} onClose={handleCloseNotification}>
                <Alert onClose={handleCloseNotification} severity="success" sx={{width: '100%'}}>
                    Book removed!
                </Alert>
            </Snackbar>
        </Box>
    );
};

EnhancedTable.defaultProps = {
    rows: [],
};

export default EnhancedTable;