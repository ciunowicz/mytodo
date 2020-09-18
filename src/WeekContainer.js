import React from 'react';
import apiConfig from './apiConf';
import DayCard from './DayCard';



class WeekContainer extends React.Component {

    state = {
        dailyData: []
      }

  constructor(props) {
    super(props);
    
    this.Lang = (this.props.lang === undefined ?  "pl": this.props.lang) ;
    this.City =  (this.props.city === undefined ?  "Warsaw": this.props.city) ;
    this.weatherURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + this.City +  "&units=metric&lang=" + this.Lang + "&appid=" + apiConfig.owmKey;
  }

formatDayCards = () => {
     return this.state.dailyData.map((reading, index) => <DayCard reading={reading} key={index} lang={this.props.lang}/>)
}
    
  render() {
    
    return (
        <div>
        {this.formatDayCards()}
      </div>
    )
  }


  componentDidMount = () => {
      
  
  fetch(this.weatherURL)
    .then(res => res.json())
    .then(data => {
      const Data_val = [];
      const mydata = [...data.list];
      const dailyData = data.list.filter(reading => reading.dt_txt.includes("15:00:00"));
      

  mydata.forEach((item1) => {
    let data = item1.dt_txt.split(" ");
    let datais = false;
   
      Data_val.forEach((item2) => {
          if(Data_val.length > 0 && item2.date_txt.includes(data[0])) { datais = true; }
       });

      if(!datais) {  Data_val.push({date_txt: data[0], num_max: [], num_min: []}); }    
  });
        
    mydata.forEach((item1) => {
      let data = item1.dt_txt.split(" ");

      Data_val.forEach((item2)=> { 
        if(item2.date_txt === data[0]) { 
           item2.num_max.push(item1.main.temp_max);
           item2.num_min.push(item1.main.temp_min);
          } 
           });    
    });

    Data_val.forEach((item)=> { 
         item.max = Math.max(...item.num_max);
         item.min = Math.min(...item.num_min);
       
         });

     Data_val.forEach((item) => {
         dailyData.forEach((item2) => {
          let data = item2.dt_txt.split(" ");
           
            if(item.date_txt === data[0]) { 
                 item2.max=item.max;
                 item2.min=item.min;
            } 
        });

     })


      this.setState({
        dailyData: dailyData
      })
    })
   

  }
}

export default WeekContainer;