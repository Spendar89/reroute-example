const Message = React.createClass({
  shouldComponentUpdate (nextProps) {
    const combinedProps = {
      ...this.props,
      ...nextProps
    };

    for (let k in combinedProps) {
      if (nextProps[k] !== this.props[k]) {
        return true;
      };
    };

    return false;
  },

  render () {
    const { onClick, subject, body } = this.props;

    return (
      <a href='#' onClick={onClick}>
        <b>{subject}:</b>&ensp;{body}
      </a>
    );
  }
});


export default Message;
