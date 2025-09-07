import { PortfolioSummary } from "./components/PortfolioSummary";
import { Header } from "./components/Header";
import { WatchList } from "./components/WatchList";
import { Provider } from "react-redux";
import { store } from "./redux/store";
export const description = "A donut chart";

function App() {
  return (
    <Provider store={store}>
      <div className="w-[100vw] min-h-[100vh] bg-[#212124]">
        {/* Header */}
        <Header />
        {/* context */}
        <div className="md:p-[10px] lg:p-[20px] flex flex-col lg:gap-[50px]">
          <PortfolioSummary />
          <WatchList />
        </div>
      </div>
    </Provider>
  );
}

export default App;
