import './App.css'
import BooksTable from './components/BooksTable';
import { BooksProvider } from '@/providers/books/BooksProvider';

function App() {
  return (
    <BooksProvider>
      <BooksTable />
    </BooksProvider>
  )
}

export default App
