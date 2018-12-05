import React from 'react'
import Message from './Message'

const MessageList = (props) => {

  return (
    <div className='list-group-item'>

        {props.messages.map((message, i) => {

          return (<Message
            key={i}
            id={message.id}
            subject={message.subject}
            read={message.read}
            starred={message.starred}
            selected={message.selected}
            labels={message.labels}
            body={message.body}
            manageMessage={props.manageMessages}
            />)
      }
    )}
    </div>
  )
}

export default MessageList
