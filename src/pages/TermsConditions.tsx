
import React from 'react';
import { FileText, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import { Header } from "@/components/Header";
import Footer from "@/components/ui/footer";
import { useDarkMode } from "@/contexts/DarkModeContext";

const TermsConditions = () => {
  const { darkMode } = useDarkMode();
  
  return (
    <div className={`min-h-screen transition-all duration-300 ${darkMode ? 'dark bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30'}`}>
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
        
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FileText className="h-8 w-8 text-indigo-600" />
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Terms & Conditions
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Please read these terms and conditions carefully before using our Instagram Bio Generator service.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="space-y-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                By accessing and using the Instagram Bio Generator service, you accept and agree to be bound by 
                the terms and provision of this agreement. If you do not agree to abide by the above, 
                please do not use this service.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Use License</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                Permission is granted to temporarily use the Instagram Bio Generator for personal, 
                non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained on the website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Service Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Our Instagram Bio Generator provides:
              </p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></span>
                  <span>AI-powered bio generation based on user input</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></span>
                  <span>Font styling and symbol customization tools</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></span>
                  <span>Template libraries and bio examples</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></span>
                  <span>Copy-to-clipboard functionality</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>User Content and Responsibilities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                You are responsible for the content you input into our service. You agree not to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                <li>Submit content that is illegal, harmful, or offensive</li>
                <li>Violate any intellectual property rights</li>
                <li>Use the service to generate spam or misleading content</li>
                <li>Attempt to manipulate or abuse the AI generation system</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Disclaimer</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                The materials on Instagram Bio Generator's website are provided on an 'as is' basis. 
                Instagram Bio Generator makes no warranties, expressed or implied, and hereby disclaims 
                and negates all other warranties including without limitation, implied warranties or 
                conditions of merchantability, fitness for a particular purpose, or non-infringement 
                of intellectual property or other violation of rights.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Limitations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                In no event shall Instagram Bio Generator or its suppliers be liable for any damages 
                (including, without limitation, damages for loss of data or profit, or due to business 
                interruption) arising out of the use or inability to use the materials on Instagram Bio 
                Generator's website, even if Instagram Bio Generator or an authorized representative has 
                been notified orally or in writing of the possibility of such damage.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Modifications</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                Instagram Bio Generator may revise these terms of service for its website at any time 
                without notice. By using this website, you are agreeing to be bound by the then current 
                version of these terms of service.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                If you have any questions about these Terms and Conditions, please contact us at 
                <a href="mailto:legal@biogenerator.com" className="text-indigo-600 hover:underline ml-1">legal@biogenerator.com</a>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsConditions;

