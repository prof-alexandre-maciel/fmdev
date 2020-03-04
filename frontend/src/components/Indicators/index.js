import { connect } from 'react-redux';
import BreadCrumb from '../BreadCrumb';
import Button from '../../styles/Button';
import React, { Component } from 'react';
import { ConfigContainer } from '../../styles/ConfigContainer';
import { Creators as ScreenActions } from '../../store/ducks/screen';
import {
  Header,
  Separator, Content, LeftContent,
  IndicatorContainer, RightContainer, SelectText, SelectContainer
} from './styles';
import { LMS_SELECT, PRE_PROCESSING } from '../../constants';
import { selectStyle } from '../../styles/global';
import Select from 'react-select';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { PickList } from 'primereact/picklist';

class Indicators extends Component {


  constructor() {
    super();
    this.state = {
      source: [
        { "brand": "VW", "year": 2012, "color": "Orange", "vin": "dsad231ff" },
        { "brand": "Audi", "year": 2011, "color": "Black", "vin": "gwregre345" },
        { "brand": "Renault", "year": 2005, "color": "Gray", "vin": "h354htr" },
        { "brand": "BMW", "year": 2003, "color": "Blue", "vin": "j6w54qgh" },
        { "brand": "Mercedes", "year": 1995, "color": "Orange", "vin": "hrtwy34" },
        { "brand": "Volvo", "year": 2005, "color": "Black", "vin": "jejtyj" },
        { "brand": "Honda", "year": 2012, "color": "Yellow", "vin": "g43gr" },
        { "brand": "Jaguar", "year": 2013, "color": "Orange", "vin": "greg34" },
        { "brand": "Ford", "year": 2000, "color": "Black", "vin": "h54hw5" },
        { "brand": "Fiat", "year": 2013, "color": "Red", "vin": "245t2s" }
      ],
      target: [],
      course: null,
      courses: [{ label: 'Pedagogia', value: 'Pedagogia' }]
    };
    this.getPickListTemplate = this.getPickListTemplate.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  getPickListTemplate(car) {
    return (
      <div className="p-clearfix">
        <div style={{ fontSize: '14px', float: 'right', margin: '15px 5px 0 0' }}>{car.brand} - {car.year} - {car.color}</div>
      </div>
    );
  }

  handleChange = (item, name) => this.setState({ [name]: item });

  onChange(event) {
    this.setState({
        source: event.source,
        target: event.target
    });
}

  render() {
    const { courses, course, source, target } = this.state;
    const { setScreen } = this.props;

    return (
      <ConfigContainer size='big'>
        <PerfectScrollbar style={{ width: '100%' }}>
          <BreadCrumb text='Voltar para ESCOLHA LMS' destiny={LMS_SELECT} />
          <Header>
            <h1>Selecione os indicadores</h1>
            <div>
              <Button onClick={setScreen.bind(this, PRE_PROCESSING)}>Continuar</Button>
            </div>
          </Header>

          <Content>
            <LeftContent>
              <SelectText>Cursos</SelectText>
              <SelectContainer>
                <Select
                  isMulti
                  isClearable
                  value={course}
                  onChange={(e) => this.handleChange(e, 'course')}
                  placeholder={'Selecione um Curso'}
                  styles={selectStyle}
                  options={courses} />
              </SelectContainer>


              <SelectText>Disciplinas</SelectText>
              <SelectContainer>
                <Select
                  isMulti
                  isClearable
                  value={course}
                  onChange={(e) => this.handleChange(e, 'subject')}
                  placeholder={'Selecione uma Disciplina'}
                  styles={selectStyle}
                  options={courses} />
              </SelectContainer>


              <SelectText>Turmas</SelectText>
              <SelectContainer>
                <Select
                  isMulti
                  isClearable
                  value={course}
                  onChange={(e) => this.handleChange(e, 'class')}
                  placeholder={'Selecione uma Turma'}
                  styles={selectStyle}
                  options={courses} />
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
                source={source}
                target={target}
                onChange={this.onChange}
                itemTemplate={this.getPickListTemplate}
                sourceStyle={{ height: '40vh', width: '26vw' }} targetStyle={{ height: '40vh', width: '26vw' }}
              />
            </RightContainer>

          </Content>
        </PerfectScrollbar>
      </ConfigContainer>
    );
  }
}


export default connect(
  null,
  { ...ScreenActions }
)(Indicators);