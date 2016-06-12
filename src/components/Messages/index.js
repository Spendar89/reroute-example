import React from 'react';
import Message from './Message';
import connectComponent from 'reroute/react-reroute/connectComponent';

class Messages extends React.Component {
  handleClick (e) {
    e.preventDefault();

    this.props.route({
      key: 'clickedTestButton',
      payload: {}
    });
  };

  render () {
    const messages = this.props.messages.toJS();

    return (
      <div>
        <h2>{messages.length} Unread Messages:</h2>
        {messages.map((msg, i) =>
          <p key={i}>
            <Message
              onClick={this.handleClick.bind(this)}
              {...msg}
            />
          </p>
        )}
      </div>
    );
  };
};

export default connectComponent(Messages, {
  messages: ['msgs']
});
