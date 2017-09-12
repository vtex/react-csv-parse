import React from "react"
import { intlShape, injectIntl } from "react-intl"
import { isEmpty } from "ramda"

import { fileExtensionIsValid } from "./utils"

import "./styles/input-form.css"

class CsvToApi extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      fileName: "",
      fileStatus: "",
      forcePage: 0,
    }
  }

  translate = (id, values) => this.props.intl.formatMessage({ id }, values)

  handleFileInputChange = event => {
    const file = event.target.files[0]
    // this.props.fileChanged && this.props.fileChanged()

    if (file && fileExtensionIsValid(file, this.props.allowedExtensions)) {
      this.setState({ fileStatus: "", fileName: file.name })
      // this.formatFileResult(file)
    } else {
      const fileStatus = this.translate("import.form.fileStatus.error")
      this.setState({ fileStatus, fileName: "" })
    }
  }

  render() {
    return (
      <form>
        <legend className="cta-form-legend">
          {this.translate("import.form.legend")}
        </legend>
        <input
          type="file"
          name="cta-file"
          id="cta-file"
          className="cta-form-fileinput"
          onChange={this.handleFileInputChange}
          onClick={this.handleFileInputClick}
        />

        <label htmlFor="cta-file" className="cta-form-filelabel">
          {this.translate("import.form.importfile", {
            extensions: this.props.allowedExtensions,
          })}
        </label>

        {!isEmpty(this.state.fileName) && (
          <strong className="cta-form-filename">{this.state.fileName}</strong>
        )}

        {!isEmpty(this.state.fileStatus) && (
          <span className="cta-form-filestatus">{this.state.fileStatus}</span>
        )}
      </form>
    )
  }
}

CsvToApi.propTypes = {
  intl: intlShape,
}

export default injectIntl(CsvToApi)
