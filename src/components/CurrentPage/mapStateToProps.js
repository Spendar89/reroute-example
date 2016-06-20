export default function mapStateToProps (state, props) {
  const currentUrl = state.get('currentUrl');
  const pageId = state.get('pageId');
  const _page = state.getIn(['pages', pageId]);

  return {
    currentUrl,
    page: _page && _page.toJS()
  };
};
