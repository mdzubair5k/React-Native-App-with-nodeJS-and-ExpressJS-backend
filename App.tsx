/**
 * App Root Component
 *
 * This is the main entry point of your React Native app.
 * It simply renders the AppNavigator, which handles screen navigation
 * and overall app routing logic.
 */

import React from 'react';
import AppNavigator from './AppNavigator';

export default function App() {
  /**
   * Return the main navigator
   *
   * AppNavigator usually contains all the screen definitions,
   * stack navigators, tab navigators, etc.
   * Wrapping it here makes App clean and focused on high-level app logic.
   */

  return <AppNavigator />;
}
