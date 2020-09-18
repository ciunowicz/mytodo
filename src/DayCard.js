import React from 'react';
import moment from 'moment';
import 'moment/locale/pl'

class DayCard extends React.Component {

   set_img = (id) => {
    
    let img;

    if(id >= 200 && id <=232) { img = 'day_rain_thunder.png';  }
      else if(id >= 300 && id <= 321) { img = 'rain.png';  }
        else if(id >= 500 && id <= 504) { img = 'day_rain.png';  }
          else if(id >= 520 && id <= 531) { img = 'rain.png';  }
            else if(id >= 600 && id <= 622) { img = 'snow.png';  }
             else if(id >= 701 && id <= 781) { img = 'mist.png';  }
              else if(id === 511 || (id >= 800  && id <= 804)) { 
                    
                  switch(id) {
                      case 511:   img = 'sleet.png'; break;
                      case 800:   img = 'day_clear.png'; break;
                      case 801:   img = 'day_partial_cloud.png'; break;
                      case 802:   img = 'day_partial_cloud.png'; break;
                      case 803:   img = 'day_partial_cloud.png'; break; 
                      case 804:   img = 'overcast.png'; break;
                      default:    img = ''; break;
                    }
               }
                else { img = 'day_partial_cloud.png'; }
                           
    return img;

   }

    render() {
      
        let newDate = new Date();
        const weekday = this.props.reading.dt * 1000;
        if(this.props.lang !== 'pl') { moment.locale('en'); }
        newDate.setTime(weekday)
        // const imgURL = `owf owf-${this.props.reading.weather[0].id} owf-5x`
  
       const image_name = this.set_img(this.props.reading.weather[0].id);
       const imgURL = "/img/"  + image_name;
     

       
      return  <div className="cart">
      <div className="day">{moment(newDate).format('dddd')}</div>
      <div className="data">{moment(newDate).utc().format('MMMM D')}</div>
      
      <div className="icon">
        <img className="weather_img" src={imgURL} alt="icon"></img>
      </div>
      
      <div className="cond">{this.props.reading.weather[0].description}</div>
    
      <div className="center max">{Math.round(this.props.reading.max)}/{Math.round(this.props.reading.min)} °C</div>
    
    </div>;

    }
}

export default DayCard;