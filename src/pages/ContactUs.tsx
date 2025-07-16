
import React from 'react';
import { Mail, Phone, MapPin, Clock, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Header } from "@/components/Header";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions about our Instagram Bio Generator? We're here to help! 
            Get in touch with our team for support, feedback, or business inquiries.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Mail className="h-6 w-6 text-purple-600" />
                Get in Touch
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-gray-400 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-800">Email Support</h4>
                  <p className="text-gray-600">support@biogenerator.com</p>
                  <p className="text-sm text-gray-500">We respond within 24 hours</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-gray-400 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-800">24/7 Support</h4>
                  <p className="text-gray-600">Available through our chat system</p>
                  <p className="text-sm text-gray-500">Instant help when you need it</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-800">Global Access</h4>
                  <p className="text-gray-600">Available worldwide</p>
                  <p className="text-sm text-gray-500">Serving users globally</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-gray-400 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-800">Response Time</h4>
                  <p className="text-gray-600">Within 24 hours</p>
                  <p className="text-sm text-gray-500">Usually much faster!</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">How does the AI bio generator work?</h4>
                <p className="text-sm text-gray-600">Our AI analyzes your input and generates personalized Instagram bios based on your style preferences and interests.</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Is the service free to use?</h4>
                <p className="text-sm text-gray-600">Yes! Our basic bio generation features are completely free to use with no account required.</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Can I customize the generated bios?</h4>
                <p className="text-sm text-gray-600">Absolutely! You can edit, modify, and personalize any generated bio to match your unique style.</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Do you store my information?</h4>
                <p className="text-sm text-gray-600">We respect your privacy. Check our Privacy Policy for detailed information about data handling.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
