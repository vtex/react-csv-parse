import React from "react"
import { render } from "react-dom"

import { IntlProvider, addLocaleData } from "react-intl"
import en from "react-intl/locale-data/en"
import pt from "react-intl/locale-data/pt"
import enUSMessages from "../i18n/en-US_messages.json"

import CsvToApi from "../../src"

addLocaleData([...en, ...pt])

class Demo extends React.Component {
  render() {
    return (
      <IntlProvider locale="en-US" key="en-US" messages={enUSMessages}>
        <CsvToApi allowedExtensions={["csv"]} />
      </IntlProvider>
    )
  }
}

render(<Demo />, document.querySelector("#demo"))
