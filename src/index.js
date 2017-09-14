import React from "react"
import PropTypes from "prop-types"

import Form from "./components/Form"
import Table from "./components/Table"
import Pagination from "./components/Pagination"

import { globalVars } from "./constants.js"

import { isEmpty } from "ramda"

import "./styles/input-form.css"
import "./styles/pagination.css"
import "react-table/react-table.css"

class ReactUploadCsv extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tableData: [],
      tableDataDisplay: [],
    }
  }

  setDataToTable = (tableData, tableDataDisplay) => {
    this.setState({ tableData, tableDataDisplay })
  }

  render() {
    const { tableRowsLength } = this.props
    const { tableData } = this.state

    const rowsLength = this.props.tableRowsLength || globalVars.defaultTableRows

    return (
      <div className="ruc-container">
        <Form
          apiKeys={this.props.apiKeys}
          tableRowsLength={rowsLength}
          setDataToTable={this.setDataToTable}
        />

        {!isEmpty(tableData) && (
          <Table
            tableId={this.props.tableId}
            tableRowsLength={rowsLength}
            tableColumns={this.props.tableColumns}
            tableDataDisplay={this.state.tableDataDisplay}
            tableData={tableData}
          />
        )}

        {!isEmpty(tableData) &&
        tableData.length > tableRowsLength && (
          <Pagination
            paginationId={this.props.paginationId}
            tableDataLength={tableData.length}
            tableRowsLength={rowsLength}
          />
        )}
      </div>
    )
  }
}

ReactUploadCsv.propTypes = {
  tableId: PropTypes.string.isRequired,
  apiKeys: PropTypes.array.isRequired,
  tableRowsLength: PropTypes.number,
  tableColumns: PropTypes.array.isRequired,

  paginationId: PropTypes.string,
}

export default ReactUploadCsv
