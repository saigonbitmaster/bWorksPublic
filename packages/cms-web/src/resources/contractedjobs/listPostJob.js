//tham khảo: https://www.epa.ie/pubs/advice/water/quality/Water_Quality.pdf
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

class ListPostJob extends Component {
  render() {
    const { translate, ...rest } = this.props;
    return (
      <List {...rest} filters={<Filters />} resource="tests"  title={title}>
        <Datagrid>
          <TextField source="name" label="Job name"/>
          <TextField source="bidder" />
          <TextField source="bidderWallet" />
          <NumberField source="bidValue" label="Contract value (Ada)"/>
          <TextField source="contractType" />
          <TextField source="contractStatus" />
          <DateField source="createdDate" label="Submitted date" />
          <DateField source="expectedDate" label="Expected released date"/>
        
          <ShowButton label="View detail"/>
          <EditButton label="Change contract"/>
        </Datagrid>
      </List>
    );
  }
}

ListPostJob.propTypes = {
  translate: PropTypes.func,
  hasList: PropTypes.bool,
  hasShow: PropTypes.bool,
  hasCreate: PropTypes.bool,
  hasEdit: PropTypes.bool,
};

export default compose(translate)(ListPostJob);
