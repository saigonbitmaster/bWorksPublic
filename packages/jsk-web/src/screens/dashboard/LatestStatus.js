import React, { Component } from 'react';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  withStyles,
  withTheme,
  Avatar,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import { withDataProvider, translate } from 'ra-loopback3';

import { StatusIcon } from '../../styles/Icons';
import Offers from './offers';
import PostedJobs from './postedJobs';

const styles = theme => {
  return {
    header: {
      backgroundColor: theme.palette.primary.main,
      color: `${theme.palette.primary.contrastText} !important`,
    },
    subheader: {
      color: theme.palette.grey[400],
    },
    nested: {
      margin: 8,
    },
    chip: {
      height: '18px',
    },
    chipIcon: {
      backgroundColor: theme.palette.grey[300],
      color: theme.palette.primary.main,
      height: '18px',
      width: '18px',
    },
    left: {
      float: 'left',
    },
    statusIcon: {
      backgroundColor: theme.palette.primary.main,
    },
    iconMeno: {
      width: 24,
      height: 24,
    },
    dmaItem: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
  };
};
class Lapostjobstatus extends Component {
  getDmaPadding = dma => {
    return (dma.level * 2 - 2) * this.props.theme.spacing(1);
  };

  render() {
    const { classes, theme, currentStatus, basedOnPostedJob, onChangeDisPlay, translate } = this.props;
    return (
      <Card style={{ width: '100%' }}>
        <CardHeader
          avatar={
            <Avatar className={classes.statusIcon}>
              <StatusIcon />
            </Avatar>
          }
          title={translate('generic.topMatchingJobs')}
          subheader={
            <FormControlLabel
              label={translate('generic.yourOffers')}
              control={<Checkbox onChange={onChangeDisPlay} checked={basedOnPostedJob} />}
            />
          }
        />
        <CardContent className={classes.dmaItem}>
          <Divider />
          {basedOnPostedJob ? (
            <PostedJobs
              currentStatus={currentStatus}
              classes={classes}
              theme={theme}
              getDmaPadding={this.getDmaPadding}
            />
          ) : (
            <Offers
              currentStatus={currentStatus}
              classes={classes}
              theme={theme}
              getDmaPadding={this.getDmaPadding}
            />
          )}
        </CardContent>
      </Card>
    );
  }
}
Lapostjobstatus.propTypes = {
  dataProvider: PropTypes.func,
  theme: PropTypes.object,
  classes: PropTypes.object,
  currentStatus: PropTypes.array,
  basedOnPostedJob: PropTypes.bool,
  onChangeDisPlay: PropTypes.func,
  translate: PropTypes.func,
};
const enhance = compose(withStyles(styles), withTheme, withDataProvider, translate);
export default enhance(Lapostjobstatus);
