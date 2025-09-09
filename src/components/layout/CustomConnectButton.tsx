import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Wallet } from '../icons/Wallet';
import { useDisconnect } from 'wagmi';
import { cn } from '@/lib/utils';

const buttonsStyle = "flex justify-center items-center gap-[5px] bg-[var(--brand-accent)] hover:bg-[var(--brand-accent-hover)] rounded text-black px-[6px] py-[4px] lg:px-[8px] lg:py-[5px] cursor-pointer max-sm:text-[14px]"
export const CustomConnectButton = () => {
    const { disconnect } = useDisconnect()
    return (
        <ConnectButton.Custom>
            {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                authenticationStatus,
                mounted,
            }) => {
                console.log("accountid", account?.displayName.slice(0, 5))
                const ready = mounted && authenticationStatus !== 'loading';
                const connected =
                    ready &&
                    account &&
                    chain &&
                    (!authenticationStatus ||
                        authenticationStatus === 'authenticated');
                return (
                    <div
                        {...(!ready && {
                            'aria-hidden': true,
                            'style': {
                                opacity: 0,
                                pointerEvents: 'none',
                                userSelect: 'none',
                            },
                        })}
                    >
                        {(() => {
                            if (!connected) {
                                return (
                                    <button
                                        className={cn("flex justify-center items-center gap-[5px] bg-[var(--brand-accent)] hover:bg-[var(--brand-accent-hover)] rounded-full text-black px-[8px] py-[5px] cursor-pointer")}
                                        onClick={openConnectModal} type="button">
                                        <Wallet /> <span> Connect Wallet</span>
                                    </button>
                                );
                            }
                            if (chain.unsupported) {
                                return (
                                    <button onClick={openChainModal} type="button">
                                        Wrong network
                                    </button>
                                );
                            }
                            return (
                                <div className='flex gap-[12px]'>
                                    <button
                                        className={buttonsStyle}
                                        onClick={openChainModal}
                                        style={{ display: 'flex', alignItems: 'center' }}
                                        type="button"
                                    >
                                        {chain.hasIcon && (
                                            <div
                                                style={{
                                                    background: chain.iconBackground,
                                                    width: 12,
                                                    height: 12,
                                                    borderRadius: 999,
                                                    overflow: 'hidden',
                                                    marginRight: 4,
                                                }}
                                            >
                                                {chain.iconUrl && (
                                                    <img
                                                        alt={chain.name ?? 'Chain icon'}
                                                        src={chain.iconUrl}
                                                        style={{ width: 12, height: 12 }}
                                                    />
                                                )}
                                            </div>
                                        )}
                                        <span className='max-sm:hidden'> {chain.name}</span>
                                    </button>
                                    <button
                                        className={cn(buttonsStyle)}
                                        onClick={openAccountModal} type="button">
                                        <span className='hidden lg:block'>{account.displayName}</span>
                                        <span className='block lg:hidden'>{account.displayName.slice(0, 2)}</span>

                                    </button>
                                    <button
                                        className={cn(buttonsStyle)}
                                        onClick={() => {
                                            disconnect()
                                        }}
                                    >
                                        Disconnet
                                    </button>
                                </div>
                            );
                        })()}
                    </div>
                );
            }}
        </ConnectButton.Custom>
    );
};