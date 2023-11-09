import * as React from 'react'

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
    this.onKeyUp = this.onKeyUp.bind(this)
    this.state = { message: '' }
  }

  onSend() {
    const { text, onSend, alwaysShowSend } = this.props
    if (onSend) {
      const messageToUse = (text || this.state.message).trim()
      if (alwaysShowSend || messageToUse.length > 0) {
        onSend(messageToUse)
      }
    }
    this.setState({ message: '' })
  }

  onKeyUp(event) {
    if (!event.shiftKey && event.key === 'Enter') {
      event.stopPropagation()
      this.onSend()
    }
  }

  render() {
    const {
      alwaysShowSend,
      sendButtonText,
      placeholder,
      renderTextInput,
      textInputStyle,
      text,
      onInputTextChanged,
      renderSendButton,
      sendButtonStyle,
      sendButtonDisabledStyle,
      maxInputLength
    } = this.props;
    const { message } = this.state
    const messageToUse = text || message
    const inputStyle = Object.assign({}, styles.inputStyle, textInputStyle)
    const buttonDisabled = !alwaysShowSend && messageToUse.trim().length === 0
    const buttonStyle = Object.assign({}, styles.sendButton, sendButtonStyle, buttonDisabled ? sendButtonDisabledStyle : {})
    const textInputProps = {
      value: messageToUse,
      onChange: event => {
        if (text != null) {
          onInputTextChanged(event.target.value)
        } else {
          this.setState({ message: event.target.value })
        }
      },
      onKeyUp: this.onKeyUp,
      placeholder,
      maxLength: maxInputLength,
      style: inputStyle
    }
    const buttonProps = {
      id: 'chat_input_send_button',
      type: 'submit',
      onClick: this.onSend,
      disabled: buttonDisabled
    }
    return (
      <div className="chat-input" style={styles.chatInput}>
        {renderTextInput != null ? renderTextInput(textInputProps) : <textarea {...textInputProps} />}
        {renderSendButton != null
          ? renderSendButton(buttonProps)
          : (
          <button {...buttonProps} style={buttonStyle}>
            {sendButtonText}
          </button>
            )}
      </div>
    )
  }
}
