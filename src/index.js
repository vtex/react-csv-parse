import React from "react"
import PropTypes from "prop-types"

import {
  isEmpty,
  splitEvery,
  last,
  slice,
  dropLast,
  compose,
  apply,
  lift,
  splitAt,
  zipObj,
} from "ramda"

class CsvParse extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: null,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.formatFileResult(nextProps.file, nextProps.apiKeys)
  }

  formatFileResult(file, apiKeys) {
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
      result = splitEvery(this.props.apiKeys.length, result)

      // drop last item if empty
      if (isEmpty(last(result)[0])) {
        result = dropLast(1, result)
      }

      // remove display headers IF NEEDED (HOW?)
      result.shift()

      // add api headers
      result.unshift(apiKeys)

      // convert arrays to objects
      result = compose(apply(lift(zipObj)), splitAt(1))(result)

      // save it all in state
      this.setState({ data: result })
    }
  }

  render() {
    return this.props.children(this.state.data)
  }
}

CsvParse.propTypes = {
  children: PropTypes.func.isRequired,
}

export default CsvParse
