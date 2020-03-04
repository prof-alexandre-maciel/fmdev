import { connect } from 'react-redux';
import BreadCrumb from '../BreadCrumb';
import Button from '../../styles/Button';
import React, { Component } from 'react';
import { ConfigContainer } from '../../styles/ConfigContainer';
import { Creators as ScreenActions } from '../../store/ducks/screen';
import { Creators as CourseActions } from '../../store/ducks/course';
import { Creators as SubjectActions } from '../../store/ducks/subject';
import { Creators as SemesterActions } from '../../store/ducks/semester';
import { Creators as IndicatorActions } from '../../store/ducks/indicator';
import { actions as toastrActions } from 'react-redux-toastr';
import {
  Header, Separator, Content, LeftContent,
  RightContainer, SelectText, SelectContainer
} from './styles';
import { LMS_SELECT, PRE_PROCESSING } from '../../constants';
import { selectStyle } from '../../styles/global';
import Select from 'react-select';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { PickList } from 'primereact/picklist';

class Indicators extends Component {

  state = {
    target: [],
    courseSelected: null,
    subjectSelected: null,
    semesterSelected: null
  };

  componentDidMount() {
    this.props.getCourses();
    this.props.getSubjects();
    this.props.getSemesters();
    this.props.getIndicators();
  }

  getPickListTemplate(item) {
    return (
      <div className="p-clearfix">
        <div style={{ fontSize: '14px', float: 'right', margin: '15px 5px 0 0' }}>{item.description}</div>
      </div>
    );
  }

  handleChange = (item, name) => this.setState({ [name]: item });

  onChange(event) {
    this.props.indicatorSuccess(event.source);

    this.setState({
      target: event.target
    });
  }

  renderWarningMsg = (msg) => {
    this.props.add({
      type: 'warning',
      title: 'Atenção',
      message: msg
    });
  }

  onSubmit = () => {
    const { target } = this.state;
    const { setScreen } = this.props;

    if (!target || !target.length || target.length <= 1) {
      this.renderWarningMsg('Selecione ao menos dois indicadores');
      return;
    }

    setScreen(PRE_PROCESSING);
  }

  render() {
    const { course, subject, semester, indicator } = this.props;
    const { target, courseSelected, subjectSelected, semesterSelected } = this.state;

    return (
      <ConfigContainer size='big'>
        <PerfectScrollbar style={{ width: '100%' }}>
          <BreadCrumb text='Voltar para ESCOLHA LMS' destiny={LMS_SELECT} />
          <Header>
            <h1>Selecione os indicadores</h1>
            <div>
              <Button onClick={this.onSubmit.bind(this)}>Continuar</Button>
            </div>
          </Header>

          <Content>
            <LeftContent>
              <SelectText>Cursos</SelectText>
              <SelectContainer>
                <Select
                  isMulti
                  isClearable
                  value={courseSelected}
                  onChange={(e) => this.handleChange(e, 'courseSelected')}
                  placeholder={'Selecione os Cursos'}
                  styles={selectStyle}
                  options={course.data.asMutable()} />
              </SelectContainer>


              <SelectText>Disciplinas</SelectText>
              <SelectContainer>
                <Select
                  isMulti
                  isClearable
                  value={subjectSelected}
                  onChange={(e) => this.handleChange(e, 'subjectSelected')}
                  placeholder={'Selecione as Disciplinas'}
                  styles={selectStyle}
                  options={subject.data.asMutable()} />
              </SelectContainer>


              <SelectText>Turmas</SelectText>
              <SelectContainer>
                <Select
                  isMulti
                  isClearable
                  value={semesterSelected}
                  onChange={(e) => this.handleChange(e, 'semesterSelected')}
                  placeholder={'Selecione as Turmas'}
                  styles={selectStyle}
                  options={semester.data.asMutable()} />
              </SelectContainer>
            </LeftContent>

            <Separator>&nbsp;</Separator>

            <RightContainer>
              <PickList
                responsive={true}
                showSourceControls={false}
                showTargetControls={false}
                sourceHeader="Disponíveis"
                targetHeader="Selecionados"
                source={indicator.data}
                target={target}
                onChange={this.onChange.bind(this)}
                itemTemplate={this.getPickListTemplate.bind(this)}
                sourceStyle={{ height: '40vh', width: '26vw' }} targetStyle={{ height: '40vh', width: '26vw' }}
              />
            </RightContainer>

          </Content>
        </PerfectScrollbar>
      </ConfigContainer>
    );
  }
}

const mapStateToProps = ({ course, subject, semester, indicator }) => ({ course, subject, semester, indicator });

export default connect(
  mapStateToProps,
  {
    ...ScreenActions, ...CourseActions,
    ...SubjectActions, ...SemesterActions,
    ...IndicatorActions, ...toastrActions
  }
)(Indicators);