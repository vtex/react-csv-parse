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

  handleFileInputChange = event => {
    const data = event.target.files[0]
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
    const demoStyles = {
      whiteSpace: "pre-wrap",
    }

    return (
      <div>
        <h1>React csv parse</h1>
        <h2>Demo</h2>
        <input type="file" onChange={this.handleFileInputChange} />

        <CsvParse file={this.state.data} fileHeaders={fileHeaders}>
          {data =>
            data && <code style={demoStyles}>{JSON.stringify(data)}</code>}
        </CsvParse>
      </div>
    )
  }
}

render(<Demo />, document.querySelector("#demo"))
