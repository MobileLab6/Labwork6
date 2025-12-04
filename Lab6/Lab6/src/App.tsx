import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonSplitPane,
  IonButtons,
  IonButton,
  setupIonicReact,
  useIonAlert
} from '@ionic/react';
import { menuController } from '@ionic/core/components';
import { IonReactRouter } from '@ionic/react-router';
import { useIonRouter } from '@ionic/react';
import { ellipse, square, triangle, logOut, arrowBack } from 'ionicons/icons';

import Tab1 from './pages/WelcomePage';
import Tab2 from './pages/LoginPage';
import Tab3 from './pages/RegisterPage';
import ToDo from './pages/ToDo';

import './menu.css';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  const closeMenu = async () => {
    await menuController.close('main-menu');
  };

  return (
    <IonApp>
      <IonReactRouter>
        <IonMenu contentId="main-content" menuId="main-menu">
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton className="back-button" onClick={closeMenu}>
                  <IonIcon icon={arrowBack} />
                  Back
                </IonButton>
              </IonButtons>
              <IonTitle>Menu</IonTitle>
            </IonToolbar>
          </IonHeader>
        <IonContent className="ion-padding">
          <IonList lines="none">
            <IonItem button={false} lines="none" detail={false} onClick={() => console.log('Logout placeholder')}>
              <IonIcon icon={logOut} slot="start" />
              <IonLabel>Logout</IonLabel>
            </IonItem>
          </IonList>
        </IonContent>
      </IonMenu>
      <IonSplitPane contentId="main-content">
        <IonTabs>
          <IonRouterOutlet id="main-content">
          <Route exact path="/tab1">
            <Tab1 />
          </Route>
          <Route exact path="/tab2">
            <Tab2 />
          </Route>
          <Route path="/tab3">
            <Tab3 />
          </Route>
          <Route exact path="/todo">
            <ToDo />
          </Route>
          <Route exact path="/">
            <Redirect to="/tab1" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/tab1">
            <IonIcon aria-hidden="true" icon={triangle} />
            <IonLabel>Tab 1</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tab2">
            <IonIcon aria-hidden="true" icon={ellipse} />
            <IonLabel>Tab 2</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/tab3">
            <IonIcon aria-hidden="true" icon={square} />
            <IonLabel>Tab 3</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
      </IonSplitPane>
    </IonReactRouter>
  </IonApp>
  );
};

export default App;

