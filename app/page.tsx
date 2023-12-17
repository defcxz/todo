'use client'

import { useState, useEffect } from 'react'
import { Input, Button } from '@nextui-org/react'
// TODO: Let table to be a component
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from '@nextui-org/react'
import { DeleteIcon } from './components/DeleteIcon'

export default function Home() {
  const [inputValue, setInputValue] = useState('')
  const [items, setItems] = useState<{ name: string, done: boolean }[]>([])

  useEffect(() => {
    let storedItems = []

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i) || ''
      const value = JSON.parse(localStorage.getItem(key) || '')
      storedItems.push(value)
    }
    return setItems(storedItems.filter(item => item !== null) as { name: string, done: boolean }[])
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newItem = { name: inputValue, done: false }
    localStorage.setItem(inputValue, JSON.stringify(newItem))
    const newItems = [...items, newItem]
    setItems(newItems)
    setInputValue('')
  }

  const handleDelete = (item: string) => {
    localStorage.removeItem(item)
    const newItems = items.filter(i => i.name !== item)
    setItems(newItems)
  }

  const handleCheck = (item: string) => {
    const newItems = items.map(i => i.name === item ? { ...i, done: !i.done } : i)
    localStorage.setItem(item, JSON.stringify(newItems.find(i => i.name === item)))
    setItems(newItems)
  }

  return (
    <main className="flex min-h-screen flex-col w-5/6 md:w-1/2 mx-auto items-center pt-5">
      <form className='flex gap-2 items-center justify-around' onSubmit={handleSubmit}>
        <Input
          id="input"
          isClearable
          type="text"
          label="New To-do"
          variant="bordered"
          placeholder="What do you have in mind?"
          defaultValue=""
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value)
          }}
          onClear={() => {
            setInputValue('')
          }}
          className="md:w-[40vw]"
        />
        <Button size='lg'>
          Add
        </Button>
      </form>
      <Table
        aria-label='to-do table'
        className={'mt-8'}
        selectionMode='multiple'
      >
        <TableHeader>
          <TableColumn>To-do</TableColumn>
          <TableColumn width={1}>Delete</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No tasks to display."}>
          {
            items.map((item, index) => (
              <TableRow
                key={index}
                onClick={() => {
                  handleCheck(item.name)}
                }
              >
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  <Button
                    variant='ghost'
                    isIconOnly
                    aria-label="Delete task"
                    onClick={() => handleDelete(item.name)}
                  >
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </main>
  )
}
