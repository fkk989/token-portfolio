"use client"

import { useEffect, useState } from "react"
import { Drawer, DrawerContent } from "@/components/ui/drawer"
import { Handle } from "vaul" // adjust import if different
import { WatchList } from "@/components/WatchList"

export function WatchlistDrawer() {
    const [snapPoints, setSnapPoints] = useState<(number | string)[]>([])

    useEffect(() => {
        const height = window.innerHeight
        // Example: make first snap 10% of device height instead of fixed 200px
        const firstSnap = `${Math.round(height * 0.22)}px`
        console.log("First Snap: ", firstSnap)
        setSnapPoints([firstSnap, 1])
    }, [])
    if (!snapPoints.length) return <></>
    return (
        <Drawer
            open={true}
            onOpenChange={() => { }}
            modal={false}
            defaultOpen={true}
            snapToSequentialPoint
            snapPoints={snapPoints}
            activeSnapPoint={snapPoints[0]}
        >
            <DrawerContent className="w-full h-[100vh] bg-[var(--body-bg)] border-none px-[10px]">
                <div className="w-full flex items-center justify-center">
                    <div
                        id="watchlist-drawer-container"
                        className="w-[150px] h-[5px] bg-white rounded-full"
                    >
                        <Handle />
                    </div>
                </div>
                <div className="mt-[50px]">
                    <WatchList />
                </div>
            </DrawerContent>
        </Drawer>
    )
}
