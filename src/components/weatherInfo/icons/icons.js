import {ReactComponent as Thunder} from "./animated/thunder.svg"
import {ReactComponent as Day} from "./animated/day.svg"
import {ReactComponent as Night} from "./animated/night.svg"
import {ReactComponent as CloudyDay} from "./animated/cloudyday.svg"
import {ReactComponent as CloudyNight} from "./animated/cloudynight.svg"
import {ReactComponent as ScatteredClouds} from "./animated/scatteredclouds.svg"
import {ReactComponent as Cloudy} from "./animated/cloudy.svg"
import {ReactComponent as Rain} from "./animated/rainy.svg"
import {ReactComponent as RainyDay} from "./animated/rainyday.svg"
import {ReactComponent as RainyNight} from "./animated/rainynight.svg"
import {ReactComponent as Snowy} from "./animated/snowy.svg"



const SvgComponent = ({name}) => {

  switch(name){
    case '01d':
      return(<Day/>);

    case '01n':
      
      return(<Night/>);

    case '02d':
      return(<CloudyDay/>);

    case '02n':
      return(<CloudyNight/>);
      
    case '03d':
    case '03n':
      return(<ScatteredClouds/>);
    
    case '04d':
    case '04n':
      return(<Cloudy/>);
    
    case '09d':
    case '09n':
      return(<Rain/>);

    case '10d':
      return(<RainyDay/>);

    case '10n':
      return(<RainyNight/>);

    case '11d':
    case '11n':
      return(<Thunder/>);

    case '13d':
    case '13n':
      return(<Snowy/>);

      default: return(null)
  }
  
  

  
}

export default SvgComponent
