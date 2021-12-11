import React from 'react'

export const HistoryCard = (props) => {
 return(
    <div className='msg-card-box' data-toggle="modal" data-target="#dmModal">
        <div className='name'>{props.name}</div>
        <div className='text'>{props.value}</div>
    </div>
 )  
}

export const DmCard = (props) => {
    return(
        <div></div>
    )
}