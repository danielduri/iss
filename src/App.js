import './App.css';
import {Component} from "react";
import Info from "./Info";
import Button from 'react-bootstrap/Button';

class App extends Component {
    constructor() {
        super();
        this.state = {
            success: true,
            continue: true,
            longitude: 0,
            latitude: 0,
            date: new Date().toLocaleString()
        }
    }

    timer (ms){
        return new Promise(res => setTimeout(res, ms));
    }

    async fetchData(){
        this.log();
        if(this.state.continue){
            const url = "http://api.open-notify.org/iss-now.json";
            let json = await fetch(url);
            let data = await json.json();
            this.setState({
                success: (data.message === "success"),
                longitude: data.iss_position.longitude,
                latitude: data.iss_position.latitude,
                date: new Date().toLocaleString()
            })
        }
        await this.timer(5000);
    }

    log(){
        console.log("state:", this.state.continue);
    }

     async componentDidMount() {
        //setTimeout(this.log, 5000);
         while(true){
             await this.fetchData();
         }
    }

    async trackButton() {
        const newState = !(this.state.continue);
        this.setState({
            continue: newState
        })
        //await this.fetchData();
    }

     render() {
        let buttonText = "Stop tracking";
        let buttonVariant = "danger";
        let appText = "The ISS is currently* at";
        if(!this.state.continue){
            buttonText = "Start tracking";
            buttonVariant = "success"
            appText = "The ISS was at";
        }
        if (this.state.success) {
            return (
                <div className="App">
                    <header className="App-header">
                        <p>
                            {appText} <code>{this.state.longitude}, {this.state.latitude}</code> on {this.state.date}.
                        </p>
                        <Button variant={buttonVariant} onClick={() => this.trackButton()}>
                            {buttonText}
                        </Button>
                        <Info></Info>

                    </header>
                </div>
            );
        } else {
            return (
                <div className="App">
                    <header className="App-header">
                        <p className={"red"}>
                            The ISS API is currently down.
                        </p>
                        <Info></Info>
                    </header>
                </div>
            );
        }
    }
}

export default App;
