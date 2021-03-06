import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { translate, withDataProvider, CUSTOM } from 'ra-loopback3';
import { withTheme } from '@material-ui/core';
import { ReportVolumeIcon } from '../../../styles/Icons';
import StatisticWidget from './StatisticWidget';

class SmartContract extends Component {
  constructor(props) {
    super(props);
    const { translate } = props;
    this.state = {
      title: translate('generic.emp.widget.smartContract'),
      
      data: {
        today: { label: translate('generic.emp.widget.total'), value: 6, status: 'normal' },
        lastMonth: { label: translate('generic.emp.widget.pendingContract'), value: 4, status: 'normal' },
        thisYear: { label: translate('generic.emp.widget.completedContract'), value: 2, status: 'normal' },
      },
    };
  }

  dashboardData = () => {
    this.props
      .dataProvider(CUSTOM, 'bworksSources', {
        subUrl: 'dashboard',
        method: 'get',
        query: { mode: 'widget' },
      })
      .then(res => {
        let todayValue = res.data.filter(item => item.id == 'today')[0].value;
        let lastMonthValue = res.data.filter(item => item.id == 'lastMonth')[0].value;
        let thisYearValue = res.data.filter(item => item.id == 'thisYear')[0].value;
        let data = Object.assign({}, this.state.data);
        data.today.value = todayValue;
        data.lastMonth.value = lastMonthValue;
        data.thisYear.value = thisYearValue;
        this.setState(data);
      });
  };

  componentDidMount() {
  //  this.dashboardData();
  }
  render() {
    return (
      <StatisticWidget
        iconStyle={{ backgroundColor: this.props.theme.palette.error.main }}
        icon={<ReportVolumeIcon />}
        {...this.state}
      />
    );
  }
}

SmartContract.propTypes = {
  translate: PropTypes.func,
  theme: PropTypes.object,
  dataProvider: PropTypes.any,
};
const enhance = compose(translate, withTheme, withDataProvider);
export default enhance(SmartContract);
