import {
  IonPage,
  IonContent,
  IonButton,
  IonText
} from '@ionic/react';

import './WelcomePage.css';

const WelcomePage: React.FC = () => {
  return (
    <IonPage>
  <IonContent fullscreen className="welcome-content">

    <div className="welcome-wrapper">

      <div className="welcome-logo">
        To-Do<br />List
      </div>

      <IonText className="welcome-title">
        <h1>Welcome</h1>
      </IonText>

      <p className="welcome-subtitle">Remember, plan, do, done</p>

      <div className="welcome-buttons">
        <IonButton expand="block" className="primary-btn" routerLink="/Login">
          Create an account
        </IonButton>

        <IonButton expand="block" fill="outline" className="secondary-btn" routerLink="/Register">
          Login
        </IonButton>
      </div>

    </div>

  </IonContent>
</IonPage>

  );
};

export default WelcomePage;
