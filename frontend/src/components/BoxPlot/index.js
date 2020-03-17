import Plotly from 'plotly.js-dist';
import React, { Component } from 'react';
import { CenterContainer } from './styles';
import createPlotlyComponent from 'react-plotly.js/factory';
import { CircularProgress } from '@material-ui/core';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { baseColor } from '../App/theme';

const Plot = createPlotlyComponent(Plotly);

class BoxPlot extends Component {

  renderLoading = () => (
    <CenterContainer color={baseColor}>
      <CircularProgress color="primary" />
    </CenterContainer>
  )

  renderError = () => (
    <CenterContainer>Ocorreu um erro</CenterContainer>
  )

  renderEmptyState = () => (
    <CenterContainer>Sem dados</CenterContainer>
  )

  render() {
    let traces = [];
    const { error, loading, data } = this.props.boxplot;

    if (error && !loading) return this.renderError();
    if (loading) return this.renderLoading();

    if (!Object.keys(data).length) return this.renderEmptyState();

    return (
      <Plot
        useResizeHandler={true}
        style={{ width: '100%', height: '25vh' }}
        data={traces}
        config={{
          displaylogo: false,
          displayModeBar: false,
          responsive: true,
          editable: false
        }}
        layout={{
          margin: {
            l: 0,
            r: 0,
            b: 25,
            t: 25,
            pad: 0
          },
          barmode: 'group',
          plot_bgcolor: '#EEE',
          paper_bgcolor: '#EEE',
          autosize: true,
          font: {
            family: 'Avenir'
          },
        }}
      />
    );
  }
}

const mapStateToProps = ({ boxplot }) => ({ boxplot });

export default compose(
  connect(mapStateToProps, null)
)(BoxPlot);