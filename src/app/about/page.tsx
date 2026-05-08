import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 bg-[linear-gradient(135deg,#f8f6f1_0%,#e8e2d8_100%)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[var(--gold)] font-montserrat text-sm tracking-[0.2em] uppercase mb-4">
              Our Story
            </p>
            <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-normal text-black mb-6">
              Crafted for the <span className="text-[var(--gold)]">Extraordinary</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              At Elara, we believe luxury is more than fashion — it's a statement of identity.
            </p>
          </div>
          <div className="relative h-[50vh] max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/craft_woman.jfif"
              alt="Craftswoman at work"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 bg-[var(--beige)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-playfair text-3xl sm:text-4xl mb-6 text-black">
                Our Mission
              </h2>
              <div className="w-20 h-1 bg-[var(--gold)] mb-8" />
              <div className="space-y-6 text-lg text-gray-700 font-montserrat">
                <p>
                  Every piece at Elara is designed with precision, using premium fabrics
                  and impeccable tailoring to ensure elegance in every detail.
                </p>
                <p>
                  Our craftsmen bring decades of experience, combining traditional
                  techniques with modern aesthetics to create garments that transcend trends.
                </p>
                <p>
                  We source only the finest materials from around the world, ensuring that
                  every stitch represents our commitment to excellence.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="p-6 bg-white rounded-xl shadow-lg">
                  <h3 className="font-playfair text-2xl text-[var(--gold)] mb-2">10+</h3>
                  <p className="text-sm text-gray-600">Years of Experience</p>
                </div>
                <div className="p-6 bg-white rounded-xl shadow-lg">
                  <h3 className="font-playfair text-2xl text-[var(--gold)] mb-2">500+</h3>
                  <p className="text-sm text-gray-600">Premium Fabrics</p>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="p-6 bg-white rounded-xl shadow-lg">
                  <h3 className="font-playfair text-2xl text-[var(--gold)] mb-2">98%</h3>
                  <p className="text-sm text-gray-600">Customer Satisfaction</p>
                </div>
                <div className="p-6 bg-white rounded-xl shadow-lg">
                  <h3 className="font-playfair text-2xl text-[var(--gold)] mb-2">24/7</h3>
                  <p className="text-sm text-gray-600">Customer Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[var(--gold)] font-montserrat text-sm tracking-[0.2em] uppercase mb-4">
              What We Stand For
            </p>
            <h2 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-normal text-black">
              Our Values
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-[var(--beige)] rounded-xl text-center">
              <div className="w-16 h-16 bg-[var(--gold)]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[var(--gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-playfair text-xl mb-4 text-black">Quality</h3>
              <p className="text-gray-600 font-montserrat text-sm">
                Uncompromising attention to detail in every stitch, every seam, every design.
              </p>
            </div>
            <div className="p-8 bg-[var(--beige)] rounded-xl text-center">
              <div className="w-16 h-16 bg-[var(--gold)]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[var(--gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path d="M12 2a10 10 0 100 0h5.586a1 1 0 01.707.293l7 7a1 1 0 01-1.414 1.414L17.586 15H12a2 2 0 01-2-2V8a2 2 0 014 0v5.586l5.293-5.293a1 1 0 011.414 1.414L13.414 17H8a4 4 0 01-4-4V8a4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="font-playfair text-xl mb-4 text-black">Innovation</h3>
              <p className="text-gray-600 font-montserrat text-sm">
                Blending traditional craftsmanship with contemporary design for timeless pieces.
              </p>
            </div>
            <div className="p-8 bg-[var(--beige)] rounded-xl text-center">
              <div className="w-16 h-16 bg-[var(--gold)]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[var(--gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path d="M4.318 6.264a.75.75 0 010-1.063L4.732 3.76a.75.75 0 011.063 0l.393.393.393-.393a.75.75 0 011.063 0l.393.393.393-.393a.75.75 0 011.063 0l2.682 2.682a.75.75 0 010 1.063l-.393.393.393.393a.75.75 0 010 1.063l-.393.393.393.393a.75.75 0 11-1.063 0l-.393-.393-.393.393a.75.75 0 01-1.063 0L4.318 6.264z" />
                </svg>
              </div>
              <h3 className="font-playfair text-xl mb-4 text-black">Sustainability</h3>
              <p className="text-gray-600 font-montserrat text-sm">
                Committed to ethical sourcing and sustainable practices in every step.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-4xl sm:text-5xl mb-6">
            Join the Elara Family
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Experience luxury fashion that defines your unique style and elevates your wardrobe.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/shop"
              className="px-8 py-4 bg-[var(--gold)] text-black font-montserrat text-sm tracking-widest uppercase hover:bg-[var(--gold-hover)] transition-colors"
            >
              Shop Now
            </Link>
            <Link
              href="#newsletter"
              className="px-8 py-4 border border-white text-white font-montserrat text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-colors"
            >
              Join Exclusive List
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
