import { connect } from 'react-redux';
import { compose } from 'redux';
import dummy from 'flux/state/dummy';
import loading from 'flux/state/loading';

export default compose(
  connect(
    (state) => ({
      currentValue: dummy.selectors.getCurrent(state),
      isLoading: loading.selectors.isLoading(state, dummy.CONSTANTS.SEARCH),
    }),
    {
      ping: dummy.actions.ping,
      search: dummy.actions.search,
    },
  ),
);
