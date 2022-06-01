import React, {useState, useEffect} from 'react';
import Services from './../Services';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NavBar from './NavBar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { blue } from '@mui/material/colors';
import AutorenewIcon from '@mui/icons-material/Autorenew';

export default function Edit({route}){
    const id = route.params;
    const navigation = useNavigation();
    const [data, setData] = useState({
        "id": "",
        "name": "",
        "address": "",
        "email": "",
        "contact": ""
    });

    useEffect(() => {
        Services.getOneEmployee(id)
        .then(({data}) => {
            setData(data);
            console.log(data);
        })
        .catch(({response}) =>{
            console.log(response);
        })
    }, []);

    function validate(){
        const newData = {...data};
        if((newData["id"] == "" ) || (newData["id"] == undefined )){
            console.log("id");
            return false;
        }
        else if((newData["name"] == "" ) || (newData["name"] == undefined )){
            console.log("name");
            return false;
        }
        else if((newData["address"] == "" ) || (newData["address"] == undefined )){
            console.log("address");
            return false;
        }
        else if((newData["email"] == "" ) || (newData["email"] == undefined )){
            console.log("email");
            return false;
        }
        else if((newData["contact"] == "" ) || (newData["contact"] == undefined )){
            console.log("contact");
            return false;
        }
        else{
            return true;
        }
    }

    function update(){
        if(validate() == true){
            if(window.confirm("Confirm to update data.") == true){
                Services.putEmployee(data)
                .then(({data}) => {
                    setData(data);
                    console.log(data);
                    navigation.navigate("Home");
                })
                .catch(({response}) =>{
                    console.log(response);
                })
            }
        }
        else{
            console.log("validation faild!");
        }
    }

    function handle(e){
        const newData = {...data};
        newData[e.target.id] = e.target.value;
        setData(newData);
        console.log(newData);
    }

    return(
        <View>
            <NavBar/>
            <Container sx={{ mt: 4, mb: 1}}>
                <Typography variant="h4" component="h4" align="center" sx={{color: blue[900], mb: 2}}>Employee Details</Typography>
                <Box sx={{ width: 300, height: 350, backgroundColor: blue[50], py: 2, px: 2 }} m="auto">
                    <FormControl sx={{ mt: 2, mb: 1}}>
                        <InputLabel htmlFor="name">Name</InputLabel>
                        <Input id="name" value={data.name} onChange={(e) => handle(e)} sx={{ width: 290}}/>
                    </FormControl>
                    <FormControl sx={{ mt: 2, mb: 1}}>
                        <InputLabel htmlFor="address">Address</InputLabel>
                        <Input id="address" value={data.address} onChange={(e) => handle(e)} sx={{ width: 290}}/>
                    </FormControl>
                    <FormControl sx={{ mt: 2, mb: 1}}>
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input id="email" value={data.email} onChange={(e) => handle(e)} sx={{ width: 290}}/>
                    </FormControl>
                    <FormControl sx={{ mt: 2, mb: 1}}>
                        <InputLabel htmlFor="contact">Contact</InputLabel>
                        <Input id="contact" value={data.contact} onChange={(e) => handle(e)} sx={{ width: 290}}/>
                    </FormControl>
                    <FormControl align="right" sx={{ mt: 2, mb: 1, display:"flex" }}>
                        <Button variant="contained" sx={{ backgroundColor: blue[500], '&:hover': { backgroundColor: blue[700]} }} onClick={() => update()}><AutorenewIcon/>&nbsp;Update</Button>
                    </FormControl>
                </Box>
            </Container>
        </View>
    );
}