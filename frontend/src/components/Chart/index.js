import Plotly from 'plotly.js-dist';
import React, { Component } from 'react';
import { CenterContainer } from './styles';
import createPlotlyComponent from 'react-plotly.js/factory';
import { ProgressSpinner } from 'primereact/progressspinner';
import { connect } from 'react-redux';
import { primaryColor } from '../../styles/global';

const Plot = createPlotlyComponent(Plotly);

class Chart extends Component {

  renderLoading = () => (
    <CenterContainer color={primaryColor}>
      <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="4" fill="#EEEEEE" animationDuration=".5s" />
    </CenterContainer>
  )

  renderError = () => (
    <CenterContainer>Ocorreu um erro</CenterContainer>
  )

  renderEmptyState = () => (
    <CenterContainer>Sem detalhes para este indicador</CenterContainer>
  )

  getTrace = () => {
    let trace = {};
    const { name } = this.props;
    const { data, chartType } = this.props.chart;

    if (chartType === 'box') {
      trace.y = data;
    }

    if (chartType === 'histogram') {
      trace.x = data;
    }

    trace.name = name;
    trace.marker = { color: primaryColor };
    trace.type = chartType;

    return [trace];
  }

  render() {
    const { error, loading, data, chartType } = this.props.chart;

    if (error && !loading) return this.renderError();
    if (loading) return this.renderLoading();

    if (!data.length) return this.renderEmptyState();

    return (
      <Plot
        useResizeHandler={true}
        style={{ width: '100%', height: '50vh' }}
        data={this.getTrace()}
        config={{
          displaylogo: false,
          displayModeBar: false,
          responsive: true,
          editable: false
        }}
        layout={{
          title: chartType === 'box' ? 'Box Plot' : 'Histograma',
          margin: {
            l: 100,
            r: 100,
            b: 50,
            t: 50,
            pad: 2
          },
          plot_bgcolor: '#F3F3F3',
          paper_bgcolor: '#F3F3F3',
          autosize: true,
          font: {
            family: 'Avenir'
          },
        }}
      />
    );
  }
}

const mapStateToProps = ({ chart }) => ({ chart });

export default connect(
  mapStateToProps, null
)(Chart);