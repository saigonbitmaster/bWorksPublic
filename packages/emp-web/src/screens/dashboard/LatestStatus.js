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
import SelectedBids from './selectedBids';
import TopBids from './topBids';

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
    bidItem: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
  };
};
class Lapostjobstatus extends Component {
  getPadding = bid => {
    return (bid.level * 2 - 2) * this.props.theme.spacing(1);
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
              label="Selected candidates"
              control={<Checkbox onChange={onChangeDisPlay} checked={basedOnPostedJob} />}
            />
          }
        />
        <CardContent className={classes.bidItem}>
          <Divider />
          {basedOnPostedJob ? (
            <TopBids
              currentStatus={currentStatus}
              classes={classes}
              theme={theme}
              getPadding={this.getPadding}
            />
          ) : (
            <SelectedBids
              currentStatus={currentStatus}
              classes={classes}
              theme={theme}
              getPadding={this.getPadding}
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
