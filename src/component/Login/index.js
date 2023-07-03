import {Component} from 'react'
import Cookies from 'js-cookie'
import {Navigate} from 'react-router-dom'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css';


class Login extends Component{
    state={username:"",password:"",error:false,direct:false}

    success=()=>{
        const token="akhil12345kvs"
        Cookies.set("jwt_Token",token,{expires:30})
     
    }
    
    enterusername=(event)=>{
        this.setState({username:event.target.value})
    }

    enterpassword=(event)=>{
             this.setState({password:event.target.value})
    }

    fileSubmit=(event)=>{
        event.preventDefault()
        const {username,password}=this.state
        console.log(username) 
        if ((username==="Akhil222")&& (password==="akhilsai222")){
            this.success()
            this.setState({direct:true})
        }else{
            this.setState({error:true})

        }
    }

  


    render(){
        const {username,password,error,direct}=this.state
        const token=Cookies.get("jwt_Token")
        if (token!==undefined){
           return <Navigate to="/" replace={true}/>
        }
      
        return(
            <div className="loginCont">
                <div className="cont">
                <h1 className="head">User Account</h1>
                <form onSubmit={this.fileSubmit}>
                    <label className="label" htmlFor="user">Username</label>
                    <input className="input" id="user" type="text" placeholder="Enter Username" value={username} onChange={this.enterusername} />
                    <label className="label" htmlFor="password" > Password</label>
                    <input className="input" id="password" type="password" placeholder="Enter Password" value={password} onChange={this.enterpassword}/>
                    <button className="button" type="submit">Login</button>
                </form>
                {error && <p className="para">*Invalid Credientials</p>}
                {direct && <Navigate to="/" replace={true}/>}
                </div>
            </div>

        )
    }
}

export default Login