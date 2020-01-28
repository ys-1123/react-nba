import React, {Component} from 'react';
import _ from 'lodash';
import {Radio, Row, Col, Switch} from 'antd';
import ShotChart from './ShotChart';
import CountSlider from './CountSlider';


class DataViewContainer extends Component {
  state = {
    minCount: 2,
    chartType: 'hexbin',
    displayToolTips: true,
  }

  onCountSliderChange = (count) => {
    this.setState({minCount: Number(count) || 2});
  }

  onChartTypeChange = (e) => {
    this.setState({chartType: e.target.value});
  }

  onTooltipChange = (displayToolTips) => {
    console.log(displayToolTips);
    this.setState({displayToolTips});
  }

  render() {
    return (
        <div className="data-view">
          <ShotChart playerId={this.props.playerId}
                     minCount={this.state.minCount}
                     chartType={this.state.chartType}
                     displayToolTips={this.state.displayToolTips}/>
          <div className="filters">
            {
              this.state.chartType === "hexbin"
                  ? <CountSlider
                      value={this.state.minCount}
                      chartType={this.state.chartType}
                      onCountSliderChange={_.debounce(this.onCountSliderChange, 500)}/>
                  : null
            }
            <br/>
            <Row>
              <Col span={9}>
                <Radio.Group onChange={this.onChartTypeChange} value={this.state.chartType}>
                  <Radio value="hexbin">Hexbin</Radio>
                  <Radio value="scatter">Scatter</Radio>
                </Radio.Group>
              </Col>
              <Col span={4}>
                <Switch
                    checkedChildren="On"
                    unCheckedChildren="Off"
                    onChange={this.onTooltipChange}
                    defaultChecked/>
              </Col>
            </Row>
          </div>
        </div>
    );
  }
}

export default DataViewContainer;
