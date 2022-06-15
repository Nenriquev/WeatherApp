import { API } from "../API_KEY/data";
import { API_KEY } from "../API_KEY/apikeys";
import { useState } from "react";
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import { Button, Alert, Box, Paper, Grid, IconButton, createFilterOptions, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import cities from 'cities.json'
import './styles.css'






const WeatherForm = ({getdata}) => {

const [state, setState] = useState(false)
const [position, setPosition] = useState(false)
const [input, setInput] = useState(false)
const [inputValue, setInputValue] = useState("")


var error=false;
const hash = {};



    const handleCurrentPosition = () =>{
      
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async(position) => {
          var data
          try{
            data = await API.get(`weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}${API_KEY}&units=metric`);
            }
          catch(e)
            {
          error=true;
          setState(true)
            }
            getdata({data,error})
      },
      
      function(positionError) {
        setPosition(true);
    })};

      

    }
  
    const get = async (event, value) => {
      console.log(event)
      event.preventDefault();
      setInput(false)
      var data
      
      try{
        
        if(event.type ==='submit'){
        data = await API.get(`weather?q=${inputValue}${API_KEY}&units=metric`);
        }
        else
        data = await API.get(`weather?lat=${value.lat}&lon=${value.lng}${API_KEY}&units=metric`);
        }
          
      catch(e)
        {
      error=true;
      setState(true)
        }
        getdata({data,error})
    }

    const handlerInput = (e) =>{

      setInputValue(e)

      if(e.length >= 3){
        setInput(true)
      }
      else{
        setInput(false)
      }

    }

    const citylist = cities.map((city) => {
      const db = {
        key: city.name+city.country,
        city: city.name,
        country: city.country,
        lat: city.lat,
        lng: city.lng
      }
      return db;
   })


    const array = citylist.filter(function(current) {
      const exists = !hash[current.key];
      hash[current.key] = true;
      return exists;
    })

 
   const filterOptions = createFilterOptions({
     matchFrom: 'start',
     stringify: (citylist) => citylist.city,
     limit: 7,
     
   });

   
  
return (
      
  <>
    
      <Grid container direction="row" justifyItems="center" alignItems="center">
        <Grid item sx={{background: "rgba(35, 101, 117, 0.801)", padding:'5vh', borderRadius:'3%', boxShadow:"-1px -1px 39px 4px black" }}>
                
            <form onSubmit={(event,value) => get(event,value)}>
            
                      <Autocomplete
                      autoHighlight={true}
                      id="filter-demo"
                      open={input}
                      options={array}
                      freeSolo={true}
                      getOptionLabel={(option) => (option===true) ? `${option.city} ${option.country}` : ""}
                      filterOptions={filterOptions}
                      onChange={(event, value) => get(event, value)}
                      sx={{ width: 300 }}
                      renderOption={(props, option) =>  option ? (
                        <Box sx={{ '& > img': { mr: 2, flexShrink: 0 }}} {...props} key={option.key}>
                          <img
                            loading="lazy"
                            width="20"
                            src={`https://flagcdn.com/w20/${option.country.toLowerCase()}.png`}
                            srcSet={`https://flagcdn.com/w40/${option.country.toLowerCase()}.png 2x`}
                            alt=""
                          />
                          {option.city} {option.country}
                        </Box>
                        ): <h2>Cargando...</h2>}
                      renderInput={(params, option) => ( 
                      <Paper>
                        <TextField onChange={(e)=>handlerInput(e.target.value)}{...params} 
                        type='input' 
                        label="Enter a city" 
                        variant="filled"
                        /></Paper>)}/> 
                        
                    <IconButton onClick={handleCurrentPosition} ><GpsFixedIcon/></IconButton>
                        
                   
                    {(state===true) ? <Alert variant="filled" severity="error">
                    The city doesn't exist
                    </Alert> : null}
                    {(position===true) ? <Alert variant="filled" severity="error">
                    User denied Geolocation!
                    </Alert> : null}
                <Box mt={2}>
                      <Button color="success" variant="contained" fullWidth endIcon={<SearchSharpIcon />} className="shadowp" type="click" id="mybtn">Search</Button>
                </Box>
            </form>
          </Grid>
        </Grid>
    
  </>


);
};

export default WeatherForm;

