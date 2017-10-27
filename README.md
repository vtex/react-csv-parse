# React Csv Parse

Parse content of a csv file.

Inspiration: (paypal/downshift)[https://github.com/paypal/downshift]

Development structure: (github.com/insin/nwb)[https://github.com/insin/nwb]

## Development
Requirement: `npm install -g nwb`

Build: `nwb build`

Local test: `npm pack`

Publish to npm: `npm publish --access public`

## Installation

```
npm install @vtex/react-csv-parse --save
```

## Usage
```js
import CsvParse from '@vtex/react-csv-parse'
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

## Live example(s):

- Credit Control Admin: https://github.com/vtex/credit-control-admin-ui
