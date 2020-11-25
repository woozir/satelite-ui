import { IonButton, IonHeader, IonInput, IonItem, IonLabel, IonModal, IonTitle, IonToolbar } from "@ionic/react";
import React, { useState } from "react";
import API from "../../axios";
import Logo from "../logo/Logo";
import "./ModalToken.css";

interface IModelTokenProps {
  showModal: boolean;
  close: () => void;
  saveToken: (token: string) => Promise<void>;
}

const ModalToken: React.FC<IModelTokenProps> = ({ showModal, close, saveToken }) => {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  const validate = async () => {
    try {
      await saveToken(token);
      await API.get("/users");
      setError("");
      close();
    } catch (e) {
      setError("Erreur dans le mot de passe ou problème avec le serveur");
    }
  };
  return (
    <IonModal isOpen={showModal} showBackdrop backdropDismiss={false} cssClass="modalToken">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Woozir</IonTitle>
        </IonToolbar>
        <Logo className="logo" />
        <IonItem>
          <IonLabel position="floating">Entre le mot de passe :</IonLabel>
          <IonInput
            type="password"
            value={token}
            onIonChange={(e) => {
              setToken(e.detail.value!);
            }}
          ></IonInput>
          {error !== "" ? <div>{error}</div> : null}
        </IonItem>
      </IonHeader>

      <IonButton type="submit" onClick={() => validate()}>
        Je me connecte
      </IonButton>
    </IonModal>
  );
};

export default ModalToken;
