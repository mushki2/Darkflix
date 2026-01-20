
import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
const Router = ReactRouterDOM.HashRouter;
const Routes = ReactRouterDOM.Routes;
const Route = ReactRouterDOM.Route;
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shorts from './pages/Shorts';
import Watch from './pages/Watch';
import CreatorDashboard from './pages/CreatorDashboard';
import Profile from './pages/Profile';
import NovelHub from './pages/NovelHub';
import Downloads from './pages/Downloads';
import CategoryPage from './pages/CategoryPage';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#141414]">
      <Navbar />
      <main>
        {children}
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shorts" element={<Shorts />} />
          <Route path="/watch/:id" element={<Watch />} />
          <Route path="/creator" element={<CreatorDashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/novels" element={<NovelHub />} />
          <Route path="/downloads" element={<Downloads />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          {/* Aliases for cleaner URLs */}
          <Route path="/movies" element={<CategoryPage />} />
          <Route path="/tv" element={<CategoryPage />} />
          <Route path="/admin" element={<CreatorDashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
