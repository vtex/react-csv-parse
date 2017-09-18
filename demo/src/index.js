import React from "react"
import { render } from "react-dom"

import CsvParse from "../../src"

import ReactTable from "react-table"
import "react-table/react-table.css"
import SyntaxHighlighter from "react-syntax-highlighter"
import { docco } from "react-syntax-highlighter/dist/styles"

class Demo extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      file: null,
    }
  }

  handleFileInputChange = event => {
    const file = event.target.files[0]
    this.setState({ file })
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
    const tableColumns = [
      {
        Header: "Account",
        accessor: "account",
      },
      {
        Header: "Balance",
        accessor: "balance",
      },
      {
        Header: "Document",
        accessor: "document",
      },
      {
        Header: "Document Type",
        accessor: "documentType",
      },
      {
        Header: "Credit Limit",
        accessor: "creditLimit",
      },
      {
        Header: "Last Update",
        accessor: "lastUpdate",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Visible Credit Limit",
        accessor: "visibleCreditLimit",
      },
    ]

    return (
      <div>
        <h1>React csv parse</h1>
        <h2>Demo</h2>
        <input type="file" onChange={this.handleFileInputChange} />

        <CsvParse file={this.state.file} apiKeys={fileHeaders}>
          {data =>
            data && (
              <div>
                <p>
                  <strong>Raw data:</strong>
                </p>
                <SyntaxHighlighter
                  language="json"
                  style={docco}
                  showLineNumbers
                >
                  {JSON.stringify(data)}
                </SyntaxHighlighter>
                <p>
                  <strong>Data in table:</strong>
                </p>
                <ReactTable
                  data={data}
                  defaultPageSize={10}
                  columns={tableColumns}
                />
              </div>
            )}
        </CsvParse>
      </div>
    )
  }
}

render(<Demo />, document.querySelector("#demo"))
