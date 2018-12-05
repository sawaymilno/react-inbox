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

getIds = (input) => {
  let ids = []
  for (let i = 0; i < input.length; i++) {
    ids.push(input[i].id)
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
      //console.log('e.target.dataset.name',e.target.dataset.name);
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
    let checkedStatus = this.state.messages.map((message) =>
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

       if (checkedStatus[i] === true && dataName === 'markUnread') {
         msg.read = false
       } else if (checkedStatus[i] === true && dataName === 'markRead') {
         msg.read = true
       }
        return msg
      })
    }
    let applyRemove = (e) => {

      modifiedMessages = this.state.messages.map((msg, i) => {
           // console.log('in mod map',checkedStatus[i],dataName,dataValue);
       if (checkedStatus[i] === true && dataName === 'applyLabel' && dataValue === 'dev' ) {
         msg.labels[0] = dataValue
       } else if (checkedStatus[i] === true && dataName === 'applyLabel' && dataValue === 'personal' ) {
         msg.labels[1] = dataValue
       } else if (checkedStatus[i] === true && dataName === 'applyLabel' && dataValue === 'gschool' ) {
         msg.labels[2] = dataValue
       } else if (checkedStatus[i] === true && dataName === 'removeLabel' && dataValue === 'dev' ) {
         msg.labels[0] = ""
       } else if (checkedStatus[i] === true && dataName === 'removeLabel' && dataValue === 'personal' ) {
         msg.labels[1] = ""
       } else if (checkedStatus[i] === true && dataName === 'removeLabel' && dataValue === 'gschool' ) {
         msg.labels[2] = ""
       }
        e.target.selectedIndex = 0
        return msg
      })

      //   console.log('after map dataValue',dataValue);
    }
    let trash = (e) => {
      let deleted = this.state.messages.filter((msg,i) =>
    msg.selected === true)
    let ids = this.getIds(deleted)

      // modifiedMessages = this.state.messages.filter((msg, i) =>
      // msg.selected !== true)
      modifiedMessages = this.patch({
            "messageIds": ids,
            "command": "delete"
        })

      console.log('trash event', ids);
      console.log('post patch', modifiedMessages);


  }

    if (dataName === "checkAll") {
      toggleCheckAll(e)
      } else if (dataName === "markUnread" || dataName === "markRead") {
      readUnread(e)
      } else if (dataName === "applyLabel" || dataName === "removeLabel") {
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
