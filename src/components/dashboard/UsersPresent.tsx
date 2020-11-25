import { IonItem, IonLabel, IonList, IonListHeader } from "@ionic/react";
import React from "react";

interface IUser {
  username: string;
}
interface IUserProps {
  users: IUser[];
}

const UsersPresent: React.FC<IUserProps> = ({ users }) => {
  return (
    <IonList className="px-10 mt-6">
      <IonListHeader>
        <IonLabel>Nomades présents</IonLabel>
      </IonListHeader>
      {users.map((user) => {
        return (
          <IonItem>
            <IonLabel>{user.username}</IonLabel>
          </IonItem>
        );
      })}
    </IonList>
  );
};

export default UsersPresent;
