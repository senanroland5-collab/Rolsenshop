
export default function HomePage() {
  return (
    <main>
      {/* NAVBAR */}
      <nav className="bg-dark sticky top-0 z-50 px-6 h-16 flex items-center justify-between">
        <div className="font-serif text-2xl font-bold text-white">
          Rolsen<span className="text-gold">shop</span>
        </div>
        <div className="flex gap-3">
          <button className="bg-white/10 text-white text-sm font-medium px-4 py-2 rounded-lg">
            Connexion
          </button>
          <button className="bg-green text-white text-sm font-bold px-4 py-2 rounded-lg">
            Vendre
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="bg-dark min-h-[500px] flex flex-col items-center justify-center text-center px-6 py-16">
        <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/25 text-gold px-4 py-1.5 rounded-full text-xs font-bold mb-6">
          <span className="w-2 h-2 bg-gold rounded-full animate-pulse-dot" />
          🌍 La marketplace de l'Afrique de l'Ouest
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-5">
          Achetez Local,<br />
          Pensez <span className="text-green">Global</span>
        </h1>

        <p className="text-white/55 text-base max-w-md mb-8">
          Des milliers de produits africains authentiques, livrés chez vous partout au Bénin.
          Vendeurs vérifiés, paiement MTN MoMo sécurisé.
        </p>

        <div className="flex gap-3">
          <button className="bg-green text-white font-bold px-7 py-3.5 rounded-xl">
            🛒 Explorer les produits
          </button>
          <button className="border border-white/20 text-white font-semibold px-7 py-3.5 rounded-xl">
            🏪 Devenir vendeur
          </button>
        </div>

        <div className="flex gap-8 pt-8 mt-8 border-t border-white/10">
          <div>
            <div className="text-3xl font-bold text-gold">1 247</div>
            <div className="text-white/40 text-xs mt-1">Acheteurs actifs</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gold">850+</div>
            <div className="text-white/40 text-xs mt-1">Vendeurs vérifiés</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gold">12k+</div>
            <div className="text-white/40 text-xs mt-1">Produits</div>
          </div>
        </div>
      </section>

      {/* PROOF BAR */}
      <div className="bg-green py-3.5 flex justify-center gap-8 flex-wrap px-4">
        <div className="text-white text-sm font-semibold">🚚 Livraison partout au Bénin</div>
        <div className="text-white text-sm font-semibold">✅ Vendeurs vérifiés</div>
        <div className="text-white text-sm font-semibold">📱 MTN MoMo accepté</div>
        <div className="text-white text-sm font-semibold">🔒 Paiement sécurisé</div>
      </div>

      {/* SECTION INFO */}
      <section className="py-16 px-6 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-dark mb-3">Bienvenue sur Rolsenshop</h2>
        <p className="text-gray-500">
          La marketplace qui connecte vendeurs et acheteurs au Bénin et en Afrique de l'Ouest.
          Catalogue produits, paiement MTN MoMo et plus à venir très bientôt 🚀
        </p>
      </section>
    </main>
  )
}