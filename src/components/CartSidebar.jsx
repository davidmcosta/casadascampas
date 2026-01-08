"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, Plus, Minus, MapPin } from "lucide-react";
import { useStore } from "../components/lib/store";
import Toast from "./Toast";
import { sanityClient } from "./lib/sanityClient";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { usePathname } from "next/navigation";

export default function CartSidebar() {
  const { cart, isCartOpen, toggleCart, updateQuantity, removeFromCart, clearCart, getTotalPrice } = useStore();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [whatsappContact, setWhatsappContact] = useState(null);
  const [isLoadingContact, setIsLoadingContact] = useState(true);
  const pathname = usePathname();
  const lang = pathname.split("/")[1] || "pt";
  const [t, setT] = useState({});

  useEffect(() => {
    const loadDictionary = async () => {
      try {
        const dict = await getDictionary(lang, "cartSidebar");
        setT(dict || {});
      } catch (error) {
        console.error("Error loading dictionary:", error);
        setT({});
      }
    };
    loadDictionary();
  }, [lang]);

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen]);

  async function fetchWhatsAppContact() {
    try {
      const result = await sanityClient.fetch(
        `*[_type == "whatsappContact" && isActive == true][0]{
          "fullNumber": countryCode + phoneNumber,
          businessName,
          defaultMessage
        }`
      );

      if (!result) {
        console.warn("No active WhatsApp contact found");
        return null;
      }
      setWhatsappContact(result);
      return result;
    } catch (error) {
      console.error("Error fetching WhatsApp contact:", error);
      return null;
    }
  }

  useEffect(() => {
    async function loadContact() {
      setIsLoadingContact(true);
      await fetchWhatsAppContact();
      setIsLoadingContact(false);
    }
    loadContact();
  }, []);

  const handleConfirmOrder = () => {
    if (cart.length === 0 || !whatsappContact) return;

    const businessName = whatsappContact?.businessName || "Business";
    const whatsappNumber = whatsappContact?.fullNumber?.replace(/\D/g, "") || "";
    const orderId = `ORD-${Date.now().toString().slice(-6)}`;

    const orderDetails = cart
      .map((item) => {
        const price = Number(item.price) || 0;
        const color = item.variant?.color ? ` - ${t?.colorLabel || "Color"}: ${item.variant.color}` : "";
        const model3D = item.model3DUrl ? ` - ${t?.model3DLabel || "3D Model"}: Available` : "";
        return ` ${item.title || "Item"} (${item.quantity}x${color}${model3D}) - €${(price * item.quantity).toFixed(2)}`;
      })
      .join("\n");

    const totalPrice = (getTotalPrice() || 0).toFixed(2);

    const baseMessage =
      `*📦 ${t?.orderTitle || "Order"}*\n` +
      `━━━━━━━━━━━━━━━━━━━\n` +
      `👤 *${businessName}*\n` +
      `🆔 *${t?.orderIdLabel || "Order ID"}:* ${orderId}\n\n` +
      `🔹 *${t?.orderDetailsLabel || "Order Details"}:*\n${orderDetails}\n\n` +
      `💰 *${t?.totalLabel || "Total"}:* €${totalPrice}\n`;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const locationUrl = `https://maps.google.com/?q=${position.coords.latitude},${position.coords.longitude}`;
        const message =
          baseMessage +
          `\n📍 *${t?.deliveryLocationLabel || "Delivery Location"}:*\n${locationUrl}\n` +
          `🕒 *${t?.requestTimeLabel || "Request Time"}:* ${new Date().toLocaleString()}\n\n` +
          `📨 _${t?.confirmationNote || "Please confirm this order"}._`;

        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank");
        finalizeOrder();
      },
      (error) => {
        const message =
          baseMessage +
          `\n🕒 *${t?.requestTimeLabel || "Request Time"}:* ${new Date().toLocaleString()}\n\n` +
          `📨 _${t?.noLocationNote || "Couldn't get location. Please provide your address"}._`;

        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank");
        finalizeOrder();
      },
      { timeout: 5000 }
    );
  };

  const finalizeOrder = () => {
    clearCart();
    toggleCart();
    setToastMessage(t?.orderSuccessMessage || "Order request sent successfully!");
    setShowToast(true);
  };

  if (!isCartOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex">
        <div className="flex-1 bg-blackDark/80 backdrop-blur-sm animate-fade-in" onClick={toggleCart} />

        <div className="w-full max-w-md bg-blackVar shadow-2xl animate-slide-in flex flex-col">
          <div className="p-4 border-b border-amberVar/10">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-amberVar">{t?.cartTitle || "Your Cart"}</h2>
              <button
                onClick={toggleCart}
                className="text-amberVar hover:text-amberVar transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {cart.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-amberVar">{t?.emptyCartMessage || "Your cart is empty"}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => {
                  const price = Number(item.price) || 0;
                  return (
                    <div key={item.id} className="flex gap-3 bg-blackDark/50 rounded-lg p-3">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title || "Product"}
                        width={60}
                        height={60}
                        className="rounded-lg object-cover"
                      />

                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-amberVar truncate">{item.title || "Product"}</h3>
                        <p className="text-xs text-amberVar mb-2">{t?.productIdLabel || "ID"}: {item.id}</p>
                        {item.variant?.color && (
                          <p className="text-xs text-amberVar mb-1">
                            {t?.colorLabel || "Color"}: <span className="capitalize">{item.variant.color}</span>
                          </p>
                        )}
                        {item.model3DUrl && (
                          <p className="text-xs text-amberVar mb-1">
                            {t?.model3DLabel || "3D Model"}: Available
                          </p>
                        )}
                        <p className="text-sm font-semibold text-amberVar">€{price.toFixed(2)}</p>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-amberVar hover:text-amberVar transition-colors duration-200"
                        >
                          <X className="w-4 h-4" />
                        </button>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="w-6 h-6 rounded-full bg-amberVar/20 text-amberVar hover:bg-amberVar/30 transition-colors duration-200 flex items-center justify-center"
                          >
                            <Minus className="w-4 h-4" />
                          </button>

                          <span className="text-sm font-medium text-amberVar min-w-[20px] text-center">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-full bg-amberVar/20 text-amberVar hover:bg-amberVar/30 transition-colors duration-200 flex items-center justify-center"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-4 border-t border-amberVar/10">
              <div className="mb-4">
                <div className="flex justify-between items-center text-lg font-semibold text-amberVar">
                  <span>{t?.totalLabel || "Total"}</span>
                  <span>€{(getTotalPrice() || 0).toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleConfirmOrder}
                disabled={isLoadingContact || !whatsappContact}
                className={`w-full bg-amberVar hover:bg-amberHover text-blackDark font-semibold py-3 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 ${
                  isLoadingContact || !whatsappContact ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoadingContact ? (
                  "Loading..."
                ) : (
                  <>
                    <MapPin className="w-4 h-4" />
                    {t?.confirmOrderButton || "Confirm Order"}
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      <Toast message={toastMessage} isVisible={showToast} onClose={() => setShowToast(false)} />
    </>
  );
}