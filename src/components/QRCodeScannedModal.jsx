import React, {useState, useEffect} from 'react';

import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonNote, IonPage, IonRow, IonTitle, IonToolbar, useIonToast } from "@ionic/react";
import QRCode from "react-qr-code";
import { addQRCode } from "../store/QRStore";
import { addOutline, cameraOutline, qrCodeOutline, checkmark, closeOutline } from "ionicons/icons";

// import useSound from 'use-sound';
// import closeSound from "../sounds/close.wav";
import { reloadOutline } from "ionicons/icons";

export const QRCodeScannedModal = ({ dismiss, code, set, scan }) => {

  const [visitor, setVisitor] = useState();
  const [accompanying, setAccompanying] = useState();

   const ParsedData = JSON.parse(code);

useEffect(()=>{
  var formdata = new FormData();
  formdata.append("Code", ParsedData.AccessCode);
  
  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };

  fetch("http://127.0.0.1:8000/api/visitors/ListbyVisitorCode", requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log(result.data[0]);
    setVisitor(result.data[0]);

    var formdata = new FormData();
    formdata.append("id", visitor.VisitorID);
    console.log(visitor.VisitorID);
    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };
    
   return fetch("http://127.0.0.1:8000/api/visitors/GetAccompanyingVisitor", requestOptions)
      .then(response => response.json())
      .then(result => {setAccompanying(result.data)
      console.log(accompanying);
      })
      .catch(error => console.log('error', error));
  })
  .catch(error => console.log('error', error));

  
},[])


  





  // const [ play ] = useSound(closeSound);
  const [ showToast ] = useIonToast();

  const handleDismiss = () => {

    dismiss();
    // play();
  }
console.log(visitor);
  const handleScanAgain = () => {

    handleDismiss();

    setTimeout(() => {
      scan();
    }, 10);
  }

  const handleAdd = async () => {

      var formdata = new FormData();
      formdata.append("id", visitor.VisitorID);
      console.log(visitor.VisitorID);
      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };

      fetch("http://127.0.0.1:8000/api/visitors/CheckIn", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

    addQRCode((code.text ? code.text : code), true);
    showToast({

      header: "Success!",
      message: "QR Code stored successfully.",
      duration: 3000,
      color: "primary"
    });

    handleDismiss();
}

  return (

    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>View QR Code</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={ handleDismiss }>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonGrid className="ion-padding-top ion-margin-top">
          <IonRow className="ion-justify-content-center ion-text-center animate__animated animate__lightSpeedInLeft animate__faster">
            <IonCol size="12">
              <QRCode value={ code.text ? code.text : code } />
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>VISITOR DETAILS</IonCardTitle>
                  {/* <IonNote>VISITOR DETAILS</IonNote> */}
                </IonCardHeader>
                <IonCardContent>
                {visitor != null ? <div>
                   <p>Visitor Access Code: { ParsedData.AccessCode ? ParsedData.AccessCode : 'N/A' }<span style={{color: "#26AA58"}} > &nbsp; {ParsedData.AccessCode == visitor.Code ? <span style={{color: "#26AA58"}} >VALID!</span> : <span style={{color: "#CD291F"}}>INVALID!</span>}</span></p>
                   <p>Visitor Name : { ParsedData.VisitorName ? ParsedData.VisitorName : 'N/A' }<span style={{color: "#26AA58"}} > &nbsp; {ParsedData.VisitorName == visitor.Name ? <span style={{color: "#26AA58"}} >VALID!</span> : <span style={{color: "#CD291F"}}>INVALID!</span>}</span></p>
                  <p>Visitor Surname : { ParsedData.VisitorSurname ? ParsedData.VisitorSurname : 'N/A' }<span style={{color: "#26AA58"}} > &nbsp; {ParsedData.VisitorSurname == visitor.Surname ? <span style={{color: "#26AA58"}} >VALID!</span> : <span style={{color: "#CD291F"}}>INVALID!</span>}</span></p>
                  <p>Phone Number: { ParsedData.VisitorPhoneNumber ? ParsedData.VisitorPhoneNumber : 'N/A' } &nbsp; {ParsedData.VisitorPhoneNumber == visitor.PhoneNumber ? <span style={{color: "#26AA58"}} >VALID!</span> : <span style={{color: "#CD291F"}}>INVALID!</span>}</p>
                  <p>Number Plate: { ParsedData.CarRegNumber ? ParsedData.CarRegNumber : 'N/A' }<span style={{color: "#26AA58"}} > &nbsp; {ParsedData.CarRegNumber == visitor.NumberPlate ? <span style={{color: "#26AA58"}} >VALID!</span> : <span style={{color: "#CD291F"}}>INVALID!</span>}</span></p>
                  <p>ID/Passport Number: { ParsedData['ID/Passport Number'] ? ParsedData['ID/Passport Number'] : 'N/A' }<span style={{color: "#26AA58"}} > &nbsp; {ParsedData['ID/Passport Number'] == visitor.PassportOrIDNumber ? <span style={{color: "#26AA58"}} >VALID!</span> : <span style={{color: "#CD291F"}}>INVALID!</span>}</span></p>
                  <br></br>
                  <h1 style={{color: "#26AA58"}}>PERSON INVITING</h1>
                  <br></br>
                  <p>Name: { ParsedData.Name ? ParsedData.Name : 'N/A' }</p>
                  <p>Surname: { ParsedData.Surname ? ParsedData.Surname : 'N/A' }</p>
                  <p>Unit Visiting: { ParsedData.UnitVisiting ? ParsedData.UnitVisiting : 'N/A' }</p>
                  <br></br>
                  <h1 style={{color: "#26AA58"}}>ACCOMPANYING</h1>
                  <br></br>
                  {accompanying?.map((accompanyingVisitor) => (
                    <div>
                       <p>Name: {accompanyingVisitor.Name}</p>
                       <p>Surname: {accompanyingVisitor.Surname }</p>
                       <p>Phone Number: { accompanyingVisitor.PhoneNumber }</p>
                       <p>ID/Passport Number: { accompanyingVisitor.PassportOrIDNumber }</p>
                       <br></br>
                    </div>
                  ))}
                  </div>
                
                :'N/A'}
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="6">
              <IonButton expand="block" fill="outline" onClick={ handleScanAgain }>
                <IonIcon icon={ reloadOutline } />&nbsp;
                Scan again</IonButton>
            </IonCol>
            <IonCol size="6">
             {visitor != null ?
              <IonButton expand="block" onClick={ handleAdd }>Check In &rarr;</IonButton> 
              : ''}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}