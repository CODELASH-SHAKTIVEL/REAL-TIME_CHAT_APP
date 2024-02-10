import React , {useState} from 'react'
import {Link} from 'react-router-dom'
import img1 from '../../assets/images.png'
import './Join.css'

// Return it Back to Chat section 
let user ;
const sendUser = () => {
  user = document.getElementById('joinInput').value;
  document.getElementById('joinInput').value = ""; // Clear the input field after getting the value
}

const Join = () => {

    const [name, setname] = useState("");

    return (
        <div className="JoinPage">
            <div className="JoinContainer">
                <img src={img1} alt="logo" />
                <h1>CHIT CHAT</h1>
                <input onChange={(e) => setname(e.target.value)} placeholder="Enter Your Name" type="text" id="joinInput" />
                <Link onClick={(event) => !name ? event.preventDefault() : null} to="/chat">  <button onClick={sendUser} className="joinbtn">Login In</button></Link>
            </div>
        </div>
    )
}



export default Join
export { user }


//IMPORTANT 
//event.preventDefault() will prevent the browser from following the link.
