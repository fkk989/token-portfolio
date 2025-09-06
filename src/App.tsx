import { PortfolioSummary } from "./components/PortfolioSummary";
import { Header } from "./components/Header";
export const description = "A donut chart";

function App() {
  return (
    <div className="w-[100vw] h-[100vh] bg-[#212124]">
      {/* Header */}
      <Header />
      {/* context */}
      <div className="md:p-[10px] lg:p-[20px]">
        <PortfolioSummary />
      </div>
    </div>
  );
}

export default App;
