# Bookmark-Manager

## Description

Bookmark Manager is a React-based web app that allows users to manage their bookmarks easily. It includes features for adding, editing, and deleting bookmarks, as well as importing/exporting bookmarks via JSON files.

## How to Run
  
  To run the app, clone this project in your directory. Make sure to install node.js and NPM along with all dependencies . 
  Follow the following commands.

  Clone the Repository
  ```bash
  git clone <repository-url>
  cd Bookmark-Manager
  ```

  Install Dependencies
  ```bash
  install node.js
  yarn install
  yarn run dev
  ```

  Open http://localhost:5173 in your browser to access the app.


## Key Design Choices
- **Context API:** Used for efficient global state management to handle bookmarks and modals.
- **React Hook Form:** Simplifies form handling with dynamic validation and better user experience.
- **React Dropzone:** Provides an intuitive drag-and-drop interface for importing bookmark data via JSON files, with built-in validation to ensure proper JSON structure and required data fields.
- **Toast Notifications:** Integrated with react-toastify for clear and responsive feedback on user actions.
- **Pagination:** Implemented custom pagination to keep the interface clean and handle large datasets gracefully.
- **Responsive UI:** Designed using shadcn/ui components with Tailwind CSS,, ensuring a seamless experience across devices.