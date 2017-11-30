import React, {Component} from 'react';
import axios from 'axios';

class Dashboard extends Component {
    
    state = {
        loaded:false
    }
    componentDidMount(){
        this.loadDashboard();
    }

    loadDashboard(){
        axios({
            method:'get',
            url:'http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&APPID=53f9d8e4213222cf517d86dc406d67fc'          })
            .then((response) =>{
            console.log(response.data);
            this.setState({loaded:true})
          });
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

