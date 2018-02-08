import React from 'react'
import { render } from 'react-dom'
import CsvParse from '../../src'

class Demo extends React.Component {
  constructor() {
    super()

    this.state = {
      data: null,
      error: false,
    }
  }

  handleData = data => {
    data
      ? this.setState({ data, error: false })
      : this.setState({ error: true })
  }

  render() {
    const keys = [
      'account',
      'balance',
      'document',
      'documentType',
      'creditLimit',
      'lastUpdate',
      'description',
      'availableBalance',
      'email',
      'tolerance',
    ]

    return (
      <div>
        <h1>Demo React Csv Parse</h1>

        <CsvParse
          keys={keys}
          separators={[';', ',', ':']}
          onDataUploaded={this.handleData}
          render={onChange => <input type="file" onChange={onChange} />}
        />

        {this.state.data && (
          <pre>{JSON.stringify(this.state.data, null, 2)}</pre>
        )}

        {this.state.error && <p>File could not be parsed.</p>}
      </div>
    )
  }
}

render(<Demo />, document.querySelector('#demo'))
