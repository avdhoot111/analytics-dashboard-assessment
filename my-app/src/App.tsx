import React from 'react';
import GlobalStyles from './styles/GlobleStyles';
import Layout from './components/Layout';
import Dashboard from './Pages/Dashboard';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyles />
      <Layout>
        <Dashboard />
      </Layout>
    </>
  );
};

export default App;
