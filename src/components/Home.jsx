import React from 'react';
import { BASE_URL } from '../utils/constants';
import Chart from './Chart';
import { convertMillisecondsToDate } from '../utils/appUtils';

class Home extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            historyData: []
        }
    }

    componentDidMount(){
        const url = BASE_URL + 'historical?interval=1';
        let headers = new Headers();
        headers.append("Accept-Encoding","gzip");
        fetch(url, {header: headers}).then(res => res.text()).then(data => {
            const dataArr = JSON.parse(data);
            const jsonData = [];
            for(let i=0; i<dataArr.length; i++){
                const jsonObj = {};
                jsonObj.date = convertMillisecondsToDate(parseInt(dataArr[i].split(",")[0]));
                jsonObj.open = parseFloat(dataArr[i].split(",")[1]);
                jsonObj.high = parseFloat(dataArr[i].split(",")[2]);
                jsonObj.low = parseFloat(dataArr[i].split(",")[3]);
                jsonObj.close = parseFloat(dataArr[i].split(",")[4]);
                jsonObj.volume = parseFloat(dataArr[i].split(",")[5]);
                jsonData.push(jsonObj);
            }
//            console.log("historyData",JSON.stringify(jsonData));
            this.setState({historyData: jsonData});
        });
    }

    render(){
        if (this.state.historyData.length === 0) {
			return <div>Loading...</div>
		}
		return (
        <div className="home-container">
            <h6>OHLC Chart</h6>
            <Chart historyData={this.state.historyData} />
        </div>
		)
    }
}

export default Home;