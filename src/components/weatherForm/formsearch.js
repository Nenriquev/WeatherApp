import { API } from "../API_KEY/data";
import { API_KEY } from "../API_KEY/apikeys";
import {useState, useEffect} from 'react'
import {TextField, createFilterOptions, Box, Grid, Alert, Autocomplete, CircularProgress, Button, IconButton, Paper} from '@mui/material/';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import cities from 'cities.json'



function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
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

const hash = {};
const array = citylist.filter(function(current) {
  const exists = !hash[current.key];
  hash[current.key] = true;
  return exists;
})

const WeatherForm = ({getdata}) => {
  
  const [state, setState] = useState(false)
  const [position, setPosition] = useState(false)
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("")
  const loading = open && options.length === 0;
  var error=false;
 
  const handleCurrentPosition = () =>{
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async(position) => {
        var data
        try{
          data = await API.get(`forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}${API_KEY}&units=metric`);
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

 

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1); 

      if (active) {
        setOptions([...array]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const get = async (event, value) => {
    event.preventDefault();
    setOpen(false)
    var data
    try{
      if(event.type ==='submit'){data = await API.get(`weather?q=${inputValue}${API_KEY}&units=metric`);}
      else data = await API.get(`forecast?lat=${value.lat}&lon=${value.lng}${API_KEY}&units=metric`);
      }    
    catch(e)
      {
    error=true;
    setState(true)
      }
      getdata({data,error})
  }

  const filterOptions = createFilterOptions({
    matchFrom: 'start',
    stringify: (citylist) => citylist.city,
    limit: 8,
    
  });

  const handlerInput = (e) =>{
    setInputValue(e)
    if(e.length >=3){setOpen(true)}
    else{setOpen(false)}
  }

  return (
    <Grid container direction="row" justifyItems="center" alignItems="center">
        <Grid item sx={{background: "rgba(35, 101, 117, 0.801)", padding:'5vh', borderRadius:'3%', boxShadow:"-1px -1px 39px 4px black" }}>  
          <form onSubmit={(event,value) => get(event,value)}> 
            <Autocomplete
              onChange={(event, value) => get(event, value)}
              id="autocomplete"
              autoHighlight={true}
              sx={{ width: 300 }}
              open={open}
              freeSolo={true}
              getOptionLabel={(option) => (option===true) ? `${option.city} ${option.country}` : ""}
              renderOption={(props, option) =>(
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
                )}
              options={options}
              loading={loading}
              filterOptions={filterOptions}
              renderInput={(params) => (
                <Paper elevation={8}>
                  <TextField onChange={(e)=>handlerInput(e.target.value)}
                    {...params}
                    label="Enter a city"
                    variant="filled"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {loading ? <CircularProgress color="inherit" size={20} /> : null}
                          {params.InputProps.endAdornment}
                          <IconButton className="" onClick={handleCurrentPosition} ><GpsFixedIcon/></IconButton>
                        </>
                  ),}}/></Paper>)}/>
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
  );
}

export default WeatherForm;
