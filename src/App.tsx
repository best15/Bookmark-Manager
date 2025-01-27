import { ToastContainer } from "react-toastify";

import "./App.css";

import Header from "./components/Header";
import PopupForm from "./components/PopupForm";
import BooksTable from "./components/BooksTable";
import FloatingActionButton from "./components/ActionButton";

import { BookmarksProvider } from "./providers/bookmarks/BookmarksProvider";

function App() {
  return (
    <BookmarksProvider>
      <Header />
      <BooksTable />
      <FloatingActionButton />
      <PopupForm />
      <ToastContainer />
    </BookmarksProvider>
  );
}

export default App;
