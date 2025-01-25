import { useMemo } from 'react'
import './App.css'
import file from './db.json'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"

function App() {
 const { data } = file;
 const unReadBooks = useMemo(() => data.filter((item) => !item.isRead), [data]);

  return (
    <>
      <div className='p-10 max-w-3xl mx-auto'>
      <Table>
      <TableCaption>A list of your bookmarks.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Title</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>URL</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.title}</TableCell>
            <TableCell>{item.category}</TableCell>
            <TableCell>{item.url}</TableCell>
            <TableCell className="text-right">
            <Checkbox
                  checked={item.isRead}
                  onCheckedChange={() => {}}
                />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell>{data.length}</TableCell>
          <TableCell>Unread</TableCell>
          <TableCell>{unReadBooks.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
      </div>
    </>
  )
}

export default App
