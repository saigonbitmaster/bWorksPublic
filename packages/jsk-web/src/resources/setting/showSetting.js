import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { Grid } from '@material-ui/core';
import { Show, HtmlField, TextField, translate, FlexForm, SelectField, DateField, NumberField } from 'ra-loopback3';
import config from '../../Config';

class ShowSetting extends Component {
  render() {
    const { translate, ...rest } = this.props;
    return (
      <Show {...rest} resource="settings">
        <FlexForm toolbar={false} style={{ flexGrow: 1 }} spacing={2}>
          <Grid middle container spacing={2}>
            <Grid middle item xs={12} sm={4}>
              <TextField source="name" />
            </Grid>

            <Grid middle item xs={12} sm={4}>
            <TextField source="value" />
            </Grid>
            <Grid middle item xs={12} sm={4}>
              <DateField source="createdDate" />
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

ShowSetting.propTypes = {
  translate: PropTypes.any,
};

ShowSetting.detaultProps = {
  hasShow: true,
};
const enhance = compose(translate);
export default enhance(ShowSetting);
