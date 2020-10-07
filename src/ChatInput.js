import * as React from 'react'
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
    const { text, onSend } = this.props
    if (onSend) {
      const messageToUse = text || this.state.message
      onSend(messageToUse)
    }
    this.setState({ message: '' })
  }

  render() {
    const { alwaysShowSend, sendButtonText, placeholder, textInputStyle, text, onInputTextChanged } = this.props;
    const { message } = this.state
    const messageToUse = text || message
    let maxRows = 5
    if (textInputStyle != null && textInputStyle.maxRows != null) {
      maxRows = textInputStyle.maxRows
      delete textInputStyle.maxRows
    }
    const style = Object.assign({}, textInputStyle, styles.inputStyle)
    return (
      <div className="chat-input" style={styles.chatInput}>
        <TextareaAutosize
          value={messageToUse}
          onChange={event => {
            if (text != null) {
              onInputTextChanged(event.target.value)
            } else {
              this.setState({ message: event.target.value })
            }
          }}
          minRows={1}
          maxRows={maxRows}
          placeholder={placeholder}
          style={style}
        />
        <button type="submit" style={styles.sendButton} onClick={this.onSend} disabled={!alwaysShowSend && messageToUse.length === 0}>
          {sendButtonText}
        </button>
      </div>
    )
  }
}
