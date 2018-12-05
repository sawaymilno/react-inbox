import React from 'react'

const Compose = (props) => {

  const onSubmit = (e) => {
    e.preventDefault()
    let form = e.target
    let newMessage = {
      //I'm aware that this "id" isn't sufficient but using it currently to focus on other items.
      id: Math.floor(Math.random() * 100),
      subject: form.subject.value,
      body: form.body.value,
      labels: [],
      starred: false,
      read: false
    }

    props.sendMessage(newMessage)
    form.subject.value=""
    form.body.value=""
  }

  return (
    <div onSubmit={onSubmit} className="compose">
    <form className="form-horizontal well">
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
  </div>)
}

export default Compose
