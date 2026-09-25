"use client";

import { useEffect, useRef, useState } from "react";
import { PhoneInput } from "@/components/phone-input";
import { TurnstileWidget, captchaEnabled, type TurnstileHandle } from "@/components/turnstile-widget";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useLanguage } from "@/components/language-provider";
import { CheckCircle2, Loader2, PackageSearch } from "lucide-react";

export type OrderTarget = {
  type: "product" | "service";
  id?: string;
  name: string;
  unit?: string | null;
  price?: number | null;
  currency?: string | null;
};

type Submitted = { reference: string };

export function OrderDialog({
  open,
  onOpenChange,
  target,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  target: OrderTarget | null;
}) {
  const { t, locale } = useLanguage();
  const [quantity, setQuantity] = useState(1);
  const [captchaToken, setCaptchaToken] = useState("");
  const captchaRef = useRef<TurnstileHandle>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [submitted, setSubmitted] = useState<Submitted | null>(null);

  useEffect(() => {
    if (open) {
      setQuantity(1);
      setSubmitting(false);
      setError(false);
      setSubmitted(null);
    }
  }, [open, target]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!target) return;
    setSubmitting(true);
    setError(false);
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemType: target.type,
          itemId: target.id ?? null,
          itemName: target.name,
          quantity,
          customerName: fd.get("customerName"),
          customerEmail: fd.get("customerEmail"),
          customerPhone: fd.get("customerPhone"),
          propertyType: fd.get("propertyType"),
          serviceCity: fd.get("serviceCity"),
          message: fd.get("message"),
          website: fd.get("website"),
          captchaToken,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error");
      setSubmitted(data);
    } catch {
      setError(true);
      captchaRef.current?.reset();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        {submitted ? (
          <div className="flex flex-col items-center gap-4 py-8 text-center">
            <CheckCircle2 className="h-14 w-14 text-green-600" aria-hidden="true" />
            <DialogHeader className="sm:text-center">
              <DialogTitle className="text-xl">{t.order.success}</DialogTitle>
              <DialogDescription className="mt-2">
                {t.order.successRef}:{" "}
                <span className="font-mono font-normal text-primary">{submitted.reference}</span>
              </DialogDescription>
            </DialogHeader>
            <Button onClick={() => onOpenChange(false)}>{t.policies.close}</Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <PackageSearch className="h-5 w-5 text-primary" aria-hidden="true" />
                {t.order.title}
              </DialogTitle>
              {target && (
                <DialogDescription>
                  {target.type === "product" ? t.order.item : t.nav.services}:{" "}
                  <span className="font-medium text-foreground">{target.name}</span>
                  {target.price != null && target.currency && (
                    <> · {new Intl.NumberFormat("en-US", { style: "currency", currency: target.currency }).format(target.price)}
                      {target.unit ? ` / ${target.unit}` : ""}</>
                  )}
                </DialogDescription>
              )}
            </DialogHeader>

            <form onSubmit={handleSubmit} className="grid gap-4">
              {/* Honeypot anti-spam */}
              <div className="hidden" aria-hidden="true">
                <input type="text" name="website" tabIndex={-1} autoComplete="off" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="order-quantity">{t.order.quantity}</Label>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="-"
                  >
                    −
                  </Button>
                  <Input
                    id="order-quantity"
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-24 text-center"
                    required
                  />
                  <Button type="button" variant="outline" size="icon" onClick={() => setQuantity((q) => q + 1)} aria-label="+">
                    +
                  </Button>
                </div>
              </div>

              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{t.order.yourData}</p>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="order-name">{t.order.customerName} *</Label>
                  <Input id="order-name" name="customerName" required placeholder={t.order.namePh} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="order-email">{t.order.customerEmail} *</Label>
                  <Input id="order-email" name="customerEmail" type="email" required placeholder={t.order.emailPh} />
                </div>
                <div className="grid gap-2 sm:col-span-2">
                  <Label htmlFor="order-phone">{t.order.customerPhone}</Label>
                  <PhoneInput
                    id="order-phone"
                    name="customerPhone"
                    ariaLabelCountry={locale === "es" ? "Código de país" : "Country code"}
                    placeholder={t.order.phonePh}
                    className="h-9 rounded-md border border-input bg-transparent px-3 text-base shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 md:text-sm"
                    selectClassName="h-9 w-24 rounded-md border border-input bg-transparent px-1.5 text-sm"
                  />
                </div>
                <div className="grid gap-2 sm:col-span-2">
                  <Label htmlFor="order-city">{t.order.serviceCity}</Label>
                  <Input id="order-city" name="serviceCity" placeholder={t.order.serviceCityPh} />
                </div>
              </div>

              <div className="grid gap-2">
                <Label>{t.order.propertyType}</Label>
                <RadioGroup name="propertyType" defaultValue="residential" className="flex gap-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="residential" id="prop-residential" />
                    <Label htmlFor="prop-residential" className="cursor-pointer font-normal">
                      {t.order.propertyResidential}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="commercial" id="prop-commercial" />
                    <Label htmlFor="prop-commercial" className="cursor-pointer font-normal">
                      {t.order.propertyCommercial}
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="order-message">{t.order.message}</Label>
                <Textarea id="order-message" name="message" rows={3} placeholder={t.order.messagePh} />
              </div>

              <TurnstileWidget ref={captchaRef} onToken={setCaptchaToken} locale={locale} />

              {error && <p className="text-sm font-medium text-destructive">{t.order.error}</p>}

              <DialogFooter>
                <Button type="submit" disabled={submitting || (captchaEnabled && !captchaToken)} className="w-fit sm:w-auto">
                  {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />}
                  {submitting ? t.order.submitting : t.order.submit}
                </Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
