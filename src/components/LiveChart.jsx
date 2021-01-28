import React from 'react';
import io from 'socket.io-client';
//import io from "socket.io-client/dist/socket.io";

class LiveChart extends React.Component {

    componentDidMount(){
        const socket = new io('http://kaboom.rksv.net/watch', { transports: ['websocket'], rejectUnauthorized: false });
        console.log("nsc socket",socket);

        socket.emit("sub",{state:true});

        socket.on('data', function(data) {
            console.log('nsc data Response: ' + data)
            // callback(CLIENT_ACKNOWLEDGEMENT);
        })

        socket.on('error', function(error) {
            console.error('nsc Error: ' + error)
        })

        // socket.on("open", function(data){
        //     console.log('nsc onopen Response: ' + data)
        // })

        // socket.on('message', function(data) {
        //     console.log('nsc message Response: ' + data)
        // })
    }

    render(){
        return(
            <div className="live-chart-container">
                LiveChart Component
            </div>
        );
    }
}

export default LiveChart;