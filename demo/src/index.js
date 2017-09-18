import React from "react"
import { render } from "react-dom"

import CsvParse from "../../src"

class Demo extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: null,
    }
  }

  handleData = data => {
    this.setState({ data })
  }

  render() {
    const fileHeaders = [
      "account",
      "balance",
      "document",
      "documentType",
      "creditLimit",
      "lastUpdate",
      "description",
      "email",
      "visibleCreditLimit",
    ]

    return (
      <div>
        <h1>Demo React Csv Parse</h1>

        <CsvParse
          fileHeaders={fileHeaders}
          onDataUploaded={this.handleData}
          render={onChange => <input type="file" onChange={onChange} />}
        />

        {this.state.data && (
          <pre>{JSON.stringify(this.state.data, null, 2)}</pre>
        )}
      </div>
    )
  }
}

render(<Demo />, document.querySelector("#demo"))
