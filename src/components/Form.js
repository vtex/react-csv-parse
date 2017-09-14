import React from "react"
import PropTypes from "prop-types"

import { fileExtensionIsValid } from "../utils"
import { defaults } from "../constants.js"

import { intlShape, injectIntl } from "react-intl"
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

class Form extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      fileName: "",
      fileStatus: "",
      // tableData: [],
      // tableDataDisplay: [],
      // requiredFieldsResults: {},
      // requiredFieldsProblems: false,
      // validateFieldsResults: {},
      // validateFieldsProblems: false,
    }
  }

  translate = (id, values) => this.props.intl.formatMessage({ id }, values)

  handleFileInputChange = event => {
    const file = event.target.files[0]
    // this.props.fileChanged && this.props.fileChanged()

    if (file && fileExtensionIsValid(file, defaults.allowedExtensions)) {
      this.setState({ fileStatus: "", fileName: file.name })
      this.formatFileResult(file)
    } else {
      const fileStatus = this.translate("import.form.fileStatus.error")
      this.setState({ fileStatus, fileName: "" })
    }
  }

  formatFileResult(file) {
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

      // check if empty
      if (isEmpty(result)) {
        this.setState({
          fileStatus: this.getI18nStr("import.fileStatus.empty"),
        })
        return
      }

      // remove display headers IF NEEDED (HOW?)
      result.shift()

      // add api headers
      result.unshift(this.props.apiKeys)

      // convert arrays to objects
      result = compose(apply(lift(zipObj)), splitAt(1))(result)

      // validations
      // const requiredFieldsResults = this.state.requiredFieldsResults
      // const validateFieldsResults = this.state.validateFieldsResults
      // let requiredFieldsProblems = false
      // let validateFieldsProblems = false

      // // required fields
      // if (this.props.requiredFields) {
      //   const requiredFields = this.props.requiredFields
      //   this.setFeedbackErrors(requiredFields, requiredFieldsResults)

      //   result.forEach(resultLine => {
      //     requiredFields.forEach(requiredField => {
      //       const key = requiredField.key

      //       if (!isEmpty(resultLine[requiredField.key])) return

      //       requiredFieldsResults[key]++
      //       requiredFieldsProblems = true
      //     })
      //   })
      // }

      // // validations fields
      // if (this.props.validateFields) {
      //   const validateFields = this.props.validateFields
      //   this.setFeedbackErrors(validateFields, validateFieldsResults)

      //   result.forEach(resultLine => {
      //     validateFields.forEach(validateField => {
      //       const key = validateField.key

      //       if (
      //         validateField.type === "url" &&
      //         !isEmpty(resultLine[validateField.key]) &&
      //         !validateUrl(resultLine[validateField.key])
      //       ) {
      //         validateFieldsResults[key]++
      //         validateFieldsProblems = true
      //       }
      //       if (
      //         validateField.type === "cpf" &&
      //         !isEmpty(resultLine[validateField.key]) &&
      //         !validateCpf(resultLine[validateField.key])
      //       ) {
      //         validateFieldsResults[key]++
      //         validateFieldsProblems = true
      //       }
      //     })
      //   })
      // }

      // retrieve rows items for display
      const tableDataDisplay = slice(0, this.props.tableRowsLength, result)

      // save it all in state
      this.setState(
        {
          // tableData: result,
          // tableDataDisplay,
          // requiredFieldsResults,
          // validateFieldsResults,
          // requiredFieldsProblems,
          // validateFieldsProblems,
        }
      )

      this.props.setDataToTable(result, tableDataDisplay)
    }
  }

  render() {
    const { allowedExtensions } = this.props

    return (
      <form>
        <legend className="ruc-form-legend">
          {this.translate("import.form.legend")}
        </legend>
        <input
          type="file"
          name="ruc-file"
          id="ruc-file"
          className="ruc-form-fileinput"
          onChange={this.handleFileInputChange}
        />

        <label htmlFor="ruc-file" className="ruc-form-filelabel">
          {this.translate("import.form.importfile", {
            extensions: defaults.allowedExtensions,
          })}
        </label>

        {!isEmpty(this.state.fileName) && (
          <strong className="ruc-form-filename">{this.state.fileName}</strong>
        )}

        {!isEmpty(this.state.fileStatus) && (
          <span className="ruc-form-filestatus">{this.state.fileStatus}</span>
        )}
      </form>
    )
  }
}

Form.propTypes = {
  setDataToTable: PropTypes.func,
}

export default injectIntl(Form)
