"use client";

import React, { useState } from 'react';
import LoginScreen from '@/components/screens/LoginScreen';
import DesktopEnvironment from '@/components/os/DesktopEnvironment';
// Import your brand new modern portfolio!
import ModernPortfolio from '@/components/screens/ModernPortfolio';

export default function VaradOS() {
  const [currentView, setCurrentView] = useState<'login' | 'os' | 'modern'>('login');
  
  if (currentView === 'login') return <LoginScreen onLogin={() => setCurrentView('os')} onModern={() => setCurrentView('modern')} />;
  if (currentView === 'modern') return <ModernPortfolio onBack={() => setCurrentView('login')} />;
  
  return <DesktopEnvironment onLogout={() => setCurrentView('login')} />;
}