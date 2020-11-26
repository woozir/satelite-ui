import {
  IonButton,
  IonButtons,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import API from "../../axios";

import { useMutation, useQueryCache } from "react-query";

interface IEditUserModalProps {
  isOpen: boolean;
  close: () => void;
  initialUsername: string;
  id: string;
}

const EditUserModal: React.FC<IEditUserModalProps> = ({ isOpen, close, initialUsername, id }) => {
  const cache = useQueryCache();
  const [username, setUsername] = useState(initialUsername);

  const updateUser = async () => {
    return await API.put(`/users/${id}`, { username });
  };

  const [updateAction] = useMutation(updateUser, {
    onSuccess: () => {
      cache.invalidateQueries("users");
      close();
    },
  });

  return (
    <IonModal isOpen={isOpen}>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Modification de l'utilisateur</IonTitle>
          <IonButtons slot="end">
            <IonButton
              onClick={() => {
                close();
              }}
            >
              Fermer
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonItem>
        <IonLabel position="floating">Nom de l'utilisateur</IonLabel>
        <IonInput
          type="text"
          value={username}
          onIonChange={(e) => {
            setUsername(e.detail.value!);
          }}
        ></IonInput>
      </IonItem>

      <IonButton
        expand="block"
        onClick={() => {
          updateAction();
        }}
      >
        Enregistrer
      </IonButton>
    </IonModal>
  );
};

export default EditUserModal;
