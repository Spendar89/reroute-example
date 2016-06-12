import React from 'react';

const Message = (props) =>
  <a href {...props}>
    <b>{props.subject}:&ensp;</b>{props.body}
  </a>

export default Message;
