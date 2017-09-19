import React from "react"
import PropTypes from "prop-types"

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
} from "ramda"

class CsvParse extends React.Component {
  formatFileResult(file, fileHeaders) {
    const reader = new FileReader()
    reader.readAsText(file)
    reader.onload = () => {
      let result = reader.result

      // replace line breaks and tabs by commas (delimiters)
      result = result.replace(/[\r\n\t]/g, ",")

      // remove double quotes
      result = result.replace(/"/g, "")

      // split string by comma character
      result = result.split(",")

      // create arrays at each headers' length string
      result = splitEvery(fileHeaders.length, result)

      // drop last item if empty
      if (isEmpty(last(result)[0])) {
        result = dropLast(1, result)
      }

      // remove display headers IF NEEDED (HOW?)
      result.shift()

      // add api headers
      result.unshift(fileHeaders)

      // convert arrays to objects
      result = compose(apply(lift(zipObj)), splitAt(1))(result)

      // save it all in state
      this.props.onDataUploaded(result)
    }
  }

  handleOnChange = event => {
    const file = event.target.files[0]
    this.formatFileResult(file, this.props.fileHeaders)
  }

  render() {
    return this.props.render(this.handleOnChange)
  }
}

CsvParse.propTypes = {
  children: PropTypes.func.isRequired,
  fileHeaders: PropTypes.array,
  onDataUploaded: PropTypes.func.isRequired,
}

export default CsvParse
