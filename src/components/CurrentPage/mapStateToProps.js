export default function mapStateToProps (state, props) {
  const currentUrl = state.get('currentUrl');
  console.log("URL", currentUrl)
  const _page = state.getIn(['pages', currentUrl]);

  return {
    currentUrl,
    page: _page && _page.toJS()
  };
};
