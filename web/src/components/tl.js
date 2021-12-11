import React, {useState} from 'react'
import { MsgCard } from './msgCard'
import {Username} from './username'
import io from 'socket.io-client'

const socket = io('http://localhost:4000')
export const Tl = () => {
  
//find friend modal
const [friend, setFriend] = useState()

function friendsUsername(e){
  setFriend(e.target.value)
}

function friendsUsernameFormSubmitted (e){
  e.preventDefault();
  socket.emit('friend', friend); 
}
//dm modal 
const [msg, setMsg] = useState()

function typingMsg(e){ 
  setMsg(e.target.value)
  console.log(msg)
}

function sentMsg (e){
  e.preventDefault();
  console.log('here');
  socket.emit('a-msg', msg); 
  setMsg('')
}

socket.on('receive', chat => {
  console.log(chat)
})
socket.on('id-change', name => {
  console.log(`${name}`)
})
const chat = {
  /*shygirlAndDd : [
    {
        from: 'shygirl',
        msg: 'girllllllll!!!!' 
      },
    {
        from: 'me',
        msg: 'whattt!!!!!!!!'
      },
    {
        from: 'shygirl',
        msg: 'guesss!!!!'
  }
] */
}


/*function dm(chat){
 console.log('here')
  if (chat.shygirlAndDd.length > 0){
    console.log('here2')
    chat.shygirlAndDd.map(({from, msg}) => {
    return <div><div>${from}</div><div>${msg}</div></div>;
  
    //return('onScreen')
    })
  }
  }*/
 return(
    <div className='messaging'>
        <div className='header'>
            <div className='heading'><p>Chat with friends</p></div>
            <div className='hi-msg'><p>hi <span>shygirl</span></p></div>
          </div>
          <div className='msg-box'>
            <div className='msgCard'>
                <MsgCard name='micheal' value='hey, call me?'/>
                <MsgCard name='fAv' value='girl whats up? you wont believe who i saw shopping at the thrift store???????? ashleyyyy! can you fricken imagine? i was so embarrased for her likeeee? God forbid sha , she was so embarrased to see me lol'/>
            </div>
            <div className='search show-modal' data-toggle="modal" data-target="#friendModal"><span>icon</span></div>
          </div>


          <div className="modal modal-box" tabindex="-1" role="dialog" id='friendModal'>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <p className="modal-title">Enter a friends username to search for  friend</p>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form className='search-box' onSubmit={friendsUsernameFormSubmitted}>
                    <input type='text' className='input' onChange={friendsUsername}/>
                    <input type='submit' placeholder='search' className="button" data-dismiss="modal"  />
                  </form>
                </div>
              </div>
            </div>
      </div>

      <div className="modal dm-modal-box" tabindex="-1" role="dialog" id='dmModal'>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <p className="modal-title">Micheal</p>
              
            </div>
            <div className="modal-body">
              <div>
                <div className='dm'></div>
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
// data-toggle="modal" data-target="#exampleModal"conc