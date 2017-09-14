import React from "react"
import { render } from "react-dom"

import { IntlProvider, addLocaleData } from "react-intl"
import en from "react-intl/locale-data/en"
import pt from "react-intl/locale-data/pt"
import enUSMessages from "../i18n/en-US_messages.json"

import ReactUploadCsv from "../../src"

addLocaleData([...en, ...pt])

class Demo extends React.Component {
  render() {
    const fileColumns = [
      {
        Header: "Email",
        sortable: false,
        accessor: "email",
        Cell: data => <div className="rt-td-inner">{data.value}</div>,
      },
      {
        Header: "Document",
        sortable: false,
        accessor: "document",
        Cell: data => <div className="rt-td-inner">{data.value}</div>,
      },
      {
        Header: "Document type",
        sortable: false,
        accessor: "documentType",
        Cell: data => <div className="rt-td-inner">{data.value}</div>,
      },
      {
        Header: "Balance",
        sortable: false,
        accessor: "balance",
        Cell: data => <div className="rt-td-inner">{data.value}</div>,
      },
      {
        Header: "Credit limit",
        sortable: false,
        accessor: "creditLimit",
        Cell: data => <div className="rt-td-inner">{data.value}</div>,
      },
      {
        Header: "Last update",
        sortable: false,
        accessor: "lastUpdate",
        Cell: data => <div className="rt-td-inner">{data.value}</div>,
      },
    ]

    const apiKeys = [
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
      <IntlProvider locale="en-US" key="en-US" messages={enUSMessages}>
        <ReactUploadCsv
          tableId="tableId"
          tableRowsLength={10}
          tableColumns={fileColumns}
          apiKeys={apiKeys}
          paginationId="paginationId"
        />
      </IntlProvider>
    )
  }
}

render(<Demo />, document.querySelector("#demo"))
