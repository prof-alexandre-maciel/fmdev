import React, { Component } from 'react';
import { ConfigContainer } from '../../styles/ConfigContainer';
import BreadCrumb from '../BreadCrumb';
import {
  Header, Table,
  FirstHeaderColumn, HeaderColumn,
  FirstItemColumn, ItemColumn
} from './styles';
import Button from '../../styles/Button';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { PRE_PROCESSING } from '../../constants';

class Train extends Component {

  state = {
    data: [
      { id: 1, algorithm: "Bayes optimal classifier", description: 'The Bayes optimal classifier is a classification technique. It is an ensemble of all ths' },
      { id: 1, algorithm: "Bootstrap aggregating (bagging)", description: 'Bootstrap aggregating, often abbreviated as bagging, involves having each model in the ensemble vote with equal weight.' },
      { id: 1, algorithm: "Boosting", description: 'Boosting involves incrementally building an ensemble by training each new model instance to emphasize ' },
      { id: 1, algorithm: "Bayesian parameter averaging", description: 'Boosting involves incrementally building an ensemble by training each new model instance to emphasize ' },
      { id: 1, algorithm: "Bayesian model combination", description: 'Boosting involves incrementally building an ensemble by training each new model instance to emphasize ' },
    ],
  };

  renderItem(item) {
    const itemRows = [
      <tr key={"row-data-" + item.id}>
        <FirstItemColumn><Checkbox onChange={() => { }} /></FirstItemColumn>
        <ItemColumn>{item.algorithm}</ItemColumn>
        <ItemColumn>{item.description}</ItemColumn>
      </tr >
    ];

    return itemRows;
  }


  render() {
    const { data } = this.state;

    return (
      <ConfigContainer size='big'>

        <BreadCrumb text='Voltar para pré-processamento' destiny={PRE_PROCESSING} />

        <Header>
          <h1>Escolha um ou mais modelos para predição</h1>
          <div>
            <Button>Executar Modelos</Button>
          </div>
        </Header>

        <Table>
          <thead>
            <tr>
              <FirstHeaderColumn>&nbsp;</FirstHeaderColumn>
              <HeaderColumn>Algoritmo</HeaderColumn>
              <HeaderColumn>Descrição</HeaderColumn>
            </tr>
          </thead>

          <tbody>
            {data.map(item => this.renderItem(item))}
          </tbody>
        </Table>

      </ConfigContainer >
    )
  }
}

export default Train