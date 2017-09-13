import React from "react"
import PropTypes from "prop-types"

import Form from "./components/Form"
import Table from "./components/Table"

import "./styles/input-form.css"
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
    return (
      <div className="ruc-container">
        <Form
          apiKeys={this.props.apiKeys}
          tableRowsLength={this.props.tableRowsLength || 10}
          setDataToTable={this.setDataToTable}
        />
        <Table
          tableId={this.props.tableId}
          tableRowsLength={this.props.tableRowsLength || 10}
          tableColumns={this.props.tableColumns}
          tableDataDisplay={this.state.tableDataDisplay}
          tableData={this.state.tableData}
        />
      </div>
    )
  }
}

ReactUploadCsv.propTypes = {
  tableId: PropTypes.string.isRequired,
  apiKeys: PropTypes.array.isRequired,
  tableRowsLength: PropTypes.number,
  tableColumns: PropTypes.array.isRequired,
}

export default ReactUploadCsv
