import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { peopleOutline, settingsOutline } from "ionicons/icons";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import API from "./axios";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import { QueryCache, ReactQueryCacheProvider } from "react-query";
import { Plugins } from "@capacitor/core";
import ModalToken from "./components/modals/ModalToken";
const { Storage } = Plugins;
const queryCache = new QueryCache();

const App: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [token, setToken] = useState("");

  const saveToken = async (token: string) => {
    await Storage.set({ key: "token", value: token });
    setToken(token);
  };

  const close = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const loadToken = async () => {
      try {
        await Storage.get({ key: "token" });
        //TODO: implement route to validate token
        await API.get("/users");
        setToken(token);
      } catch (e) {
        setShowModal(true);
      }
    };
    loadToken();
  }, [token]);

  return (
    <IonApp>
      <ReactQueryCacheProvider queryCache={queryCache}>
        <IonReactRouter>
          <ModalToken showModal={showModal} close={close} saveToken={saveToken}></ModalToken>
          <IonTabs>
            <IonRouterOutlet>
              <Route path="/dashboard" component={Dashboard} exact={true} />
              <Route path="/admin" component={Admin} exact={true} />
              <Route path="/" render={() => <Redirect to="/dashboard" />} exact={true} />
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="dashboard" href="/dashboard">
                <IonIcon icon={peopleOutline} />
                <IonLabel>Dashboard</IonLabel>
              </IonTabButton>
              <IonTabButton tab="admin" href="/admin">
                <IonIcon icon={settingsOutline} />
                <IonLabel>Admin</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </ReactQueryCacheProvider>
    </IonApp>
  );
};
export default App;
