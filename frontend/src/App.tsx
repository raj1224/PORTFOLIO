import { useState } from "react";

import AppRoutes from "./routes/AppRoutes";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div
      className={
        darkMode
          ? "min-h-screen bg-[#070a12] text-white"
          : "min-h-screen bg-white text-slate-950"
      }
    >
      <AppRoutes
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
    </div>
  );
}

export default App;