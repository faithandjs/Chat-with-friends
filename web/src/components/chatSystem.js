import React, {useState} from 'react'
import io from 'socket.io-client'
import {HistoryCard} from './msgCard'
import $ from 'jquery'

const socket = io('http://localhost:4000')

export const ChatSystem = () => {
  
const [clickBtn, setClickBtn] = useState(true)
const [timeline, setTimeline] = useState(false)
const [errMsg, setErrMsg] = useState('')
const [name, setName] = useState('')
const [friend, setFriend] = useState('')
const [msg, setMsg] = useState('')
const [chat, setChat] = useState([])

socket.on('errMsg', data => {
    setErrMsg(data)
})

socket.on('foundFriend', ({friend, name}) => {
  closeModal()
  $('#dmModal').show()
  $('.modal-backdrop').show()
})

socket.on('message', ({name, msg, friend}) => {
  setChat([...chat, {name, msg}])
  //console.log(chat, name, msg)
  
})
//username modal
function usernameInput(e){
    setName(e.target.value)
}
    
function usernameFormSubmitted (e){
    e.preventDefault();
    setClickBtn(false)
    setTimeline(true) 
    socket.emit('username', name); 
    $('#usernameModal').hide()
    $('#friendModal').show()
        //$('.modal-backdrop').hide()
}

//find friend modal
function friendsUsername(e){
  setFriend(e.target.value)
  setErrMsg('')
}

function friendsUsernameFormSubmitted (e){
  e.preventDefault();
  socket.emit('friend', {friend, name}); 
}
function closeModal(){
  setErrMsg('')
  $('#friendModal').hide()
  $('.modal-backdrop').hide()
}
function showFriendModal(){
  $('#friendModal').show()
  $('.modal-backdrop').show()
}
//dm modal 
function typingMsg(e){
  setMsg(e.target.value)
}

function sentMsg (e){
  e.preventDefault();
  socket.emit('msgSent', {name, msg, friend})
  setMsg('')
}
function closeModalDm(){
  $('#dmModal').hide()
  $('.modal-backdrop').hide() 
} 
function displayChat(){
   //console.log('>>>>',chat)
   chat.forEach(({name, msg}, index) =>{
    <div>hi</div>
   //<div key={index}>{name}: <span>{msg}</span></div> 
  })
  }

    return (
        <div className='messaging '>
            <div className='header'>
                <div className='heading'><p>Chat with friends</p></div>
                <div className='hi-msg'><p>hi <span>{name}</span></p></div>
            </div>
            <div className='msg-box'>
                {clickBtn && (
                    <div className='get-started container-fluid'>
                        <div className='text'>
                            <p>Welcome to Chat With Friends, you can send messages to your friends with this application.<br/>
                            Get started by entering a username.</p>
                        </div>
                        <div><button className='get-started-btn' data-toggle="modal" data-target="#usernameModal">get started</button></div>
                    </div>
                )}
                {timeline && (
                  <div>
                    <div className='msgCard'>
                    <HistoryCard name='micheal' value='hey, call me?'/>
                    <HistoryCard name='fAv' value='girl whats up? you wont believe who i saw shopping at the thrift store???????? ashleyyyy! can you fricken imagine? i was so embarrased for her likeeee? God forbid sha , she was so embarrased to see me lol'/>
                </div>
                <div className='search show-modal' onClick={showFriendModal}><span>icon</span></div>
                </div>
                )}
            </div>
            



            {/*enter username modal*/}
            <div className="modal modal-box username-modal" tabIndex="-1" role="dialog" id='usernameModal'>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <p className="modal-title">Enter your username<br/><span>Hint: username should be a text with no whitespaces, special characters or numbers</span></p>
                          {<button type="button" className="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                          </button>}
                        </div>
                        <div className="modal-body">
                            <form className='input-box' onSubmit={usernameFormSubmitted} >
                                <input type='text' pattern='^[A-Za-z]{1,}$' className='input'name='username' id='username' onChange={usernameInput}/>
                                <input type='submit' className='btn'/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


            {/*find friend modal*/}
            <div className="modal modal-box friend-modal" tabIndex="-1" role="dialog" id='friendModal'>
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <p className="modal-title">Enter a friends username to chat with them</p>
                    <button type="button" className="close" data-dismiss="modal" onClick={closeModal}aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <form className='search-box' onSubmit={friendsUsernameFormSubmitted}>
                      <input type='text' className='input' onChange={friendsUsername}/>
                      <input type='submit' placeholder='search' className="button"   />
                    </form>
                  <p className='error'>{errMsg}</p>
                  </div>
                </div>
              </div>
            </div>

            {/*dm modal*/}
            <div className="modal dm-modal-box" tabIndex="-1" role="dialog" id='dmModal'>
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" onClick={closeModalDm} data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                    <p className="modal-title">{friend}</p>
                    
                  </div>
                  <div className="modal-body">
                    <div>
                      <div className='dm'>
                        {displayChat()}
                      </div>
                    </div>
                    <form className='chat-box' onSubmit={sentMsg}>
                      <input type='text' value={msg} className='chat-input' onChange={typingMsg}/>
                      <input type='submit' placeholder='search' className="chat-button"  />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
    )
}