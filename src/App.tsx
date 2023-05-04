import { LoginPage } from "./LoginPage";
import { Route, Routes } from "react-router-dom";
import { RecordContext } from "./context";
import { ProtectedHomeComponent, ProtectedAddComponent, ProtectedDisplayComponent } from "./ProtectedRoute";

export interface Record {
  id: number;
  name: string;
  city: string;
}

export default function App() {

  return (
    <>
      <RecordContext>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home"
            element={
              <ProtectedHomeComponent />
            }
          />
          <Route path="/add" element={
            <ProtectedAddComponent />
          } />
          <Route path="/display" element={
            <ProtectedDisplayComponent />
          } />
        </Routes>
      </RecordContext>
    </>
  );
}
