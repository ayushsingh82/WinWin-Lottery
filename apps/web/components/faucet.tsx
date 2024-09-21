"use client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";

export interface FaucetProps {
  wallet?: string;
  loading: boolean;
  onConnectWallet: () => void;
  onDrip: () => void;
}

export function Faucet({
  wallet,
  onConnectWallet,
  onDrip,
  loading,
}: FaucetProps) {
  const form = useForm();

  return (
    <div className="space-y-8   ">
      {/* Second row with 2 cards side by side */}
      <div className="flex gap-x-8 gap-y-8"> {/* Horizontal and vertical gap */}
        <Card className="w-80 h-80 p-6 bg-orange-500">
          <div className="mb-2">
            <h2 className="text-2xl font-bold text-black">Faucet</h2>
            <p className="mt-1 text-sm text-white">
              Get testing (L2) MINA tokens for your wallet
            </p>
          </div>
          <Form {...form}>
            <div className="pt-3">
              <FormField
                name="to"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      To{" "}
                      <span className="text-sm text-white">(your wallet)</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled
                        placeholder={wallet ?? "Please connect a wallet first"}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <Button
              size={"lg"}
              type="submit"
              className="mt-6 w-full"
              loading={loading}
              onClick={() => {
                wallet ?? onConnectWallet();
                wallet && onDrip();
              }}
            >
              {wallet ? "Drip 💦" : "Connect wallet"}
            </Button>
          </Form>
        </Card>

        <Card className="w-80 h-80 p-6 bg-green-600">
          <div className="mb-2">
            <h2 className="text-2xl font-bold text-black">Faucet</h2>
            <p className="mt-1 text-sm text-white">
              Get testing FLOW tokens for your wallet
            </p>
          </div>
          <Form {...form}>
            <div className="pt-3">
              <FormField
                name="to"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      To{" "}
                      <span className="text-sm text-white">(your wallet)</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled
                        placeholder={wallet ?? "Please connect a wallet first"}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <Button
              size={"lg"}
              type="submit"
              className="mt-6 w-full"
              loading={loading}
              onClick={() => {
                wallet ?? onConnectWallet();
                wallet && onDrip();
              }}
            >
              {wallet ? "Drip 💦" : "Connect wallet"}
            </Button>
          </Form>
        </Card>
      </div>
    </div>
  );
}
