import React from 'react';
import Message from './Message';
import connect from 'reroute-react';

const Messages = (props) => {
  const mergeProps = p => ({
    ...p,
    onClick: props.handleClick
  });

  const messages = props.messages
    .toJS()
    .map((m, i) =>
      <p key={i}>
        <Message
          {...mergeProps(m)}
        />
      </p>
    );

  return (
    <div>
      <h2><i> Current Path: "{props.path}" </i></h2>
      <h2>{messages.length} Unread Messages:</h2>
      {messages}
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  messages: state.get(props.path)
});

const mapRouteToProps = route => ({
  handleClick (e) {
    e.preventDefault();
    route({
      type: 'react',
      key: 'clickedTestButton',
      payload: {}
    })
  }
});

export default connect(mapStateToProps, mapRouteToProps)(Messages)
