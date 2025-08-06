
import React from 'react';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import { Header } from "@/components/Header";
import Footer from "@/components/ui/footer";
import { useDarkMode } from "@/contexts/DarkModeContext";

const Disclaimer = () => {
  const { darkMode } = useDarkMode();
  
  return (
    <div className={`min-h-screen transition-all duration-300 ${darkMode ? 'dark bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-slate-50 via-orange-50/30 to-red-50/30'}`}>
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/" className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
        
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <AlertTriangle className="h-8 w-8 text-orange-600" />
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
              Disclaimer
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Important information about the use of our Instagram Bio Generator service and its limitations.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="space-y-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>General Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                The information and services provided by the Instagram Bio Generator are for general 
                informational and entertainment purposes only. While we strive to provide accurate and 
                up-to-date content, we make no representations or warranties of any kind, express or 
                implied, about the completeness, accuracy, reliability, suitability, or availability 
                of the generated content.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>AI-Generated Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                Our service uses artificial intelligence to generate Instagram bio suggestions. Please note:
              </p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mt-2"></span>
                  <span>AI-generated content may not always be appropriate for all audiences</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mt-2"></span>
                  <span>Generated bios should be reviewed before use on your Instagram profile</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mt-2"></span>
                  <span>We cannot guarantee the uniqueness of generated content</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mt-2"></span>
                  <span>Users are responsible for ensuring content meets their personal standards</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Third-Party Content and Links</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                Our service may contain links to third-party websites or references to external content. 
                These links are provided for convenience only. We do not endorse, control, or assume 
                responsibility for the content, privacy policies, or practices of any third-party sites 
                or services.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>No Professional Advice</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                The Instagram Bio Generator is not intended to provide professional marketing, branding, 
                or business advice. The generated content should not be considered as professional 
                recommendations. Users should consult with qualified professionals for specific advice 
                related to their business or personal branding needs.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                Under no circumstances shall Instagram Bio Generator, its developers, or affiliates be 
                liable for any direct, indirect, incidental, special, or consequential damages resulting 
                from the use or inability to use our service, including but not limited to damages for 
                loss of profits, goodwill, use, data, or other intangible losses.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Instagram and Social Media Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                Users are responsible for ensuring their bio content complies with:
              </p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2"></span>
                  <span>Instagram's Community Guidelines and Terms of Service</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2"></span>
                  <span>Applicable laws and regulations in their jurisdiction</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2"></span>
                  <span>Intellectual property rights of others</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2"></span>
                  <span>Standards of decency and respect for others</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Service Availability</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                We strive to maintain continuous service availability, but we do not guarantee uninterrupted 
                access. The service may be temporarily unavailable due to maintenance, updates, or technical 
                issues. We reserve the right to modify, suspend, or discontinue the service at any time without notice.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                If you have any questions about this disclaimer, please contact us at 
                <a href="mailto:support@biogenerator.com" className="text-orange-600 hover:underline ml-1">support@biogenerator.com</a>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Disclaimer;

