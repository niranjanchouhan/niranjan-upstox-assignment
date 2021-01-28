import React from 'react';
import Home from './Home';
import LiveChart from './LiveChart';

class Dashboard extends React.Component {

    render(){
        return(
            <div className="container">
                <Home />
                <LiveChart />
            </div>
        );
    }
}

export default Dashboard;