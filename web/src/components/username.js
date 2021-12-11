import React, {useState} from 'react'
import {useNavigate, Route, Routes} from 'react-router-dom';
import { MsgCard } from './msgCard'
import io from 'socket.io-client'
import {Tl} from './tl'

const socket = io('http://localhost:4000')


export const Username = () => {
    let navigate = useNavigate()
    const [name, setName] = useState()

    function usernameInput(e){
        setName(e.target.value)
        console.log(name)
    }
    
    function usernameFormSubmitted (e){
        e.preventDefault();
        console.log('here');
        socket.emit('username', name); 
        navigate("./tl", {replace:true})
    }

 return(
    <div className='username-box'>
        <form  onSubmit={usernameFormSubmitted}>
            <div className='label-box'><label for='username'>Enter a username</label></div>
            <div className='input-box'>
                <input type='text' pattern='^[A-Za-z]{1,}$' className='input'name='username' id='username' onChange={usernameInput}/>
                <input type='submit' className='btn'/>
            </div>
        </form> 
    </div>
 ) 
 /*
 
          <div className="modal modal-box" tabindex="-1" role="dialog" id='friendModal'>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <p className="modal-title">Welcome to Chat With Friends, enter a username to get started</p>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form className='input-box' onSubmit={usernameFormSubmitted}>
                        <input type='text' pattern='^[A-Za-z]{1,}$' className='input'name='username' id='username' onChange={usernameInput}/>
                        <input type='submit' className='btn'/>
                </form>
                </div>
              </div>
            </div>
      </div>
 */
} 
//onClick={() => {navigate('/dmsDisplay')}}