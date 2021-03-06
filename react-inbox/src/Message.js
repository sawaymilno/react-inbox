import React from 'react';

const Message = ({ id, subject, read, starred, selected, labels, body, manageMessage }) => {

   const onClick = (e) => {
     manageMessage(e)
   }

  return (
    <div  data-id={id} data-name="rowStyle" className={`row message ${read ? "read" : "unread"} ${selected ? "selected" : ""}`}   >

      <div className="col-xs-1">
        <div className="row">

          <div className="col-xs-2">
            <input type="checkbox" onChange={ onClick }  data-checked={id} data-name="selected" checked={ selected ? true : false }/>
          </div>

          <div className="col-xs-2">
            <i onClick={ onClick } data-star={id} data-name="starred" className={ starred ? "star fa fa-star" : "star fa fa-star-o" } ></i>
          </div>

        </div>
      </div>

      <div className="col-xs-11">

        <span data-label0={id} data-name="labels[0]" className="label label-warning">{ labels[0] }</span>

        <span data-label1={id} data-name="labels[1]" className="label label-warning">{ labels[1] }</span>

        <span data-label2={id} data-name="labels[2]" className="label label-warning">{ labels[2] }</span>

        <a data-subject={id} data-name="subject" href="subject">
          {subject}
        </a>
      </div>

    </div>
  )
}

export default Message
