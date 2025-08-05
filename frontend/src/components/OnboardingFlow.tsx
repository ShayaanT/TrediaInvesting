import React from 'react';
import { 
  TrendingUp, 
  Target,
  Clock,
  DollarSign,
  BarChart3,
  BookOpen
} from 'lucide-react';

type OnboardingStep = 'welcome' | 'goals' | 'risk' | 'time' | 'budget' | 'complete';

interface UserProfile {
  name: string;
  goals: string[];
  riskTolerance: string;
  timeCommitment: string;
  budget: number;
  recurringInvestment: number;
}

interface OnboardingFlowProps {
  step: OnboardingStep;
  setStep: (step: OnboardingStep) => void;
  userProfile: UserProfile;
  setUserProfile: (profile: UserProfile) => void;
  onComplete: () => void;
}

export function OnboardingFlow({ 
  step, 
  setStep, 
  userProfile, 
  setUserProfile, 
  onComplete 
}: OnboardingFlowProps) {
  const handleNext = () => {
    const steps: OnboardingStep[] = ['welcome', 'goals', 'risk', 'time', 'budget', 'complete'];
    const currentIndex = steps.indexOf(step);
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1]);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    const steps: OnboardingStep[] = ['welcome', 'goals', 'risk', 'time', 'budget', 'complete'];
    const currentIndex = steps.indexOf(step);
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1]);
    }
  };

  const handleGoalToggle = (goal: string) => {
    const goals = userProfile.goals.includes(goal)
      ? userProfile.goals.filter(g => g !== goal)
      : [...userProfile.goals, goal];
    setUserProfile({ ...userProfile, goals });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="bg-white rounded-full h-2 shadow-inner">
            <div 
              className="bg-teal-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(['welcome', 'goals', 'risk', 'time', 'budget', 'complete'].indexOf(step) + 1) / 6 * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {step === 'welcome' && (
            <div className="text-center">
              <div className="bg-teal-100 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <TrendingUp className="h-10 w-10 text-teal-600" />
              </div>
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Welcome to Tredia!</h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Let's get to know you better so we can create a personalized investment strategy 
                that matches your goals and comfort level.
              </p>
              <input 
                type="text"
                placeholder="What's your name?"
                className="w-full p-4 border border-slate-300 rounded-lg text-lg mb-6 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                value={userProfile.name}
                onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
              />
              <button 
                onClick={handleNext}
                disabled={!userProfile.name}
                className="w-full bg-teal-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Let's Get Started
              </button>
            </div>
          )}

          {step === 'goals' && (
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-4">What are your investment goals?</h2>
              <p className="text-slate-600 mb-8">Select all that apply:</p>
              
              <div className="space-y-4 mb-8">
                {[
                  { id: 'long-term-wealth', label: 'Build long-term wealth', icon: <TrendingUp className="h-5 w-5" /> },
                  { id: 'retirement', label: 'Save for retirement', icon: <Clock className="h-5 w-5" /> },
                  { id: 'passive-income', label: 'Generate passive income', icon: <DollarSign className="h-5 w-5" /> },
                  { id: 'short-term-growth', label: 'Short-term capital growth', icon: <BarChart3 className="h-5 w-5" /> },
                  { id: 'learn-trading', label: 'Learn to trade safely', icon: <BookOpen className="h-5 w-5" /> }
                ].map((goal) => (
                  <button
                    key={goal.id}
                    onClick={() => handleGoalToggle(goal.id)}
                    className={`w-full p-4 rounded-lg border-2 text-left flex items-center space-x-3 transition-all ${
                      userProfile.goals.includes(goal.id)
                        ? 'border-teal-500 bg-teal-50 text-teal-700'
                        : 'border-slate-300 hover:border-slate-400 text-slate-700'
                    }`}
                  >
                    {goal.icon}
                    <span className="font-medium">{goal.label}</span>
                  </button>
                ))}
              </div>
              
              <div className="flex gap-4">
                <button 
                  onClick={handleBack}
                  className="flex-1 bg-slate-200 text-slate-700 py-4 rounded-lg text-lg font-semibold hover:bg-slate-300 transition-colors"
                >
                  Back
                </button>
                <button 
                  onClick={handleNext}
                  disabled={userProfile.goals.length === 0}
                  className="flex-1 bg-teal-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === 'risk' && (
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-4">How comfortable are you with risk?</h2>
              <p className="text-slate-600 mb-8">This helps us recommend appropriate investments for you.</p>
              
              <div className="space-y-4 mb-8">
                {[
                  { id: 'conservative', label: 'Conservative', desc: 'I prefer steady, predictable returns and minimal risk' },
                  { id: 'moderate', label: 'Moderate', desc: 'I can handle some ups and downs for potentially better returns' },
                  { id: 'aggressive', label: 'Aggressive', desc: 'I\'m comfortable with higher risk for higher potential returns' }
                ].map((risk) => (
                  <button
                    key={risk.id}
                    onClick={() => setUserProfile({ ...userProfile, riskTolerance: risk.id })}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      userProfile.riskTolerance === risk.id
                        ? 'border-teal-500 bg-teal-50 text-teal-700'
                        : 'border-slate-300 hover:border-slate-400 text-slate-700'
                    }`}
                  >
                    <div className="font-medium mb-1">{risk.label}</div>
                    <div className="text-sm opacity-75">{risk.desc}</div>
                  </button>
                ))}
              </div>
              
              <div className="flex gap-4">
                <button 
                  onClick={handleBack}
                  className="flex-1 bg-slate-200 text-slate-700 py-4 rounded-lg text-lg font-semibold hover:bg-slate-300 transition-colors"
                >
                  Back
                </button>
                <button 
                  onClick={handleNext}
                  disabled={!userProfile.riskTolerance}
                  className="flex-1 bg-teal-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === 'time' && (
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-4">How much time can you dedicate?</h2>
              <p className="text-slate-600 mb-8">We'll tailor our recommendations to your schedule.</p>
              
              <div className="space-y-4 mb-8">
                {[
                  { id: 'minimal', label: 'Minimal (Set it and forget it)', desc: 'Check in monthly, focus on long-term investing' },
                  { id: 'weekly', label: 'Weekly Reviews', desc: 'Monitor weekly, make occasional adjustments' },
                  { id: 'daily', label: 'Daily Monitoring', desc: 'Active involvement, daily market tracking' }
                ].map((time) => (
                  <button
                    key={time.id}
                    onClick={() => setUserProfile({ ...userProfile, timeCommitment: time.id })}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      userProfile.timeCommitment === time.id
                        ? 'border-teal-500 bg-teal-50 text-teal-700'
                        : 'border-slate-300 hover:border-slate-400 text-slate-700'
                    }`}
                  >
                    <div className="font-medium mb-1">{time.label}</div>
                    <div className="text-sm opacity-75">{time.desc}</div>
                  </button>
                ))}
              </div>
              
              <div className="flex gap-4">
                <button 
                  onClick={handleBack}
                  className="flex-1 bg-slate-200 text-slate-700 py-4 rounded-lg text-lg font-semibold hover:bg-slate-300 transition-colors"
                >
                  Back
                </button>
                <button 
                  onClick={handleNext}
                  disabled={!userProfile.timeCommitment}
                  className="flex-1 bg-teal-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === 'budget' && (
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-4">What's your investment budget?</h2>
              <p className="text-slate-600 mb-8">Don't worry - you can start small and increase over time.</p>
              
              <div className="space-y-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Initial investment amount
                  </label>
                  <input 
                    type="number"
                    placeholder="1000"
                    className="w-full p-4 border border-slate-300 rounded-lg text-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    value={userProfile.budget || ''}
                    onChange={(e) => setUserProfile({ ...userProfile, budget: Number(e.target.value) })}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Monthly recurring investment (optional)
                  </label>
                  <input 
                    type="number"
                    placeholder="100"
                    className="w-full p-4 border border-slate-300 rounded-lg text-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    value={userProfile.recurringInvestment || ''}
                    onChange={(e) => setUserProfile({ ...userProfile, recurringInvestment: Number(e.target.value) })}
                  />
                </div>
              </div>
              
              <div className="flex gap-4">
                <button 
                  onClick={handleBack}
                  className="flex-1 bg-slate-200 text-slate-700 py-4 rounded-lg text-lg font-semibold hover:bg-slate-300 transition-colors"
                >
                  Back
                </button>
                <button 
                  onClick={handleNext}
                  disabled={!userProfile.budget}
                  className="flex-1 bg-teal-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === 'complete' && (
            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <Target className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-slate-800 mb-4">You're all set, {userProfile.name}!</h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                We've created a personalized investment strategy based on your profile. 
                Let's connect your brokerage account to get started.
              </p>
              <div className="bg-slate-50 p-6 rounded-lg mb-8 text-left">
                <h3 className="font-semibold text-slate-800 mb-4">Your Investment Profile:</h3>
                <div className="space-y-2 text-sm text-slate-600">
                  <div><strong>Goals:</strong> {userProfile.goals.length} selected</div>
                  <div><strong>Risk Tolerance:</strong> {userProfile.riskTolerance}</div>
                  <div><strong>Time Commitment:</strong> {userProfile.timeCommitment}</div>
                  <div><strong>Initial Budget:</strong> ${userProfile.budget.toLocaleString()}</div>
                  {userProfile.recurringInvestment > 0 && (
                    <div><strong>Monthly Investment:</strong> ${userProfile.recurringInvestment.toLocaleString()}</div>
                  )}
                </div>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={handleBack}
                  className="flex-1 bg-slate-200 text-slate-700 py-4 rounded-lg text-lg font-semibold hover:bg-slate-300 transition-colors"
                >
                  Back
                </button>
                <button 
                  onClick={onComplete}
                  className="flex-1 bg-teal-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-teal-700 transition-colors"
                >
                  Go to Dashboard
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 