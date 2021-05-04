import * as React from 'react'
import Linkify from 'react-linkify'
import initials from 'initials'
import moment from 'moment-timezone'
import { get } from 'lodash'

function generateEmptyAvatarStyle(avatarSize) {
  return {
    width: avatarSize,
    height: avatarSize
  }
}

function stringToHslColor(str, s, l) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  return `hsl(${hash % 360}, ${s}%, ${l}%)`
}

const styles = {
  chatbubbleRow: {
    display: 'flex',
    flexDirection: 'row'
  },
  avatarWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  avatarWrapperTop: {
    justifyContent: 'flex-start'
  },
  chatbubbleWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  recipientChatbubbleWrapper: {
    justifyContent: 'flex-start'
  },
  chatbubble: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 20,
    marginTop: 2,
    marginBottom: 2,
    maxWidth: '65%',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 14,
    paddingRight: 14,
    backgroundColor: '#0084FF'
  },
  recipientChatbubble: {
    backgroundColor: '#36bd33'
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
  image: {
    objectFit: 'contain',
    width: 300
  },
  dateRow: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  date: {
    color: '#000000',
    fontSize: 17,
    fontWeight: '500',
    margin: 0
  },
  time: {
    color: '#EEEEEE',
    fontSize: 15,
    fontWeight: '300',
    margin: 0
  }
}

export default class ChatBubble extends React.Component {
  renderAvatar(user, avatarSize, renderAvatarOnTop, onPressAvatar) {
    const avatarStyle = Object.assign(
      {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 2,
        borderRadius: avatarSize / 2,
        fontSize: avatarSize / 3,
        fontWeight: '600',
        backgroundColor: stringToHslColor(user.name, 50, 80),
        color: '#FFFFFF'
      },
      generateEmptyAvatarStyle(avatarSize)
    )
    if (onPressAvatar != null) {
      avatarStyle.cursor = 'pointer'
    }

    const wrapperStyle = Object.assign({}, styles.avatarWrapper, renderAvatarOnTop ? styles.avatarWrapperTop : {})
    return (
      <div
        id={`user_avatar_${user._id}`}
        style={wrapperStyle}
        onClick={() => {
          if (onPressAvatar != null) {
            onPressAvatar(user)
          }
        }}
      >
        {user.avatar != null
          ? (
          <img style={avatarStyle} src={user.avatar} alt={user.name} />
            )
          : (
          <div style={avatarStyle}>{initials(user.name)}</div>
            )}
      </div>
    )
  }

  render() {
    const {
      message,
      previous,
      next,
      user,
      renderAvatarOnTop,
      showAvatarForEveryMessage,
      showUserAvatar,
      showReceipientAvatar,
      avatarSize,
      onPressAvatar,
      timezone,
      timeFormat,
      dateFormat,
      textStyle,
      imageStyle,
      timeStyle,
      dateStyle
    } = this.props
    const sentByMe = message.user._id === user._id
    const chatbubbleStyles = Object.assign({}, styles.chatbubble, sentByMe ? {} : styles.recipientChatbubble)
    const chatbubbleWrapperStyles = Object.assign({}, styles.chatbubbleWrapper, sentByMe ? {} : styles.recipientChatbubbleWrapper)
    const messageDate = moment(message.createdAt).tz(timezone)
    let displayDate = true
    if (previous != null) {
      const prevMessageDate = moment(previous.createdAt).tz(timezone)
      displayDate = !messageDate.isSame(prevMessageDate, 'day')
    }

    let showAvatar = showAvatarForEveryMessage || (showUserAvatar && sentByMe) || (showReceipientAvatar && !sentByMe)
    const emptyAvatar = showAvatar ? <div style={generateEmptyAvatarStyle(avatarSize)} /> : null
    if (showAvatar) {
      let compareWith = renderAvatarOnTop ? previous : next
      if (compareWith != null && get(compareWith, 'message.text') == null) {
        compareWith = null
      }
      showAvatar = compareWith == null || compareWith.user._id !== message.user._id
    }

    const textStyleToUse = Object.assign({}, styles.p, textStyle)
    const imageStyleToUse = Object.assign({}, styles.image, imageStyle)
    const timeStyleToUse = Object.assign({}, styles.time, timeStyle)
    const dateStyleToUse = Object.assign({}, styles.date, dateStyle)
    const hasAnnouncement = message.announcement != null
    let messageText = message.text
    let ignoreText = false
    if (hasAnnouncement && messageText == null) {
      ignoreText = true
      messageText = ''
    }
    const textContent = messageText.split('\n')
    return (
      <div id={`chat_row_wrapper_${message._id}`}>
        {displayDate && (
          <div style={styles.dateRow}>
            <p style={dateStyleToUse}>{messageDate.format(dateFormat)}</p>
          </div>
        )}
        {hasAnnouncement && (
          <div style={styles.dateRow} id={`chat_announcement_${message._id}`}>
            <p style={dateStyleToUse}>{message.announcement}</p>
          </div>
        )}
        {!ignoreText && (
          <div style={styles.chatbubbleRow} id={`chat_row_${message._id}`}>
            {!sentByMe && showAvatar ? this.renderAvatar(message.user, avatarSize, renderAvatarOnTop, onPressAvatar) : emptyAvatar}
            <div style={chatbubbleWrapperStyles}>
              <div style={chatbubbleStyles} id={`chat_bubble_${message._id}`}>
                {message.image != null && <img src={message.image} style={imageStyleToUse} />}
                {message.video != null && (
                  <video controls="controls">
                    Your browser does not support the &lt;video&gt; tag.
                    <source src={message.video} />
                  </video>
                )}
                {message.audio != null && (
                  <audio controls="controls">
                    Your browser does not support the &lt;audio&gt; tag.
                    <source src={message.audio} />
                  </audio>
                )}
                <Linkify properties={{ style: styles.a, target: '_blank' }}>
                  {textContent.map((text, i) => {
                    const key = `bubble_${message.id}_para_${i}`
                    if (text.length === 0) {
                      return <br key={key} />
                    }
                    return <p key={key} style={textStyleToUse}>{text}</p>
                  })}
                </Linkify>
                <p style={timeStyleToUse}>{messageDate.format(timeFormat)}</p>
              </div>
            </div>
            {sentByMe && showAvatar ? this.renderAvatar(message.user, avatarSize, renderAvatarOnTop, onPressAvatar) : emptyAvatar}
          </div>
        )}
      </div>
    )
  }
}
