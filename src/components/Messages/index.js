import React from 'react';
import Message from './Message';
import connectComponent from 'reroute/react-reroute/connectComponent';

class Messages extends React.Component {
  render () {
    const messages = this.props.messages.toJS()

    return (
      <div>
        <h2>{messages.length} Unread Messages:</h2>
        {messages.map((msg, i) =>
          <p key={i}>
            <Message
              onClick={this.props.handleClick}
              {...msg}
            />
          </p>
        )}
      </div>
    );
  };
};

const mapStateToProps = state => ({
  messages: state.get('msgs')
});

const mapRouteToProps = route => ({
  handleClick(e) {
    e.preventDefault();

    route({
      key: 'clickedTestButton',
      payload: {}
    })
  }
});

export default connectComponent(mapStateToProps, mapRouteToProps)(Messages)
