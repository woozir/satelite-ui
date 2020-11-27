import { IonItem, IonLabel, IonList, IonListHeader } from "@ionic/react";
import React from "react";

interface IUser {
  username: string;
}
interface IUserProps {
  users: IUser[];
}

const UsersPresent: React.FC<IUserProps> = ({ users }) => {
  const usersPresent = users.sort(function (a, b) {
    if (a.username < b.username) {
      return -1;
    }
    if (a.username > b.username) {
      return 1;
    }
    return 0;
  });
  return (
    <IonList className="lg:px-10 mt-6">
      <IonListHeader>
        <IonLabel>Nomades présents</IonLabel>
      </IonListHeader>
      {usersPresent.map((user) => {
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
