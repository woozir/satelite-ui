import React from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { useQuery } from "react-query";
import API from "../axios";
import UsersCount from "../components/dashboard/UsersCount";

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
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Dashboard</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Dashboard</IonTitle>
            </IonToolbar>
          </IonHeader>
          <UsersCount count={count} />
        </IonContent>
      </IonPage>
    );
  }
  return <div>Oh :(</div>;
};

export default Dashboard;
