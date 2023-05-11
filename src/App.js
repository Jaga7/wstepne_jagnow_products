import { Route, Routes } from "react-router-dom";
import { SharedLayout, Home, CreatingPage, EditingPage } from "./pages";

function App() {
  return (
     <Routes>
        <Route
          path='/'
          element={
              <SharedLayout />
          }
        >
          <Route index element={<Home />} />
          <Route path='creating' element={<CreatingPage />} />
          <Route path='editing/:productId' element={<EditingPage />} />
        </Route>
      </Routes>
  );
}

export default App;
