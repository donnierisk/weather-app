import React, {Component} from 'react';
import axios from 'axios';

class Dashboard extends Component {
    
    state = {
        loaded:false,
        latitude:0,
        longitude:0
    }
    componentDidMount(){
        this.loadDashboard();
    }

    loadDashboard(){

        this.getUserLocation();
    }

    getWeatherData(){
        axios({
            method:'get',
            url:`http://api.openweathermap.org/data/2.5/weather?lat=${this.state.latitude}&lon=${this.state.longitude}&APPID=53f9d8e4213222cf517d86dc406d67fc`})
            .then((response) =>{
            console.log(response.data);
            this.setState({loaded:true})
          });
    }

    getUserLocation() {
      
        if (!navigator.geolocation){
          alert("Geolocation is not supported by your browser");
          return;
        }
      
        const success = (position) =>{
            const latitude  = position.coords.latitude;
            const longitude = position.coords.longitude;
        
            this.setState({
                latitude,
                longitude
            })
            this.getWeatherData();
        }
      
        const error = () =>{
          alert("Unable to retrieve your location");
        }
      
        console.log("Locating…");
      
        navigator.geolocation.getCurrentPosition(success, error);
      }

    render(){
        if(!this.state.loaded){
            return (
                <p>Loading...</p>
            );
        }
        else {
            return(
                <h2>Dashboard</h2>
            );
        }
    }
    
}

export default Dashboard;

