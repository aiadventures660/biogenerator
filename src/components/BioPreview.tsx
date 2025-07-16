
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Instagram, Globe, MoreHorizontal, Facebook, Twitter, Linkedin, Music2, UserPlus, Users, Heart, User, Link2, Edit3, PlusCircle, Briefcase, UserCheck } from 'lucide-react';
import { useState } from 'react';
import { Button } from "@/components/ui/button";

interface BioPreviewProps {
  bioText: string;
  selectedFont: string;
  platform?: 'instagram' | 'facebook' | 'twitter' | 'linkedin' | 'tiktok';
  onPlatformChange?: (platform: string) => void;
}

export const BioPreview: React.FC<BioPreviewProps> = ({ bioText, selectedFont, platform: externalPlatform = 'instagram', onPlatformChange }) => {
  // If platform is not controlled, manage it internally
  const [internalPlatform, setInternalPlatform] = useState<'instagram' | 'facebook' | 'twitter' | 'linkedin' | 'tiktok'>(externalPlatform);
  const platform = onPlatformChange ? externalPlatform : internalPlatform;
  const setPlatform = (p: typeof internalPlatform) => {
    if (onPlatformChange) onPlatformChange(p);
    else setInternalPlatform(p);
  };
  const platforms = [
    { key: 'instagram', icon: Instagram },
    { key: 'facebook', icon: Facebook },
    { key: 'twitter', icon: Twitter },
    { key: 'linkedin', icon: Linkedin },
    { key: 'tiktok', icon: Music2 },
  ];
  // Platform-specific settings
  const platformData = {
    instagram: {
      icon: <Instagram className="h-5 w-5 text-white" />, title: 'Instagram Preview', gradient: 'from-pink-500 to-rose-500', name: 'yourusername', label: 'Instagram', color: 'bg-gradient-to-br from-pink-500 to-rose-500', stats: [
        { label: 'Posts', value: '1,234', icon: <Edit3 className="h-4 w-4 text-pink-500" /> },
        { label: 'Followers', value: '5,678', icon: <Users className="h-4 w-4 text-pink-500" /> },
        { label: 'Following', value: '987', icon: <UserPlus className="h-4 w-4 text-pink-500" /> },
      ],
      website: 'yourwebsite.com',
      render: (p: any) => (
        <>
          {/* Profile Header */}
          <div className="flex items-start gap-2 lg:gap-4 mb-4 lg:mb-6">
            <Avatar className="h-14 w-14 lg:h-20 lg:w-20 ring-2 ring-gradient-to-br from-purple-400 to-pink-400 flex-shrink-0">
              <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-white text-sm lg:text-lg font-bold">YOU</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 lg:gap-4 mb-3 lg:mb-4">
                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 truncate">{p.name}</h2>
                <Button size="sm" variant="outline" className="text-xs border-gray-300 dark:border-gray-600 hidden sm:inline-flex"><Edit3 className="h-4 w-4 mr-1" />Edit profile</Button>
                <Button size="sm" variant="outline" className="p-1.5 lg:p-2 border-gray-300 dark:border-gray-600 flex-shrink-0"><MoreHorizontal className="h-3 w-3" /></Button>
              </div>
              <div className="flex gap-3 lg:gap-6 text-xs lg:text-sm text-gray-700 dark:text-gray-300 font-mono">
                {p.stats.map((stat: any, idx: number) => (
                  <span key={idx} className="flex items-center gap-1 whitespace-nowrap"><span>{stat.icon}</span><strong className="text-gray-900 dark:text-gray-100">{stat.value}</strong> {stat.label}</span>
                ))}
              </div>
            </div>
          </div>
          {/* Bio Section */}
          <div className="space-y-2 lg:space-y-3">
            <h3 className="font-semibold text-sm lg:text-base text-gray-900 dark:text-gray-100">Your Display Name</h3>
            <div className="text-xs lg:text-sm whitespace-pre-line text-gray-800 dark:text-gray-200 leading-relaxed break-words overflow-wrap-anywhere">
              {bioText || `Your bio will appear here... ✨\nStart typing to see the preview!`}
            </div>
            <span className="flex items-center gap-2 text-blue-600 text-xs lg:text-sm">
              <Link2 className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">{p.website}</span>
            </span>
          </div>
          {/* Highlight Stories (Instagram only) */}
          <div className="flex gap-2 lg:gap-4 mt-4 lg:mt-6 pt-4 lg:pt-6 border-t border-gray-200 dark:border-gray-700 overflow-x-auto">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col items-center gap-1 lg:gap-2 flex-shrink-0">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-pink-400 to-yellow-400 dark:from-pink-600 dark:to-yellow-600 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white">✨</span>
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-400">Story {i}</span>
              </div>
            ))}
            <div className="flex flex-col items-center gap-1 lg:gap-2 flex-shrink-0">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-gray-200 to-gray-400 dark:from-gray-700 dark:to-gray-500 rounded-full flex items-center justify-center">
                <PlusCircle className="h-5 w-5 text-gray-500 dark:text-gray-300" />
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400">New</span>
            </div>
          </div>
        </>
      ),
    },
    facebook: {
      icon: <Facebook className="h-5 w-5 text-white" />, title: 'Facebook Preview', gradient: 'from-blue-600 to-blue-400', name: 'Your Name', label: 'Facebook', color: 'bg-gradient-to-br from-blue-600 to-blue-400', stats: [
        { label: 'Friends', value: '2,345', icon: <Users className="h-4 w-4 text-blue-600" /> },
        { label: 'Followers', value: '1,234', icon: <UserCheck className="h-4 w-4 text-blue-600" /> },
      ],
      website: 'facebook.com/yourprofile',
      render: (p: any) => (
        <>
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-16 w-16 ring-2 ring-blue-500 flex-shrink-0">
              <AvatarFallback className="bg-blue-500 text-white text-lg font-bold">FB</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 truncate">{p.name}</h2>
              <div className="flex gap-4 text-xs text-gray-700 dark:text-gray-300 mt-1">
                {p.stats.map((stat: any, idx: number) => (
                  <span key={idx} className="flex items-center gap-1"><span>{stat.icon}</span><strong>{stat.value}</strong> {stat.label}</span>
                ))}
              </div>
              <span className="text-xs text-blue-700 dark:text-blue-300 mt-1 flex items-center gap-1"><Link2 className="h-3 w-3" />{p.website}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="font-semibold text-gray-900 dark:text-gray-100">Bio</div>
            <div className="text-xs whitespace-pre-line text-gray-800 dark:text-gray-200 leading-relaxed break-words overflow-wrap-anywhere">
              {bioText || 'Add a short bio about yourself!'}
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700"><PlusCircle className="h-4 w-4 mr-1" />Add to Story</Button>
            <Button size="sm" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50"><Edit3 className="h-4 w-4 mr-1" />Edit Profile</Button>
          </div>
        </>
      ),
    },
    twitter: {
      icon: <Twitter className="h-5 w-5 text-white" />, title: 'Twitter Preview', gradient: 'from-sky-400 to-blue-500', name: '@yourhandle', label: 'Twitter', color: 'bg-gradient-to-br from-sky-400 to-blue-500', stats: [
        { label: 'Tweets', value: '8,765', icon: <Edit3 className="h-4 w-4 text-sky-400" /> },
        { label: 'Followers', value: '4,321', icon: <Users className="h-4 w-4 text-sky-400" /> },
        { label: 'Following', value: '1,234', icon: <UserPlus className="h-4 w-4 text-sky-400" /> },
      ],
      website: 'twitter.com/yourhandle',
      render: (p: any) => (
        <>
          <div className="flex items-center gap-4 mb-3">
            <Avatar className="h-14 w-14 ring-2 ring-sky-400 flex-shrink-0">
              <AvatarFallback className="bg-sky-400 text-white text-lg font-bold">TW</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h2 className="text-base font-bold text-gray-900 dark:text-gray-100 truncate">{p.name}</h2>
              <div className="flex gap-4 text-xs text-gray-700 dark:text-gray-300 mt-1 divide-x divide-gray-300 dark:divide-gray-700">
                {p.stats.map((stat: any, idx: number) => (
                  <span key={idx} className="flex items-center gap-1 px-2 first:pl-0 last:pr-0"><span>{stat.icon}</span><strong>{stat.value}</strong> {stat.label}</span>
                ))}
              </div>
              <span className="text-xs text-blue-700 dark:text-blue-300 mt-1 flex items-center gap-1"><Link2 className="h-3 w-3" />{p.website}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="font-semibold text-gray-900 dark:text-gray-100">Bio <span className="text-xs text-gray-400">({bioText.length}/160)</span></div>
            <div className="text-xs whitespace-pre-line text-gray-800 dark:text-gray-200 leading-relaxed break-words overflow-wrap-anywhere">
              {bioText || 'Describe yourself in 160 characters or less!'}
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Button size="sm" variant="outline" className="border-sky-400 text-sky-400 hover:bg-sky-50"><Edit3 className="h-4 w-4 mr-1" />Edit Profile</Button>
          </div>
        </>
      ),
    },
    linkedin: {
      icon: <Linkedin className="h-5 w-5 text-white" />, title: 'LinkedIn Preview', gradient: 'from-blue-800 to-blue-500', name: 'Your Name', label: 'LinkedIn', color: 'bg-gradient-to-br from-blue-800 to-blue-500', stats: [
        { label: 'Connections', value: '500+', icon: <Users className="h-4 w-4 text-blue-800" /> },
        { label: 'Followers', value: '2,000', icon: <UserCheck className="h-4 w-4 text-blue-800" /> },
      ],
      website: 'linkedin.com/in/yourprofile',
      render: (p: any) => (
        <>
          <div className="flex items-center gap-4 mb-3">
            <Avatar className="h-14 w-14 ring-2 ring-blue-800 flex-shrink-0">
              <AvatarFallback className="bg-blue-800 text-white text-lg font-bold">IN</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h2 className="text-base font-bold text-gray-900 dark:text-gray-100 truncate">{p.name}</h2>
              <div className="flex gap-4 text-xs text-gray-700 dark:text-gray-300 mt-1">
                {p.stats.map((stat: any, idx: number) => (
                  <span key={idx} className="flex items-center gap-1"><span>{stat.icon}</span><strong>{stat.value}</strong> {stat.label}</span>
                ))}
              </div>
              <span className="text-xs text-blue-700 dark:text-blue-300 mt-1 flex items-center gap-1"><Link2 className="h-3 w-3" />{p.website}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="font-semibold text-gray-900 dark:text-gray-100">Professional Headline</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Product Manager | SaaS | Growth | Open to Work</div>
            <div className="font-semibold text-gray-900 dark:text-gray-100 mt-2">About</div>
            <div className="text-xs whitespace-pre-line text-gray-800 dark:text-gray-200 leading-relaxed break-words overflow-wrap-anywhere">
              {bioText || 'Add a short summary about your professional background!'}
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Button size="sm" className="bg-green-600 text-white hover:bg-green-700"><Briefcase className="h-4 w-4 mr-1" />Open to Work</Button>
            <Button size="sm" variant="outline" className="border-blue-800 text-blue-800 hover:bg-blue-50"><Edit3 className="h-4 w-4 mr-1" />Edit Profile</Button>
          </div>
        </>
      ),
    },
    tiktok: {
      icon: <Music2 className="h-5 w-5 text-white" />, title: 'TikTok Preview', gradient: 'from-black to-gray-700', name: '@yourtiktok', label: 'TikTok', color: 'bg-gradient-to-br from-black to-gray-700', stats: [
        { label: 'Followers', value: '1.2M', icon: <Users className="h-4 w-4 text-black" /> },
        { label: 'Likes', value: '8.4M', icon: <Heart className="h-4 w-4 text-pink-500" /> },
        { label: 'Following', value: '123', icon: <UserPlus className="h-4 w-4 text-black" /> },
      ],
      website: 'tiktok.com/@yourtiktok',
      render: (p: any) => (
        <>
          <div className="flex items-center gap-4 mb-3">
            <Avatar className="h-14 w-14 ring-2 ring-black flex-shrink-0">
              <AvatarFallback className="bg-black text-white text-lg font-bold">TT</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h2 className="text-base font-bold text-gray-900 dark:text-gray-100 truncate">{p.name}</h2>
              <div className="flex gap-4 text-xs text-gray-700 dark:text-gray-300 mt-1">
                {p.stats.map((stat: any, idx: number) => (
                  <span key={idx} className="flex items-center gap-1"><span>{stat.icon}</span><strong>{stat.value}</strong> {stat.label}</span>
                ))}
              </div>
              <span className="text-xs text-blue-700 dark:text-blue-300 mt-1 flex items-center gap-1"><Link2 className="h-3 w-3" />{p.website}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="font-semibold text-gray-900 dark:text-gray-100">Bio</div>
            <div className="text-xs whitespace-pre-line text-gray-800 dark:text-gray-200 leading-relaxed break-words overflow-wrap-anywhere">
              {bioText || 'Add a catchy TikTok bio!'}
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Button size="sm" variant="outline" className="border-black text-black hover:bg-gray-100"><Edit3 className="h-4 w-4 mr-1" />Edit Profile</Button>
          </div>
        </>
      ),
    },
  };
  const p = platformData[platform];

  return (
    <Card className={`shadow-lg border-0 bg-gradient-to-br from-white via-rose-50/20 to-pink-50/20 dark:from-gray-800 dark:via-gray-800/50 dark:to-gray-700/50 backdrop-blur-sm`}>
      <CardHeader className="pb-4 border-b border-gray-100 dark:border-gray-700">
        {/* Platform Switcher inside card */}
        <div className="flex justify-center gap-2 mb-4">
          {platforms.map(({ key, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setPlatform(key as any)}
              className={`p-2 rounded-lg border transition-all duration-200 flex items-center justify-center text-base lg:text-lg
                ${platform === key ? 'bg-gradient-to-br from-pink-500 to-blue-500 text-white shadow-lg border-transparent scale-110' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              aria-label={`Show ${key} preview`}
              type="button"
            >
              <Icon className="h-5 w-5" />
            </button>
          ))}
        </div>
        <CardTitle className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${p.gradient}`}>
            {p.icon}
          </div>
          <div className="min-w-0">
            <h3 className="text-lg lg:text-xl font-semibold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
              {p.title}
            </h3>
            <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 font-normal">
              See how your bio will look
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 lg:pt-6">
        <div className="bg-white dark:bg-gray-900 rounded-xl p-3 lg:p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
          {p.render(p)}
        </div>
        <div className="mt-3 lg:mt-4 text-center">
          <span className="text-xs lg:text-sm text-gray-500 dark:text-gray-400">
            This is how your bio will look on {p.label}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
