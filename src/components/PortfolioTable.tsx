import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Ellipsis } from "lucide-react";
import { Button } from "./ui/button";
import { Sparkline } from "./Sparkline";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { useState } from "react";

const cellStyle = "w-1/7 h-[48px] text-[var(--text-secondary)] px-[15px]";

export default function PortfolioTable() {
  const tokens = useSelector((state: RootState) => state.portfolio.tokens);

  // Pagination state
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedTokens = tokens.slice(startIndex, endIndex);

  const totalPages = Math.ceil(tokens.length / pageSize);

  return (
    <div className="w-full rounded-[12px] overflow-hidden border-[1px] border-[var(--border-primary)]">
      <Table className="w-full">
        <TableHeader className="w-full h-[48px] bg-[var(--surface-bg)]">
          <TableRow style={{ borderColor: "#27272a" }}>
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
                  className={cn(cellStyle, "flex items-center gap-[5px]")}
                >
                  <span className="text-white">{token.name}</span>
                  <span className="text-[var(--text-secondary)]">
                    (${token.slug})
                  </span>
                </TableCell>
                <TableCell className={cn(cellStyle)}>{token.value}</TableCell>
                <TableCell className={cn(cellStyle)}>
                  {token.change24h}
                </TableCell>
                <TableCell className={cn(cellStyle)}>
                  <Sparkline data={token.price7d} />
                </TableCell>
                <TableCell className={cn(cellStyle, "text-white")}>
                  {token.holding}
                </TableCell>
                <TableCell className={cn(cellStyle, "text-white")}>
                  {token.value}
                </TableCell>
                <TableCell
                  className={cn(
                    cellStyle,
                    "w-full flex items-center justify-end"
                  )}
                >
                  <Button className="bg-transparent hover:bg-transparent group">
                    <Ellipsis className="hover:text-[var(--secondary-text)] group-hover:text-[var-[--surface-bg]]" />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
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
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
