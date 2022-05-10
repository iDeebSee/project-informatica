import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import SearchIcon from '@mui/icons-material/Search';
import KredietAanvraagService from '../services/kredietaanvraag-service'


export const SearchBar = React.forwardRef((props, ref) => {

    const [childKredieten, setChildKredieten] = React.useState([]);

    function handleChange(event) {
        KredietAanvraagService.getByName(event).then((response) => {
            setChildKredieten(response.data)
           // console.log("response", response.data)
        })
       // console.log("event", event)
    }

    React.useImperativeHandle(ref, () => ({
        getKredieten() {
            return childKredieten;
        }
    }));

    return (
        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
        >

            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Zoek kredieten"
                inputProps={{ 'aria-label': 'Zoek kredieten' }}
                onChange={e => handleChange(e.target.value)}
            />
            <Icon type="" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </Icon>


        </Paper>
    );
})