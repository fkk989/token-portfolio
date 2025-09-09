import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Star } from "../../icons";
import { cn } from "@/lib/utils";
import { useCoinGecko } from "@/hooks/useCoinGecko";
import { DialogDescription } from "@radix-ui/react-dialog";

export function AddTokenModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const {
    searchedTokens,
    searchCoins,
    getTrendingCoins,
    trendingToken,
    loading,
    setSearchedTokens,
    addSelectedTokenToState,
  } = useCoinGecko();

  const tokensToRender = search.trim() ? searchedTokens : trendingToken;

  useEffect(() => {
    if (open) {
      getTrendingCoins();
    }
  }, [open]);

  useEffect(() => {
    if (search) {
      searchCoins(search);
    } else {
      setSearchedTokens([]);
    }
  }, [search]);

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        onOpenChange(open);
        setSelectedIds([]);
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="w-[370px] max-sm:h-[480px] lg:w-[640px] max-h-[500px] flex flex-col justify-between  bg-[var(--body-bg)] text-white p-0 rounded-[12px] border-none"
      >
        <div className="flex flex-col gap-[20px]">
          <DialogHeader>
            <DialogTitle className="text-lg font-medium">
              <div className="w-full h-[52px] border-b border-[var(--border-primary)]">
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search tokens (e.g., ETH, SOL)…"
                  className="w-full h-full bg-transparent border-none outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus:border-none placeholder:text-[var(--text-secondary)]"
                />
              </div>
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          {/* Token list */}
          <div className="w-full h-full flex flex-col gap-[10px] px-2">
            <div className="px-2 text-sm text-[var(--text-secondary)]">
              {loading
                ? "Searching..."
                : !search
                  ? "Trending"
                  : search && !searchedTokens.length
                    ? "No Result found"
                    : "Search Result"}
            </div>
            {!loading ? (
              <ul className="w-full h-[300px] overflow-y-scroll flex flex-col gap-[10px]">
                {tokensToRender.map((token) => (
                  <li
                    key={token.id}
                    className={`w-full h-[44px]  flex items-center justify-between p-[5px] rounded-md cursor-pointer hover:bg-[var(--brand-accent-hover2)] ${selectedIds.includes(token.id)
                      ? "bg-[var(--brand-accent-hover2)]"
                      : ""
                      }`}
                    onClick={() => {
                      if (selectedIds.includes(token.id)) {
                        setSelectedIds((pre) =>
                          pre.filter((id) => id !== token.id)
                        );
                      } else {
                        setSelectedIds((pre) => [...pre, token.id]);
                      }
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={token.image}
                        alt={token.name}
                        className="w-[28px] h-full ounded-full"
                      />
                      <span>
                        {token.name} ({token.slug})
                      </span>
                    </div>
                    <div className="flex items-center gap-[10px]">
                      {selectedIds.includes(token.id) && <Star />}
                      <input
                        type="radio"
                        checked={selectedIds.includes(token.id)}
                        readOnly
                        className={`h-4 w-4 rounded-full border border-gray-400 appearance-none cursor-pointer checked:bg-[#a9e851e1] checked:border-[#a9e851e1] relative`}
                        style={{
                          backgroundImage: selectedIds.includes(token.id)
                            ? "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' stroke='black' stroke-width='3' viewBox='0 0 24 24'%3E%3Cpath d='M5 13l4 4L19 7'/%3E%3C/svg%3E\")"
                            : "none",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "70%",
                        }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="w-full h-[300px] flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="w-full h-[57px] flex items-center justify-end gap-2 border-t border-[var(--border-primary)] p-3">
          <Button
            disabled={!selectedIds.length}
            className={cn(
              "w-[130px] h-[40px] rounded-[6px]",
              selectedIds.length
                ? "bg-[var(--brand-accent)] hover:bg-[#a9e851e1] text-black"
                : "text-[var(--text-secondary)]"
            )}
            onClick={() => {
              addSelectedTokenToState(selectedIds);
              onOpenChange(false);
              setSelectedIds([]);
            }}
          >
            Add to Wishlist
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
