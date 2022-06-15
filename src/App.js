import './App.css';
import {useState} from "react";
import WeatherForm from "./components/weatherForm/formsearch";
import WeatherInfo from './components/weatherInfo/weatherInfo';
import { useTransition, animated } from 'react-spring';



function App() {

 
  const [bgstate, setBgState] = useState("");
  const [endpoint, setEndpoint] = useState("");
  const [open, setOpen] = useState(true);
  const transition = useTransition(open, {
    from: { position: 'absolute', opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    reverse: open,
    delay: 200,
  })
 

 const getdata = (getdata) => {
  
  setEndpoint(getdata.data)
  setOpen(getdata.error)
  setBgState("bg"+getdata.data.data.list[0].weather[0].icon)

 }


 const defaultComponent = (defaultComponent) => {
  setOpen(defaultComponent);
  setBgState("")
 }
 
  return (
    
    
    <div className={bgstate}>
      <div className='App-header'>
        {transition(({ opacity }, item) => item ? (
          <animated.div
            style={{
              position: 'absolute',
              opacity: opacity.to({ range: [0.0, 1.0], output: [0, 1] }),
            }}>
            <WeatherForm getdata={getdata} />
          </animated.div>
        ) : (
          <animated.div
            style={{
              opacity: opacity.to({ range: [1.0, 0.0], output: [1, 0] }),
            }}>
            <WeatherInfo countryWeather={endpoint?.data} change={defaultComponent}/>
          </animated.div>
        )
        )}
      </div>
    </div> 
        
        
);
};


export default App;
