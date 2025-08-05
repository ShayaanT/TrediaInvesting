import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Grid,
  Paper,
  Stack
} from '@mui/material';
import {
  TrendingUp,
  MyLocation,
  BarChart,
  Refresh,
  Notifications,
  MenuBook,
  Security
} from '@mui/icons-material';

function LandingPage() {
  return (
    <>
      <AppBar position="static" color="default" elevation={0} sx={{ backgroundColor: 'white' }}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                backgroundColor: '#1e293b',
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 1
              }}
            >
              <TrendingUp sx={{ color: 'white', fontSize: 20 }} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b' }}>
              Tredia
            </Typography>
          </Box>
          <Stack direction="row" spacing={3} sx={{ mr: 3 }}>
            <Typography variant="body2" sx={{ color: '#64748b', cursor: 'pointer', '&:hover': { color: '#1e293b' } }}>
              Features
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748b', cursor: 'pointer', '&:hover': { color: '#1e293b' } }}>
              How It Works
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748b', cursor: 'pointer', '&:hover': { color: '#1e293b' } }}>
              Security
            </Typography>
          </Stack>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#1e293b',
              '&:hover': { backgroundColor: '#0f172a' }
            }}
          >
            Sign In
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
        <Box textAlign="center" mb={8}>
          <Typography
            variant="h2"
            fontWeight={700}
            gutterBottom
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              lineHeight: 1.2
            }}
          >
            Invest smarter,<br />
            <Box component="span" sx={{ color: '#14b8a6' }}>start smaller.</Box>
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            mb={4}
            sx={{
              maxWidth: 600,
              mx: 'auto',
              fontSize: '1.1rem',
              lineHeight: 1.6
            }}
          >
            Your personal investment coach for beginners. Get personalized strategies, real-time insights, and educational guidance – all in simple, understandable language.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: '#14b8a6',
                '&:hover': { backgroundColor: '#0d9488' },
                px: 4,
                py: 1.5,
                fontSize: '1.1rem'
              }}
            >
              Start Investing Today
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: '#cbd5e1',
                color: '#64748b',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                '&:hover': {
                  borderColor: '#94a3b8',
                  backgroundColor: 'rgba(148, 163, 184, 0.04)'
                }
              }}
            >
              Watch Demo
            </Button>
          </Stack>
        </Box>

        {/* Features Section */}
        <Box mb={8}>
          <Typography
            variant="h3"
            textAlign="center"
            fontWeight={700}
            mb={2}
            sx={{ color: '#1e293b' }}
          >
            Everything you need to invest confidently.
          </Typography>
          <Typography
            variant="h6"
            textAlign="center"
            color="text.secondary"
            mb={6}
            sx={{ maxWidth: 600, mx: 'auto' }}
          >
            Tredia combines powerful investment tools with educational guidance to help you build wealth at your own pace.
          </Typography>

          <Grid container spacing={4} sx={{ justifyContent: 'center', maxWidth: '1200px', mx: 'auto' }}>
            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  border: '1px solid #e2e8f0',
                  borderRadius: 2,
                  '&:hover': {
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                    transform: 'translateY(-2px)',
                    transition: 'all 0.3s ease'
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      backgroundColor: '#14b8a6',
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2
                    }}
                  >
                                         <MyLocation sx={{ color: 'white', fontSize: 24 }} />
                  </Box>
                  <Typography variant="h6" fontWeight={600} sx={{ color: '#1e293b' }}>
                    Personalized Strategies
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  Get custom investment recommendations based on your goals, risk tolerance, and time commitment.
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  border: '1px solid #e2e8f0',
                  borderRadius: 2,
                  '&:hover': {
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                    transform: 'translateY(-2px)',
                    transition: 'all 0.3s ease'
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      backgroundColor: '#22c55e',
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2
                    }}
                  >
                    <BarChart sx={{ color: 'white', fontSize: 24 }} />
                  </Box>
                  <Typography variant="h6" fontWeight={600} sx={{ color: '#1e293b' }}>
                    Real Brokerage Sync
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  Connect your Wealthsimple account securely to track your real portfolio and transactions.
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  border: '1px solid #e2e8f0',
                  borderRadius: 2,
                  '&:hover': {
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                    transform: 'translateY(-2px)',
                    transition: 'all 0.3s ease'
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      backgroundColor: '#3b82f6',
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2
                    }}
                  >
                    <Refresh sx={{ color: 'white', fontSize: 24 }} />
                  </Box>
                  <Typography variant="h6" fontWeight={600} sx={{ color: '#1e293b' }}>
                    Portfolio Health
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  Visual dashboards showing your net worth, risk exposure, and sector allocation.
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  border: '1px solid #e2e8f0',
                  borderRadius: 2,
                  '&:hover': {
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                    transform: 'translateY(-2px)',
                    transition: 'all 0.3s ease'
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      backgroundColor: '#f97316',
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2
                    }}
                  >
                    <Notifications sx={{ color: 'white', fontSize: 24 }} />
                  </Box>
                  <Typography variant="h6" fontWeight={600} sx={{ color: '#1e293b' }}>
                    Smart Alerts
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  Get notified about earnings calls, risk changes, and portfolio drift warnings.
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  border: '1px solid #e2e8f0',
                  borderRadius: 2,
                  '&:hover': {
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                    transform: 'translateY(-2px)',
                    transition: 'all 0.3s ease'
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      backgroundColor: '#8b5cf6',
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2
                    }}
                  >
                    <MenuBook sx={{ color: 'white', fontSize: 24 }} />
                  </Box>
                  <Typography variant="h6" fontWeight={600} sx={{ color: '#1e293b' }}>
                    Learn As You Go
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  Embedded education with tooltips, explanations, and 'why this stock?' guidance.
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  border: '1px solid #e2e8f0',
                  borderRadius: 2,
                  '&:hover': {
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                    transform: 'translateY(-2px)',
                    transition: 'all 0.3s ease'
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      backgroundColor: '#ef4444',
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2
                    }}
                  >
                    <Security sx={{ color: 'white', fontSize: 24 }} />
                  </Box>
                  <Typography variant="h6" fontWeight={600} sx={{ color: '#1e293b' }}>
                    Bank-Level Security
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  Your data is protected with SOC 2 Type II compliance and encrypted connections.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          backgroundColor: '#1e293b',
          color: 'white',
          py: 8,
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h4"
            fontWeight={600}
            gutterBottom
            sx={{ mb: 2 }}
          >
            Ready to start your investment journey?
          </Typography>
          <Typography
            variant="h6"
            sx={{ mb: 4, opacity: 0.9 }}
          >
            Join thousands of beginners who are building wealth with Tredia's guidance.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: '#14b8a6',
              '&:hover': { backgroundColor: '#0d9488' },
              px: 4,
              py: 1.5,
              fontSize: '1.1rem'
            }}
          >
            Get Started – It's Free
          </Button>
        </Container>
      </Box>
    </>
  );
}

export default LandingPage; 