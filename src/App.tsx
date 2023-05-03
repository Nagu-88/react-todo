import { Add } from "./Add";
import { Display } from "./Display";
import { Home } from "./Home";
import DataContextProvider from "./APIContext";
import { LoginPage } from "./LoginPage";
import { Route, Routes, Navigate } from "react-router-dom";
import { RecordContext } from "./context";
import { AuthProvider } from "./Auth";
// import { RequireAuth } from "./RequireAuth";
import { ProtectedHomeComponent, ProtectedAddComponent, ProtectedDisplayComponent } from "./ProtectedRoute";
import { DisplayAPIData } from "./Data";

export interface Record {
  id: number;
  name: string;
  city: string;
}

export default function App() {

  return (
    <>
      <DataContextProvider>
        <AuthProvider>
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
              <Route path="/data" element={<DisplayAPIData />}></Route>
            </Routes>

          </RecordContext>
        </AuthProvider>
      </DataContextProvider>
    </>
  );
}
