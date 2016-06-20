import Message from './Message';
import { connect } from '../../../../reroute-core';

const mapStateToProps = (state, props) => ({
  messages: state.get(props.path)
});

const mapRouteToProps = (route, props) => ({
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

export default connect(mapStateToProps, mapRouteToProps)(props => {
  const mergeProps = (p, index) => ({
    ...p,
    ...props
  });

  const messages = props
    .messages
    .toJS()
    .map((message, i) => (
      <p key={i}>
        <button onClick={props.onRemove.bind(this, i)}> X </button>
        <span> &emsp; </span>
        <Message {...{...message, onClick: props.onClick}} />
      </p>
    ));

  const style = {
    border: '1pt solid',
    margin: '3%',
    padding: '3%'
  };

  return (
    <div style={style}>
      <a href='#' onClick={props.onRemoveAll}>
        Delete All
      </a>
      <h2> { messages.length } Unread messages: </h2>
      { messages }
    </div>
  );
}, { displayName: 'Messages' });
