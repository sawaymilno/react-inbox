import React from 'react'
import Message from './Message'

const MessageList = (props) => {

  return (
    <div className='list-group-item'>
        {/* <Message manageMessages={props.manageMessages}/> */}
        {props.messages.map((message, i) => {

          //console.log('Inside map props', props)
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
    <div className={props.isHidden ? "compose" : "hidden"}>
    <form className="form-horizontal well" >
  <div className="form-group">
    <div className="col-sm-8 col-sm-offset-2">
      <h4>Compose Message</h4>
    </div>
  </div>
  <div className="form-group">
    <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
    <div className="col-sm-8">
      <input type="text" className="form-control" id="subject" placeholder="Enter a subject" name="subject"/>
    </div>
  </div>
  <div className="form-group">
    <label htmlFor="body" className="col-sm-2 control-label">Body</label>
    <div className="col-sm-8">
      <textarea name="body" id="body" className="form-control"></textarea>
    </div>
  </div>
  <div className="form-group">
    <div className="col-sm-8 col-sm-offset-2">
      <input type="submit" value="Send" className="btn btn-primary"/>
    </div>
  </div>
</form>
</div>
    </div>

  )
}

export default MessageList
