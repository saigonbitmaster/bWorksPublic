import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  translate,
  TextField,
  List,
  Datagrid,
  EditButton,
  ShowButton,
  Filter,
  TextInput,
  DateField,
} from 'ra-loopback3';
import { compose } from 'recompose';

const Filters = props => (
  <Filter {...props}>
    <TextInput source="name" label={'generic.search'} alwaysOn />
  </Filter>
);



class ListSetting extends Component {
  render() {
    const { translate, ...rest } = this.props;
    return (
      <List {...rest} filters={<Filters />} resource="settings">
        <Datagrid>
          <TextField source="name" />
          <TextField source="value" />
         
          <DateField source="createdDate" label="Created date" />
          
          <ShowButton label="View Detail"/>
          <EditButton />
        </Datagrid>
      </List>
    );
  }
}

ListSetting.propTypes = {
  translate: PropTypes.func,
  hasList: PropTypes.bool,
  hasShow: PropTypes.bool,
  hasCreate: PropTypes.bool,
  hasEdit: PropTypes.bool,
};

export default compose(translate)(ListSetting);
