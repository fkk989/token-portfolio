import { PortfolioSummary } from "./components/features/portfolio/PortfolioSummary";
import { Header } from "@/components/layout/Header";
import { WatchList } from "@/components/features/watchlist/WatchList";
import { WatchlistDrawer } from "./components/features/watchlist/WatchListDrawer";
import { Provider } from "./components/layout/Provider";
import '@rainbow-me/rainbowkit/styles.css';

function App() {
  return (
    <Provider>
      <div className="h-fit overflow-scroll max-sm:bg-[var(--surface-bg)]">
        <div className="w-[100vw] max-sm:h-[100vh] lg:min-h-[100vh] lg:bg-[#212124]">
          {/* Header */}
          {/* Header */}
          <div className="w-full h-[80px] flex items-center sticky top-0 bg-[var(--body-bg)] max-sm:border-b max-sm:border-[var(--border-primary)] z-[2]">
            <Header />
          </div>
          {/* context */}
          <div className="h-full md:p-[10px] lg:p-[20px] flex flex-col lg:gap-[50px]">
            <PortfolioSummary />
            {/* desktop watchlist */}
            <div className="max-sm:hidden">
              <WatchList />
            </div>

            {/* mobile watchlist in drawer */}
            <div className="lg:hidden max-sm:px-[9px]">
              <WatchlistDrawer />
            </div>

          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
