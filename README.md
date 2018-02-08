# React Csv Parse

Goal: Parse content of a csv file.

From:

```
Account,Balance,Document,Document Type,Limit,Description,Email
acc1,0,3i563784658,cpf,2000,,k@email.com
acc2,10,3468723468,cpf,10000,Some text,j@email.com
```

To:

```
[
  {
    account: "acc1",
    balance: "0",
    document: "3i563784658",
    documentType: "cpf",
    limit: "2000",
    description: "",
    email: "k@gmail.com"
  },
  {
    account: "acc2",
    balance: "10",
    document: "3468723468",
    documentType: "cpf",
    limit: "10000",
    description: "Some text",
    email: "j@email.com"
  }
]
```

Given the following keys:

```
const keys = [
  'account',
  'balance',
  'document',
  'documentType',
  'limit',
  'description',
  'email'
]
```

Inspiration: [paypal/downshift](https://github.com/paypal/downshift)

Development structure: [github.com/insin/nwb](https://github.com/insin/nwb)

## Development

| Action         | Command                       |
| -------------- | ----------------------------- |
| Install        | `npm i -g nwb & npm i`        |
| Start          | `npm start`                   |
| Build          | `nwb build`                   |
| Local test     | `npm pack`                    |
| Publish to npm | `npm publish --access public` |

## Usage

```
npm install @vtex/react-csv-parse --save
```

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
  const keys = [
    "header1",
    "header2",
    "header3",
    "header4",
    "header5",
  ]

  return (
    <CsvParse
      keys={keys}
      separators={[',', ';']}
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
| `keys`           | array |              | true     | The keys used to create the objects.                                    |
| `onDataUploaded` | func  |              | true     | Callback function with the data as parameter. Null if the parse failed. |
| `separators`     | array | `[",", ";"]` | false    | The file will be tested with those characters to separate the data.     |

### _Data split rules_

* If the first character found is not alpha numeric, then it's a text delimiter. We'll then find the position of the second delimiter to grab the next charatcer that will be used as separator.

* If not, the component will guess the separator by "saying" that if the amount of separators found is equal or above the `keys` length, then it will process the file. This does not guarantee a correct parsing but rather tries to add a second level of security.
