import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import BlogGenerator from "./pages/BlogGenerator";
import SeoAnalyzer from "./pages/SeoAnalyzer";
import MarketingCopy from "./pages/MarketingCopy";
import ContentIdeas from "./pages/ContentIdeas";
import KeywordResearch from "./pages/KeywordResearch";
import ContentCalendar from "./pages/ContentCalendar";
import BrandVoice from "./pages/BrandVoice";
import ContentRewriter from "./pages/ContentRewriter";
import MetaGenerator from "./pages/MetaGenerator";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="blog" element={<BlogGenerator />} />
        <Route path="seo" element={<SeoAnalyzer />} />
        <Route path="marketing" element={<MarketingCopy />} />
        <Route path="ideas" element={<ContentIdeas />} />
        <Route path="keywords" element={<KeywordResearch />} />
        <Route path="calendar" element={<ContentCalendar />} />
        <Route path="brand-voice" element={<BrandVoice />} />
        <Route path="rewriter" element={<ContentRewriter />} />
        <Route path="meta" element={<MetaGenerator />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
