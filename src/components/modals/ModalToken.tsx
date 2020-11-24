import { IonButton, IonModal } from "@ionic/react";
import React from "react";

interface IModelTokenProps {
  showModal: boolean;
  close: () => void;
  saveToken: (token: string) => Promise<void>;
}

const ModalToken: React.FC<IModelTokenProps> = ({ showModal, close }) => {
  return (
    <IonModal isOpen={showModal}>
      <p>This is modal content</p>
      <IonButton onClick={() => close()}>Close Modal</IonButton>
    </IonModal>
  );
};

export default ModalToken;
