import * as React from 'react'
import ChatBubble from './ChatBubble'

const styles = {
  chatbubbleWrapper: {
    marginTop: 10,
    marginBottom: 10,
    overflow: 'auto',
    position: 'relative'
  },
  bubbleGroupHeader: {
    margin: 0,
    fontSize: 14,
    fontWeight: '400',
    color: '#999'
  }
}

export default class BubbleGroup extends React.Component {
  render() {
    const { messages, showSenderName, user } = this.props

    const messageNodes = messages.map((message, i) => (
      <ChatBubble key={`bubble_${message._id}`} user={user} message={message} />
    ))

    const sampleMessage = messages[0]
    const sender = sampleMessage.user
    const senderName = sender.name
    return (
      <div style={styles.chatbubbleWrapper}>
        {showSenderName &&
          senderName !== '' &&
          user._id !== sender._id && <h5 style={styles.bubbleGroupHeader}>{senderName}</h5>}
        {messageNodes}
      </div>
    )
  }
}
