import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Edit, FlexForm, TextInput, required, translate, BooleanInput, EditorInput, DateTimeInput, NumberInput } from 'ra-loopback3';
import { Grid } from '@material-ui/core';
import compose from 'recompose/compose';
import config from '../../Config';

class EditPartner extends Component {
  render() {
    const { props } = this;
    return (
      <Edit {...props} PostJob>
         <FlexForm style={{ flexGrow: 1 }} spacing={2} redirect="list" submitOnEnter={false}>
        <Grid middle container spacing={2}>
            <Grid middle item xs={12} sm={6}>
              <TextInput source="name" validate={[required()]} label="Job name" disabled/>
            </Grid>
            <Grid middle item xs={12} sm={6}>
              <TextInput source="employer"  label="Employer name" disabled/>
            </Grid>
            <Grid middle item xs={12} sm={12}>
              <TextInput source="employerWallet"  label="Employer wallet address" fullWidth disabled/>
            </Grid>
            <Grid middle item xs={12} sm={6}>
              <NumberInput source="bidValue" label="Placed bid value" disabled/>
            </Grid>
            <Grid middle item xs={12} sm={6}>
              <NumberInput source="estimatedCost" label="Budget (Ada)" disabled/>
            </Grid>
          
        
            <Grid middle item xs={12} sm={6}>
              <DateTimeInput source="createdDate" label="Created date" disabled/>
            </Grid>
            <Grid middle item xs={12} sm={6}>
              <DateTimeInput source="expectedDate"  label="Expire date" disabled/>
            </Grid>
          
            <Grid middle item xs={12} sm={6}>
              <BooleanInput source="selected" label="You are selected" disabled/>
            </Grid>
            <Grid middle item xs={12} sm={6}>
              <BooleanInput source="employerAgreed" label="Employee agreed to contract" disabled/>
            </Grid>
         
            <Grid middle item xs={12} sm={6}>
              <BooleanInput source="jobSeekerAgreed" label="I AGREE to contract" />
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

EditPartner.propTypes = {
  translate: PropTypes.func,
  hasList: PropTypes.bool,
  hasShow: PropTypes.bool,
  staticcontext: PropTypes.any,
};
EditPartner.detaultProps = {
  hasList: true,
  hasShow: true,
};

const enhance = compose(translate);
export default enhance(EditPartner);
