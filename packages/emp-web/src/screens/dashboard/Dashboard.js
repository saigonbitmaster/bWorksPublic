import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { CustomPage, withDataProvider, CUSTOM } from 'ra-loopback3';
import { Grid, withTheme } from '@material-ui/core';
import TopStatistic from './widget/TopStatistic';
import Table from './table.js';
import LatestStatus from './LatestStatus';

class Dashboard extends React.Component {
  state = { currentStatus: [], basedOnPostedJob: false };
  componentDidMount() {
 //   this.loadStatus();
  }

  loadStatus = () => {
    const { dataProvider } = this.props;
    let { basedOnPostedJob } = this.state;
    dataProvider(CUSTOM, 'bworksSources', {
      subUrl: 'dashboard',
      method: 'get',
      query: { mode: basedOnPostedJob ? 'dataLogger' : 'bworksSource' },
    }).then(res => {
      if (res) {
        this.setState({ currentStatus: res.data });
      }
    });
  };

  onChangeDisPlay = (e, value) => {
    this.setState(
      {
        basedOnPostedJob: value,
      },
      this.loadStatus,
    );
  };

  render() {
    const { theme } = this.props;
    const { currentStatus, basedOnPostedJob } = this.state;
    return (
      <CustomPage title={'generic.pages.dashboard'}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TopStatistic />
          </Grid>
          <Grid item xs={12} md={9} style={{ display: 'flex' }}>
          <Table />
          </Grid>
          <Grid item xs={12} md={3} style={{ display: 'flex' }}>
            <LatestStatus
              currentStatus={currentStatus}
              basedOnPostedJob={basedOnPostedJob}
              onChangeDisPlay={this.onChangeDisPlay}
            />
          </Grid>
        </Grid>
      </CustomPage>
    );
  }
}

Dashboard.propTypes = {
  dataProvider: PropTypes.func.isRequired,
  theme: PropTypes.object,
};

const enhance = compose(withDataProvider, withTheme);

export default enhance(Dashboard);
