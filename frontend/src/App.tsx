import React, { useState } from 'react';
import { 
  TrendingUp, 
  Shield, 
  BookOpen, 
  Bell, 
  BarChart3, 
  PieChart, 
  DollarSign,
  Target,
  Clock,
  AlertTriangle,
  ChevronRight,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  Eye,
  EyeOff
} from 'lucide-react';
import { OnboardingFlow } from './components/OnboardingFlow';
import { Dashboard } from './components/Dashboard';

type Page = 'landing' | 'onboarding' | 'dashboard';
type OnboardingStep = 'welcome' | 'goals' | 'risk' | 'time' | 'budget' | 'complete';

interface UserProfile {
  name: string;
  goals: string[];
  riskTolerance: string;
  timeCommitment: string;
  budget: number;
  recurringInvestment: number;
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [onboardingStep, setOnboardingStep] = useState<OnboardingStep>('welcome');
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: '',
    goals: [],
    riskTolerance: '',
    timeCommitment: '',
    budget: 0,
    recurringInvestment: 0
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showBalance, setShowBalance] = useState(true);

  const handleStartInvesting = () => {
    setCurrentPage('onboarding');
    setOnboardingStep('welcome');
  };

  const handleOnboardingComplete = () => {
    setCurrentPage('dashboard');
  };

  if (currentPage === 'landing') {
    return <LandingPage onStartInvesting={handleStartInvesting} />;
  }

  if (currentPage === 'onboarding') {
    return (
      <OnboardingFlow 
        step={onboardingStep}
        setStep={setOnboardingStep}
        userProfile={userProfile}
        setUserProfile={setUserProfile}
        onComplete={handleOnboardingComplete}
      />
    );
  }

  return (
    <Dashboard 
      userProfile={userProfile}
      showBalance={showBalance}
      setShowBalance={setShowBalance}
      isMobileMenuOpen={isMobileMenuOpen}
      setIsMobileMenuOpen={setIsMobileMenuOpen}
    />
  );
}

function LandingPage({ onStartInvesting }: { onStartInvesting: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="bg-slate-600 p-2 rounded-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-slate-800">Tredia</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-slate-600 hover:text-slate-800 transition-colors">Features</a>
              <a href="#how-it-works" className="text-slate-600 hover:text-slate-800 transition-colors">How It Works</a>
              <a href="#security" className="text-slate-600 hover:text-slate-800 transition-colors">Security</a>
            </nav>
            <button className="bg-slate-600 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors">
              Sign In
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-slate-800 mb-6 leading-tight">
            Invest smarter,<br />
            <span className="text-teal-600">start smaller.</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Your personal investment coach for beginners. Get personalized strategies, 
            real-time insights, and educational guidance - all in simple, understandable language.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={onStartInvesting}
              className="bg-teal-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-teal-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Start Investing Today
            </button>
            <button className="border-2 border-slate-300 text-slate-700 px-8 py-4 rounded-lg text-lg font-semibold hover:border-slate-400 hover:bg-slate-50 transition-colors">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Everything you need to invest confidently
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Tredia combines powerful investment tools with educational guidance to help you build wealth at your own pace.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Target className="h-8 w-8 text-teal-600" />}
              title="Personalized Strategies"
              description="Get custom investment recommendations based on your goals, risk tolerance, and time commitment."
            />
            <FeatureCard 
              icon={<BarChart3 className="h-8 w-8 text-green-600" />}
              title="Real Brokerage Sync"
              description="Connect your Wealthsimple account securely to track your real portfolio and transactions."
            />
            <FeatureCard 
              icon={<PieChart className="h-8 w-8 text-blue-600" />}
              title="Portfolio Health"
              description="Visual dashboards showing your net worth, risk exposure, and sector allocation."
            />
            <FeatureCard 
              icon={<Bell className="h-8 w-8 text-orange-600" />}
              title="Smart Alerts"
              description="Get notified about earnings calls, risk changes, and portfolio drift warnings."
            />
            <FeatureCard 
              icon={<BookOpen className="h-8 w-8 text-purple-600" />}
              title="Learn As You Go"
              description="Embedded education with tooltips, explanations, and 'why this stock?' guidance."
            />
            <FeatureCard 
              icon={<Shield className="h-8 w-8 text-red-600" />}
              title="Bank-Level Security"
              description="Your data is protected with SOC 2 Type II compliance and encrypted connections."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to start your investment journey?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Join thousands of beginners who are building wealth with Tredia's guidance.
          </p>
          <button 
            onClick={onStartInvesting}
            className="bg-teal-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-teal-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Get Started - It's Free
          </button>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-slate-50 p-6 rounded-xl hover:shadow-lg transition-all duration-200 hover:bg-white border border-slate-200">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
}

export default App; 