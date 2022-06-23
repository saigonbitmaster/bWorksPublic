import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Create,
  FlexForm,
  TextInput,
  required,
  translate,
  SelectInput,
  SelectArrayInput,
  EditorInput,
  DateTimeInput,
  NumberInput,
} from 'ra-loopback3';
import { Grid } from '@material-ui/core';
import compose from 'recompose/compose';
import config from '../../Config';

let contractStatus = [
  { id: 'new', name: 'Create new contract' },
  { id: 'pending', name: 'Pending' },
  { id: 'completed', name: 'Complete' },
  { id: 'canceled', name: 'Cancel' },
];
let contractTypes = [
  { id: 'escrow', name: 'Escrow' },
];
class CreateContractedJob extends Component {
  render() {
    const { props } = this;
    return (
      <Create {...props} resource="ContractedJobs">
        <FlexForm style={{ flexGrow: 1 }} spacing={2} redirect="list" submitOnEnter={false}>
          <Grid middle container spacing={2}>
            <Grid middle item xs={12} sm={6}>
              <TextInput source="name" validate={[required()]} label="Job name" />
            </Grid>
            <Grid middle item xs={12} sm={6}>
              <TextInput source="bidder" label="Bidder name" />
            </Grid>
            <Grid middle item xs={12} sm={12}>
              <TextInput source="bidderWallet" label="Bidder wallet" />
            </Grid>
            <Grid middle item xs={12} sm={6}>
              <NumberInput source="contractValue" label="Contract value" />
            </Grid>
           
            <Grid middle item xs={12} sm={6}>
              <SelectInput
                source="contractStatus"
                choices={contractStatus}
                translateChoice={true}
                optionText="name"
                optionValue="id"
              />
            </Grid>
            <Grid middle item xs={12} sm={6}>
              <SelectInput
                source="contractType"
                choices={contractTypes}
                translateChoice={true}
                optionText="name"
                optionValue="id"
              />
            </Grid>
            <Grid middle item xs={12} sm={6}>
              <DateTimeInput source="createdDate" label="Created date" />
            </Grid>
            <Grid middle item xs={12} sm={6}>
              <DateTimeInput source="expectedDate" label="Released date" />
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

CreateContractedJob.propTypes = {
  translate: PropTypes.func,
  hasList: PropTypes.bool,
  hasShow: PropTypes.bool,
  hasCreate: PropTypes.bool,
  hasEdit: PropTypes.bool,
  staticcontext: PropTypes.any,
};
CreateContractedJob.detaultProps = {
  hasList: true,
  hasShow: true,
  hasCreate: false,
  hasEdit: false,
};

const enhance = compose(translate);
export default enhance(CreateContractedJob);
