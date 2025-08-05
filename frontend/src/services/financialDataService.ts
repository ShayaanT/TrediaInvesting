import axios from 'axios';

// Yahoo Finance API with proper CORS proxy
const YAHOO_BASE_URL = 'https://query1.finance.yahoo.com/v8/finance/chart';
const CORS_PROXY = 'https://api.allorigins.win/raw?url=';

export interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap?: number;
}

export interface MarketIndex {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

export interface NewsItem {
  title: string;
  summary: string;
  time: string;
  impact: 'High' | 'Medium' | 'Low';
  url?: string;
}

class FinancialDataService {
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  private isCacheValid(key: string): boolean {
    const cached = this.cache.get(key);
    if (!cached) return false;
    return Date.now() - cached.timestamp < this.CACHE_DURATION;
  }

  private setCache(key: string, data: any): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  async getStockQuote(symbol: string): Promise<StockData | null> {
    const cacheKey = `quote_${symbol}`;
    
    if (this.isCacheValid(cacheKey)) {
      console.log(`Using cached data for ${symbol}`);
      return this.cache.get(cacheKey)!.data;
    }

    console.log(`Fetching real-time data for ${symbol} from Yahoo Finance...`);
    try {
      // Use a reliable CORS proxy to access Yahoo Finance
      const yahooUrl = `${YAHOO_BASE_URL}/${symbol}?interval=1d&range=1d`;
      const proxyUrl = `${CORS_PROXY}${encodeURIComponent(yahooUrl)}`;
      
      const response = await axios.get(proxyUrl, {
        timeout: 15000 // 15 second timeout for proxy
      });

      console.log(`Yahoo Finance Response for ${symbol}:`, response.data);

      const result = response.data.chart.result[0];
      if (!result || !result.meta || !result.indicators.quote[0]) {
        console.log(`No valid data for ${symbol}, using mock data`);
        return this.getMockStockData(symbol);
      }

      const meta = result.meta;
      const quote = result.indicators.quote[0];
      
      // Get current price and previous close
      const currentPrice = meta.regularMarketPrice;
      const previousClose = meta.previousClose;
      const change = currentPrice - previousClose;
      const changePercent = (change / previousClose) * 100;
      const volume = quote.volume[quote.volume.length - 1] || 0;

      const stockData: StockData = {
        symbol: symbol.toUpperCase(),
        price: currentPrice,
        change: change,
        changePercent: changePercent,
        volume: volume
      };

      console.log(`Real data for ${symbol}:`, stockData);
      this.setCache(cacheKey, stockData);
      return stockData;
    } catch (error) {
      console.error(`Error fetching stock quote for ${symbol}:`, error);
      console.log(`Using mock data for ${symbol} due to API error`);
      return this.getMockStockData(symbol);
    }
  }

  private getMockStockData(symbol: string): StockData {
    const mockData: { [key: string]: StockData } = {
      'AAPL': {
        symbol: 'AAPL',
        price: 198.75,
        change: 3.25,
        changePercent: 1.66,
        volume: 52000000
      },
      'MSFT': {
        symbol: 'MSFT',
        price: 415.80,
        change: 8.60,
        changePercent: 2.11,
        volume: 32000000
      },
      'GOOGL': {
        symbol: 'GOOGL',
        price: 168.45,
        change: 2.15,
        changePercent: 1.29,
        volume: 25000000
      },
      'TSLA': {
        symbol: 'TSLA',
        price: 265.30,
        change: 15.65,
        changePercent: 6.27,
        volume: 45000000
      }
    };

    return mockData[symbol] || {
      symbol,
      price: 100.00,
      change: 0.00,
      changePercent: 0.00,
      volume: 1000000
    };
  }

  async getMultipleStockQuotes(symbols: string[]): Promise<StockData[]> {
    const promises = symbols.map(symbol => this.getStockQuote(symbol));
    const results = await Promise.all(promises);
    return results.filter(result => result !== null) as StockData[];
  }

