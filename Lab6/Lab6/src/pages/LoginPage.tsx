import React, { useState } from "react";
import {
  IonPage,
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonText,
} from "@ionic/react";
import { useIonRouter } from "@ionic/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

import "./LoginPage.css";

const LoginPage: React.FC = () => {
  const router = useIonRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/ToDo", "root");
    } catch {
      setError("Kirjautuminen epäonnistui. Tarkista sähköposti ja salasana.");
    }
  };

  const goToRegister = () => {
    router.push("/register", "forward");
  };

  return (
    <IonPage>
      <IonContent fullscreen className="login-content">
        <div className="login-wrapper">
          {/* Logo */}
          <div className="login-logo">
            To-Do<br />List
          </div>

          {/* Virheilmoitus */}
          {error && (
            <IonText color="danger">
              <p className="login-error">{error}</p>
            </IonText>
          )}

          {/* Vihreä laatikko kentille + napille */}
          <div className="login-card">
            <IonItem className="login-item">
              <IonInput
                placeholder="Email"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value || "")}
              />
            </IonItem>

            <IonItem className="login-item">
              <IonInput
                type="password"
                placeholder="Password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value || "")}
              />
            </IonItem>

            <IonButton
              expand="block"
              className="login-button"
              onClick={handleLogin}
            >
              Login
            </IonButton>

            <IonButton
              expand="block"
              fill="clear"
              className="login-link"
              onClick={goToRegister}
            >
              Create an account
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
