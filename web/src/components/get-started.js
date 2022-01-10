import React, {useState, memo} from 'react'
import io from 'socket.io-client'
import $ from 'jquery'

const socket = io('http://localhost:4000')

export const GetStarted = () => {

const [clickBtn, setClickBtn] = useState(true)
const [dm, setDm] = useState(false)
const [hello, setHello] = useState(false)
const [name, setName] = useState('')
const [msg, setMsg] = useState('')
const [chat, setChat] = useState([])

let username = name
socket.on('message', ({name, msg}) => {
    if (username == name ){
        let name = 'me'
        setChat([...chat, {name, msg}])
    }else{
        setChat([...chat, {name, msg}])
    }
    
    //console.log(chat, name, msg)
  })

function usernameInput(e){
    setName(e.target.value)
}
    
function usernameFormSubmitted (e){
    e.preventDefault();
    setClickBtn(false)
    setDm(true) 
    setHello(true) 
    socket.emit('username', name); 
    $('#usernameModal').hide()
    $('.modal-backdrop').hide()
}
function typingMsg(e){
  setMsg(e.target.value)
}

function sentMsg (e){
  e.preventDefault();
  socket.emit('msgSent', {name, msg})
  setMsg('')
}

function displayChat(){
    console.log(chat)
    return (
        <div className='msg-area'>
        {chat.map((item,index) => (
            <div key={index} className='text-box'>
                <div className='sender'>{item.name}</div>
                <div className='msg-content'>{item.msg}</div>
            </div>
            ))}
        </div>
    )
   }

    return(
        <div className='messaging '>
        <div className='header'>
            <div className='heading'><p>Chat with friends</p></div>
            {hello && <div className='hi-msg'><p>hi <span>{name}</span></p></div>}
        </div>
        <div className='msg-box'>
            {clickBtn && (
                <div className='get-started container-fluid'>
                    <div className='text'>
                        <p>Welcome to Chat With Friends, you can send messages to your friends with this application.<br/>
                        Get started by entering your name.</p>
                    </div>
                    <div><button className='get-started-btn' data-toggle="modal" data-target="#usernameModal">get started</button></div>
                </div>
            )}
            {dm && (
                <div>
                        {displayChat()}
                    <form className='chat-form' onSubmit={sentMsg}>
                        <input type='text' value={msg} className='chat-input' onChange={typingMsg}/>
                        <input type='submit' value='Send' className="chat-button"  />
                    </form>
                </div>
            )}
        </div>
        



        {/*enter username modal*/}
        <div className="modal modal-box username-modal" tabIndex="-1" role="dialog" id='usernameModal'>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <p className="modal-title">Enter your name<br/></p>
                      {<button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                      </button>}
                    </div>
                    <div className="modal-body">
                        <form className='input-box' onSubmit={usernameFormSubmitted} >
                            <input type='text' className='input'name='username' id='username' onChange={usernameInput}/>
                            <input type='submit' className='btn'/>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    )
}