import React, { Component } from 'react';
import { ConfigContainer } from '../../styles/ConfigContainer';
import {
  Header, LoadingContainer, SelectText, selectStyle
} from '../../styles/global';
import { connect } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Creators as CourseActions } from '../../store/ducks/course';
import { Creators as IndicatorActions } from '../../store/ducks/indicator';
import { Creators as SubjectActions } from '../../store/ducks/subject';
import { Creators as SemesterActions } from '../../store/ducks/semester';
import { LeftContent, SelectContainer } from './styles';
import Select from 'react-select';

class Dashboard extends Component {

  componentDidMount() {
    this.props.getCourses({ datasource: 'moodle' });
  }

  handleChange = (item, name) => {
    this.props.setIndicator(name, item);
    this.refreshFilters(name, item);
  };

  refreshFilters = (name, item) => {
    if (name === 'courseSelected') {

      if (!item || !item.length) {
        this.props.subjectSuccess([]);
        this.props.semesterSuccess([]);
        return;
      }

      this.props.getSubjects({ courses: item.map(item => item.value) });
    }

    if (name === 'subjectSelected') {
      if (!item || !item.length) {
        this.props.semesterSuccess([]);
        return;
      }

      this.props.getSemesters({ subjects: item.map(item => item.value) });
    }
  };

  render() {
    // const data = [];
    const loading = false;
    const { course, subject, semester } = this.props;
    const { courseSelected, subjectSelected, semesterSelected } = this.props.indicator;

    return (
      <PerfectScrollbar style={{ width: '100%', overflowX: 'auto' }}>
        <ConfigContainer size='big' style={{ color: '#000' }}>

          <Header>
            <h1>Learning Analytics Dashboard</h1>
          </Header>

          <LeftContent>
            <SelectText>Cursos</SelectText>
            <SelectContainer>
              <Select
                isMulti
                isClearable
                value={courseSelected}
                noOptionsMessage={() => 'Sem dados'}
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
                noOptionsMessage={() => 'Sem dados'}
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
                noOptionsMessage={() => 'Sem dados'}
                onChange={(e) => this.handleChange(e, 'semesterSelected')}
                placeholder={'Selecione as Turmas'}
                styles={selectStyle}
                options={semester.data.asMutable()} />
            </SelectContainer>

          </LeftContent>


          {/* {!data.length && !loading ?
            <StatusMsgContainer> Sem dados para serem exibidos. </StatusMsgContainer>
            : null} */}

          {loading ?
            <LoadingContainer>
              <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="4" fill="#EEEEEE" animationDuration=".5s" />
            </LoadingContainer>
            : null}

        </ConfigContainer >
      </PerfectScrollbar>
    )
  }
}

const mapStateToProps = ({ course, indicator, subject, semester }) => ({ course, indicator, subject, semester });

export default connect(mapStateToProps,
  {
    ...CourseActions, ...IndicatorActions,
    ...SemesterActions, ...SubjectActions
  })(Dashboard);