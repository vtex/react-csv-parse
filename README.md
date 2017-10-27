# React Csv Parse

Parse content of a csv file.
Inspiration: (paypal/downshift)[https://github.com/paypal/downshift]
Development structure: (github.com/insin/nwb)[https://github.com/insin/nwb]

## Installation

```
npm install --save react-csv-parse
```

## Development
`npm install -g nwb`

`nwb build`

Local test: `npm pack`

## Usage

```js
import CsvParse from "CsvParse"
```

```jsx
handleData = data => {
  this.setState({ data })
}
```

```jsx
render() {
  const fileHeaders = [
    "header1",
    "header2",
    "header3",
    "header4",
    "header5",
  ]

  return (
    <CsvParse
      fileHeaders={fileHeaders}
      onDataUploaded={this.handleData}
      render={onChange => <input type="file" onChange={onChange} />}
    />
  )
}
```

`CsvParse` is the only component. It doesn't render anything itself, it just
calls the child function and renders that. Wrap everything in
`<CsvParse>{/* your function here! */}</CsvParse>`.

Props `fileHeaders` and `onDataUploaded` are mandatory.
