import React from 'react';
import router from './../../router';
import Message from './Message';

class Messages extends React.Component {
  componentDidMount () {
    this.props.route({
      key: 'clickedTestButton',
      payload: { ms: 1000 }
    });
  };

  render () {
    const messages = this.props.messages.toJS();

    return (
      <div>
        <h2>Current Messages</h2>
        <ul>
          {messages.map((message, key) =>
            <Message {...message} key={key} />
          )}
        </ul>
      </div>
    );
  };
};

export default router.connect(Messages, {
  messages: ['msgs'],
});
