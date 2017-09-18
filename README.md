# React csv parse

Parse content of a csv file.
Inspiration: (paypal/downshift)[https://raw.githubusercontent.com/paypal/downshift]
Development structure: (github.com/insin/nwb)[https://github.com/insin/nwb]

## Installation

```
npm install --save react-csv-parse
```

## Usage

```
import CsvParse from "CsvParse"

const fileHeaders = [
  "header1",
  "header2",
  "header3",
  "header4",
  "header5",
]

<CsvParse file={this.state.file} fileHeaders={fileHeaders}>
  {data => data && <div>{JSON.stringify(data)}</div>}
</CsvParse>
```

`CsvParse` is the only component. It doesn't render anything itself, it just
calls the child function and renders that. Wrap everything in
`<CsvParse>{/* your function here! */}</CsvParse>`.

### Example with react-table

```
import CsvParse from "react-csv-parse"
import ReactTable from "react-table"

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
      <input type="file" onChange={this.handleFileInputChange} />

      <CsvParse file={this.state.file} fileHeaders={fileHeaders}>
        {data =>
          data && (
            <ReactTable
              data={data}
              columns={tableColumns}
            />
          )}
      </CsvParse>
    </div>
  )
}
```

Complete example in the `/demo` folder.

## Props

`file` the file to be parsed.

`fileHeaders` the headers of the file's columns.
