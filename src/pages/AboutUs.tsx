
import React from 'react';
import { Users, Target, Heart, Zap, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import { Header } from "@/components/Header";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            About Us
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're passionate about helping people express themselves creatively on social media. 
            Our mission is to make Instagram bio creation fun, easy, and inspiring for everyone.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Target className="h-6 w-6 text-blue-600" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                To empower individuals and businesses to create compelling Instagram bios that 
                truly represent their personality, brand, and aspirations. We believe everyone 
                deserves to have a bio that stands out and connects with their audience.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Heart className="h-6 w-6 text-pink-600" />
                Our Values
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                  Creativity and self-expression
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                  User privacy and security
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                  Accessibility for everyone
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                  Continuous innovation
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Zap className="h-6 w-6 text-yellow-600" />
              What Makes Us Different
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">User-Focused</h4>
                <p className="text-sm text-gray-600">Every feature is designed with our users' needs and creativity in mind.</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">AI-Powered</h4>
                <p className="text-sm text-gray-600">Advanced AI technology that understands trends and personal style.</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Community-Driven</h4>
                <p className="text-sm text-gray-600">Built with feedback from our amazing community of users.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Join Our Community</h3>
          <p className="text-gray-600 mb-6">
            Thousands of users trust us daily to create amazing Instagram bios. 
            Be part of our growing community of creative individuals and businesses.
          </p>
          <Link to="/" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors">
            Start Creating Your Bio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
