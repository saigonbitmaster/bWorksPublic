import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import {
  SelectInput,
  translate,
  LongTextInput,
  ReferenceInput,
  FormDataConsumer,
  DisabledInput,
  NumberInput,
  minValue,
  required,
  REDUX_FORM_NAME,
} from 'react-admin';
import { change } from 'redux-form';
import DateInput from '../../src/input/DateInput';
import Create from '../detail/Create';
import { Grid } from '@material-ui/core';
import { CUSTOM } from '../data/LoopbackRest';
import DateField from '../field/DateField';
import withDataProvider from '../data/withDataProvider';
import FlexForm from '../form/FlexForm';
import FlexItemForward from '../form/FlexItemForward';
import EditorInput from '../input/EditorInput';
import CustomFileInput from '../input/CustomFileInput';
import moment from 'moment-timezone';

class IssueCreatePage extends Component {
  state = {
    statusChoices: [],
    typeChoices: [],
    priorityChoices: [],
  };

  componentDidMount() {
    const { dataProvider, translate } = this.props;
    dataProvider(CUSTOM, 'Tasks', { subUrl: 'getAllEnum' }).then(({ data: { priority, status, type } }) => {
      const statusChoices = status.map(i => {
        return { id: i, name: translate(`ra.tasks.statuses.${i}`) };
      });
      const typeChoices = type.map(i => {
        return { id: i, name: translate(`ra.tasks.types.${i}`) };
      });
      const priorityChoices = priority.map(i => {
        return { id: i, name: translate(`ra.tasks.priorities.${i}`) };
      });
      const choices = {
        statusChoices: statusChoices,
        typeChoices: typeChoices,
        priorityChoices: priorityChoices,
      };
      this.setState(choices);
    });
  }

  nowDate = () => {
    let now = Date.now();
    let nowString = new Date(now);
    let nowISO = nowString.toISOString();
    return nowISO;
  };

  render() {
    const { dataProvider, translate, projectKey, ...rest } = this.props;
    return (
      <Create title={'ra.action.create'} {...rest}>
        <FlexForm redirect="list">
          <FlexItemForward>
            <Grid middle container spacing={2}>
              <Grid middle item sm={12}>
                <LongTextInput label={translate('ra.tasks.fields.name')} source="name" validate={required()} />
              </Grid>
              <Grid middle item sm={6}>
                <SelectInput
                  label={translate('ra.tasks.fields.status')}
                  validate={required()}
                  source="status"
                  choices={this.state.statusChoices}
                />
              </Grid>
              <Grid middle item sm={6}>
                <SelectInput label={translate('ra.tasks.fields.type')} source="type" choices={this.state.typeChoices} />
              </Grid>
              <Grid middle item sm={6}>
                <SelectInput
                  label={translate('ra.tasks.fields.priority')}
                  validate={required()}
                  source="priority"
                  choices={this.state.priorityChoices}
                />
              </Grid>
              <Grid middle item sm={6}>
                <ReferenceInput
                  resource="Tasks"
                  label={translate('ra.tasks.fields.assigneeId')}
                  validate={required()}
                  source="assigneeId"
                  reference="appusers"
                >
                  <SelectInput optionText="fullName" />
                </ReferenceInput>
              </Grid>
              <Grid middle item sm={6}>
                <FormDataConsumer>
                  {({ formData, dispatch }) => (
                    <DateInput
                      label={translate('ra.tasks.fields.startDate')}
                      options={{ defaultValue: new Date() }}
                      inputProps={{
                        onChange: startDate => {
                          dispatch(
                            change(
                              REDUX_FORM_NAME,
                              'estimateTime',
                              moment(formData.dueDate)
                                .diff(moment(startDate), 'days')
                                .toString(),
                            ),
                          );
                          dispatch(change(REDUX_FORM_NAME, 'startDate', moment(startDate).toString()));
                        },
                      }}
                      source="startDate"
                    />
                  )}
                </FormDataConsumer>
              </Grid>
              <Grid middle item sm={6}>
                <FormDataConsumer>
                  {({ formData, dispatch }) => (
                    <DateInput
                      label={translate('ra.tasks.fields.dueDate')}
                      inputProps={{
                        onChange: dueDate => {
                          dispatch(
                            change(
                              REDUX_FORM_NAME,
                              'estimateTime',
                              moment(dueDate)
                                .startOf('day')
                                .diff(moment(formData.startDate).startOf('day'), 'days')
                                .toString(),
                            ),
                          );
                          dispatch(change(REDUX_FORM_NAME, 'dueDate', moment(dueDate).toString()));
                        },
                      }}
                      source="dueDate"
                    />
                  )}
                </FormDataConsumer>
              </Grid>
              <Grid middle item sm={6}>
                <NumberInput
                  disabled
                  defaultValue={0}
                  validate={[minValue(0)]}
                  label={translate('ra.tasks.fields.estimateTime')}
                  source="estimateTime"
                />
              </Grid>
              <Grid middle item sm={6} xs={12}>
                <FormDataConsumer>
                  {({ formData, ...rest }) =>
                    formData.status === 'finish' && (
                      <DateField
                        label={translate('ra.tasks.fields.finishDate')}
                        source="finishDate"
                        addLabel
                        {...rest}
                      />
                    )
                  }
                </FormDataConsumer>
              </Grid>
              <Grid middle item sm={6} xs={12}>
                <CustomFileInput
                  storage={`${projectKey}files`}
                  label={translate('ra.tasks.fields.attachedFiles')}
                  source="attachedFiles"
                  translate={translate}
                  dataProvider={dataProvider}
                />
              </Grid>
              <Grid middle item sm={12}>
                <EditorInput label={translate('ra.tasks.fields.description')} fullWidth source="description" />
              </Grid>
            </Grid>
            {projectKey && <DisabledInput source="projectKey" defaultValue={projectKey} style={{ display: 'none' }} />}
          </FlexItemForward>
        </FlexForm>
      </Create>
    );
  }
}

IssueCreatePage.propTypes = {
  dataProvider: PropTypes.func,
  translate: PropTypes.any,
  projectKey: PropTypes.string,
};

let enhance = compose(withDataProvider, translate);
export default enhance(IssueCreatePage);
