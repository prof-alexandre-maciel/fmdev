import Plotly from 'plotly.js-dist';
import React, { Component } from 'react';
import { CenterContainer } from './styles';
import createPlotlyComponent from 'react-plotly.js/factory';
import { ProgressSpinner } from 'primereact/progressspinner';
import { connect } from 'react-redux';
import { primaryColor } from '../../styles/global';

const Plot = createPlotlyComponent(Plotly);

class BoxPlot extends Component {

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

  render() {
    let trace = {};
    const { name } = this.props;
    const { error, loading, data } = this.props.box_plot;

    if (error && !loading) return this.renderError();
    if (loading) return this.renderLoading();

    if (!data.length) return this.renderEmptyState();

    trace = {
      name,
      y: data,
      type: 'box',
    };

    return (
      <Plot
        useResizeHandler={true}
        style={{ width: '100%', height: '50vh' }}
        data={[trace]}
        config={{
          displaylogo: false,
          displayModeBar: false,
          responsive: true,
          editable: false
        }}
        layout={{
          title: 'Box Plot',
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

const mapStateToProps = ({ box_plot }) => ({ box_plot });

export default connect(
  mapStateToProps, null
)(BoxPlot);