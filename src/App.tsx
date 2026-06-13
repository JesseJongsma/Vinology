import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { IonApp, setupIonicReact } from "@ionic/react";

import { seedDatabaseIfEmpty } from "./db/seedDatabase";

import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "./theme/variables.css";

import Dashboard from "./pages/collection/Dashboard";
import Recipes from "./pages/collection/Recipes";
import Batches from "./pages/collection/Batches";
import Vessels from "./pages/collection/Vessels";
import ExploreRecipes from "./pages/collection/ExploreRecipes";

// import AppLayout from "./components/AppLayout";
import TabLayout from "./components/TabLayout";

setupIonicReact();

export default function App() {
  useEffect(() => {
    seedDatabaseIfEmpty();
  }, []);

  return (
    <IonApp>
      <BrowserRouter>
		<Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/explore" element={<ExploreRecipes />} />
          <Route path="/batches" element={<Batches />} />
          <Route path="/vessels" element={<Vessels />} />
        </Routes>


	  	<TabLayout />
        {/* <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/explore" element={<ExploreRecipes />} />
            <Route path="/batches" element={<Batches />} />
            <Route path="/vessels" element={<Vessels />} />
          </Route>
        </Routes> */}
      </BrowserRouter>
    </IonApp>
  );
}