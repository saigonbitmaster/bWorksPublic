import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { Grid } from '@material-ui/core';
import { Show, HtmlField, TextField, translate, FlexForm, SelectField, DateField, NumberField } from 'ra';
import config from '../../Config';

class ShowPostJob extends Component {
  render() {
    const { translate, ...rest } = this.props;
    return (
      <Show {...rest} resource="tests">
        <FlexForm toolbar={false} style={{ flexGrow: 1 }} spacing={2}>
          <Grid middle container spacing={2}>
            <Grid middle item xs={12} sm={4}>
              <TextField source="name" />
            </Grid>
         
            <Grid middle item xs={12} sm={4}>
            <TextField source="bidder" />
            </Grid>
            <Grid middle item xs={12} sm={12}>
            <TextField source="bidderWallet" />
            </Grid>
            <Grid middle item xs={12} sm={4}>
            <TextField source="contractType" />
            </Grid>
            <Grid middle item xs={12} sm={4}>
            <TextField source="contractStatus" />
            </Grid>
            <Grid middle item xs={12} sm={4}>
            <DateField source="createdDate" label="created date" />
            </Grid>
            <Grid middle item xs={12} sm={4}>
            <DateField source="expectedDate" label="expected released date"/>
            </Grid>
           
            <Grid middle item xs={12} sm={12}>
              <HtmlField source="description" />
            </Grid>
          </Grid>
        </FlexForm>
      </Show>
    );
  }
}

ShowPostJob.propTypes = {
  translate: PropTypes.any,
};

ShowPostJob.detaultProps = {
  hasShow: true,
};
const enhance = compose(translate);
export default enhance(ShowPostJob);
