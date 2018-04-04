import React from 'react'
import expect from 'expect'
import { renderToStaticMarkup as render } from 'react-dom/server'

import CsvParse from '../src/'

const mockFunc = () => true
const keys = ['account', 'balance']

describe('CsvParse', () => {
  it('renders an input with type="file"', () => {
    expect(
      render(
        <CsvParse
          keys={keys}
          onDataUploaded={mockFunc}
          render={onChange => <input type="file" />}
        />,
      ),
    ).toContain('<input type="file"/>')
  })
})
