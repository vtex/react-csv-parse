import React from 'react'
import PropTypes from 'prop-types'

import {
  apply,
  compose,
  dropLast,
  isEmpty,
  last,
  lift,
  slice,
  splitAt,
  splitEvery,
  zipObj,
} from 'ramda'

class CsvParse extends React.Component {
  formatFileResult(file) {
    const delimiters = this.props.delimiters
    const reader = new FileReader()

    reader.readAsText(file)
    reader.onload = () => {
      let result = reader.result

      delimiters.some((val, i) => {
        const dynamicRegEx = new RegExp(delimiters[i], 'g')
        const delimitersFound = (result.match(dynamicRegEx) || []).length

        if (delimitersFound >= this.props.fileHeaders.length) {
          this.handleResult(result, delimiters[i])
          return true
        } else if (i === delimiters.length - 1) {
          this.props.onDataUploaded(null)
        }
      })
    }
  }

  handleResult(result, delimiter) {
    // replace line breaks and tabs by delimiter
    result = result.replace(/[\r\n\t]/g, delimiter)

    // split string by delimiter
    result = result.split(delimiter)

    // create arrays at each headers' length string
    result = splitEvery(this.props.fileHeaders.length, result)

    // drop last item if empty
    if (isEmpty(last(result)[0])) {
      result = dropLast(1, result)
    }

    // remove display headers
    result.shift()

    // add api headers
    result.unshift(this.props.fileHeaders)

    // convert arrays to objects
    result = compose(apply(lift(zipObj)), splitAt(1))(result)

    // save it all in state
    this.props.onDataUploaded(result)
  }

  handleOnChange = event => {
    const file = event.target.files[0]
    this.formatFileResult(file)
  }

  render() {
    return this.props.render(this.handleOnChange)
  }
}

CsvParse.defaultProps = {
  delimiters: [';', ','],
}

CsvParse.propTypes = {
  fileHeaders: PropTypes.array.isRequired,
  onDataUploaded: PropTypes.func.isRequired,
  delimiters: PropTypes.array,
}

export default CsvParse
