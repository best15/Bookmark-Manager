import { ToastContainer } from "react-toastify";
import "./App.css";
import FloatingActionButton from "./components/ActionButton";
import BooksTable from "@/components/BooksTable";
import Header from "@/components/Header";
import PopupForm from "@/components/PopupForm";
import { BooksProvider } from "@/providers/books/BooksProvider";

function App() {
  return (
    <BooksProvider>
      <Header />
      <BooksTable />
      <FloatingActionButton />
      <PopupForm />
      <ToastContainer />
    </BooksProvider>
  );
}

export default App;
