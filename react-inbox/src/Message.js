import React from 'react';

const Message = ({ id, subject, read, starred, selected, labels, body, manageMessage }) => {

   let rowStyle

   if (read === true && selected === true) {
     rowStyle = "row message read selected"
   } else if (read === true && !selected === true) {
     rowStyle = "row message read"
   } else if (!read === true && selected === true) {
     rowStyle = "row message unread selected"
   } else {
     rowStyle = "row message unread"
   }

   const onClick = (e) => {
     manageMessage(e)
   }

  return (
    <div id={id} className={rowStyle}  >
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox" checked={ selected } onChange={ onClick }/>
          </div>
          <div className="col-xs-2">
            <i className={ starred ? "star fa fa-star" : "star fa fa-star-o" }></i>
          </div>
        </div>
      </div>
      <div className="col-xs-11">
        <span className="label label-warning">{ labels[0] }</span>
    <span className="label label-warning">{ labels[1] }</span>
        <a href="#">
          {subject}
        </a>
      </div>
    </div>
  )
}

export default Message
