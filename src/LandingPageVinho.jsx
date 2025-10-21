import React from 'react';

export default function LandingPageVinho() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-red-900 to-black text-white text-center p-6">
      <h1 className="text-4xl font-serif mb-4">🍷 Vinho Delivery Cabo Frio</h1>
      <p className="max-w-md text-gray-300 mb-6">
        Entregamos vinhos selecionados direto na sua porta. Peça agora e receba em até 1 hora!
      </p>
      <a
        href="https://wa.me/552226464599?text=Olá! Quero fazer um pedido."
        className="px-6 py-3 bg-red-700 rounded-xl font-semibold hover:bg-red-600 transition"
      >
        Pedir pelo WhatsApp
      </a>
    </div>
  );
}
