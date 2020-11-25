import { IonContent } from "@ionic/react";
import React from "react";

interface IResponsiveIonContent {
  className?: string;
}

const ResponsiveIonContent: React.FC<IResponsiveIonContent> = ({ className = "", children }) => {
  return (
    <IonContent>
      <div className={`lg:px-80 ${className}`}>{children}</div>
    </IonContent>
  );
};

export default ResponsiveIonContent;
