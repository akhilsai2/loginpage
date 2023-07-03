import { Component } from 'react'
import { Navigate, Link } from 'react-router-dom'
import Cookies from "js-cookie"

import './index.css'
import { MY_NAME } from '../../env'

class Home extends Component {
    state = { LoginGo: false, fetchedData: [] }
    remove = () => {
        Cookies.remove("jwt_Token")
        this.setState({ LoginGo: true })
    }






    render() {
        // console.log("render")
        const { LoginGo } = this.state
        const token = Cookies.get("jwt_Token")
        if (token === undefined) {
            return <Navigate to="/login" replace={true} />
        }
        return (
            <>
                {LoginGo && <Navigate to="/login" replace={true} />}

                <nav className="nav-cont">
                    <Link to="/" className="navi">
                        <img src="https://png.pngtree.com/png-clipart/20201208/original/pngtree-red-and-black-logo-png-image_5517319.jpg" alt="hand" className="image" />
                    </Link>
                    <Link to="/userdata" className="navi">
                        <p className="userlink">Data</p>
                        <p>{MY_NAME}
                        </p>
                    </Link>
                    <button className="logBtn" type="button" onClick={this.remove}>LogOut</button>

                </nav>
                <div className="home-cont">
                    <h1 className="homehead">
                        You Live Young You Live Free
                    </h1>
                </div>
            </>

        )
    }
}

export default Home