import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Edit, FlexForm, TextInput, required, translate, SelectInput, EditorInput, DateTimeInput, NumberInput } from 'ra-loopback3';
import { Grid } from '@material-ui/core';
import compose from 'recompose/compose';
import config from '../../Config';

class EditDeposit extends Component {
  render() {
    const { props } = this;
    return (
      <Edit {...props} Deposit>
     <FlexForm style={{ flexGrow: 1 }} spacing={2} redirect="list" submitOnEnter={false}>
        <Grid middle container spacing={2}>
            <Grid middle item xs={12} sm={6}>
              <TextInput source="name" validate={[required()]} label="Name"/>
            </Grid>
            <Grid middle item xs={12} sm={12}>
              <TextInput source="hash"  label="Hash"/>
            </Grid>
            <Grid middle item xs={12} sm={12}>
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
      </Edit>
    );
  }
}

EditDeposit.propTypes = {
  translate: PropTypes.func,
  hasList: PropTypes.bool,
  hasShow: PropTypes.bool,
  staticcontext: PropTypes.any,
};
EditDeposit.detaultProps = {
  hasList: true,
  hasShow: true,
};

const enhance = compose(translate);
export default enhance(EditDeposit);
