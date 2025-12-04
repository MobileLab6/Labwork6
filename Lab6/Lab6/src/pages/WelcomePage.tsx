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

        {/* Logo */}
        <div className="welcome-logo">
          To-Do<br />List
        </div>

        {/* Title */}
        <IonText className="welcome-title">
          <h1>Welcome</h1>
        </IonText>

        {/* Subtitle */}
        <p className="welcome-subtitle">Remember, plan, do, done</p>

        {/* Buttons */}
        <div className="welcome-buttons">
          <IonButton
            expand="block"
            className="primary-btn"
          >
            Create an account
          </IonButton>

          <IonButton
            expand="block"
            fill="outline"
            className="secondary-btn"
          >
            Login
          </IonButton>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default WelcomePage;
