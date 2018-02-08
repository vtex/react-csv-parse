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

// NOTES
// Separator is the character splitting the data. Comma ex.: 1,2,3
// Delimiter is a text delimiter. Double quotes ex.: "Account", "Id"

class CsvParse extends React.Component {
  handleSeparators(file) {
    const reader = new FileReader()
    reader.readAsText(file)
    reader.onload = () => {
      let result = reader.result
      const splitResult = result.split('')

      // check if first character is not alphanumeric
      if (!splitResult[0].match(/^[a-z0-9]+$/i, 'g')) {
        // get index of second delimiter
        const secondDelimiterIndex = result.indexOf(splitResult[0], 1)

        // separator is character after second delimiter
        let separator = result[secondDelimiterIndex + 1]

        // clean text delimiters
        const delimiter = splitResult[0]
        const dynamicRegEx = new RegExp(delimiter, 'g')
        result = result.replace(dynamicRegEx, '')

        // start parsing
        this.parseData(result, separator)
      } else {
        // first character is alphanum, guessing the separator
        this.props.separators.some((val, i) => {
          const dynamicRegEx = new RegExp(this.props.separators[i], 'g')
          const separatorsFound = (result.match(dynamicRegEx) || []).length
          if (separatorsFound >= this.props.apiHeaders.length) {
            this.parseData(result, this.props.separators[i])
            return true
          } else if (i === this.props.separators.length - 1) {
            this.props.onDataUploaded(null)
          }
        })
      }
    }
  }

  parseData(result, separator) {
    // replace line breaks and tabs by separator
    result = result.replace(/[\r\n\t]/g, separator)

    // split string by separator
    result = result.split(separator)

    // create arrays at each headers' length string
    result = splitEvery(this.props.apiHeaders.length, result)

    // drop last item if empty
    if (isEmpty(last(result)[0])) {
      result = dropLast(1, result)
    }

    // remove display headers
    result.shift()

    // add api headers
    result.unshift(this.props.apiHeaders)

    // convert arrays to objects
    result = compose(apply(lift(zipObj)), splitAt(1))(result)

    // save it all in state
    this.props.onDataUploaded(result)
  }

  handleOnChange = event => {
    const file = event.target.files[0]
    this.handleSeparators(file)
  }

  render() {
    return this.props.render(this.handleOnChange)
  }
}

CsvParse.defaultProps = {
  separators: [',', ';'],
}

CsvParse.propTypes = {
  apiHeaders: PropTypes.array.isRequired,
  onDataUploaded: PropTypes.func.isRequired,
  separators: PropTypes.array,
}

export default CsvParse
