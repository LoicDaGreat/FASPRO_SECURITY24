  import { IonCol, IonRow, IonText } from "@ionic/react";

export const NoQRCodes = () => (

	<IonRow className="ion-text-center ion-justify-content-center">
    <IonCol size="9">
      <h3>It looks like you don't have any QR codes stored.</h3>
      <img src="/assets/FAVICON_GREEN.png" alt="icon" />

      <p>Click the <IonText style={{color: "#26AA58"}}>button</IonText> in the bottom right to scan <IonText style={{color: "#26AA58"}}>FASPRO24</IonText> QR Code</p>
    </IonCol>
  </IonRow>
);