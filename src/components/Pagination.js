import React from "react"
import PropTypes from "prop-types"

import ReactPaginate from "react-paginate"

class Pagination extends React.Component {
  handlePagination = event => {
    const selected = event.selected
    const rows = this.props.tableRowsLength

    const startIndex = selected * rows
    const endIndex = selected === 0 ? rows : selected * rows + rows

    this.props.handlePagination(startIndex, endIndex, selected)
  }

  render() {
    return (
      <div id={this.props.paginationId}>
        <ReactPaginate
          previousLabel={<span>«</span>}
          nextLabel={<span>»</span>}
          breakLabel={<span>…</span>}
          pageRangeDisplayed={2}
          pageCount={Math.ceil(
            this.props.tableDataLength / this.props.tableRowsLength
          )}
          onPageChange={this.handlePagination}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>
    )
  }
}

Pagination.propTypes = {
  paginationId: PropTypes.string,
  tableDataLength: PropTypes.number,
  tableRowsLength: PropTypes.number,
  handlePagination: PropTypes.func.isRequired,
}

export default Pagination
