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

  componentDidMount = async () => {
    const response = await fetch('http://localhost:8082/api/messages')
    const json = await response.json()
    this.setState(() => ({messages: json}))
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
        'Accept': 'application/json'
      },
      body: body
    })
  }

  manageMessages = (e) => {
    let modifiedMessages
    let dataName = e.target.dataset.name

    let toggleStar = () => {
      let starId = parseInt(e.target.dataset.star)
      let className = e.target.className
      let value

      if (className === "star fa fa-star") {
        value = true
        } else {
        value = false
      }

      modifiedMessages = this.state.messages.map((msg) => {
        if (msg.id === starId) {
          msg.starred = !value
        }
        return msg
      })

      this.patch({"messageIds": [starId], "command": "star"})

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

    switch (dataName) {
      case 'starred':
        toggleStar()
        break;
      case 'selected':
        toggleChecked()
        break;
      default:
      break;
    }

    this.setState(() => ({
      ...this.state,
      messages: modifiedMessages
    }))

  }
  manageToolbar = (e) => {
    let modifiedMessages
    let dataName = e.target.dataset.name
    let dataValue = e.target.value
    let selected = this.state.messages.map((message) => (message.selected))

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
      let read

      switch(dataName) {
        case 'markRead':
          read = true
          break;
        default:
          read = false
      }

      this.patch({"messageIds": ids, "command": "read", "read": read})

    }
    let applyRemove = (e) => {

      modifiedMessages = this.state.messages.map((msg, i) => {

        switch (true) {
          case ((selected[i] === true) && (dataName === 'addLabel')):
            switch(dataValue){
              case 'dev':
                msg.labels[0] = dataValue
                break;
              case 'personal':
                msg.labels[1] = dataValue
                break;
              case 'gschool':
                msg.labels[2] = dataValue
                break;
              default:
              break;
            }
            break;
          case ((selected[i] === true) && (dataName === 'removeLabel')):
            switch(dataValue){
              case 'dev':
                msg.labels[0] = ''
                break;
              case 'personal':
                msg.labels[1] = ''
                break;
              case 'gschool':
                msg.labels[2] = ''
                break;
                default:
                break;
            }
            break;
          default:
          break;
        }

        e.target.selectedIndex = 0

        return msg
      })

      this.patch({
        "messageIds": this.state.messages.filter(message => message.selected).map(message => message.id),
        "command": dataName,
        "label": dataValue
      })

    }
    let trash = (e) => {
      let deleted = this.state.messages.filter(msg => msg.selected)
      let ids = this.getIds(deleted)

      modifiedMessages = this.state.messages.filter(msg => !msg.selected)
      this.patch({"messageIds": ids, "command": "delete"})

    }

    switch (dataName) {
      case 'checkAll':
        toggleCheckAll(e)
        break;
      case 'markUnread':
        readUnread(e)
        break;
      case 'markRead':
        readUnread(e)
        break;
      case 'addLabel':
        applyRemove(e)
        break;
      case 'removeLabel':
        applyRemove(e)
        break;
      case 'trash':
        trash(e)
        break;
      default:
      break;
    }

    this.setState(() => ({
      ...this.state,
      messages: modifiedMessages
    }))
  }
  manageCompose = (e) => {
    let compose

    if (this.state.compose) {
      compose = false
      } else {
      compose = true
    }

    this.setState(() => ({
      ...this.state,
      compose: compose
    }))

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
        'Accept': 'application/json'
      }
    })
    const message = await response.json()

    this.setState(() => ({
      compose: !this.state.compose,
      messages: [
        ...this.state.messages,
        message
      ]
    }))

  }

  render() {

    console.log(this.state);

    return (<div className="App">
      <Toolbar messages={this.state.messages} manageToolbar={this.manageToolbar} manageCompose={this.manageCompose}/> {
        (!this.state.compose)
          ? null
          : <Compose sendMessage={this.sendMessage}/>
      }
      <MessageList messages={this.state.messages} manageMessages={this.manageMessages}/>
    </div>)
  }
}

export default App;
