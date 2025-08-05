import { useState, useEffect, useCallback } from 'react';
import { financialDataService, StockData, MarketIndex, NewsItem } from '../services/financialDataService';

interface UseFinancialDataReturn {
  // Stock data
  stockData: StockData[];
  loadingStocks: boolean;
  errorStocks: string | null;
  refreshStocks: () => void;

  // Market indices
  marketIndices: MarketIndex[];
  loadingIndices: boolean;
  errorIndices: string | null;
  refreshIndices: () => void;

  // News
  news: NewsItem[];
  loadingNews: boolean;
  errorNews: string | null;
  refreshNews: () => void;

  // Portfolio metrics
  portfolioMetrics: {
    totalValue: number;
    totalChange: number;
    totalChangePercent: number;
    beta: number;
    volatility: string;
    sharpeRatio: number;
    maxDrawdown: number;
  };
}

export function useFinancialData(userHoldings: string[] = ['AAPL', 'MSFT', 'GOOGL', 'TSLA']): UseFinancialDataReturn {
  // Initialize with mock data to prevent flashing
  const [stockData, setStockData] = useState<StockData[]>([
    {
      symbol: 'AAPL',
      price: 198.75,
      change: 3.25,
      changePercent: 1.66,
      volume: 52000000
    },
    {
      symbol: 'MSFT',
      price: 415.80,
      change: 8.60,
      changePercent: 2.11,
      volume: 32000000
    },
    {
      symbol: 'GOOGL',
      price: 168.45,
      change: 2.15,
      changePercent: 1.29,
      volume: 25000000
    },
    {
      symbol: 'TSLA',
      price: 265.30,
      change: 15.65,
      changePercent: 6.27,
      volume: 45000000
    }
  ]);
  
  const [marketIndices, setMarketIndices] = useState<MarketIndex[]>([
    {
      symbol: '^GSPC',
      name: 'S&P 500',
      price: 4567.25,
      change: 45.30,
      changePercent: 1.0
    },
    {
      symbol: '^IXIC',
      name: 'NASDAQ',
      price: 14250.85,
      change: 185.40,
      changePercent: 1.32
    },
    {
      symbol: '^GSPTSE',
      name: 'TSX',
      price: 21250.75,
      change: 125.50,
      changePercent: 0.59
    }
  ]);
  
  const [news, setNews] = useState<NewsItem[]>([
    {
      title: "Fed Signals Potential Rate Changes",
      summary: "The Federal Reserve hints at upcoming monetary policy adjustments that could impact your tech holdings.",
      time: "2 hours ago",
      impact: "Medium"
    },
    {
      title: "Apple Reports Strong Q4 Earnings",
      summary: "Apple beats expectations with strong iPhone sales and services revenue growth.",
      time: "4 hours ago",
      impact: "High"
    },
    {
      title: "Market Volatility Expected This Week",
      summary: "Economic indicators suggest increased market volatility ahead of earnings season.",
      time: "6 hours ago",
      impact: "Low"
    }
  ]);
  
  const [loadingStocks, setLoadingStocks] = useState(false);
  const [loadingIndices, setLoadingIndices] = useState(false);
  const [loadingNews, setLoadingNews] = useState(false);
  
  const [errorStocks, setErrorStocks] = useState<string | null>(null);
  const [errorIndices, setErrorIndices] = useState<string | null>(null);
  const [errorNews, setErrorNews] = useState<string | null>(null);

  // Fetch stock data
  const fetchStockData = useCallback(async () => {
    // Prevent multiple simultaneous calls
    if (loadingStocks) return;
    
    setLoadingStocks(true);
    setErrorStocks(null);
    
    try {
      const data = await financialDataService.getMultipleStockQuotes(userHoldings);
      // Only update if we got valid data
      if (data && data.length > 0) {
        setStockData(data);
      }
    } catch (error) {
      setErrorStocks('Failed to fetch stock data');
      console.error('Error fetching stock data:', error);
    } finally {
      setLoadingStocks(false);
    }
  }, [userHoldings, loadingStocks]);

  // Fetch market indices
  const fetchMarketIndices = useCallback(async () => {
    // Prevent multiple simultaneous calls
    if (loadingIndices) return;
    
    setLoadingIndices(true);
    setErrorIndices(null);
    
    try {
      const data = await financialDataService.getMarketIndices();
      // Only update if we got valid data
      if (data && data.length > 0) {
        setMarketIndices(data);
      }
    } catch (error) {
      setErrorIndices('Failed to fetch market indices');
      console.error('Error fetching market indices:', error);
    } finally {
      setLoadingIndices(false);
    }
  }, [loadingIndices]);

  // Fetch news
  const fetchNews = useCallback(async () => {
    // Prevent multiple simultaneous calls
    if (loadingNews) return;
    
    setLoadingNews(true);
    setErrorNews(null);
    
    try {
      const data = await financialDataService.getNews();
      // Only update if we got valid data
      if (data && data.length > 0) {
        setNews(data);
      }
    } catch (error) {
      setErrorNews('Failed to fetch news');
      console.error('Error fetching news:', error);
    } finally {
      setLoadingNews(false);
    }
  }, [loadingNews]);

  // Calculate portfolio metrics
  const portfolioMetrics = financialDataService.calculatePortfolioMetrics(stockData);

  // Initial data fetch
  useEffect(() => {
    fetchStockData();
    fetchMarketIndices();
    fetchNews();
  }, []); // Empty dependency array to run only once on mount

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      fetchStockData();
      fetchMarketIndices();
      fetchNews();
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, []); // Empty dependency array to prevent re-creation

  return {
    stockData,
    loadingStocks,
    errorStocks,
    refreshStocks: fetchStockData,
    
    marketIndices,
    loadingIndices,
    errorIndices,
    refreshIndices: fetchMarketIndices,
    
    news,
    loadingNews,
    errorNews,
    refreshNews: fetchNews,
    
    portfolioMetrics
  };
} 