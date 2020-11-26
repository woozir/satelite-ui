import React from "react";
import { IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import ResponsiveIonContent from "../components/ResponsiveIonContent";
import UsersList from "../components/admin/UsersList";

const Admin: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Admin</IonTitle>
        </IonToolbar>
      </IonHeader>
      <ResponsiveIonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Admin</IonTitle>
          </IonToolbar>
        </IonHeader>
        <UsersList />
      </ResponsiveIonContent>
    </IonPage>
  );
};

export default Admin;
