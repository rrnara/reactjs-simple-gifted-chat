import React from 'react'
import TextareaAutosize from 'react-textarea-autosize'

const styles = {
  chatInput: {
    display: 'flex',
    flexDirection: 'row'
  },
  inputStyle: {
    border: 'none',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#ddd',
    fontSize: '16pt',
    outline: 'none',
    padding: '10px',
    width: '100%',
    marginRight: '5px'
  },
  sendButton: {
    minWidth: '80px'
  }
}

export default class ChatInput extends React.Component {
  constructor(props) {
    super(props)
    this.onSend = this.onSend.bind(this)
    this.state = { message: '' }
  }

  onSend() {
    const { onSend } = this.props
    if (onSend) {
      onSend({ text: this.state.message })
    }
    this.setState({ message: '' })
  }

  render() {
    return (
      <div className="chat-input" style={styles.chatInput}>
        <TextareaAutosize
          value={this.state.message}
          onChange={event => {
            this.setState({ message: event.target.value })
          }}
          minRows={1}
          maxRows={6}
          placeholder="Enter your message..."
          style={styles.inputStyle}
        />
        <button type="submit" style={styles.sendButton} onClick={this.onSend}>
          SEND
        </button>
      </div>
    )
  }
}
