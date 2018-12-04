import React, {Component} from 'react';
import './App.css';
import Toolbar from './Toolbar'
import MessageList from './MessageList'
import Compose from './Compose'


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
    messages:[
      {
        subject: "You can't input the protocol without calculating the mobile RSS protocol!",
        read: false,
        starred: true,
        labels: [
          "dev", "personal"
        ],
        body: "Hey, it's Virginia Mosby,\n\nThe littlest thing can cause a ripple effect that changes your life.",
        id: 1
      }, {
        subject: "connecting the system won't do anything, we need to input the mobile AI panel!",
        read: false,
        starred: false,
        selected: true,
        labels: [],
        body: "Hey, it's Penny Mosby,\n\nThat’s life, you know, we never end up where you thought you wanted to be.",
        id: 2
      }, {
        subject: "Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!",
        read: false,
        starred: true,
        labels: ["dev"],
        body: "Hey, it's Claudia Grice,\n\nThere are a lot of little reasons why the big things in our lives happen.",
        id: 3
      }, {
        subject: "We need to program the primary TCP hard drive!",
        read: true,
        starred: false,
        selected: true,
        labels: [],
        body: "Hey, it's Gary Blauman,\n\nDefinitions are important.",
        id: 4
      }, {
        subject: "If we override the interface, we can get to the HTTP feed through the virtual EXE interface!",
        read: false,
        starred: false,
        labels: ["personal"],
        body: "Hey, it's Gary Blauman,\n\nWe’re going to get older whether we like it or not, so the only question is whether we get on with our lives, or desperately cling to the past.",
        id: 5
      }, {
        subject: "We need to back up the wireless GB driver!",
        read: true,
        starred: true,
        labels: [],
        body: "Hey, it's Brad Morris,\n\nBecause sometimes even if you know how something’s gonna end that doesn’t mean you can’t enjoy the ride.",
        id: 6
      }, {
        subject: "We need to index the mobile PCI bus!",
        read: true,
        starred: false,
        labels: [
          "dev", "personal"
        ],
        body: "Hey, it's Robin Scherbatsky,\n\nLook, you can’t design your life like a building. It doesn’t work that way. You just have to live it… and it’ll design itself.",
        id: 7
      }, {
        subject: "If we connect the sensor, we can get to the HDD port through the redundant IB firewall!",
        read: true,
        starred: true,
        labels: [],
        body: "Hey, it's Bilson,\n\nThe future is scary but you can’t just run back to the past because it’s familiar.",
        id: 8
      }
    ]
  }
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

      // console.log('e.target.dataset.name',e.target.dataset.name);
      // console.log('value of checked before', checked);
      // console.log('[0]selected before',this.state.messages[0].selected);

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

      this.setState({...this.state, messages: modifiedMessages})
  }
  manageToolbar = (e) => {
    //let className = e.target.className
    let dataName = e.target.dataset.name
    let dataValue = e.target.value
    let modifiedMessages
    let checkedStatus = this.state.messages.map((message) =>
        (message.selected))

    console.log('dataname',dataName);

    let toggleCheckAll = (e) => {
      //let checkAllId = parseInt(e.target.dataset.checkAll)
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
      console.log('im here');
      modifiedMessages = this.state.messages.filter((msg, i) =>
      msg.selected !== true)
      //creates the correct modifiedMessages to send to state, but when setState is called, it does not change this.state
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

    this.setState({...this.state, messages: modifiedMessages})
  }
  manageCompose = (e) => {
    let compose
      console.log('inside compose', this.state);
      if (this.state.compose) {
        compose = false
      } else {
        compose = true
      }
      this.setState({...this.state, compose: compose})
      console.log('compose',compose);
  }
  sendMessage = (newMessage) => {
    if (newMessage.subject === "") {
      return
    }
    console.log('sendMessage', newMessage)
    this.setState({
      compose: !this.state.compose,
      messages: [...this.state.messages, newMessage]
    })
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
