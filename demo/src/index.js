import React from 'react'
import { render } from 'react-dom'
import CsvParse from '../../src'

class Demo extends React.Component {
  constructor() {
    super()

    this.state = {
      data: null,
      error: null,
    }
  }

  handleData = (data, meta) => {
    this.setState({ data, meta })
  }

  handleError = error => {
    this.setState({ error, data: null, meta: null })
  }

  render() {
    const keys = [
      'account',
      'balance',
      'document',
      'documentType',
      'creditLimit',
      'lastUpdate',
      'createdAt',
      'description',
      'availableBalance',
      'preAuthorizedBalance',
      'email',
      'tolerance',
    ]

    return (
      <div>
        <h1>Demo React Csv Parse</h1>

        <h2>With keys</h2>
        <CsvParse
          keys={keys}
          onDataUploaded={this.handleData}
          onError={this.handleError}
          render={onChange => <input type="file" onChange={onChange} />}
        />

        <h2>Without specific keys</h2>
        <CsvParse
          onDataUploaded={this.handleData}
          onError={this.handleError}
          render={onChange => <input type="file" onChange={onChange} />}
        />

        <h2>Data</h2>
        {this.state.data && (
          <pre>{JSON.stringify(this.state.data, null, 2)}</pre>
        )}

        <h2>Meta</h2>
        {this.state.meta && (
          <pre>{JSON.stringify(this.state.meta, null, 2)}</pre>
        )}

        <h2>Error</h2>
        {this.state.error && (
          <pre>{JSON.stringify(this.state.error, null, 2)}</pre>
        )}
      </div>
    )
  }
}

render(<Demo />, document.querySelector('#demo'))
