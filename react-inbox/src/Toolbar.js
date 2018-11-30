import React from 'react';

const Toolbar = (props) => {

  let unread = props.messages.map((message) => (message.read))
  let unreadCount = (props.messages.length - unread.filter(Boolean).length)
  let selected = props.messages.map((message) => (message.selected))
  let selectedCount = selected.filter(Boolean).length

  let checkButtonStyle
  let disabled

  if (selectedCount === 0) {
    checkButtonStyle = "fa fa-square-o"
    disabled = "disabled"
    } else if (selectedCount === props.messages.length) {
    checkButtonStyle = "fa fa-check-square-o"
    disabled = ""
    } else {
    checkButtonStyle = "fa fa-minus-square-o"
    disabled = ""
  }

  const onTBarClick = (e) => {
    props.manageToolbar(e)
  }

  return(
  <div onClick = { onTBarClick } className="row toolbar" >
    <div className="col-md-12">
      <p className="pull-right">
        <span className="badge badge">{unreadCount}</span>
        {(unreadCount === 1) ? "unread message" : "unread messages"}
      </p>

      <button className="btn btn-default" data-name="checkAll">
        <i className={checkButtonStyle} data-name="checkAll"></i>
      </button>

      <button className="btn btn-default" data-name="markRead" disabled={disabled}>
        Mark As Read
      </button>

      <button className="btn btn-default" data-name="markUnread" disabled={disabled}>
        Mark As Unread
      </button>

      <select className="form-control label-select" disabled={disabled}>
        <option>Apply label</option>
        <option value="dev">dev</option>
        <option value="personal">personal</option>
        <option value="gschool">gschool</option>
      </select>

      <select className="form-control label-select" disabled={disabled}>
        <option>Remove label</option>
        <option value="dev">dev</option>
        <option value="personal">personal</option>
        <option value="gschool">gschool</option>
      </select>

      <button className="btn btn-default" disabled={disabled}>
        <i className="fa fa-trash-o"></i>
      </button>
    </div>
  </div>
)}
export default Toolbar
