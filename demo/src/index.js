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

  handleData = data => {
    this.setState({ data })
  }

  handleError = error => {
    this.setState({ error })
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

        <CsvParse
          keys={keys}
          onDataUploaded={this.handleData}
          onError={this.handleError}
          render={onChange => <input type="file" onChange={onChange} />}
        />

        {this.state.data && (
          <pre>{JSON.stringify(this.state.data, null, 2)}</pre>
        )}

        {this.state.error && (
          <pre>{JSON.stringify(this.state.error, null, 2)}</pre>
        )}
      </div>
    )
  }
}

render(<Demo />, document.querySelector('#demo'))
