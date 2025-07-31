
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DarkModeProvider } from "@/contexts/DarkModeContext";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AestheticBios from "./pages/AestheticBios";
import FunnyBios from "./pages/FunnyBios";
import BusinessBios from "./pages/BusinessBios";
import AIBioGeneratorPage from "./pages/AIBioGeneratorPage";
import CoolBioIdeas from "./pages/CoolBioIdeas";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import Disclaimer from "./pages/Disclaimer";
import SuggestFeature from "./pages/SuggestFeature";
// Feature Pages
import AIBioGeneration from "./pages/features/AIBioGeneration";
import FancyFontStyles from "./pages/features/FancyFontStyles";
import SymbolLibrary from "./pages/features/SymbolLibrary";
import TemplateCollection from "./pages/features/TemplateCollection";
import LivePreview from "./pages/features/LivePreview";
// Resource Pages
import BioTemplates from "./pages/resources/BioTemplates";
import StyleGuide from "./pages/resources/StyleGuide";
import TipsAndTricks from "./pages/resources/TipsAndTricks";
import Examples from "./pages/resources/Examples";
import FAQ from "./pages/resources/FAQ";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <DarkModeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/aesthetic-bios" element={<AestheticBios />} />
            <Route path="/funny-bios" element={<FunnyBios />} />
            <Route path="/business-bios" element={<BusinessBios />} />
            <Route path="/ai-bio-generator" element={<AIBioGeneratorPage />} />
            <Route path="/cool-instagram-bio-ideas" element={<CoolBioIdeas />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/suggest-feature" element={<SuggestFeature />} />
            {/* Feature Pages */}
            <Route path="/features/ai-bio-generation" element={<AIBioGeneration />} />
            <Route path="/features/fancy-font-styles" element={<FancyFontStyles />} />
            <Route path="/features/symbol-library" element={<SymbolLibrary />} />
            <Route path="/features/template-collection" element={<TemplateCollection />} />
            <Route path="/features/live-preview" element={<LivePreview />} />
            {/* Resource Pages */}
            <Route path="/resources/bio-templates" element={<BioTemplates />} />
            <Route path="/resources/style-guide" element={<StyleGuide />} />
            <Route path="/resources/tips-and-tricks" element={<TipsAndTricks />} />
            <Route path="/resources/examples" element={<Examples />} />
            <Route path="/resources/faq" element={<FAQ />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </DarkModeProvider>
  </QueryClientProvider>
);

export default App;
