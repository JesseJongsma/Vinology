import { useLocation, useNavigate } from "react-router-dom";
import { IonIcon, IonLabel, IonTabBar, IonTabButton } from "@ionic/react";
import {
  homeOutline,
  flaskOutline,
  bookOutline,
  compassOutline,
  cubeOutline,
} from "ionicons/icons";

const tabs = [
  { path: "/", label: "Home", icon: homeOutline },
  { path: "/batches", label: "Batches", icon: flaskOutline },
  { path: "/vessels", label: "Vessels", icon: cubeOutline },
  { path: "/recipes", label: "Recipes", icon: bookOutline },
  { path: "/explore", label: "Explore", icon: compassOutline },
];

import "./TabLayout.css";

export default function TabLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <IonTabBar slot="bottom">
      {tabs.map((tab) => (
        <IonTabButton
          key={tab.path}
          tab={tab.path}
          selected={location.pathname === tab.path}
          onClick={() => navigate(tab.path)}
        >
          <IonIcon icon={tab.icon} />
          <IonLabel>{tab.label}</IonLabel>
        </IonTabButton>
      ))}
    </IonTabBar>
  );
}