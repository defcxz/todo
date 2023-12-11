'use client'

import { useState, useEffect } from 'react'
import { Input, Button, Checkbox } from '@nextui-org/react'
// TODO: Let table be a component
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from '@nextui-org/react'

export default function Home() {
  const [inputValue, setInputValue] = useState('')
  const [items, setItems] = useState<string[]>([])

  useEffect(() => {
    let storedItems = []

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i) || ''
      const value = localStorage.getItem(key)
      storedItems.push(value)
    }
    setItems(storedItems.filter(item => item !== null) as string[])
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem(inputValue, inputValue)
    const newItems = [...items, inputValue]
    setItems(newItems)
    setInputValue('')
  }

  const handleDelete = (item: string) => {
    localStorage.removeItem(item)
    const newItems = items.filter(i => i !== item)
    setItems(newItems)
  }


  return (
    <main className="flex min-h-screen flex-col items-center p-5">
      <form className='flex gap-2 items-center' onSubmit={handleSubmit}>
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
          className="md:w-96"
        />
        <Button
          size='lg'
        >
          Add
        </Button>
      </form>
        <Table
          aria-label='to-do table'
          defaultSelectedKeys={["0"]}
          className={'mt-8 md:w-96'}
        >
          <TableHeader>
            <TableColumn>To-do</TableColumn>
            <TableColumn width={1}>Done</TableColumn>
          </TableHeader>
          <TableBody emptyContent={"No tasks to display."}>
            {
              items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item}</TableCell>
                  <TableCell>
                    <Checkbox
                      id={`checkbox-${index}`}
                      onValueChange={() => {
                        setTimeout(() => {
                          handleDelete(item)
                        }, 1000)
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
    </main>
  )
}
