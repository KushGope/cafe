const CAFE_WHATSAPP_NUMBER = "9100009888";
const CAFE_UPI_ID = "floracafe@okaxis";

export function generateWhatsAppOrderUrl(order) {
  const orderDetails = order.items
    .map(
      (item, index) =>
        `${index + 1}. ${item.name}\n` +
        `   Quantity: ${item.quantity}\n` +
        `   Price: ₹${item.subtotal}`,
    )
    .join("\n\n");

  const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);

  const upiParams = new URLSearchParams({
    pa: CAFE_UPI_ID,
    pn: "Flora Cafe",
    am: Number(order.totalAmount).toFixed(2),
    cu: "INR",
    tn: `Flora Cafe Order ${order.orderToken}`,
  });

  const upiLink = `upi://pay?${upiParams.toString()}`;

  const message = `
Hello Flora Cafe! 👋

I would like to place an order.

ORDER DETAILS
Order Reference: #${order.orderToken}
Customer: Guest
Status: ${order.status}

${orderDetails}

------------------------
Total Items: ${totalItems}
Total Amount: ₹${order.totalAmount}
------------------------

PAYMENT DETAILS
UPI ID: ${CAFE_UPI_ID}
Payment Link:
${upiLink}

Please confirm my order.

Thank you!
`;

  return `https://wa.me/${CAFE_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
