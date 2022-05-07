import React, { useState, useEffect } from 'react';
import Services from './../Services';
import { View } from 'react-native';
import NavBar from './NavBar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { blue, red, orange } from '@mui/material/colors';

//Icons
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Home(){
    const [data, setData] = useState([{
        "id": "",
        "name": "",
        "address": "",
        "email": "",
        "contact": ""
    }]);

    useEffect(() => {
        readAllData();
    }, []);

    function readAllData(){
        Services.getEmployee()
        .then(({data}) => {
            setData(data);
            console.log(data);
        })
        .catch(({response}) =>{
            console.log(response);
        })
    }

    function openNode(id){
        window.location.replace("/Read/"+id);
    }

    function editNode(id){
        window.location.replace("/Edit/"+id);
    }

    function deleteNode(id){
        if(window.confirm("Confirm to delete data.") == true){
            Services.deleteEmployee(id)
            .then(({data}) => {
                console.log(data);
                readAllData();
            })
            .catch(({response}) =>{
                console.log(response);
            })
        }
    }

    return(
        <View sx={{backgroundColor: blue[200]}}>
            <NavBar/>
            <Container sx={{ mt: 4, mb: 1}}>
                <Typography variant="h4" component="h4" align="center" sx={{color: blue[900], mb: 2}}>Employee Table</Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" sx={{fontWeight: 'bold'}}>Name</TableCell>
                                <TableCell align="center" sx={{fontWeight: 'bold'}}>Address</TableCell>
                                <TableCell align="center" sx={{fontWeight: 'bold'}}>Email</TableCell>
                                <TableCell align="center" sx={{fontWeight: 'bold'}}>Contact</TableCell>
                                <TableCell align="center" sx={{fontWeight: 'bold'}}>Option</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row) => 
                                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">{row.name}</TableCell>
                                    <TableCell align="center">{row.address}</TableCell>
                                    <TableCell align="left">{row.email}</TableCell>
                                    <TableCell align="center">{row.contact}</TableCell>
                                    <TableCell align="center" sx={{ width: "330px"}}>
                                        <Button variant="contained" sx={{ backgroundColor: blue[500], '&:hover': { backgroundColor: blue[700]} }} onClick={() => openNode(row.id)}><OpenInNewIcon/>&nbsp;Open</Button>&nbsp;
                                        <Button variant="contained" sx={{ backgroundColor: orange[500], '&:hover': { backgroundColor: orange[700]} }} onClick={() => editNode(row.id)}><EditIcon/>Edit&nbsp;</Button>&nbsp;
                                        <Button variant="contained" sx={{ backgroundColor: red[500], '&:hover': { backgroundColor: red[700]} }} onClick={() => deleteNode(row.id)}><DeleteIcon/>&nbsp;Delete</Button>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </View>
    );
}
