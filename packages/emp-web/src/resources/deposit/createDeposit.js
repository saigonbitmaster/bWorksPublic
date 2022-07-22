import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Create, FlexForm, TextInput, required, translate, SelectInput, EditorInput, DateTimeInput, NumberInput,SelectArrayInput } from 'ra-loopback3';
import { Grid } from '@material-ui/core';
import compose from 'recompose/compose';
import config from '../../Config';

class CreateDeposit extends Component {
  render() {
    const { props } = this;
    return (
      <Create {...props} resource="deposits">
        <FlexForm style={{ flexGrow: 1 }} spacing={2} redirect="list" submitOnEnter={false}>
        <Grid middle container spacing={2}>
            <Grid middle item xs={12} sm={6}>
              <TextInput source="name" validate={[required()]} label="Name"/>
            </Grid>
            <Grid middle item xs={12} sm={12}>
              <TextInput source="hash"  label="Hash"/>
            </Grid>
            <Grid middle item xs={12} sm={6}>
              <NumberInput source="value" label="Value"/>
            </Grid>
            <Grid middle item xs={12} sm={6}>
              <DateTimeInput source="createdDate" label="Created date"/>
            </Grid>

           
           
            <Grid middle item xs={12} sm={12}>
              <EditorInput source="description" fullWidth />
            </Grid>
          </Grid>
        </FlexForm>
      </Create>
    );
  }
}

CreateDeposit.propTypes = {
  translate: PropTypes.func,
  hasList: PropTypes.bool,
  hasShow: PropTypes.bool,
  hasCreate: PropTypes.bool,
  hasEdit: PropTypes.bool,
  staticcontext: PropTypes.any,
};
CreateDeposit.detaultProps = {
  hasList: true,
  hasShow: true,
  hasCreate: false,
  hasEdit: false,
};

const enhance = compose(translate);
export default enhance(CreateDeposit);
