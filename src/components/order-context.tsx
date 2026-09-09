"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { OrderDialog, type OrderTarget } from "@/components/order-dialog";

type OrderContextType = {
  openOrder: (target: OrderTarget) => void;
};

const OrderContext = createContext<OrderContextType>({ openOrder: () => {} });

export function OrderProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [target, setTarget] = useState<OrderTarget | null>(null);

  const openOrder = useCallback((t: OrderTarget) => {
    setTarget(t);
    setOpen(true);
  }, []);

  const value = useMemo(() => ({ openOrder }), [openOrder]);

  return (
    <OrderContext.Provider value={value}>
      {children}
      <OrderDialog open={open} onOpenChange={setOpen} target={target} />
    </OrderContext.Provider>
  );
}

export function useOrder() {
  return useContext(OrderContext);
}
