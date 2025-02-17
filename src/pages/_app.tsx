import React from 'react';
import type { AppProps } from 'next/app';
import { motion } from 'framer-motion';
import { AppLayout } from '@/layout/index';
import { Provider } from "react-redux";
import { store, persistor } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import '@/styles/globals.css';
import '../polyfills'; // Import the polyfill here

function App({ Component, pageProps }: AppProps) {
  const isLayoutNeeded = pageProps.router?.pathname.includes("/auth");
  const LayoutWrapper = !isLayoutNeeded ? AppLayout : React.Fragment;

  const pageAnimationVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.5 } },
  };

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <LayoutWrapper>
          <motion.div
            key={pageProps.router?.route}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={pageAnimationVariants}
          >
            <Component {...pageProps} />
          </motion.div>
        </LayoutWrapper>
      </PersistGate>
    </Provider>
  );
}

export default App;