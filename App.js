import React from 'react';
import {AppNavigation} from './src/navigation/AppNavigation';

import {Provider} from 'react-redux';
import {store, persistedStore} from './src/store';
import {PersistGate} from 'redux-persist/integration/react';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistedStore} loading={null}>
        <AppNavigation />
      </PersistGate>
    </Provider>
  );
}
