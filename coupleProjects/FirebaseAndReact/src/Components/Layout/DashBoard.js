import React, { Component } from 'react';
import Clients from '../Clients/Clients';
import SideBar from '../Layout/SideBar';

class DashBoard extends Component {
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col m10">
                        <Clients />
                    </div>
                    <div className="col m2">
                        <SideBar />
                    </div>
                </div>
            </div>
        )
    }
}

export default DashBoard;