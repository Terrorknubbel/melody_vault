import React from 'react'

import SheetCard from './SheetCard'

import { render, screen, fireEvent } from '@/src/utils/test-utils'

it('displays the correct name', () => {
  const name = 'Abc'
  render(<SheetCard name={name} />)
  expect(screen.getByText(name)).toBeTruthy()
})

it('displays the correct composer', () => {
  const composer = 'Mozart'
  render(<SheetCard composer={composer} />)
  expect(screen.getByText(composer)).toBeTruthy()
})

it('does have a menu', () => {
  render(<SheetCard />)
  expect(screen.getByTestId('SheetMenu')).toBeTruthy()
})

describe('DestroyDialog', () => {
  it('is not visible by default', () => {
    render(<SheetCard />)
    expect(screen.queryByTestId('DestroyDialog')).toBeNull()
  })

  it('opens and closes when "delete" menu button is clicked', () => {
    render(<SheetCard />)

    const menu = screen.getByTestId('SheetMenu')
    fireEvent.press(menu)

    const deleteButton = screen.getByTestId('SheetMenu-delete-button')
    fireEvent.press(deleteButton)

    const destroyDialog = screen.getByTestId('DestroyDialog')
    expect(destroyDialog).toBeTruthy()

    const cancelButton = screen.getByTestId('DestroyDialog-cancel-button')
    fireEvent.press(cancelButton)

    expect(screen.queryByTestId('DestroyDialog')).toBeNull()
  })
})
