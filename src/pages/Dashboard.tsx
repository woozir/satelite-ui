import React from "react";
import { IonCol, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react";
import { useQuery } from "react-query";
import API from "../axios";
import UsersCount from "../components/dashboard/UsersCount";
import "./Dashboard.css";
import UsersPresent from "../components/dashboard/UsersPresent";
import ResponsiveIonContent from "../components/ResponsiveIonContent";

type IUser = {
  username: string;
  present: boolean;
  id: string;
};

const Dashboard: React.FC = () => {
  const { isLoading, error, data } = useQuery<IUser[], Error>(
    "users",
    async () => {
      const data = await API.get("/users").then((res) => res.data);
      return data;
    },
    { refetchInterval: 5000 },
  );

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>{error.message}</div>;
  if (data) {
    const count = data?.reduce((acc, user) => {
      if (user.present) {
        acc++;
      }
      return acc;
    }, 0);

    const usersPresent = data.filter((user) => user.present);
    return (
      <IonPage className="max-h-full text-center">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Dashboard</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ResponsiveIonContent>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Dashboard</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonGrid>
            <IonRow className="content-center">
              <IonCol size-lg="4" size-xs="12" className="text-center">
                <UsersCount count={count} />
              </IonCol>
              {count !== 0 ? (
                <IonCol size-lg="8" size-xs="12">
                  <UsersPresent users={usersPresent} />
                </IonCol>
              ) : null}
            </IonRow>
          </IonGrid>
        </ResponsiveIonContent>
      </IonPage>
    );
  }
  return <div>Oh :(</div>;
};

export default Dashboard;
