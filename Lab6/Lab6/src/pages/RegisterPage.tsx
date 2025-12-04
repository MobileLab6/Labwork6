// src/pages/RegisterPage.tsx
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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

import "./RegisterPage.css";

const RegisterPage: React.FC = () => {
  const router = useIonRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/todo", "root"); // tai "/app" jos käytätte sitä
    } catch {
      setError(
        "Rekisteröinti epäonnistui. Salasanan pitää olla vähintään 6 merkkiä."
      );
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="register-content">
          <div className="register-wrapper">
            {/* Logo */}
            <div className="register-logo">
              To-Do
              <br />
              List
            </div>

            {/* Vihreä kortti */}
            <div className="register-card">
              {error && (
                <IonText className="register-error" color="danger">
                  <p>{error}</p>
                </IonText>
              )}

              <IonItem className="register-item">
                <IonInput
                  placeholder="Email"
                  value={email}
                  onIonChange={(e) => setEmail(e.detail.value || "")}
                />
              </IonItem>

              <IonItem className="register-item">
                <IonInput
                  type="password"
                  placeholder="Password"
                  value={password}
                  onIonChange={(e) => setPassword(e.detail.value || "")}
                />
              </IonItem>

              <IonButton
                expand="block"
                className="register-button"
                onClick={handleRegister}
              >
                Sign Up
              </IonButton>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;
