// src/App.tsx
import React, { useEffect, useState } from "react";
import {
  IonApp,
  IonContent,
  IonRouterOutlet,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonList,
  IonItem,
  IonLabel
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect } from "react-router-dom";

import WelcomePage from "./pages/WelcomePage";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import TodoPage from "./pages/ToDo";

import { auth } from "./firebaseConfig";
import { onAuthStateChanged, signOut, User } from "firebase/auth";

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;
  const [loading, setLoading] = useState(true);

  // Kuunnellaan kirjautumistilaa
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    // vie welcome-sivulle
    window.location.href = "/welcome";
  };

  if (loading) {
    // Lyhyt “splashscreen”
    return (
      <IonApp>
        <IonContent className="ion-padding">Loading…</IonContent>
      </IonApp>
    );
  }

  return (
    <IonApp>
      <IonReactRouter>
        {/* Menu näkyy vain kirjautuneena */}
        {isAuthenticated && (
          <IonMenu contentId="main">
            <IonHeader>
              <IonToolbar>
                <IonTitle>Menu</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              <IonList>
                <IonItem button onClick={handleLogout}>
                  <IonLabel>Logout</IonLabel>
                </IonItem>
              </IonList>
            </IonContent>
          </IonMenu>
        )}

        <IonRouterOutlet id="main">
          {!isAuthenticated && (
            <>
              <Route path="/welcome" component={WelcomePage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/register" component={RegisterPage} />
              <Route render={() => <Redirect to="/welcome" />} />
            </>
          )}

          {isAuthenticated && (
            <>
              <Route path="/app" component={TodoPage} />
              <Route render={() => <Redirect to="/app" />} />
            </>
          )}
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
