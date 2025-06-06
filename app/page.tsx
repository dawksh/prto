"use client"

import { Button } from "@/components/ui/button";

import { useAccount, useCapabilities, useConnect, useDisconnect, useSendCalls } from "wagmi";

export default function Home() {
  const { connect, connectors } = useConnect()
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const { data: capabilities } = useCapabilities()

  const { sendCallsAsync } = useSendCalls()

  const buy = async () => {
    console.log(address)
    const tx = await sendCallsAsync({
      calls: [
        {
          to: "0x0000000000000000000000000000000000000000",
          data: "0x",
        },
        {
          to: "0x28172273CC1E0395F3473EC6eD062B6fdFb15940",
          data: "0x",
        }
      ]
    })
    console.log(tx)
  }

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
          <p>Connected to <span className="font-bold">{address?.slice(0, 6)}...{address?.slice(-4)}</span> via <span className="font-bold">porto</span></p>
          <p>{JSON.stringify(capabilities)}</p>
          <Button onClick={buy}>Buy</Button>
          <Button onClick={() => disconnect()}>Disconnect</Button>
        </div>
      )}
    </div>
  );
}