  async getMarketIndices(): Promise<MarketIndex[]> {
    const cacheKey = 'market_indices';
    
    if (this.isCacheValid(cacheKey)) {
      return this.cache.get(cacheKey)!.data;
    }

    console.log('Fetching real-time market indices from Yahoo Finance...');
    
    const indices = [
      { symbol: '^GSPC', name: 'S&P 500' },
      { symbol: '^IXIC', name: 'NASDAQ' },
      { symbol: '^GSPTSE', name: 'TSX' }
    ];

    const marketIndices: MarketIndex[] = [];

    for (const index of indices) {
      try {
        const yahooUrl = `${YAHOO_BASE_URL}/${index.symbol}?interval=1d&range=1d`;
        const proxyUrl = `${CORS_PROXY}${encodeURIComponent(yahooUrl)}`;
        
        const response = await axios.get(proxyUrl, {
          timeout: 15000
        });

        console.log(`Yahoo Finance Response for ${index.symbol}:`, response.data);

        const result = response.data.chart.result[0];
        if (!result || !result.meta || !result.indicators.quote[0]) {
          console.log(`No valid data for ${index.symbol}, using mock data`);
          // Use mock data as fallback
          marketIndices.push({
            symbol: index.symbol,
            name: index.name,
            price: 4567.25,
            change: 45.30,
            changePercent: 1.0
          });
          continue;
        }

        const meta = result.meta;
        const quote = result.indicators.quote[0];
        
        const currentPrice = meta.regularMarketPrice;
        const previousClose = meta.previousClose;
        const change = currentPrice - previousClose;
        const changePercent = (change / previousClose) * 100;

        marketIndices.push({
          symbol: index.symbol,
          name: index.name,
          price: currentPrice,
          change: change,
          changePercent: changePercent
        });

        console.log(`Real data for ${index.symbol}:`, {
          price: currentPrice,
          change: change,
          changePercent: changePercent
        });

      } catch (error) {
        console.error(`Error fetching market index ${index.symbol}:`, error);
        console.log(`Using mock data for ${index.symbol} due to API error`);
        
        // Use mock data as fallback
        marketIndices.push({
          symbol: index.symbol,
          name: index.name,
          price: 4567.25,
          change: 45.30,
          changePercent: 1.0
        });
      }
    }

    console.log('Final market indices:', marketIndices);
    this.setCache(cacheKey, marketIndices);
    return marketIndices;
  }

  async getNews(): Promise<NewsItem[]> {
    const cacheKey = 'market_news';
    
    if (this.isCacheValid(cacheKey)) {
      return this.cache.get(cacheKey)!.data;
    }

    // For now, we'll use mock news since Yahoo Finance doesn't provide news in the same way
    // In a real implementation, you could use a separate news API like NewsAPI.org
    const mockNews = this.getMockNews();
    this.setCache(cacheKey, mockNews);
    return mockNews;
  }

  private getMockNews(): NewsItem[] {
    return [
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
      },
      {
        title: "Tech Sector Shows Resilience",
        summary: "Major technology companies continue to demonstrate strong fundamentals despite market uncertainty.",
        time: "8 hours ago",
        impact: "Medium"
      },
      {
        title: "Investors Eye AI Opportunities",
        summary: "Artificial intelligence investments gain momentum as companies integrate AI into their operations.",
        time: "10 hours ago",
        impact: "High"
      }
    ];
  }

  private formatTime(timeString: string): string {
    const date = new Date(timeString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return `${Math.round(diffInHours * 60)} minutes ago`;
    } else if (diffInHours < 24) {
      return `${Math.round(diffInHours)} hours ago`;
    } else {
      return `${Math.round(diffInHours / 24)} days ago`;
    }
  }

  private determineImpact(relevanceScore: number): 'High' | 'Medium' | 'Low' {
    if (relevanceScore > 0.7) return 'High';
    if (relevanceScore > 0.4) return 'Medium';
    return 'Low';
  }

  // Calculate portfolio metrics
  calculatePortfolioMetrics(holdings: StockData[]): {
    totalValue: number;
    totalChange: number;
    totalChangePercent: number;
    beta: number;
    volatility: string;
    sharpeRatio: number;
    maxDrawdown: number;
  } {
    if (holdings.length === 0) {
      return {
        totalValue: 0,
        totalChange: 0,
        totalChangePercent: 0,
        beta: 1.0,
        volatility: 'Low',
        sharpeRatio: 0,
        maxDrawdown: 0
      };
    }

    const totalValue = holdings.reduce((sum, holding) => sum + holding.price, 0);
    const totalChange = holdings.reduce((sum, holding) => sum + holding.change, 0);
    const totalChangePercent = (totalChange / (totalValue - totalChange)) * 100;

    // Simplified calculations for demo purposes
    const beta = 1.15; // Would be calculated based on historical data
    const volatility = totalChangePercent > 5 ? 'High' : totalChangePercent > 2 ? 'Medium' : 'Low';
    const sharpeRatio = 1.23; // Would be calculated based on risk-free rate and returns
    const maxDrawdown = -8.5; // Would be calculated from historical data

    return {
      totalValue,
      totalChange,
      totalChangePercent,
      beta,
      volatility,
      sharpeRatio,
      maxDrawdown
    };
  }
}

export const financialDataService = new FinancialDataService(); 