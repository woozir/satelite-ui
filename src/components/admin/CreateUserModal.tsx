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

interface IEditCreateModalProps {
  isOpen: boolean;
  close: () => void;
}

const CreateUserModal: React.FC<IEditCreateModalProps> = ({ isOpen, close }) => {
  const cache = useQueryCache();
  const [username, setUsername] = useState("");

  const createUser = async () => {
    return await API.post(`/users/`, { username });
  };

  const [createAction] = useMutation(createUser, {
    onSuccess: () => {
      cache.invalidateQueries("users");
      setUsername("");
      close();
    },
  });

  return (
    <IonModal isOpen={isOpen}>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Création de l'utilisateur</IonTitle>
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
          createAction();
        }}
      >
        Créer l'utilisateur
      </IonButton>
    </IonModal>
  );
};

export default CreateUserModal;
