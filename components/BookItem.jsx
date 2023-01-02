import {useEffect, useState} from 'react';
import {Box, Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField} from '@mui/material';
import {DatePicker} from '@mui/x-date-pickers';
import MultiSelect from './Multiselect';
import {isoLangs} from "../constants/languages";
import {isoCountries} from "../constants/countries";
import {sources} from "../constants/sources";
import {publishingTypes} from "../constants/types";
import styles from "../styles/Home.module.css";

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
        notPrecisedStartDate: false,
        endDate: null,
        notPrecisedEndDate: false,
        imageUrl: '',
        countries: [],
        language: '',
        source: [],
        notes: ''
    };
    const initialForm = isNew ? initialRecord : {...initialValue};
    const [book, setBook] = useState(initialForm);
    const [notPrecisedStartDateChecked, setNotPrecisedStartDateChecked] = useState(book.notPrecisedStartDate || false);
    const [notPrecisedEndDateChecked, setNotPrecisedEndDateChecked] = useState(book.notPrecisedEndDate || false);

    useEffect(() => {
        setBook({...initialValue});
        setNotPrecisedStartDateChecked(initialValue?.notPrecisedStartDate || false);
        setNotPrecisedEndDateChecked(initialValue?.notPrecisedEndDate || false);
    }, [isNew, initialValue]);

    const handleChange = (e) => {
        console.log('Set Field Name ', e.target.name, ' to Value ', e.target.value);
        setBook((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const handleCheckboxChange = (e) => {
        console.log('Set Field Name ', e.target.name, ' to Value ', e.target.checked);
        switch (e.target.name) {
            case 'notPrecisedStartDate':
                setNotPrecisedStartDateChecked(e.target.checked);
                break;
            case 'notPrecisedEndDate':
                setNotPrecisedEndDateChecked(e.target.checked);
                break;
            default:
                break;
        }
        setBook((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.checked
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

            <form style={{width: '50%', margin: '30px auto 0'}} onSubmit={handleSave}>
                <h2 className={styles.title}>
                    {isNew ? 'Add Book' : 'Edit Book'}
                </h2>
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
                        views={['day', 'month', 'year']}
                        name="startDate"
                        onChange={handleStartDateChange}
                        value={book.startDate || null}
                        inputFormat="DD/MM/YYYY"
                        format="DD/MM/YYYY"
                        label="Start date"
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <FormControlLabel control={<Checkbox name="notPrecisedStartDate"
                                                            checked={notPrecisedStartDateChecked}
                                                            value={notPrecisedStartDateChecked}
                                                            onChange={handleCheckboxChange}
                                                            inputProps={{ 'aria-label': 'controlled' }} />}
                                         label="Not presized" />
                </Box>
                <Box sx={{p: 3, display: 'flex', flexDirection: 'column'}}>
                    <DatePicker
                        views={['day', 'month', 'year']}
                        name="endDate"
                        onChange={handleEndDateChange}
                        value={book.endDate || null}
                        inputFormat="DD/MM/YYYY"
                        format="DD/MM/YYYY"
                        label="End date"
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <FormControlLabel control={<Checkbox name="notPrecisedEndDate"
                                                         checked={notPrecisedEndDateChecked}
                                                         value={notPrecisedEndDateChecked}
                                                         onChange={handleCheckboxChange}
                                                         inputProps={{ 'aria-label': 'controlled' }} />}
                                      label="Not presized" />
                </Box>
                {/*<Box sx={{p: 3, display: 'flex', flexDirection: 'column'}}>*/}
                {/*    <TextField*/}
                {/*        id="book-imageUrl"*/}
                {/*        name="imageUrl"*/}
                {/*        onChange={handleChange}*/}
                {/*        value={book.imageURL || ''}*/}
                {/*        label="Book Image URL"*/}
                {/*    />*/}
                {/*</Box>*/}
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
                    />
                </Box>
                <Box sx={{p: 3, display: 'flex', flexDirection: 'column'}}>
                    <TextField
                        id="book-availability"
                        name="availability"
                        onChange={handleChange}
                        value={book.availability || ''}
                        label="Book availability"
                        multiline
                    />
                </Box>
                <Box sx={{p: 3, display: 'flex', flexDirection: 'column'}}>
                    <Button type="submit" variant="contained">Save</Button>
                </Box>
            </form>
    )
};

export default BookItem;
