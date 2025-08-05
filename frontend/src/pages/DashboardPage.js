import React from 'react';
import { AppBar, Toolbar, Typography, Container, Grid, Paper, Box, Avatar, Button, Divider, List, ListItem, ListItemAvatar, ListItemText, Chip } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

function DashboardPage() {
  return (
    <>
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
            <span role="img" aria-label="logo">📈</span> Tredia
          </Typography>
          <Button color="primary" variant="outlined" startIcon={<NotificationsIcon />}>3</Button>
          <Avatar sx={{ ml: 2 }}>AC</Avatar>
          <Typography sx={{ ml: 1 }}>Alex Chen</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl" sx={{ mt: 6, mb: 6 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Welcome back, Alex! <span role="img" aria-label="wave">👋</span>
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Here's how your investments are performing today.
        </Typography>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {/* Portfolio summary cards */}
          <Grid item xs={12} md={3}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="subtitle2" color="text.secondary">Portfolio Value</Typography>
              <Typography variant="h4" fontWeight={700}>$24,750.32</Typography>
              <Typography color="success.main" fontWeight={600}>+10.0% ($2,250.32)</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="subtitle2" color="text.secondary">Goal Progress</Typography>
              <Typography variant="h4" fontWeight={700}>67%</Typography>
              <Box mt={1} height={8} bgcolor="#e0e0e0" borderRadius={4}>
                <Box width="67%" height={8} bgcolor="primary.main" borderRadius={4}></Box>
              </Box>
              <Typography variant="body2" color="text.secondary">On track for long-term wealth building</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="subtitle2" color="text.secondary">Diversification</Typography>
              <Typography variant="h4" fontWeight={700} color="warning.main">Moderate</Typography>
              <Typography variant="body2" color="text.secondary">Consider adding international exposure</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="subtitle2" color="text.secondary">Cash Balance</Typography>
              <Typography variant="h4" fontWeight={700}>$1,249.68</Typography>
              <Typography variant="body2" color="text.secondary">Available to invest</Typography>
            </Paper>
          </Grid>
        </Grid>
        {/* Portfolio Performance Chart Placeholder */}
        <Box mt={6}>
          <Paper elevation={2} sx={{ p: 4 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>Portfolio Performance</Typography>
            <Box height={180} bgcolor="#47556922" borderRadius={2} display="flex" alignItems="flex-end" justifyContent="space-between" px={2}>
              {/* Placeholder bars */}
              {[...Array(7)].map((_, i) => (
                <Box key={i} width={40} height={100 + Math.random() * 40} bgcolor="#475569" borderRadius={1} />
              ))}
            </Box>
            <Box display="flex" justifyContent="space-between" mt={2}>
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'].map(month => (
                <Typography key={month} variant="caption">{month}</Typography>
              ))}
            </Box>
          </Paper>
        </Box>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {/* Holdings List */}
          <Grid item xs={12} md={8}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>Your Holdings</Typography>
              <List>
                {[
                  { symbol: 'AAPL', name: 'Apple Inc.', shares: 15, value: 2849.25, change: 30.8 },
                  { symbol: 'MSFT', name: 'Microsoft Corporation', shares: 8, value: 3030.80, change: 35.1 },
                  { symbol: 'GOOGL', name: 'Alphabet Inc.', shares: 12, value: 1676.28, change: 11.5 },
                  { symbol: 'TSLA', name: 'Tesla Inc.', shares: 6, value: 1491.00, change: 12.9 },
                  { symbol: 'BRK.B', name: 'Berkshire Hathaway Inc.', shares: 2, value: 730.40, change: 17.7 },
                ].map(stock => (
                  <ListItem key={stock.symbol}>
                    <ListItemAvatar>
                      <Avatar>{stock.symbol.slice(0,2)}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={<><b>{stock.symbol}</b> {stock.name}</>}
                      secondary={`${stock.shares} shares`}
                    />
                    <Box textAlign="right">
                      <Typography fontWeight={700}>${stock.value.toLocaleString()}</Typography>
                      <Typography color="success.main">+{stock.change}%</Typography>
                    </Box>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
          {/* Sidebar: Alerts, Sector Allocation, News, Learning Corner */}
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>Alerts</Typography>
              <List>
                <ListItem>
                  <Chip color="error" label="AAPL Earnings Call Tomorrow" size="small" sx={{ mr: 1 }} />
                  <ListItemText primary="Apple will report Q1 2024 earnings..." secondary="1 hour ago" />
                </ListItem>
                <ListItem>
                  <Chip color="warning" label="Portfolio Drift Alert" size="small" sx={{ mr: 1 }} />
                  <ListItemText primary="Your technology allocation..." secondary="3 hours ago" />
                </ListItem>
                <ListItem>
                  <Chip color="info" label="Market Volatility Increase" size="small" sx={{ mr: 1 }} />
                  <ListItemText primary="VIX has increased 15% today..." secondary="5 hours ago" />
                </ListItem>
              </List>
            </Paper>
            <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>Sector Allocation</Typography>
              <Box>
                <Typography>Technology 68%</Typography>
                <Box bgcolor="primary.main" height={8} width="68%" borderRadius={2} mb={1} />
                <Typography>ETF 20%</Typography>
                <Box bgcolor="secondary.main" height={8} width="20%" borderRadius={2} mb={1} />
                <Typography color="warning.main">Financial Services 8%</Typography>
                <Box bgcolor="#fbbf24" height={8} width="8%" borderRadius={2} mb={1} />
                <Typography color="error.main">Consumer Discretionary 4%</Typography>
                <Box bgcolor="#ef4444" height={8} width="4%" borderRadius={2} mb={1} />
              </Box>
            </Paper>
            <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>Market News</Typography>
              <List>
                <ListItem>
                  <ListItemText primary={<b>Apple Reports Strong Q4 Earnings, iPhone Sales Exceed Expectations</b>} secondary="MarketWatch · 2 hours ago" />
                </ListItem>
              </List>
            </Paper>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>Learning Corner</Typography>
              <List>
                <ListItem>
                  <ListItemText primary={<b>Tip of the Day</b>} secondary="Diversification helps reduce risk..." />
                </ListItem>
                <ListItem>
                  <ListItemText primary={<b>Learn: Dollar-Cost Averaging</b>} secondary="Investing the same amount regularly..." />
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
        {/* Smart Recommendations */}
        <Box mt={6}>
          <Paper elevation={2} sx={{ p: 4 }}>
            <Typography variant="h5" fontWeight={700} gutterBottom>Smart Recommendations</Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary={<b>QQQ - Invesco QQQ Trust</b>}
                  secondary={<>
                    <Typography color="success.main">Buy Recommendation</Typography>
                    <Typography>"Diversify your tech exposure with this NASDAQ-100 ETF..."</Typography>
                    <Typography variant="caption">Confidence: 85%</Typography>
                  </>}
                />
                <Button variant="outlined">Learn More</Button>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary={<b>VXUS - Vanguard Total International Stock ETF</b>}
                  secondary={<>
                    <Typography color="warning.main">Rebalance Recommendation</Typography>
                    <Typography>"Add global diversification to your portfolio..."</Typography>
                    <Typography variant="caption">Confidence: 78%</Typography>
                  </>}
                />
                <Button variant="outlined">Learn More</Button>
              </ListItem>
            </List>
          </Paper>
        </Box>
      </Container>
    </>
  );
}

export default DashboardPage; 