import React, { useState, useEffect, useRef } from 'react';

/*
  LandingPageVinho com modal/zoom para a galeria.
  - Clique em qualquer miniatura para abrir o modal.
  - Use Esc para fechar, ←/→ para navegar entre imagens, clique fora fecha também.
  - O botão de fechar recebe foco ao abrir (melhora acessibilidade).
*/

export default function LandingPageVinho() {
  const images = [
    {
      src:
        'https://github.com/labforense/LP-deli/blob/main/src/Milla%20cala.jpeg,
      alt: 'Garrafa de vinho',
      caption: 'Seleção especial do dia — entregue em até 1 hora em Cabo Frio',
    },
    {
      src:
        'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=800&q=60',
      alt: 'Rolha de vinho',
      caption: 'Detalhes do rótulo e rolha',
    },
    {
      src:
        'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=60',
      alt: 'Vinhas',
      caption: 'Vinhas ao pôr do sol',
    },
    {
      src:
        'https://images.unsplash.com/photo-1517686469429-8a4b8d0f7f5e?auto=format&fit=crop&w=800&q=60',
      alt: 'Taças brindando',
      caption: 'Brinde com amigos',
    },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const closeButtonRef = useRef(null);

  const openModal = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const prevImage = () => {
    setCurrentIndex((i) => (i - 1 + images.length) % images.length);
  };

  const nextImage = () => {
    setCurrentIndex((i) => (i + 1) % images.length);
  };

  // Keyboard handlers: Esc to close, arrows to navigate
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  // Focus the close button when modal opens for accessibility
  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-900 to-black text-white p-6">
      <main className="w-full max-w-5xl bg-black/40 backdrop-blur-sm rounded-2xl p-6 md:p-10">
        <section className="flex flex-col md:flex-row items-center gap-6">
          {/* Coluna da imagem */}
          <div className="md:w-1/2 w-full">
            <figure className="rounded-lg overflow-hidden shadow-lg">
              <img
                src={images[0].src}
                alt={images[0].alt}
                className="w-full h-64 md:h-80 object-cover"
                loading="lazy"
              />
              <figcaption className="text-sm text-gray-300 p-3 bg-black/50">
                {images[0].caption}
              </figcaption>
            </figure>

            {/* Mini-galeria */}
            <div className="mt-4 grid grid-cols-3 gap-2">
              {images.map((img, idx) => (
                <button
                  key={img.src}
                  onClick={() => openModal(idx)}
                  className="group overflow-hidden rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                  aria-label={`Abrir imagem: ${img.alt}`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-20 object-cover transform group-hover:scale-105 transition"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Coluna do texto */}
          <div className="md:w-1/2 w-full text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-serif mb-3">🍷 Vinho Delivery Cabo Frio</h1>
            <p className="text-gray-300 mb-4">
              Entregamos vinhos selecionados direto na sua porta. Escolhemos rótulos premiados e
              garantimos a temperatura ideal. Peça agora e receba em até 1 hora!
            </p>

            <article className="text-gray-200 mb-4">
              <h2 className="font-semibold mb-2">O que oferecemos</h2>
              <ul className="list-disc list-inside text-left md:max-w-md mx-auto md:mx-0">
                <li>Seleção de vinhos tintos, brancos e espumantes</li>
                <li>Promoções diárias e combos para presente</li>
                <li>Entrega rápida e segura em Cabo Frio</li>
              </ul>
            </article>

            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 md:justify-start mt-4">
              <a
                href="https://wa.me/552226464599?text=Olá!%20Quero%20fazer%20um%20pedido."
                className="px-6 py-3 bg-red-700 rounded-xl font-semibold hover:bg-red-600 transition"
              >
                Pedir pelo WhatsApp
              </a>

              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-4 py-2 border border-gray-600 rounded-lg text-sm hover:bg-white/5 transition"
              >
                Voltar ao topo
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Modal / Lightbox */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Visualizador de imagem"
        >
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={closeModal}
          />

          {/* Content */}
          <div className="relative z-10 max-w-4xl w-full">
            <div className="bg-black/90 rounded-lg overflow-hidden shadow-2xl">
              <div className="relative">
                <img
                  src={images[currentIndex].src}
                  alt={images[currentIndex].alt}
                  className="w-full h-[60vh] md:h-[70vh] object-contain bg-black"
                />

                {/* Close button */}
                <button
                  ref={closeButtonRef}
                  onClick={closeModal}
                  className="absolute top-3 right-3 text-white bg-black/40 hover:bg-black/60 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  aria-label="Fechar visualizador"
                >
                  ✕
                </button>

                {/* Prev / Next */}
                <button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white bg-black/30 hover:bg-black/50 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  aria-label="Imagem anterior"
                >
                  ‹
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-12 top-1/2 -translate-y-1/2 text-white bg-black/30 hover:bg-black/50 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  aria-label="Próxima imagem"
                >
                  ›
                </button>
              </div>

              <div className="p-4 text-gray-300">
                <p className="text-sm">{images[currentIndex].caption}</p>
                <p className="text-xs text-gray-400 mt-2">
                  {currentIndex + 1} / {images.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
