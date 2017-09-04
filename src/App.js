import React, {Component} from 'react'

import styled from 'styled-components'

import './App.css'

import Chart from './Chart'

const Container = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: aquamarine;
`

class App extends Component {

    componentDidMount() {
    }

    render() {
        const data = [
            1,
            0.71,
            0.22,
            0.01
        ]
        return (
            <Container>
                <h1>Ordinal Percentage Funnel Chart</h1>
                <Chart data={data}/>
                <p style={{maxWidth: '400px'}}>
                    This chart can be used with an ordered data set of percentages. For example, it could be used to
                    show what percentage of a certain group made it to each stage in a cycle.
                </p>
            </Container>
        )
    }
}

export default App
