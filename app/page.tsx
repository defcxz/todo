'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Input } from '@nextui-org/input'
import { Button } from '@nextui-org/button'
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from '@nextui-org/table'
import { DeleteIcon } from './components/DeleteIcon'
import { DoneIcon } from './components/DoneIcon'

export default function Home() {
  const [inputValue, setInputValue] = useState('')
  const [items, setItems] = useState<{ name: string, done: boolean }[]>([])

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('todos') || '[]')
    setItems(storedItems)
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newItem = { name: inputValue, done: false }
    const newItems = [...items, newItem]
    localStorage.setItem('todos', JSON.stringify(newItems))
    setItems(newItems)
    setInputValue('')
  }

  const handleDelete = (item: string) => {
    const newItems = items.filter(i => i.name !== item)
    localStorage.setItem('todos', JSON.stringify(newItems))
    setItems(newItems)
  }

  const handleCheck = (item: string) => {
    const newItems = items.map(i => i.name === item ? { ...i, done: !i.done } : i)
    localStorage.setItem('todos', JSON.stringify(newItems))
    setItems(newItems)
  }

  return (
    <main className="flex min-h-[100dvh] flex-col md:pt-36 w-11/12 md:w-5/12 mx-auto items-center pt-5">
      <form className='flex gap-2 items-center justify-around w-full' onSubmit={handleSubmit}>
        <Input
          id="input"
          isClearable
          type="text"
          label="New To-do"
          variant="bordered"
          defaultValue=""
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value)
          }}
          onClear={() => {
            setInputValue('')
          }}
        />
        <Button size='lg'>
          Add
        </Button>
      </form>
      <Table
        aria-label='to-do table'
        className={'mt-8'}
      >
        <TableHeader>
          <TableColumn>To-do</TableColumn>
          <TableColumn width={1}>Done</TableColumn>
          <TableColumn width={1}>Delete</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No tasks to display."}>
          {
            items.map((item, index) => (
              <TableRow key={index} className={'break-all'}>
                <TableCell className={item.done ? 'line-through' : ''}>{item.name}</TableCell>
                <TableCell>
                  <Button
                    variant='ghost'
                    isIconOnly
                    aria-label="Mark as done"
                    onClick={() => handleCheck(item.name)}
                    color={item.done ? 'success' : 'default'}
                  >
                    <DoneIcon />
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant='ghost'
                    isIconOnly
                    aria-label="Delete"
                    onClick={() => {
                      handleDelete(item.name)}
                    }
                  >
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>

      <div className={'mt-28 opacity-60 text-sm text-center'}>
        A simple to-do web powered by Next.js, NextUI and Vercel.
        <br></br>
        Made by <Link href='https://def.works'><b>defcxz.</b></Link>
      </div>
    </main>
  )
}
