# React Csv Parse

Parse content of a csv file.

Inspiration: (paypal/downshift)[https://github.com/paypal/downshift]

Development structure: (github.com/insin/nwb)[https://github.com/insin/nwb]

## Development

Requirement: `npm install -g nwb`

Start: `npm start`

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
      delimiters={[';', '/', ':']}
      onDataUploaded={this.handleData}
      render={onChange => <input type="file" onChange={onChange} />}
    />
  )
}
```

`CsvParse` is the only component. It doesn't render anything itself, it just
calls the child function and renders that. Wrap everything in
`<CsvParse>{/* your function here! */}</CsvParse>`.

## Props

| Prop name        | Type  | Default      | Required | Description                                                             |
| ---------------- | ----- | ------------ | -------- | ----------------------------------------------------------------------- |
| `fileHeaders`    | array |              | true     | The headers (usually used by api) of the file. Order is crucial.        |
| `onDataUploaded` | func  |              | true     | Callback function with the data as parameter. Null if the parse failed. |
| `delimiters`     | array | `[";", ","]` | false    | The file will be tested with those characters to split the data.        |

### _Delimiter rule_

The component will estimate that if the amount of delimiters found is equal or above the `fileHeaders` lenght, then it will process the file. This does not guarantee a correct parsing but rather tries to add a small level of security.
