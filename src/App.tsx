import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { InteractiveVisualizer } from './components/InteractiveVisualizer';
import { DynamicCostCalculator } from './components/DynamicCostCalculator';
import { ProductCatalog } from './components/ProductCatalog';
import { ComparisonMatrix } from './components/ComparisonMatrix';
import { CanadianClimateEngine } from './components/CanadianClimateEngine';
import { GateAutomation } from './components/GateAutomation';
import { CommercialContractor } from './components/CommercialContractor';
import { ProjectGallery } from './components/ProjectGallery';
import { AiFenceAdvisor } from './components/AiFenceAdvisor';
import { SiteMapPlanner } from './components/SiteMapPlanner';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';
import { LocationsIndexPage } from './pages/LocationsIndexPage';
import { LocationPage } from './pages/LocationPage';
import { FenceConfig, FenceStyleId, GateType, SecurityPackageType } from './types';
import { decodeConfigFromUrl } from './utils/shareUrl';

interface HomeContentProps {
  config: FenceConfig;
  setConfig: React.Dispatch<React.SetStateAction<FenceConfig>>;
  handleOpenQuote: (customConfig?: FenceConfig) => void;
  scrollToSection: (sectionId: string) => void;
}

function HomeContent({ config, setConfig, handleOpenQuote, scrollToSection }: HomeContentProps) {
  const handleSelectProductForVisualizer = (styleId: FenceStyleId) => {
    setConfig((prev) => ({ ...prev, style: styleId }));
    scrollToSection('visualizer');
  };

  const handleSelectGateForVisualizer = (gateId: GateType) => {
    setConfig((prev) => ({ ...prev, includeGate: gateId }));
    scrollToSection('visualizer');
  };

  const handleSelectSecurityForVisualizer = (secId: SecurityPackageType) => {
    setConfig((prev) => ({ ...prev, securityPackage: secId }));
    scrollToSection('visualizer');
  };

  return (
    <main className="flex-1">
      <Hero
        onOpenVisualizer={() => scrollToSection('visualizer')}
        onOpenSitePlanner={() => scrollToSection('site-planner')}
        onOpenQuote={() => handleOpenQuote()}
      />

      <InteractiveVisualizer
        config={config}
        onChangeConfig={setConfig}
        onOpenQuote={(c) => handleOpenQuote(c)}
        onScrollToCalculator={() => scrollToSection('calculator')}
      />

      <SiteMapPlanner
        config={config}
        onChangeConfig={setConfig}
        onOpenQuote={(c) => handleOpenQuote(c)}
        onScrollToCalculator={() => scrollToSection('calculator')}
        onScrollToVisualizer={() => scrollToSection('visualizer')}
      />

      <DynamicCostCalculator
        config={config}
        onChangeConfig={setConfig}
        onOpenQuote={(c) => handleOpenQuote(c)}
        onScrollToVisualizer={() => scrollToSection('visualizer')}
        onScrollToSitePlanner={() => scrollToSection('site-planner')}
      />

      <ProductCatalog
        onSelectProductForVisualizer={handleSelectProductForVisualizer}
        onSelectGateForVisualizer={handleSelectGateForVisualizer}
        onSelectSecurityForVisualizer={handleSelectSecurityForVisualizer}
        onSelectGradeForEstimate={(gradeId) => {
          setConfig((prev) => ({ ...prev, materialGrade: gradeId }));
          scrollToSection('calculator');
        }}
        onOpenQuote={() => handleOpenQuote()}
      />

      <ComparisonMatrix
        onOpenVisualizer={() => scrollToSection('visualizer')}
      />

      <CanadianClimateEngine
        config={config}
        onChangeConfig={setConfig}
        onOpenQuote={() => handleOpenQuote()}
        onScrollToCalculator={() => scrollToSection('calculator')}
        onScrollToSitePlanner={() => scrollToSection('site-planner')}
      />

      <GateAutomation
        onOpenQuote={() => handleOpenQuote()}
        onOpenVisualizer={() => scrollToSection('visualizer')}
      />

      <CommercialContractor
        onOpenQuote={() => handleOpenQuote()}
      />

      <ProjectGallery
        onSelectProjectStyle={handleSelectProductForVisualizer}
        onOpenQuote={() => handleOpenQuote()}
      />

      <AiFenceAdvisor
        onOpenVisualizer={() => scrollToSection('visualizer')}
        onOpenQuote={() => handleOpenQuote()}
      />

      <FaqSection
        onOpenQuote={() => handleOpenQuote()}
        onScrollToCalculator={() => scrollToSection('calculator')}
      />
    </main>
  );
}

function AppShell() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [activeConfig, setActiveConfig] = useState<FenceConfig | undefined>(undefined);

  // Central synchronized config state across visualizer & dynamic calculator
  const [config, setConfig] = useState<FenceConfig>(() => {
    const urlConfig = decodeConfigFromUrl();
    const defaults: FenceConfig = {
      style: 'nordic-slat',
      heightFeet: 6,
      linearFeet: 120,
      color: 'obsidian-black',
      materialGrade: 'standard',
      soilType: 'standard-loam',
      postMount: 'deep-frost-ground',
      slatSpacing: 'zero-gap',
      includeGate: 'pedestrian-single',
      gateWidthFeet: 4,
      gateAutomation: false,
      securityPackage: 'none',
      solarBackupPower: false,
      integratedLedLighting: true,
      province: 'ON',
      installationType: 'turnkey-pro',
    };
    return urlConfig ? { ...defaults, ...urlConfig } : defaults;
  });

  // Auto-scroll to calculator or visualizer if requested in hash
  useEffect(() => {
    if (window.location.hash) {
      const hash = window.location.hash.replace('#', '');
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    }
  }, []);

  const handleOpenQuote = (customConfig?: FenceConfig) => {
    setActiveConfig(customConfig || config);
    setQuoteModalOpen(true);
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-amber-500 selection:text-neutral-950">
      {/* Top Header */}
      <Header
        onOpenQuote={() => handleOpenQuote()}
        onSelectSection={scrollToSection}
      />

      <Routes>
        <Route
          path="/"
          element={
            <HomeContent
              config={config}
              setConfig={setConfig}
              handleOpenQuote={handleOpenQuote}
              scrollToSection={scrollToSection}
            />
          }
        />
        <Route path="/locations" element={<LocationsIndexPage />} />
        <Route path="/locations/:citySlug" element={<LocationPage />} />
      </Routes>

      {/* Footer */}
      <Footer
        onOpenQuote={() => handleOpenQuote()}
        onSelectSection={scrollToSection}
      />

      {/* Quote & Assessment Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        initialConfig={activeConfig || config}
      />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
