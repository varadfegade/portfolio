"use client";

import React, { useState, useEffect } from 'react';
import GatewayScreen from '@/components/screens/GatewayScreen';
import LoginScreen from '@/components/screens/LoginScreen';
import DesktopEnvironment from '@/components/os/DesktopEnvironment';
import ModernUI from '@/components/screens/ModernUI';
import { AnimatePresence, motion } from 'framer-motion';

export default function VaradOS() {
  const [currentView, setCurrentView] = useState<'gateway' | 'login' | 'os' | 'modern'>('gateway');
  const handleLogin = () => {
    setCurrentView('os');
  };

  return (
    <AnimatePresence mode="wait">
      {currentView === 'gateway' && (
        <motion.div
          key="gateway"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="w-full h-full absolute inset-0"
        >
          <GatewayScreen onSelectOS={() => setCurrentView('login')} onSelectModern={() => setCurrentView('modern')} />
        </motion.div>
      )}

      {currentView === 'login' && (
        <motion.div
          key="login"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="w-full h-full absolute inset-0"
        >
          <LoginScreen onLogin={handleLogin} onModern={() => setCurrentView('modern')} />
        </motion.div>
      )}

      {currentView === 'os' && (
        <motion.div
          key="os"
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full h-full absolute inset-0"
        >
          <DesktopEnvironment onLogout={() => setCurrentView('login')} onModern={() => setCurrentView('modern')} />
        </motion.div>
      )
      }

      {
        currentView === 'modern' && (
          <motion.div
            key="modern"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-full h-full absolute inset-0 overflow-y-auto"
          >
            <ModernUI onBack={() => setCurrentView('login')} />
          </motion.div>
        )
      }
    </AnimatePresence >
  );
}