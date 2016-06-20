import { connect } from '../../../../reroute-core';
import mapStateToProps from './mapStateToProps';
import mapRouteToProps from './mapRouteToProps';
import CurrentPage from './CurrentPage';

export default connect(
  mapStateToProps,
  mapRouteToProps
)(CurrentPage);
