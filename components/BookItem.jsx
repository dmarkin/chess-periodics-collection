import {useEffect, useState} from 'react';
import {Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography} from '@mui/material';
import {DatePicker} from '@mui/x-date-pickers';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import MultiSelect from './Multiselect';
import {isoLangs} from "../constants/languages";
import {isoCountries} from "../constants/countries";
import {sources} from "../constants/sources";
import {publishingTypes} from "../constants/types";

export const createLanguagesList = () => {
    const langs = [];
    for (let lang in isoLangs) {
        langs.push(isoLangs[lang]);
    }
    return langs;
};

export const createCountriesList = () => {
    return isoCountries.map(item => ({
        id: item.code,
        name: item.name
    }));
};

export const createSourcesList = () => {
    return sources.map(item => ({
        id: item.shortName,
        name: `${item.shortName} - ${item.fullName}`
    }));
};

const languagesList = createLanguagesList();
const countriesList = createCountriesList();
const sourcesList = createSourcesList();

const BookItem = ({initialValue, isNew, onSubmit}) => {
    const initialRecord = {
        type: '',
        title: '',
        author: '',
        startDate: null,
        endDate: null,
        imageUrl: '',
        countries: [],
        language: '',
        source: [],
        notes: ''
    };
    const initialForm = isNew ? initialRecord : {...initialValue};
    const [book, setBook] = useState(initialForm);

    useEffect(() => {
        console.log('useEffect call', book);
        setBook({...initialValue});
    }, [isNew, initialValue]);

    const handleChange = (e) => {
        setBook((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const handleStartDateChange = (value) => {
        setBook((prevState) => ({
            ...prevState,
            startDate: value
        }));
    };

    const handleEndDateChange = (value) => {
        setBook((prevState) => ({
            ...prevState,
            endDate: value
        }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        console.log('Save book: ', book);
        onSubmit(book);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <form style={{width: '50%', margin: '30px auto 0'}} onSubmit={handleSave}>
                <Typography variant={'h4'} textAlign='center'>{isNew ? 'Add Book' : 'Edit Book'}</Typography>
                <Box sx={{p: 3, display: 'flex', flexDirection: 'column'}}>
                    <FormControl sx={{minWidth: '100%'}}>
                        <InputLabel id="type-label">Type</InputLabel>
                        <Select
                            required
                            name="type"
                            id="type"
                            labelId="type-label"
                            onChange={handleChange}
                            value={book.type || ''}
                            label="Publishing Type"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {publishingTypes.map(type => (<MenuItem value={type}
                                                                    key={type}>{type}</MenuItem>))}
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{p: 3, display: 'flex', flexDirection: 'column'}}>
                    <TextField
                        required
                        autoFocus
                        id="book-title"
                        name="title"
                        onChange={handleChange}
                        value={book.title || ''}
                        label="Book Title"
                        multiline
                    />
                </Box>
                <Box sx={{p: 3, display: 'flex', flexDirection: 'column'}}>
                    <TextField
                        id="book-previousNames"
                        name="previousNames"
                        onChange={handleChange}
                        value={book.previousNames || ''}
                        label="Book previous names"
                    />
                </Box>
                <Box sx={{p: 3, display: 'flex', flexDirection: 'column'}}>
                    <TextField
                        required
                        id="book-author"
                        name="author"
                        onChange={handleChange}
                        value={book.author || ''}
                        label="Book Author/Editor"
                    />
                </Box>
                <Box sx={{p: 3, display: 'flex', flexDirection: 'column'}}>
                    <DatePicker
                        name="startDate"
                        onChange={handleStartDateChange}
                        value={book.startDate || null}
                        inputFormat="MM/DD/YYYY"
                        label="Start date"
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Box>
                <Box sx={{p: 3, display: 'flex', flexDirection: 'column'}}>
                    <DatePicker
                        name="endDate"
                        onChange={handleEndDateChange}
                        value={book.endDate || null}
                        inputFormat="MM/DD/YYYY"
                        label="End date"
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Box>
                <Box sx={{p: 3, display: 'flex', flexDirection: 'column'}}>
                    <TextField
                        id="book-imageUrl"
                        name="imageUrl"
                        onChange={handleChange}
                        value={book.imageURL || ''}
                        label="Book Image URL"
                    />
                </Box>
                <Box sx={{p: 3, display: 'flex', flexDirection: 'column'}}>
                    <MultiSelect
                        required
                        name="countries"
                        id="book-countries"
                        labelId="countries-label"
                        onChange={handleChange}
                        list={countriesList || []}
                        value={book.countries || []}
                        label="Book Countries"
                    />
                </Box>
                <Box sx={{p: 3, display: 'flex', flexDirection: 'column'}}>
                    <FormControl sx={{minWidth: '100%'}}>
                        <InputLabel id="language-label">Language</InputLabel>
                        <Select
                            required
                            name="language"
                            id="book-language"
                            labelId="language-label"
                            onChange={handleChange}
                            value={book.language || ''}
                            label="Book Language"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {languagesList.map(lang => (<MenuItem value={lang.name}
                                                                  key={lang.name}>{lang.name} ({lang.nativeName})</MenuItem>))}
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{p: 3, display: 'flex', flexDirection: 'column'}}>
                    <TextField
                        id="book-notes"
                        name="notes"
                        onChange={handleChange}
                        value={book.notes || ''}
                        label="Book Notes"
                        multiline
                    />
                </Box>
                <Box sx={{p: 3, display: 'flex', flexDirection: 'column'}}>
                    <MultiSelect
                        required
                        name="sources"
                        id="book-sources"
                        labelId="sources-label"
                        onChange={handleChange}
                        list={sourcesList || []}
                        value={book.sources || []}
                        label="Book Sources"
                        multiline
                    />
                </Box>
                <Box sx={{p: 3, display: 'flex', flexDirection: 'column'}}>
                    <TextField
                        id="book-availability"
                        name="availability"
                        onChange={handleChange}
                        value={book.availability || ''}
                        label="Book availability"
                    />
                </Box>
                <Box sx={{p: 3, display: 'flex', flexDirection: 'column'}}>
                    <Button type="submit" variant="contained">Save</Button>
                </Box>
            </form>
        </LocalizationProvider>
    )
};

export default BookItem;
