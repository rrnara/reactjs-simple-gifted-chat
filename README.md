# Simple Gifted Chat

Simple version of chat built to use same APIs as https://github.com/FaridSafi/react-native-gifted-chat

## Installation

- Using [npm](https://www.npmjs.com/#getting-started): `npm install reactjs-simple-gifted-chat --save`
- Using [Yarn](https://yarnpkg.com/): `yarn add reactjs-simple-gifted-chat`

## Example

```jsx
import GiftedChat from 'reactjs-simple-gifted-chat';

class Example extends React.Component {

  state = {
    messages: [],
    isFetching: false
  };

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          content: { text: 'Hello developer' },
          createdAt: new Date(),
          user: {
            _id: 30,
            name: 'React',
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          }
        },
      ],
    });
  }

  onSend(message) {
    const messages = this.state.mesages.slice(0)
    messages.splice(0, 0, { _id: 100, content: { text: message }, user: { _id: 1 }, displayTime: 'Now', createdAt: new Date() })
    this.setState({ messages });
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        user={{
          _id: 1,
          name: 'User'
        }}
        hasInputField
        loadEarlier={true}
        onLoadEarlier={() => this.onLoadEarlier()}
        isLoadingEarlier={this.state.isFetching}
        inverted={true}
        isTyping
        alwaysShowSend
        sendButtonText="Send"
        placeholder="Type your message"
        renderAvatarOnTop
        showAvatarForEveryMessage={false}
        showUserAvatar
        showReceipientAvatar={false}
        avatarSize={70}
        messageIdGenerator={uuidv3}
        renderAccessory={null}
        timezone="America/Los_Angeles"
        timeFormat="HH:mm"
        dateFormat="YYYY/MM/DD"
        maxInputLength="400"
        renderTextInput={props => {
          // By default GiftedChat uses textarea, override that here using react-textarea-autosize
          return <TextareaAutosize {...props} minRows={1} maxRows={5}>
        }}
        textInputStyle={{ margin: 10 }}
        textStyle={{ fontSize: 15 }}
        imageStyle={{ width: 500 }}
        timeStyle={{ fontSize: 12 }}
        dateStyle={{ fontSize: 18 }}
        sendButtonStyle={{ backgroundColor: 'blue', fontSize: 16 }}
        sendButtonDisabledStyle={{ backgrounColor: 'gray' }}
        renderChatEmpty={() => <div>No Messages</div>}
      />
    );
  }

}
```

## Default Properties
Most of the properties specified have a default value as described:

```jsx
  static defaultProps = {
    inverted: true,
    hasInputField: true,
    loadEarlier: false,
    isLoadingEarlier: false,
    isTyping: false,
    alwaysShowSend: false,
    sendButtonText: 'SEND',
    renderTextInput: null,
    textInputStyle: {},
    placeholder: 'Enter your message',
    renderAvatarOnTop: false,
    showAvatarForEveryMessage: false,
    showUserAvatar: false,
    onPressAvatar: null,
    onPressBubble: null,
    showReceipientAvatar: true,
    avatarSize: 50,
    messageIdGenerator: uuidv4,
    timezone: moment.tz.guess(),
    timeFormat: 'LT',
    dateFormat: 'll',
    textStyle: {},
    imageStyle: {},
    timeStyle: {},
    dateStyle: {},
    tickStyle: {},
    sendButtonStyle: {},
    sendButtonDisabledStyle: {},
    renderChatEmpty: null
  }
```

## Message Content Hash

```
{
  text: 'This is a message', // Cannot be null
  system: true/false, // when true, it displays like the Date
  video: 'url',
  image: 'url',
  audio: 'url',
}
```
