import { IonAlert, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel } from "@ionic/react";
import React, { useState } from "react";
import { useMutation, useQueryCache } from "react-query";
import API from "../../axios";
import EditUserModal from "./EditUserModal";

interface IUser {
  id: string;
  username: string;
}
interface IUserProp {
  user: IUser;
}

const User: React.FC<IUserProp> = ({ user }) => {
  const cache = useQueryCache();
  const [showAlert, setShowAlert] = useState(false);
  const [showEdit, setEdit] = useState(false);

  const closeModal = () => {
    setEdit(false);
  };

  const deleteUser = async () => {
    return await API.delete(`/users/${user.id}`);
  };
  const [deleteAction] = useMutation(deleteUser, {
    onSuccess: () => {
      cache.invalidateQueries("users");
    },
  });
  return (
    <IonItemSliding>
      <IonItem>
        <IonLabel>{user.username}</IonLabel>
      </IonItem>
      <IonItemOptions side="end">
        <IonItemOption
          onClick={() => {
            setEdit(true);
          }}
        >
          Modifier
        </IonItemOption>
        <IonItemOption
          color="danger"
          onClick={() => {
            setShowAlert(true);
          }}
        >
          Supprimer
        </IonItemOption>
      </IonItemOptions>
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header={"Supression"}
        message={"Cette action est irréversible."}
        buttons={[
          {
            text: "Annuler",
            role: "cancel",
            cssClass: "secondary",
          },
          {
            text: "Supprimer",
            handler: deleteAction,
          },
        ]}
      />
      <EditUserModal initialUsername={user.username} id={user.id} close={closeModal} isOpen={showEdit} />
    </IonItemSliding>
  );
};

export default User;
