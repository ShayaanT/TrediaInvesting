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
  EyeOff,
  RefreshCw
} from 'lucide-react';
import { useFinancialData } from '../hooks/useFinancialData';

interface UserProfile {
  name: string;
  goals: string[];
  riskTolerance: string;
  timeCommitment: string;
  budget: number;
  recurringInvestment: number;
}

interface DashboardProps {
  userProfile: UserProfile;
  showBalance: boolean;
  setShowBalance: (show: boolean) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export function Dashboard({ 
  userProfile, 
  showBalance, 
  setShowBalance,
  isMobileMenuOpen,
  setIsMobileMenuOpen 
}: DashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'portfolio' | 'market' | 'education'>('overview');

  // Use real-time financial data
  const {
    stockData,
    loadingStocks,
    errorStocks,
    refreshStocks,
    marketIndices,
    loadingIndices,
    errorIndices,
    refreshIndices,
    news,
    loadingNews,
    errorNews,
    refreshNews,
    portfolioMetrics
  } = useFinancialData(['AAPL', 'MSFT', 'GOOGL', 'TSLA']);

  // Mock holdings data (in a real app, this would come from user's portfolio)
  const holdings = [
    { symbol: 'AAPL', name: 'Apple Inc.', shares: 15, value: 2850.45 },
    { symbol: 'MSFT', name: 'Microsoft Corp.', shares: 8, value: 2456.80 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', shares: 12, value: 1834.20 },
    { symbol: 'TSLA', name: 'Tesla Inc.', shares: 5, value: 1245.65 },
  ];

  // Combine holdings with real-time stock data
  const holdingsWithRealTimeData = holdings.map(holding => {
    const realTimeStock = stockData.find(stock => stock.symbol === holding.symbol);
    return {
      ...holding,
      price: realTimeStock?.price || 0,
      change: realTimeStock?.change || 0,
      changePercent: realTimeStock?.changePercent || 0
    };
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-slate-600 hover:text-slate-800"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
              <div className="flex items-center space-x-2">
                <div className="bg-slate-600 p-2 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-slate-800">Tredia</span>
              </div>
            </div>
            
            <nav className="hidden lg:flex space-x-8">
              <button 
                onClick={() => setActiveTab('overview')}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  activeTab === 'overview' ? 'bg-teal-100 text-teal-700' : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                Overview
              </button>
              <button 
                onClick={() => setActiveTab('portfolio')}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  activeTab === 'portfolio' ? 'bg-teal-100 text-teal-700' : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                Portfolio
              </button>
              <button 
                onClick={() => setActiveTab('market')}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  activeTab === 'market' ? 'bg-teal-100 text-teal-700' : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                Market
              </button>
              <button 
                onClick={() => setActiveTab('education')}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  activeTab === 'education' ? 'bg-teal-100 text-teal-700' : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                Learn
              </button>
            </nav>

            <div className="flex items-center space-x-4">
              <Bell className="h-6 w-6 text-slate-600 hover:text-slate-800 cursor-pointer" />
              <div className="flex items-center space-x-2">
                <User className="h-8 w-8 text-slate-600" />
                <span className="hidden sm:block text-slate-700 font-medium">{userProfile.name}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 shadow-sm">
          <div className="px-4 py-2 space-y-1">
            <button 
              onClick={() => { setActiveTab('overview'); setIsMobileMenuOpen(false); }}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                activeTab === 'overview' ? 'bg-teal-100 text-teal-700' : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              Overview
            </button>
            <button 
              onClick={() => { setActiveTab('portfolio'); setIsMobileMenuOpen(false); }}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                activeTab === 'portfolio' ? 'bg-teal-100 text-teal-700' : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              Portfolio
            </button>
            <button 
              onClick={() => { setActiveTab('market'); setIsMobileMenuOpen(false); }}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                activeTab === 'market' ? 'bg-teal-100 text-teal-700' : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              Market
            </button>
            <button 
              onClick={() => { setActiveTab('education'); setIsMobileMenuOpen(false); }}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                activeTab === 'education' ? 'bg-teal-100 text-teal-700' : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              Learn
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-2xl p-8 text-white">
              <h1 className="text-3xl font-bold mb-2">Welcome back, {userProfile.name}!</h1>
              <p className="text-teal-100 text-lg">Here's how your investments are performing today.</p>
            </div>

            {/* Portfolio Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-slate-600">Total Portfolio Value</h3>
                  <button onClick={() => setShowBalance(!showBalance)} className="text-slate-400 hover:text-slate-600">
                    {showBalance ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </button>
                </div>
                <div className="text-3xl font-bold text-slate-800">
                  {showBalance ? `$${portfolioMetrics.totalValue.toLocaleString()}` : '••••••'}
                </div>
                <div className={`flex items-center mt-2 ${portfolioMetrics.totalChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  <TrendingUp className={`h-4 w-4 mr-1 ${portfolioMetrics.totalChange < 0 ? 'rotate-180' : ''}`} />
                  <span className="text-sm font-medium">
                    {showBalance ? `${portfolioMetrics.totalChange >= 0 ? '+' : ''}$${portfolioMetrics.totalChange.toFixed(2)} (${portfolioMetrics.totalChangePercent.toFixed(2)}%)` : '•••••'}
                  </span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-sm font-medium text-slate-600 mb-4">Portfolio Health</h3>
                <div className="text-3xl font-bold text-green-600 mb-2">85/100</div>
                <div className="text-sm text-slate-600">Well diversified with moderate risk</div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-sm font-medium text-slate-600 mb-4">Next Action</h3>
                <div className="text-sm text-slate-800 font-medium mb-2">Consider rebalancing</div>
                <div className="text-xs text-slate-600">Your tech allocation is 5% above target</div>
                <button className="mt-3 text-teal-600 text-sm font-medium hover:text-teal-700">
                  View Recommendations
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                <div className="text-2xl font-bold text-slate-800">{holdings.length}</div>
                <div className="text-sm text-slate-600">Holdings</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                <div className="text-2xl font-bold text-slate-800">4</div>
                <div className="text-sm text-slate-600">Sectors</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                <div className="text-2xl font-bold text-slate-800">12%</div>
                <div className="text-sm text-slate-600">YTD Return</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                <div className="text-2xl font-bold text-slate-800">$250</div>
                <div className="text-sm text-slate-600">Monthly Goal</div>
              </div>
            </div>

            {/* Recent Activity & News */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Market News</h3>
                <div className="space-y-4">
                  {loadingNews ? (
                    <div className="flex items-center justify-center py-4">
                      <RefreshCw className="h-5 w-5 animate-spin text-slate-400" />
                      <span className="ml-2 text-slate-600">Loading news...</span>
                    </div>
                  ) : errorNews ? (
                    <div className="text-red-600 text-sm">Failed to load news</div>
                  ) : (
                    news.map((newsItem, index) => (
                      <div key={index} className="border-l-4 border-teal-200 pl-4">
                        <h4 className="font-medium text-slate-800 mb-1">{newsItem.title}</h4>
                        <p className="text-sm text-slate-600 mb-2">{newsItem.summary}</p>
                        <div className="flex justify-between items-center text-xs text-slate-500">
                          <span>{newsItem.time}</span>
                          <span className={`px-2 py-1 rounded ${
                            newsItem.impact === 'High' ? 'bg-red-100 text-red-700' :
                            newsItem.impact === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {newsItem.impact} Impact
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-slate-800">Dividend received</div>
                      <div className="text-xs text-slate-600">AAPL - $8.50</div>
                    </div>
                    <div className="text-sm text-slate-600">2 days ago</div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <DollarSign className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-slate-800">Monthly investment</div>
                      <div className="text-xs text-slate-600">Auto-invested $250</div>
                    </div>
                    <div className="text-sm text-slate-600">1 week ago</div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-purple-100 p-2 rounded-full">
                      <AlertTriangle className="h-4 w-4 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-slate-800">Rebalancing suggestion</div>
                      <div className="text-xs text-slate-600">Tech allocation above target</div>
                    </div>
                    <div className="text-sm text-slate-600">1 week ago</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-slate-800">Your Portfolio</h1>
              <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors">
                Add Investment
              </button>
            </div>

            {/* Holdings Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Holdings</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-3 text-sm font-medium text-slate-600">Stock</th>
                        <th className="text-right py-3 text-sm font-medium text-slate-600">Shares</th>
                        <th className="text-right py-3 text-sm font-medium text-slate-600">Value</th>
                        <th className="text-right py-3 text-sm font-medium text-slate-600">Change</th>
                      </tr>
                    </thead>
                    <tbody>
                      {holdingsWithRealTimeData.map((holding, index) => (
                        <tr key={index} className="border-b border-slate-100 last:border-0">
                          <td className="py-4">
                            <div>
                              <div className="font-medium text-slate-800">{holding.symbol}</div>
                              <div className="text-sm text-slate-600">{holding.name}</div>
                            </div>
                          </td>
                          <td className="text-right py-4 text-slate-800">{holding.shares}</td>
                          <td className="text-right py-4 text-slate-800">
                            {showBalance ? `$${holding.value.toLocaleString()}` : '••••••'}
                          </td>
                          <td className={`text-right py-4 ${holding.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {holding.changePercent >= 0 ? '+' : ''}{holding.changePercent.toFixed(2)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Allocation Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Sector Allocation</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Technology</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-slate-200 rounded-full h-2">
                        <div className="bg-teal-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                      <span className="text-sm text-slate-800 w-8">65%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Consumer</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-slate-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '20%' }}></div>
                      </div>
                      <span className="text-sm text-slate-800 w-8">20%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Healthcare</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-slate-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '10%' }}></div>
                      </div>
                      <span className="text-sm text-slate-800 w-8">10%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Finance</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-slate-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: '5%' }}></div>
                      </div>
                      <span className="text-sm text-slate-800 w-8">5%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Risk Analysis</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Portfolio Beta</span>
                    <span className="text-sm font-medium text-slate-800">{portfolioMetrics.beta.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Volatility</span>
                    <span className="text-sm font-medium text-slate-800">{portfolioMetrics.volatility}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Sharpe Ratio</span>
                    <span className="text-sm font-medium text-slate-800">{portfolioMetrics.sharpeRatio.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Max Drawdown</span>
                    <span className="text-sm font-medium text-red-600">{portfolioMetrics.maxDrawdown.toFixed(1)}%</span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-yellow-800">Rebalancing Suggested</div>
                      <div className="text-xs text-yellow-700 mt-1">
                        Your tech allocation is 5% above your target. Consider diversifying.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'market' && (
          <div className="space-y-8">
            <h1 className="text-3xl font-bold text-slate-800">Market Intelligence</h1>

            {/* Market Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {loadingIndices ? (
                <div className="col-span-full flex items-center justify-center py-8">
                  <RefreshCw className="h-5 w-5 animate-spin text-slate-400" />
                  <span className="ml-2 text-slate-600">Loading market data...</span>
                </div>
              ) : errorIndices ? (
                <div className="col-span-full text-red-600 text-sm text-center py-8">Failed to load market data</div>
              ) : (
                marketIndices.map((index, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-sm font-medium text-slate-600 mb-2">{index.name}</h3>
                    <div className="text-2xl font-bold text-slate-800">{index.price.toLocaleString()}</div>
                    <div className={`flex items-center mt-1 ${index.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      <TrendingUp className={`h-4 w-4 mr-1 ${index.changePercent < 0 ? 'rotate-180' : ''}`} />
                      <span className="text-sm font-medium">
                        {index.changePercent >= 0 ? '+' : ''}{index.changePercent.toFixed(1)}% ({index.change >= 0 ? '+' : ''}{index.change.toFixed(2)})
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Your Stocks Performance */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Your Stocks Today</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {loadingStocks ? (
                  <div className="col-span-full flex items-center justify-center py-8">
                    <RefreshCw className="h-5 w-5 animate-spin text-slate-400" />
                    <span className="ml-2 text-slate-600">Loading stock data...</span>
                  </div>
                ) : errorStocks ? (
                  <div className="col-span-full text-red-600 text-sm text-center py-8">Failed to load stock data</div>
                ) : (
                  holdingsWithRealTimeData.map((stock, index) => (
                    <div key={index} className="p-4 border border-slate-200 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium text-slate-800">{stock.symbol}</span>
                        <span className={`text-sm ${stock.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                        </span>
                      </div>
                      <div className="text-sm text-slate-600">{stock.name}</div>
                      <div className="text-lg font-semibold text-slate-800 mt-2">
                        ${stock.price.toFixed(2)}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Market News */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Market News & Analysis</h3>
              <div className="space-y-6">
                {loadingNews ? (
                  <div className="flex items-center justify-center py-8">
                    <RefreshCw className="h-5 w-5 animate-spin text-slate-400" />
                    <span className="ml-2 text-slate-600">Loading news...</span>
                  </div>
                ) : errorNews ? (
                  <div className="text-red-600 text-sm text-center py-8">Failed to load news</div>
                ) : (
                  news.map((newsItem, index) => (
                    <div key={index} className="border-l-4 border-teal-200 pl-6">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-slate-800">{newsItem.title}</h4>
                        <span className={`px-2 py-1 rounded text-xs ${
                          newsItem.impact === 'High' ? 'bg-red-100 text-red-700' :
                          newsItem.impact === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {newsItem.impact} Impact
                        </span>
                      </div>
                      <p className="text-slate-600 mb-3">{newsItem.summary}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-500">{newsItem.time}</span>
                        <button className="text-teal-600 text-sm hover:text-teal-700">
                          Read Full Article
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'education' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-slate-800">Learn & Grow</h1>
              <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium">
                Beginner Level
              </span>
            </div>

            {/* Learning Path */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Your Learning Path</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="bg-green-500 rounded-full p-2">
                    <BookOpen className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-slate-800">Investment Basics</h4>
                    <p className="text-sm text-slate-600">Understanding stocks, bonds, and diversification</p>
                  </div>
                  <span className="text-sm text-green-600 font-medium">Completed</span>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="bg-blue-500 rounded-full p-2">
                    <Target className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-slate-800">Risk Management</h4>
                    <p className="text-sm text-slate-600">How to balance risk and reward in your portfolio</p>
                  </div>
                  <span className="text-sm text-blue-600 font-medium">In Progress</span>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="bg-slate-400 rounded-full p-2">
                    <BarChart3 className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-slate-800">Technical Analysis</h4>
                    <p className="text-sm text-slate-600">Reading charts and identifying trends</p>
                  </div>
                  <span className="text-sm text-slate-600 font-medium">Next</span>
                </div>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Today's Investment Tip</h3>
                <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
                  <h4 className="font-medium text-teal-800 mb-2">Dollar-Cost Averaging</h4>
                  <p className="text-sm text-teal-700 mb-3">
                    Investing a fixed amount regularly, regardless of market conditions, can help reduce the impact of volatility on your portfolio.
                  </p>
                  <button className="text-teal-600 text-sm font-medium hover:text-teal-700">
                    Learn More <ChevronRight className="h-4 w-4 inline ml-1" />
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Glossary</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <h4 className="font-medium text-slate-800 text-sm">P/E Ratio</h4>
                    <p className="text-xs text-slate-600 mt-1">
                      Price-to-earnings ratio. Measures how much investors are willing to pay per dollar of earnings.
                    </p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <h4 className="font-medium text-slate-800 text-sm">Market Cap</h4>
                    <p className="text-xs text-slate-600 mt-1">
                      Total value of a company's shares. Calculated by multiplying share price by number of shares.
                    </p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <h4 className="font-medium text-slate-800 text-sm">Dividend Yield</h4>
                    <p className="text-xs text-slate-600 mt-1">
                      Annual dividend payments as a percentage of the stock price.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommended Reading */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Recommended Reading</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-4 border border-slate-200 rounded-lg">
                  <h4 className="font-medium text-slate-800 mb-2">Understanding Your Portfolio's Beta</h4>
                  <p className="text-sm text-slate-600 mb-3">
                    Learn how beta measures your portfolio's volatility compared to the market.
                  </p>
                  <span className="text-xs text-slate-500">5 min read</span>
                </div>
                <div className="p-4 border border-slate-200 rounded-lg">
                  <h4 className="font-medium text-slate-800 mb-2">When to Rebalance Your Portfolio</h4>
                  <p className="text-sm text-slate-600 mb-3">
                    Discover the right time and methods for keeping your portfolio aligned with your goals.
                  </p>
                  <span className="text-xs text-slate-500">7 min read</span>
                </div>
                <div className="p-4 border border-slate-200 rounded-lg">
                  <h4 className="font-medium text-slate-800 mb-2">Tax-Efficient Investing Strategies</h4>
                  <p className="text-sm text-slate-600 mb-3">
                    Maximize your returns by understanding the tax implications of your investments.
                  </p>
                  <span className="text-xs text-slate-500">10 min read</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
} 