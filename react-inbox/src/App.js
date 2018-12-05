import React, {Component} from 'react';
import './App.css';
import Toolbar from './Toolbar'
import MessageList from './MessageList'
import Compose from './Compose'


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
    messages: [],
    compose: false
  }
}

getIds = (array) => {
  let ids = []
  for (let i = 0; i < array.length; i++) {
    ids.push(array[i].id)
  }
  return ids
}

patch = async (body) => {
        body = JSON.stringify(body)
       return await fetch("http://localhost:8082/api/messages", {
            method: "PATCH",
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: body
          })
    }

componentDidMount = async () => {
  const response = await fetch('http://localhost:8082/api/messages')
  const json = await response.json()
  this.setState(() => ({messages: json}))
}

manageMessages = (e) => {
    let modifiedMessages

    let toggleStar = () => {
      let starId = parseInt(e.target.dataset.star)
      let className = e.target.className
      let value
      console.log('starId',starId);
      if (className === "star fa fa-star") {
        value = true
        } else {
        value = false
      }
      //console.log('[0]starred before',this.state.messages[0].starred);
      modifiedMessages = this.state.messages.map((msg) => {
        if (msg.id === starId) {
          msg.starred = !value
        }
        return msg
      })

      this.patch({
        "messageIds": [starId],
        "command": "star"
      })

    }

    let toggleChecked = () => {
      let checkedId = parseInt(e.target.dataset.checked)
      let checked = e.target.checked

      modifiedMessages = this.state.messages.map((msg) => {
        if (msg.id === checkedId) {
          msg.selected = checked
        }
        return msg
      })
    }

    if (e.target.dataset.name === "starred") {
      toggleStar()
    } else if (e.target.dataset.name === "selected") {
      toggleChecked()
    }

      //this.setState({...this.state, messages: modifiedMessages})
      this.setState(() =>({...this.state, messages: modifiedMessages}))
  }

manageToolbar = (e) => {
    let dataName = e.target.dataset.name
    let dataValue = e.target.value
    let modifiedMessages

    let selected = this.state.messages.map((message) =>
        (message.selected))

    console.log('dataname',dataName);

    let toggleCheckAll = (e) => {

      let selected = this.state.messages.map((message) => (message.selected))
      let selectedCount = selected.filter(Boolean).length

      modifiedMessages = this.state.messages.map((msg) => {
        if (selectedCount === this.state.messages.length) {
          msg.selected = false
        } else {
          msg.selected = true
        }
        return msg
      })
    }
    let readUnread = (e) => {

      modifiedMessages = this.state.messages.map((msg, i) => {

       if (selected[i] === true && dataName === 'markUnread') {
         msg.read = false
       } else if (selected[i] === true && dataName === 'markRead') {
         msg.read = true
       }
        return msg
      })

      let checked = this.state.messages.filter(msg => msg.selected)
      let ids = this.getIds(checked)
      console.log('checked',checked,'ids',ids);
      let read
      if (dataName === 'markRead') {
        read = true
      } else {
        read = false
      }
      this.patch({
            "messageIds": ids,
            "command": "read",
            "read": read
        })

    }
    let applyRemove = (e) => {

      modifiedMessages = this.state.messages.map((msg, i) => {
           // console.log('in mod map',selected[i],dataName,dataValue);
       if (selected[i] === true && dataName === 'addLabel' && dataValue === 'dev' ) {
         msg.labels[0] = dataValue
       } else if (selected[i] === true && dataName === 'addLabel' && dataValue === 'personal' ) {
         msg.labels[1] = dataValue
       } else if (selected[i] === true && dataName === 'addLabel' && dataValue === 'gschool' ) {
         msg.labels[2] = dataValue
       } else if (selected[i] === true && dataName === 'removeLabel' && dataValue === 'dev' ) {
         msg.labels[0] = ""
       } else if (selected[i] === true && dataName === 'removeLabel' && dataValue === 'personal' ) {
         msg.labels[1] = ""
       } else if (selected[i] === true && dataName === 'removeLabel' && dataValue === 'gschool' ) {
         msg.labels[2] = ""
       }
        e.target.selectedIndex = 0
        return msg
      })

      // let command
      //
      // if (dataName === 'addLabel') {
      //   command = 'addLabel'
      // } else {
      //   command = 'removeLabel'
      // }

      this.patch({
        "messageIds": this.state.messages.filter(message => message.selected).map(message => message.id),
        "command": dataName,
        "label": dataValue
        })

      //   console.log('after map dataValue',dataValue);
    }

    let trash = (e) => {
      let deleted = this.state.messages.filter(msg => msg.selected)
      let ids = this.getIds(deleted)

      modifiedMessages = this.state.messages.filter(msg => !msg.selected)
      this.patch({
            "messageIds": ids,
            "command": "delete"
        })

      //console.log('trash event', ids);
      //console.log('post patch', modifiedMessages);


    }

    if (dataName === "checkAll") {
      toggleCheckAll(e)
      } else if (dataName === "markUnread" || dataName === "markRead") {
      readUnread(e)
      } else if (dataName === "addLabel" || dataName === "removeLabel") {
      applyRemove(e)
      } else if (dataName === "trash") {
      trash(e)
    }

    this.setState(() =>({...this.state, messages: modifiedMessages}))
  }

manageCompose = (e) => {
    let compose
      console.log('inside compose', this.state);
      if (this.state.compose) {
        compose = false
      } else {
        compose = true
      }
      this.setState(() =>({...this.state, compose: compose}))
      console.log('compose',compose);
  }

sendMessage = async (newMessage) => {
    if (newMessage.subject === "") {
      return
    }

    const response = await fetch('http://localhost:8082/api/messages', {
      method: 'POST',
      body: JSON.stringify(newMessage),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })

    const message = await response.json()

    console.log('sendMessage', newMessage)

    this.setState(() =>({

      compose: !this.state.compose,
      messages: [...this.state.messages, message]
    }))
    console.log('this.state',this.state);
  }


  render() {

  console.log(this.state);

    return (<div className="App">
      <Toolbar messages={this.state.messages} manageToolbar={this.manageToolbar} manageCompose={this.manageCompose} />
      {(!this.state.compose) ? null :  <Compose sendMessage={this.sendMessage}/>}
      <MessageList messages={this.state.messages} manageMessages={ this.manageMessages } />
    </div>)
  }
}

export default App;
