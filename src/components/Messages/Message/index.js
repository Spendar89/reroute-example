import React from 'react';

const Message = ({ subject, body }) =>
  <li><b>{subject}:&ensp;</b>{body}</li>;

export default Message;
