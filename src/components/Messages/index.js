import React from 'react';
import Message from './Message';
import { connect } from '../../../../reroute-core'
//import connect from 'reroute-react';

const Messages = (props) => {
  const mergeProps = (p, index) => ({
    ...p,
    ...props
  });

  const messages = props.messages
    .toJS()
    .map((m, i) =>
      <p key={i}>
        <a href='#' onClick={props.onRemove.bind(this, i)}>X</a>
        <Message
          {...mergeProps(m, i)}
        />
      </p>
    );

  if (messages.length < 1) return null;
  return (
    <div>
      <a href='#' onClick={props.onRemoveAll}>Delete All</a>
      <h2><i> Current Path: "{props.path}" </i></h2>
      <h2>{messages.length} Unread Messages:</h2>
      {messages}
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  messages: state.get(props.path)
});

const mapRouteToProps = (route) => ({
  onRemoveAll (e) {
    e.preventDefault();

    route({
      type:'react',
      key: 'clickedRemoveAllButton',
      payload: {}
    });
  },

  onRemove (index, e) {
    e.preventDefault();

    route({
      type: 'react',
      key: 'removedTestButton',
      payload: { index }
    });
  },

  onClick (e) {
    e.preventDefault();

    route({
      type: 'react',
      key: 'clickedTestButton',
      payload: {}
    })
  }
});

export default connect(mapStateToProps, mapRouteToProps)(Messages)
