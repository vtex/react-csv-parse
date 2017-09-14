import React from "react"
import PropTypes from "prop-types"

import ReactPaginate from "react-paginate"

class Pagination extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      forcePage: 0,
    }
  }

  handlePagination = () => {}

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
          forcePage={this.state.forcePage}
        />
      </div>
    )
  }
}

Pagination.propTypes = {
  paginationId: PropTypes.string,
  tableDataLength: PropTypes.number,
  tableRowsLength: PropTypes.number,
}

export default Pagination
