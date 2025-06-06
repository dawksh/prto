"use client"

import { Button } from "@/components/ui/button";

import { useAccount, useConnect, useDisconnect } from "wagmi";

export default function Home() {
  const { connect, connectors } = useConnect()
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen">
      {!isConnected && (
        <div>
          <p className="text-2xl font-bold">Available Connectors:</p>
          {connectors.map((connector) => (
            <div key={connector.id} className="flex flex-col gap-2 items-center justify-center">
              {connector.icon && <img src={connector.icon} className="w-10 h-10" alt="icon" />}
              <Button onClick={() => connect({ connector })}>
                {connector.name}
              </Button>
            </div>
          ))}
        </div>
      )}
      {isConnected && (
        <div className="flex flex-col items-center gap-2">
          <p>Connected to <span className="font-bold">{address}</span></p>
          <Button onClick={() => disconnect()}>Disconnect</Button>
        </div>
      )}
    </div>
  );
}
