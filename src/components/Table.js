import React from "react"
import PropTypes from "prop-types"

import ReactTable from "react-table"

import { isEmpty } from "ramda"

class Table extends React.Component {
  render() {
    return (
      <div>
        {!isEmpty(this.props.tableData) && (
          <div className="col-xs-12 mb5" id={this.props.tableId}>
            <ReactTable
              data={this.props.tableDataDisplay}
              defaultPageSize={this.props.tableRowsLength}
              className="-highlight"
              showPagination={false}
              columns={this.props.tableColumns}
            />
          </div>
        )}
      </div>
    )
  }
}

Table.propTypes = {
  tableDataDisplay: PropTypes.array.isRequired,
  tableData: PropTypes.array.isRequired,
  tableId: PropTypes.string.isRequired,
  tableColumns: PropTypes.array.isRequired,
}

export default Table
