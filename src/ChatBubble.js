import * as React from 'react'
import Linkify from 'react-linkify'

const styles = {
  chatbubbleWrapper: {
    overflow: 'auto'
  },
  chatbubble: {
    backgroundColor: '#0084FF',
    borderRadius: 20,
    marginTop: 1,
    marginRight: 'auto',
    marginBottom: 1,
    marginLeft: 'auto',
    maxWidth: 425,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 14,
    paddingRight: 14,
    width: '-webkit-fit-content'
  },
  chatbubbleOrientationNormal: {
    float: 'right'
  },
  recipientChatbubble: {
    backgroundColor: '#36bd33'
  },
  recipientChatbubbleOrientationNormal: {
    float: 'left'
  },
  p: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '500',
    margin: 0
  },
  a: {
    color: '#FFFF00'
  },
  time: {
    color: '#EEEEEE',
    fontSize: 15,
    fontWeight: '300',
    margin: 0
  }
}

export default class ChatBubble extends React.Component {
  render() {
    const { message, user } = this.props
    const sentByMe = message.user._id === user._id

    // message.id 0 is reserved for blue
    const chatBubbleStyles = sentByMe
      ? {
          ...styles.chatbubble,
          ...styles.chatbubbleOrientationNormal
        }
      : {
          ...styles.chatbubble,
          ...styles.recipientChatbubble,
          ...styles.recipientChatbubbleOrientationNormal
        }

    const textContent = message.content.text.split('\n')
    return (
      <div style={styles.chatbubbleWrapper}>
        <div style={chatBubbleStyles}>
          <Linkify properties={{ style: styles.a, target: '_blank' }}>
            {textContent.map((text, i) => (
              <p key={`bubble_${message.id}_para_${i}`} style={styles.p}>
                {text}
              </p>
            ))}
          </Linkify>
          <p style={styles.time}>{message.displayTime}</p>
        </div>
      </div>
    )
  }
}
