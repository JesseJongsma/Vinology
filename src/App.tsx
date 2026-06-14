import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { IonApp, setupIonicReact } from "@ionic/react";

import { seedDatabaseIfEmpty } from "./db/SeedDatabase";

import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "./theme/variables.css";

import Dashboard from "./pages/Collection/Dashboard";
import Recipes from "./pages/Collection/Recipes";
import Batches from "./pages/Collection/Batches";
import Vessels from "./pages/Collection/Vessels";
import ExploreRecipes from "./pages/Collection/ExploreRecipes";

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