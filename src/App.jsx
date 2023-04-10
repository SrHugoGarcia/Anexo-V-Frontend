import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AnexoV from "./pages/AnexoV";
import Componentes from "./pages/Componentes";
import Clientes from "./pages/Clientes";
import Reportes from "./pages/Reportes";
import Consultas from "./pages/Consultas";
import { SeccionIIProvider } from "./context/SeccionIIProvider";
import { AnexoVProvider } from "./context/AnexoVProvider";
import { InformeProvider } from "./context/informeProvider";
import { ClienteProvider } from "./context/ClienteProvider";
function App() {
  return (
    <HashRouter>
      <SeccionIIProvider>
      <AnexoVProvider>
      <InformeProvider>
      <ClienteProvider>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<AnexoV />} />
          <Route path="componentes" element={<Componentes/>} />
          <Route path="clientes" element={<Clientes />} />
          <Route path="reportes" element={<Reportes/>} />
          <Route path="consultas" element={<Consultas/>} />
        </Route>
      </Routes>
      </ClienteProvider>
      </InformeProvider>
      </AnexoVProvider>
      </SeccionIIProvider>
    </HashRouter>
  );
}

export default App;
