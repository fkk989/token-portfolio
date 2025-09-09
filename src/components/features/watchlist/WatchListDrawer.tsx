import { Drawer, DrawerContent } from "@/components/ui/drawer"
import { Handle } from "vaul" // adjust import if different
import { WatchList } from "@/components/features/watchlist/WatchList"

export function WatchlistDrawer() {
    return (
        <Drawer
            open={true}
            onOpenChange={() => { }}
            handleOnly
            modal={false}
            defaultOpen={true}
            snapToSequentialPoint
            snapPoints={["20px", 0.95]}
            activeSnapPoint={"20px"}
        >
            <DrawerContent className="lg:hidden w-full min-h-[100vh] bg-[var(--body-bg)] border-none px-[10px]">
                <div className="w-full flex items-center justify-center">
                    <div
                        id="watchlist-drawer-container"
                        className="w-[150px] h-[5px] bg-white rounded-full"
                    >
                        <Handle />
                    </div>
                </div>
                <div className="w-full min-h-full overflow-y-scroll my-[50px]">
                    <WatchList />
                </div>
            </DrawerContent>
        </Drawer>
    )
}
