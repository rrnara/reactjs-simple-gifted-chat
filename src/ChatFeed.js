import * as React from 'react'
import BubbleGroup from './BubbleGroup'
import ChatInput from './ChatInput'
import './loader.css'

const styles = {
  chatPanel: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'flex-end',
    overflow: 'hidden'
  },
  chatHistory: {
    overflow: 'auto',
    flex: 1
  }
}

// React component to render a complete chat feed
export default class ChatFeed extends React.Component {
  static defaultProps = {
    inverted: true
  }

  constructor(props) {
    super(props)
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount() {
    this.scrollToBottom()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.messages.length === 0 && this.props.messages.length > 0) {
      this.scrollToBottom()
    }
  }

  scrollToBottom() {
    const scrollHeight = this.chat.scrollHeight
    const height = this.chat.clientHeight
    const maxScrollTop = scrollHeight - height
    this.chat.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0
  }

  renderMessages(messages) {
    const { showSenderName, user, inverted } = this.props

    let group = []
    const messageNodes = []
    const lastMessageIndex = messages.length - 1
    for (let actualIndex = 0; actualIndex < messages.length; actualIndex++) {
      const index = inverted ? lastMessageIndex - actualIndex : actualIndex
      const message = messages[index]
      group.push(message)
      if (
        actualIndex === lastMessageIndex ||
        messages[actualIndex + 1].user._id !== message.user._id
      ) {
        const messageGroup = group
        group = []
        messageNodes.push(
          <BubbleGroup
            key={`group_${message._id}`}
            messages={messageGroup}
            user={user}
            showSenderName={showSenderName}
          />
        )
      }
    }
    return messageNodes
  }

  handleScroll(event) {
    if (event.target.scrollTop === 0) {
      const { loadEarlier, onLoadEarlier } = this.props
      if (loadEarlier) {
        onLoadEarlier()
      }
    }
  }

  render() {
    const { isLoadingEarlier, messages, maxHeight, hasInputField, onSend } = this.props
    const chatHistoryStyle = Object.assign(styles.chatHistory, { maxHeight })
    return (
      <div id="chat-panel" style={styles.chatPanel} onScroll={this.handleScroll}>
        <div
          ref={c => {
            this.chat = c
          }}
          className="chat-history"
          style={chatHistoryStyle}
        >
          {isLoadingEarlier && (
            <div className="loader-container">
              <div className="loader" />
            </div>
          )}
          <div className="chat-messages">{this.renderMessages(messages)}</div>
        </div>
        {hasInputField && <ChatInput onSend={onSend} />}
      </div>
    )
  }
}
