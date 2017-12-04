import React, {Component} from 'react';
import axios from 'axios';
import Temperature from './Temperature';

class Dashboard extends Component {
    
    state = {
        loaded:false,
        latitude:0,
        longitude:0,
        temperature:0,
        iconSource:'',
        errorState:false
    }
    componentDidMount(){
        //app starting point below
        this.getUserLocation();
    }

    //The below sends a request to the openweathermap to get weather data for current user location
    getWeatherData(){
        axios({
            method:'get',
            url:`http://api.openweathermap.org/data/2.5/weather?lat=${this.state.latitude}&lon=${this.state.longitude}&APPID=53f9d8e4213222cf517d86dc406d67fc`})
            .then(response =>{
                console.log(response.data);
                this.setState({
                    loaded:true,
                    temperature:(response.data.main.temp-273.15),
                    iconSource: 'http://openweathermap.org/img/w/'+response.data.weather[0].icon+'.png',
                })
          }).catch(error =>{
            alert("We could not find weather data for your location");
            this.setState({errorState:true});
          });
    }

    //Gets the user's location using geolocation HTML5 API 
    getUserLocation = () => {
        this.setState({loaded:false,errorState:false})
        if (!navigator.geolocation){
          alert("Geolocation is not supported by your browser");
          this.setState({errorState:true});
          return;
        }
      
        const success = (position) =>{
            const latitude  = position.coords.latitude;
            const longitude = position.coords.longitude;
        
            this.setState({
                latitude,
                longitude
            })
            //Once the user's location has been found, update the state to reflect that and call the weather API with your new info
            this.getWeatherData();
        }
      
        const error = () =>{
          alert("Unable to retrieve your location");
          this.setState({errorState:true});
        }
      
        console.log("Locating…");
      
        navigator.geolocation.getCurrentPosition(success, error);
      }

    render(){
        if(this.state.errorState === true){
            return(
            <div id='root'>
                <div className='container'>
                <button id='reload' onClick={this.getUserLocation}>Click here to try again</button>
                </div>
            </div>   
            );
        }
        else if(!this.state.loaded){
            return (
                <div id='root'>
                    <div className='container'>
                        <p>Loading...</p>
                    </div>
                </div>
            );
        }
        else {
            return(
                <div id='root'>
                    <div className='container'>
                        <button id='reload' onClick={this.getUserLocation}>Reload</button>
                        <h2>Welcome to your personalised Weather report!</h2>
                        <Temperature temperature={this.state.temperature} iconSource={this.state.iconSource}/>
                    </div>
                </div>
            );
        }
    }
    
}

export default Dashboard;

