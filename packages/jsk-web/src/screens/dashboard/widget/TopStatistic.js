import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, withTheme } from '@material-ui/core';
import { withDataProvider } from 'ra-loopback3';
import { compose } from 'recompose';
import BiddingJobs from './biddingJobs';
import Contracts from './contract';
import Fund from './fund';
import MatchJobs from './totalMatchJob';

class TopStatistic extends Component {
  componentDidMount() {}
  render() {
    const { theme } = this.props;
    return (
      <Grid container spacing={2}>
        <Grid item sm={6} md={3} xs={12}>
          <BiddingJobs />
        </Grid>
        <Grid item sm={6} md={3} xs={12}>
          <Contracts />
        </Grid>
        <Grid item sm={6} md={3} xs={12}>
          <Fund />
        </Grid>
        <Grid item sm={6} md={3} xs={12}>
          <MatchJobs />
        </Grid>
      </Grid>
    );
  }
}
TopStatistic.propTypes = {
  dataProvider: PropTypes.func,
  theme: PropTypes.object,
};

const enhance = compose(withTheme, withDataProvider);
export default enhance(TopStatistic);
