import React, {useState, useEffect} from 'react';
import Services from './../Services';
import { View } from 'react-native';
import NavBar from './NavBar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Container from '@mui/material/Container';
import { blue } from '@mui/material/colors';

export default function Read({route}){
    const id = route.params;
    const [data, setData] = useState({
        "id": "",
        "name": "",
        "address": "",
        "email": "",
        "contact": ""
    });

    useEffect(() => {
        console.log(id);
        Services.getOneEmployee(id)
        .then(({data}) => {
            setData(data);
            console.log(data);
        })
        .catch(({response}) =>{
            console.log(response);
        })
    }, []);

    return(
        <View>
            <NavBar/>
            <Container sx={{ mt: 4, mb: 1}}>
                <Typography variant="h4" component="h4" align="center" sx={{color: blue[900], mb: 2}}>Employee Details</Typography>
                <Box sx={{ width: 300, height: 300, backgroundColor: blue[50], py: 2, px: 2 }} m="auto">
                    <FormControl sx={{ mt: 2, mb: 1}}>
                        <InputLabel htmlFor="name">Name</InputLabel>
                        <Input id="name" value={data.name} sx={{ width: 290}}/>
                    </FormControl>
                    <FormControl sx={{ mt: 2, mb: 1}}>
                        <InputLabel htmlFor="address">Address</InputLabel>
                        <Input id="address" value={data.address} sx={{ width: 290}}/>
                    </FormControl>
                    <FormControl sx={{ mt: 2, mb: 1}}>
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input id="email" value={data.email} sx={{ width: 290}}/>
                    </FormControl>
                    <FormControl sx={{ mt: 2, mb: 1}}>
                        <InputLabel htmlFor="contact">Contact</InputLabel>
                        <Input id="contact" value={data.contact} sx={{ width: 290}}/>
                    </FormControl>
                </Box>
            </Container>
        </View>
    );
}