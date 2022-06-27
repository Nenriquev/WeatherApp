import "../weatherForm/styles.css"
import {Container} from "react-bootstrap"
import { useSpring, animated } from "react-spring";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Tooltip, Zoom, IconButton, Grid } from "@mui/material";
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import AirIcon from '@mui/icons-material/Air';
import OpacityIcon from '@mui/icons-material/Opacity';
import UmbrellaIcon from '@mui/icons-material/Umbrella';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SvgComponent from "./icons/icons";








const WeatherInfo = ({countryWeather, change}) => {


  const code = countryWeather?.city?.country?.toLowerCase();
  const ico = countryWeather?.list[0]?.weather[0]?.icon;
  const windSpeed = ((countryWeather?.list[0]?.wind?.speed)*18)/5;
  const props = useSpring({ to: { opacity: 1 }, from: { opacity: 0 },delay: 800 })
  const propcard1 = useSpring({ to: { opacity: 1 }, from: { opacity: 0 },delay: 1100 })
  const propcard2 = useSpring({ to: { opacity: 1 }, from: { opacity: 0 },delay: 1400 })
  const propcard3 = useSpring({ to: { opacity: 1 }, from: { opacity: 0 },delay: 1700 })


  const BackHome = (e) => {
    e.preventDefault()
    change(true)
  }




  const weatherDate = (date) =>{

    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday',];
    const numberDay = new Date(date).getDay();
    const nameDay = days[numberDay];
    return(nameDay)
    }


  


  const TempData = (day) =>{

      const temps = [];
      if(day==='first'){
      for(let i=9; i<=16; i++ ){
        temps.push(countryWeather?.list[i]?.main?.temp)
      }
      return({max: Math.max(...temps), min: Math.min(...temps)})}

      if(day==='second'){
        for(let i=17; i<=24; i++ ){
          temps.push(countryWeather?.list[i]?.main?.temp)
        }
        return({max: Math.max(...temps), min: Math.min(...temps)})}

        if(day==='third'){
          for(let i=25; i<=32; i++ ){
            temps.push(countryWeather?.list[i]?.main?.temp)
          }
          return({max: Math.max(...temps), min: Math.min(...temps)})}
    
  }
      
   


  


  return (  
      <div className="App-header">

        <Grid className="home">
          <Tooltip TransitionComponent={Zoom} title="Home">
            <IconButton onClick={(e) => BackHome(e)} variant="text"><ArrowBackIcon fontSize="large" className="iconcolor" /></IconButton>
          </Tooltip>
        </Grid>

          <h2 className="title">{countryWeather?.city?.name} <img className="flag" src={`https://flagcdn.com/w2560/${code}.png`} alt="#"></img></h2>

        <Container>
            <animated.div className="forecastcard" style={props}>
             <h1 className="temp">{Math.round(countryWeather?.list[0]?.main?.temp)}° <SvgComponent name={ico}/></h1>
             <h6 className="description">{countryWeather?.list[0]?.weather[0]?.description}</h6>
             <h6 className="feel"> <DeviceThermostatIcon/> {Math.round(countryWeather?.list[0]?.main?.feels_like)}°</h6>
             <h6 className="humidity"> <OpacityIcon/> {Math.round(countryWeather?.list[0]?.main?.humidity)}%</h6>
             <h6 className="windspeed"> <AirIcon/> {Math.round(windSpeed)}k/h</h6>
             <h6 className="pop"> <UmbrellaIcon/> {Math.round(countryWeather?.list[0]?.pop*100)}%</h6>
            </animated.div>
        
            <Grid className="carrousel">
                <animated.div style={propcard1} className="card">
                  <h6 className="card-day">{weatherDate(countryWeather?.list[9].dt_txt)}</h6>
                  <h5 className="forecasttemp">{Math.round(countryWeather?.list[9]?.main?.temp)}°</h5> 
                  <div className="svgicon"><SvgComponent name={countryWeather?.list[9]?.weather[0]?.icon}/></div>
                  <h6 className="upward"><ArrowUpwardIcon/>{Math.round(TempData('first').max)}°</h6>
                  <h6 className="downward"><ArrowDownwardIcon/>{Math.round(TempData('first').min)}°</h6>
                  <h6 className="forecastpop"> <UmbrellaIcon/> {Math.round(countryWeather?.list[9]?.pop*100)}%</h6>
                </animated.div>

                <animated.div style={propcard2} className="card">
                  <h6 className="card-day">{weatherDate(countryWeather?.list[16].dt_txt)}</h6>
                  <h5 className="forecasttemp">{Math.round(countryWeather?.list[16]?.main?.temp)}°</h5>
                  <div className="svgicon"><SvgComponent name={countryWeather?.list[16]?.weather[0]?.icon}/></div>
                  <h6 className="upward"><ArrowUpwardIcon/>{Math.round(TempData('second').max)}°</h6>
                  <h6 className="downward"><ArrowDownwardIcon/>{Math.round(TempData('second').min)}°</h6>
                  <h6 className="forecastpop"> <UmbrellaIcon/> {Math.round(countryWeather?.list[16]?.pop*100)}%</h6>
                </animated.div>

                <animated.div style={propcard3} className="card">
                  <h6 className="card-day">{weatherDate(countryWeather?.list[24].dt_txt)}</h6>
                  <h5 className="forecasttemp">{Math.round(countryWeather?.list[24]?.main?.temp)}°</h5> 
                  <div className="svgicon"> <SvgComponent name={countryWeather?.list[24]?.weather[0]?.icon}/></div>
                  <h6 className="upward"><ArrowUpwardIcon/>{Math.round(TempData('third').max)}°</h6>
                  <h6 className="downward"><ArrowDownwardIcon/>{Math.round(TempData('third').min)}°</h6>
                  <h6 className="forecastpop"> <UmbrellaIcon/> {Math.round(countryWeather?.list[24]?.pop*100)}%</h6>
                </animated.div>
             
            </Grid>

          </Container>
        </div>
      
    
  );
}




 
export default WeatherInfo;
