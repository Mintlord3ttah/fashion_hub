import Image from "next/image";
import Link from "next/link";

// Utility Card Components
function ProductCard({
  image,
  title,
  description,
  price,
}: {
  image: string;
  title: string;
  description: string;
  price: string;
}) {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
      <div className="relative h-80 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <span className="absolute top-2 right-2 px-3 py-1 bg-[var(--gold)] text-white text-xs font-montserrat uppercase tracking-wider">
          Limited
        </span>
        <button className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-black text-white text-sm font-montserrat opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Shop Now
        </button>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-playfair font-semibold text-black mb-2">
          {title}
        </h3>
        <p className="text-sm text-gray-600 mb-3">{description}</p>
        <p className="text-[var(--gold)] font-montserrat font-semibold">{price}</p>
      </div>
    </div>
  );
}

function TestimonialCard({
  quote,
  name,
}: {
  quote: string;
  name: string;
}) {
  return (
    <div className="bg-[var(--beige)]/80 backdrop-blur-sm p-8 rounded-lg border-l-4 border-[var(--gold)] transition-all duration-300 hover:shadow-lg">
      <p className="text-lg italic font-montserrat leading-relaxed mb-4">
        "{quote}"
      </p>
      <p className="text-sm font-montserrat font-semibold text-[var(--gold)]">
        — {name}
      </p>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-2xl font-playfair font-bold text-black hover:text-[var(--gold)] transition-colors">
              Elara
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link href="#collection" className="text-sm font-montserrat hover:text-[var(--gold)] transition-colors">
                Collection
              </Link>
              <Link href="#story" className="text-sm font-montserrat hover:text-[var(--gold)] transition-colors">
                Story
              </Link>
              <Link href="#new-arrivals" className="text-sm font-montserrat hover:text-[var(--gold)] transition-colors">
                New Arrivals
              </Link>
              <Link href="#testimonials" className="text-sm font-montserrat hover:text-[var(--gold)] transition-colors">
                Testimonials
              </Link>
              <Link href="/admin" className="text-sm font-montserrat hover:text-[var(--gold)] transition-colors">
                Admin
              </Link>
              <button className="px-4 py-2 bg-black text-white text-sm font-montserrat rounded hover:bg-[var(--gold)] hover:text-black transition-colors">
                Join List
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 bg-transparent/35 min-h-screen flex items-center relative overflow-hidden" id="hero">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#f8f6f1_0%,#e8e2d8_100%)] -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="animate-[fadeIn_1s_ease-out_forwards] delay-[200ms]">
                <p className="text-[var(--gold)] font-montserrat text-sm tracking-[0.2em] uppercase mb-4">
                  Luxury Women's Fashion
                </p>
                <h1 className="font-playfair text-6xl sm:text-7xl lg:text-8xl font-normal leading-[1.1] text-black mb-6">
                  Timeless
                  <br />
                  <span className="text-[var(--gold)]">Elegance</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-md leading-relaxed">
                  Discover curated pieces designed to elevate your presence and define your style.
                </p>
              </div>
              <div className="flex gap-4 animate-[fadeInUp_1s_ease-out_forwards] delay-[400ms]">
                <Link
                  href="#collection"
                  className="px-8 py-4 bg-black text-white font-montserrat text-sm tracking-widest uppercase rounded-none hover:bg-[var(--gold)] hover:text-black transition-colors"
                >
                  Shop Collection
                </Link>
                <Link
                  href="#new-arrivals"
                  className="px-8 py-4 border border-black text-black font-montserrat text-sm tracking-widest uppercase rounded-none hover:bg-black hover:text-white transition-colors"
                >
                  Explore New Arrivals
                </Link>
              </div>
            </div>
            <div className="relative h-[70vh] lg:h-[80vh] animate-[fadeInUp_1s_ease-out_forwards] delay-[600ms]">
              <Image
                src="/backgroundimg.png"
                alt="Luxury Fashion Model"
                fill
                className="object-cover object-center"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs text-gray-400 font-montserrat">
          <span className="animate-bounce">Scroll</span>
          <div className="w-px h-12 bg-black/20" />
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-24 bg-[var(--beige)]" id="collection">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[var(--gold)] font-montserrat text-sm tracking-[0.2em] uppercase mb-4">
              Signature Collection
            </p>
            <h2 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-normal text-black">
              Our Signature Pieces
            </h2>
          </div>
          <p className="text-center text-lg text-gray-600 max-w-2xl mx-auto mb-16">
            Handcrafted designs that embody sophistication and modern femininity.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ProductCard
              image="/Evening_Dress.jfif"
              title="Evening Dress"
              description="Silk chiffon evening gown with intricate beading"
              price="$2,850"
            />
            <ProductCard
              image="/Luxury_Casual_Wear.jfif"
              title="Luxury Casual Wear"
              description="Cashmere blend sweater with tailored trousers"
              price="$1,250"
            />
            <ProductCard
              image="/pearl_blouse.jfif"
              title="Statement Piece"
              description="Embroidered silk blouse with pearl details"
              price="$1,980"
            />
            <ProductCard
              image="/Velvet_coat.jfif"
              title="Limited Edition"
              description="Exclusive velvet coat with fur trim"
              price="$4,200"
            />
            <ProductCard
              image="/leather_bag_shoes.jfif"
              title="Accessories Set"
              description="Leather clutch with matching belt"
              price="$890"
            />
            <ProductCard
              image="/formal_suit.jfif"
              title="Formal Suit"
              description="Tailored wool suit with satin lapels"
              price="$2,400"
            />
            <ProductCard
              image="/summer_dress.jfif"
              title="Summer Dress"
              description="Lightweight linen dress in pastel tones"
              price="$1,100"
            />
            <ProductCard
              image="/earings.jfif"
              title="Jewelry Set"
              description="Pearl necklace with matching earrings"
              price="$5,500"
            />
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-24 bg-black text-white relative" id="story">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div className="mb-12 lg:mb-0">
              <Image
                src="/craft_woman.jfif"
                alt="Craftswoman at work"
                width={500}
                height={500}
                className="rounded-lg shadow-2xl"
              />
            </div>
            <div className="space-y-6">
              <p className="text-[var(--gold)] font-montserrat text-sm tracking-[0.2em] uppercase">
                Our Story
              </p>
              <h2 className="font-playfair text-4xl sm:text-5xl font-normal">
                Crafted for the Extraordinary Woman
              </h2>
              <div className="w-20 h-1 bg-[var(--gold)]" />
              <div className="space-y-6 text-lg text-gray-300 font-montserrat">
                <p>
                  At Elara, we believe luxury is more than fashion - it's a statement of identity.
                  Each piece is designed with precision, using premium fabrics and impeccable
                  tailoring to ensure elegance in every detail.
                </p>
                <p>
                  Our craftsmen bring decades of experience, combining traditional techniques
                  with modern aesthetics to create garments that transcend trends.
                </p>
                <p>
                  We source only the finest materials from around the world, ensuring that
                  every stitch represents our commitment to excellence.
                </p>
                <Link
                  href="/about"
                  className="inline-block mt-4 text-[var(--gold)] hover:text-white transition-colors font-semibold"
                >
                  Learn More →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-24 bg-white" id="new-arrivals">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[var(--gold)] font-montserrat text-sm tracking-[0.2em] uppercase mb-4">
              Fresh Inventory
            </p>
            <h2 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-normal text-black">
              Just In
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <ProductCard
              image="/Spring_blossom_dress.jfif"
              title="Spring Blossom Dress"
              description="Floral print midi dress with ruffle details"
              price="$1,350"
            />
            <ProductCard
              image="/artisan_blazer.jfif"
              title="Artisan Blazer"
              description="Hand-tailored tweed blazer with gold buttons"
              price="$1,890"
            />
            <ProductCard
              image="/Evening_cape.jfif"
              title="Evening Cape"
              description="Silk organza cape with crystal embellishments"
              price="$2,200"
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-50" id="testimonials">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[var(--gold)] font-montserrat text-sm tracking-[0.2em] uppercase mb-4">
              Client Testimonials
            </p>
            <h2 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-normal text-black">
              What Our Clients Say
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              quote="Absolutely stunning pieces. The quality is unmatched and I receive compliments every time I wear them."
              name="Sophia Martinez"
            />
            <TestimonialCard
              quote="I feel confident and elegant every time I wear their designs. Worth every penny."
              name="Emma Thompson"
            />
            <TestimonialCard
              quote="The attention to detail is remarkable. This is true luxury fashion at its finest."
              name="Victoria Chang"
            />
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 bg-[linear-gradient(to_right,#111,#222)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/images/texture-bg.jpg"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="font-playfair text-4xl sm:text-5xl text-white mb-6">
            Elevate Your Wardrobe Today
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join our community of discerning women who appreciate true luxury
            and timeless style.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/shop"
              className="px-8 py-4 bg-[var(--gold)] text-black font-montserrat text-sm tracking-widest uppercase rounded-none hover:bg-[var(--gold-hover)] transition-colors"
            >
              Shop Now
            </Link>
            <Link
              href="#newsletter"
              className="px-8 py-4 border border-white text-white font-montserrat text-sm tracking-widest uppercase rounded-none hover:bg-white hover:text-black transition-colors"
            >
              Join Exclusive List
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-[var(--beige)]" id="newsletter">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-4xl sm:text-5xl font-normal text-black mb-6">
            Stay in Style
          </h2>
          <p className="text-lg text-gray-600 mb-10">
            Be the first to access new collections, exclusive offers, and private sales.
          </p>
          <form className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-6 py-4 bg-white border border-gray-200 font-montserrat text-black placeholder-gray-400 focus:outline-none focus:border-[var(--gold)] transition-colors"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-black text-white font-montserrat text-sm tracking-widest uppercase hover:bg-[var(--gold)] hover:text-black transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Instagram Feed */}
      <section className="py-24 bg-white" id="instagram">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[var(--gold)] font-montserrat text-sm tracking-[0.2em] uppercase mb-4">
              Follow Us
            </p>
            <h2 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-normal text-black">
              Follow Our World of Luxury
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <div
                key={num}
                className="relative h-48 overflow-hidden group cursor-pointer"
              >
                <Image
                  src={`/images/insta-${num}.jpg`}
                  alt={`Instagram ${num}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-sm">View on Instagram</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="font-playfair text-2xl font-bold mb-4">Elara</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Timeless elegance for the modern woman. Handcrafted luxury
                pieces that tell your story.
              </p>
            </div>
            <div>
              <h4 className="font-montserrat text-sm font-semibold text-[var(--gold)] mb-4 uppercase tracking-wider">
                Shop
              </h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="#collection" className="hover:text-[var(--gold)] transition-colors">New Arrivals</Link></li>
                <li><Link href="#collection" className="hover:text-[var(--gold)] transition-colors">Best Sellers</Link></li>
                <li><Link href="#collection" className="hover:text-[var(--gold)] transition-colors">Sale</Link></li>
                <li><Link href="#collection" className="hover:text-[var(--gold)] transition-colors">Categories</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-montserrat text-sm font-semibold text-[var(--gold)] mb-4 uppercase tracking-wider">
                Company
              </h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/about" className="hover:text-[var(--gold)] transition-colors">About Us</Link></li>
                <li><Link href="/careers" className="hover:text-[var(--gold)] transition-colors">Careers</Link></li>
                <li><Link href="/press" className="hover:text-[var(--gold)] transition-colors">Press</Link></li>
                <li><Link href="/contact" className="hover:text-[var(--gold)] transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-montserrat text-sm font-semibold text-[var(--gold)] mb-4 uppercase tracking-wider">
                Support
              </h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/returns" className="hover:text-[var(--gold)] transition-colors">Returns</Link></li>
                <li><Link href="/shipping" className="hover:text-[var(--gold)] transition-colors">Shipping</Link></li>
                <li><Link href="/faq" className="hover:text-[var(--gold)] transition-colors">FAQ</Link></li>
                <li><Link href="/care" className="hover:text-[var(--gold)] transition-colors">Care Guide</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © 2026 Elara. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="https://instagram.com" className="text-gray-400 hover:text-[var(--gold)] transition-colors" aria-label="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://pinterest.com" className="text-gray-400 hover:text-[var(--gold)] transition-colors" aria-label="Pinterest">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/>
                </svg>
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-[var(--gold)] transition-colors" aria-label="Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
