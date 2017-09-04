import React, {Component} from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'

import {select, scaleSqrt} from 'd3'

const SVG = styled.svg`
  height: 410px;
  width: 410px;
  margin: 15px;
  
  text {
    stroke: none;
    fill: #222;
  }
  
  &:hover {
    circle {
      opacity: 0.3;
    }
  }
  
  & circle {
    &:hover{
      opacity: 1;
    }
    stroke: #444;
    box-shadow: 3px 3px 3px black;
  }
`

const colors = [
    'crimson',
    'darkorange',
    'greenyellow',
    'springgreen'
]

export default class OrderedStepPercentageChart extends Component {
    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.number)
    }


    componentDidMount() {
        const {data} = this.props
        this.svg = select('#chart')

        this.radiusScale = scaleSqrt()
            .domain([0, 1])
            .range([0, 200])

        data.forEach((num, i) => {
            const radius = this.radiusScale(num)

            this.svg.append('circle')
                .attr('r', radius)
                .attr('cx', 205)
                .attr('cy', 205)
                .attr('fill', colors[i])
                .attr('filter', 'url(#dropshadow)')
        })

        data.forEach((num, i) => {
            const percent = Math.round(num * 100)
            this.svg.append('text')
                .text(`${percent}%`)
                .attr('text-anchor', 'middle')
                .attr('x', '50%')
                .attr('y', 200 - this.radiusScale(num))
                .attr('dy', '25px')
        })
    }

    render() {
        return <SVG id="chart">
            <filter id="dropshadow" height="130%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="1"/>
                <feOffset dx="1" dy="1" result="offsetblur"/>
                <feMerge>
                    <feMergeNode/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        </SVG>
    }
}
