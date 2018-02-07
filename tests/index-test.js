import React from 'react'
import expect from 'expect'
import { renderToStaticMarkup as render } from 'react-dom/server'

import CsvParse from 'src/'

const mockFunc = () => true
const fileHeaders = ['account', 'balance']

describe('CsvParse', () => {
  it('renders an input with type="file"', () => {
    expect(
      render(
        <CsvParse
          fileHeaders={fileHeaders}
          onDataUploaded={mockFunc}
          render={onChange => <input type="file" />}
        />
      )
    ).toContain('<input type="file"/>')
  })
})
