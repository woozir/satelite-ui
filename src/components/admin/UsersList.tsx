import { IonButton, IonLabel, IonList, IonListHeader } from "@ionic/react";
import React, { useState } from "react";
import { useQuery } from "react-query";
import API from "../../axios";
import CreateUserModal from "./CreateUserModal";
import User from "./User";

type IUser = {
  username: string;
  id: string;
};

const UsersList: React.FC = () => {
  const [showCreate, setCreate] = useState(false);

  const closeModal = () => {
    setCreate(false);
  };

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
    const users = data.sort(function (a, b) {
      if (a.username < b.username) {
        return -1;
      }
      if (a.username > b.username) {
        return 1;
      }
      return 0;
    });
    return (
      <IonList>
        <IonListHeader>
          <IonLabel>Utilisateurs:</IonLabel>
          <IonButton
            onClick={() => {
              setCreate(true);
            }}
          >
            Ajouter
          </IonButton>
        </IonListHeader>
        {users.map((user: IUser) => {
          return <User key={user.id} user={user} />;
        })}
        <CreateUserModal isOpen={showCreate} close={closeModal} />
      </IonList>
    );
  }

  return <div>Oh :(</div>;
};

export default UsersList;
