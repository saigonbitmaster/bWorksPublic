//tham khảo: https://www.epa.ie/pubs/advice/bworks/quality/bworks_Quality.pdf
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  translate,
  TextField,
  List,
  Datagrid,
  EditButton,
  ShowButton,
  SelectField,
  Filter,
  TextInput,
  DateField,
  NumberField,
} from 'ra-loopback3';
import { compose } from 'recompose';
import config from '../../Config';

const Filters = props => (
  <Filter {...props}>
    <TextInput source="name" label={'generic.search'} alwaysOn />
  </Filter>
);

let title = "Smart contract address: addr1wy27ag0w4dzhldz5tunqhlyy2pkllz6sym5zm509z659ngxgumgve"

class ListContractedJob extends Component {
  render() {
    const { translate, ...rest } = this.props;
    return (
      <List {...rest} filters={<Filters />} resource="ContractedJobs"  title={title} filter={{selected: true, employerAgreed: true, jobSeekerAgreed: true}} hasCreate={false}>
        <Datagrid>
          <TextField source="name" label="Job name"/>
          <TextField source="bidder" />
          <TextField source="bidderWallet" />
          <NumberField source="bidValue" label="Contract value (Ada)"/>
          <TextField source="contractType" />
          <TextField source="contractStatus" />
          <DateField source="createdDate" label="Submitted date" showTime/>
          <DateField source="expectedDate" label="Expired date" showTime/>
        
          <ShowButton label="View detail"/>
          <EditButton label="Note contract"/>
        </Datagrid>
      </List>
    );
  }
}

ListContractedJob.propTypes = {
  translate: PropTypes.func,
  hasList: PropTypes.bool,
  hasShow: PropTypes.bool,
  hasCreate: PropTypes.bool,
  hasEdit: PropTypes.bool,
};

export default compose(translate)(ListContractedJob);
