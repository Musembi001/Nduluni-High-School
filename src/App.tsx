/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StudentPortal } from './components/StudentPortal';
import { FeePaymentSystem } from './components/FeePaymentSystem';
import { EventCalendar } from './components/EventCalendar';
import { AcademicsSection } from './components/AcademicsSection';
import { AdmissionsSection } from './components/AdmissionsSection';
import { CampusSection } from './components/CampusSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('overview');
  const [targetAdmissionNo, setTargetAdmissionNo] = useState<string | undefined>(undefined);

  // Scroll to top when changing tab
  const handleSelectTab = (tab: string) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToFees = (admissionNo?: string) => {
    if (admissionNo) {
      setTargetAdmissionNo(admissionNo);
    }
    setCurrentTab('fees');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToPortal = () => {
    setCurrentTab('portal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 font-sans text-stone-900 selection:bg-rose-950 selection:text-amber-300">
      {/* Top Navbar */}
      <Navbar currentTab={currentTab} onSelectTab={handleSelectTab} />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentTab === 'overview' && (
          <HeroSection onNavigate={handleSelectTab} />
        )}

        {currentTab === 'portal' && (
          <StudentPortal onNavigateToFees={handleNavigateToFees} />
        )}

        {currentTab === 'fees' && (
          <FeePaymentSystem 
            initialAdmissionNo={targetAdmissionNo} 
            onNavigateToPortal={handleNavigateToPortal}
          />
        )}

        {currentTab === 'calendar' && (
          <EventCalendar />
        )}

        {currentTab === 'academics' && (
          <AcademicsSection />
        )}

        {currentTab === 'admissions' && (
          <AdmissionsSection />
        )}

        {currentTab === 'campus' && (
          <CampusSection />
        )}

        {currentTab === 'contact' && (
          <ContactSection />
        )}
      </main>

      {/* Institutional Footer */}
      <Footer onNavigate={handleSelectTab} />
    </div>
  );
}
