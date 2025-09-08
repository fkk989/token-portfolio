import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { Sparkline } from "./Sparkline";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { useState } from "react";
import { TokenActions } from "./TokenAction";
import { HoldingUpdateInput } from "./HoldingUpdateInput";

const cellStyle = "w-1/10 h-[48px] text-[var(--text-secondary)] px-[15px]";

export default function PortfolioTable() {
  const tokens = useSelector((state: RootState) => state.portfolio.tokens);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedTokens = tokens.slice(startIndex, endIndex);
  const totalPages = Math.ceil(tokens.length / pageSize);

  return (
    <div className="w-full rounded-[12px] overflow-hidden border-[1px] border-[var(--border-primary)]">
      <Table className="w-full max-sm:w-[1000px]">
        <TableHeader className="w-full h-[48px] bg-[var(--surface-bg)]">
          <TableRow
            style={{
              borderColor: "var(--border-primary)",
            }}
          >
            <TableHead className={cn(cellStyle)}>Token</TableHead>
            <TableHead className={cn(cellStyle)}>Price</TableHead>
            <TableHead className={cn(cellStyle)}>24h %</TableHead>
            <TableHead className={cn(cellStyle)}>Sparkline (7d)</TableHead>
            <TableHead className={cn(cellStyle)}>Holdings</TableHead>
            <TableHead className={cn(cellStyle)}>Value</TableHead>
            <TableHead className={cn(cellStyle)}></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="w-full">
          {paginatedTokens.map((token) => {
            return (
              <TableRow className="w-full" style={{ borderColor: "#27272a" }}>
                <TableCell
                  className={cn(cellStyle, "w-1/3 flex items-center gap-[5px]")}
                >
                  {token.image && (
                    <div className="flex-shrink-0 flex items-center justify-center">
                      <img src={token.image} className="w-[32px] h-[32px]" />
                    </div>
                  )}
                  <span className="text-white">
                    {token.name.split(" ").length > 2
                      ? token.name.split(" ").slice(0, 2).join("") + "..."
                      : token.name}
                  </span>
                  <span className="text-[var(--text-secondary)]">
                    ({token.slug})
                  </span>
                </TableCell>
                <TableCell className={cn(cellStyle)}>
                  ${token.price?.toFixed(2)}
                </TableCell>
                <TableCell className={cn(cellStyle)}>
                  {token.change24h?.toFixed(2)}
                </TableCell>
                <TableCell className={cn(cellStyle)}>
                  <Sparkline data={token.price7d} />
                </TableCell>
                <TableCell className={cn(cellStyle, "text-white")}>
                  {!token.updating ? (
                    token.holding
                  ) : (
                    <HoldingUpdateInput token={token} />
                  )}
                </TableCell>
                <TableCell className={cn(cellStyle, "text-white")}>
                  {token.value?.toFixed(2)}
                </TableCell>
                <TableCell
                  className={cn(
                    cellStyle,
                    "w-full flex items-center justify-end"
                  )}
                >
                  <TokenActions token={token} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
         <TableFooter className="max-sm:w-[1000px]">
          {!paginatedTokens.length ? (
            <TableRow>
              <TableCell colSpan={7} className="">
                <div className="w-full h-[48px] flex items-center justify-center text-[var(--text-secondary)]">
                  No tokne yet
                </div>
              </TableCell>
            </TableRow>
          ) : (
            <></>
          )}
          {paginatedTokens.length ? (
            <TableRow className="w-full">
              <TableCell colSpan={7}>
                <div className="w-full h-[48px] flex items-center border-t border-[var(--border-primary)] px-[15px]">
                  <div className="w-full flex items-center justify-between text-[var(--text-secondary)]">
                    <div>
                      {startIndex + 1} - {Math.min(endIndex, tokens.length)} of{" "}
                      {tokens.length} results
                    </div>
                    <div className="flex items-center gap-[8px]">
                      <span>
                        Page {page} of {totalPages}
                      </span>
                      <Button
                        className="bg-transparent hover:bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => setPage((p) => Math.max(p - 1, 1))}
                        disabled={page === 1}
                      >
                        Prev
                      </Button>
                      <Button
                        className="bg-transparent hover:bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() =>
                          setPage((p) => Math.min(p + 1, totalPages))
                        }
                        disabled={page === totalPages}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            <></>
          )}
        </TableFooter>
      </Table>

    </div>
  );
}
