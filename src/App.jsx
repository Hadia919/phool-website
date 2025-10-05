import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft, ArrowRight } from "lucide-react";

export default function App() {
// --- Splash screen with unmute option ---
const [showSplash, setShowSplash] = useState(true);
const [muted, setMuted] = useState(true);
const videoRef = useRef(null);

useEffect(() => {
  const t = setTimeout(() => setShowSplash(false), 10000); // stay for 10s total
  return () => clearTimeout(t);
}, []);



  // --- 20 images exactly as you listed ---
  const collections = [
    { title: "black", img: "/phool-images/black.jpg", price: "Rs 3,000" },
    { title: "bloom", img: "/phool-images/bloom.jpg", price: "Rs 3,200" },
    { title: "blue", img: "/phool-images/blue.jpg", price: "Rs 3,400" },
    { title: "browny", img: "/phool-images/browny.jpg", price: "Rs 2,900" },
    { title: "floral", img: "/phool-images/floral.jpg", price: "Rs 3,600" },
    { title: "frock3", img: "/phool-images/frock3.jpg", price: "Rs 3,100" },
    { title: "kameez5", img: "/phool-images/kameez5.jpg", price: "Rs 3,300" },
    { title: "kameez6", img: "/phool-images/kameez6.jpg", price: "Rs 3,350" },
    { title: "kameez7", img: "/phool-images/kameez7.jpg", price: "Rs 3,400" },
    { title: "kurta2", img: "/phool-images/kurta2.jpg", price: "Rs 2,900" },
  ];

  const gallery = [
    { title: "kurta4", img: "/phool-images/kurta4.jpg", price: "Rs 3,100" },
    { title: "mode1", img: "/phool-images/mode1.jpg", price: "Rs 3,500" },
    { title: "pink", img: "/phool-images/pink.jpg", price: "Rs 3,050" },
    { title: "season", img: "/phool-images/season.jpg", price: "Rs 3,250" },
    { title: "spring", img: "/phool-images/spring.jpg", price: "Rs 3,000" },
    { title: "summer", img: "/phool-images/summer.jpg", price: "Rs 3,100" },
    { title: "white", img: "/phool-images/white.jpg", price: "Rs 3,200" },
    { title: "winter", img: "/phool-images/winter.jpg", price: "Rs 3,600" },
    { title: "yellow", img: "/phool-images/yellow.jpg", price: "Rs 3,050" },
    { title: "sky", img: "/phool-images/sky.jpg", price: "Rs 3,150" },
  ];

  // Modal
  const [modalImages, setModalImages] = useState(null);
  const [modalIndex, setModalIndex] = useState(0);

  // Contact form state
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");

  function openModal(list, index) {
    setModalImages(list);
    setModalIndex(index);
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    setModalImages(null);
    document.body.style.overflow = "auto";
  }
  function prev() {
    setModalIndex((i) => (i - 1 + modalImages.length) % modalImages.length);
  }
  function next() {
    setModalIndex((i) => (i + 1) % modalImages.length);
  }

  // Order Now → Gmail compose
  function orderNow(item) {
    const subject = `Order: ${item.title}`;
    const body = `Hello,\n\nI would like to order:\n${item.title}\nPrice: ${item.price}\nQuantity: 1\n\nName:\nPhone:\nAddress:\n`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=phoolclothing20@gmail.com&su=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, "_blank");
  }

  // Contact form → Gmail compose
  function handleContactSubmit(e) {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) {
      alert("Please fill name, email and message.");
      return;
    }
    const subject = `Website Contact from ${contactName}`;
    const body = `Name: ${contactName}\nEmail: ${contactEmail}\n\nMessage:\n${contactMessage}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=phoolclothing20@gmail.com&su=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, "_blank");
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      

        {/* --- SPLASH SCREEN WITH SOUND CONTROL --- */}
<AnimatePresence>
  {showSplash && (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center bg-pink-700 z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
    >
      <motion.video
        ref={videoRef}
        src="/phool-images/logo.mp4"
        poster="/phool-images/logo.png"
        autoPlay
        muted={muted}
        playsInline
        onEnded={() => {
          // Wait 1s before fade-out
          setTimeout(() => setShowSplash(false), 1000);
        }}
        className="w-[260px] md:w-[420px] lg:w-[520px] h-auto rounded-xl shadow-lg"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      />

      {/* Unmute Button */}
      {muted && (
        <button
          onClick={() => {
            videoRef.current.muted = false;
            setMuted(false);
          }}
          className="mt-6 bg-white text-pink-700 px-6 py-2 rounded-full font-semibold shadow-md hover:bg-pink-100 transition"
        >
          🔊 Tap to Unmute
        </button>
      )}
    </motion.div>
  )}
</AnimatePresence>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#home" className="text-2xl font-bold text-pink-600">Phool</a>
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <a href="#collections" className="hover:text-pink-600">Collections</a>
            <a href="#gallery" className="hover:text-pink-600">Gallery</a>
            <a href="#about" className="hover:text-pink-600">About</a>
            <a href="#contact" className="hover:text-pink-600">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <motion.h1
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900"
          >
            Phool  <br /> Wear Nature, Wear Elegance.
          </motion.h1>
          <p className="mt-6 text-gray-600 max-w-lg">
            Handcrafted clothing inspired by nature — sustainable, elegant, and ethically made.
          </p>
        </div>
        <motion.img
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7 }}
          src="/phool-images/summer.jpg"
          alt="hero"
          className="rounded-2xl shadow-xl w-full object-cover max-h-96"
        />
      </section>

      {/* Collections */}
      <section id="collections" className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Featured Collections</h2>
          <p className="mt-2 text-gray-600">Our selected favorites.</p>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map((p, i) => (
              <motion.div
                key={p.img}
                whileHover={{ scale: 1.03 }}
                className="rounded-xl overflow-hidden shadow-lg bg-white cursor-pointer"
                onClick={() => openModal(collections, i)}
              >
                <img src={p.img} alt={p.title} className="w-full h-64 object-cover" />
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold capitalize">{p.title}</h3>
                    <p className="text-sm text-gray-500">Handcrafted</p>
                  </div>
                  <div className="text-right">
                    <div className="text-pink-600 font-semibold">{p.price}</div>
                    <button
                      onClick={(e) => { e.stopPropagation(); orderNow(p); }}
                      className="mt-2 px-3 py-1 text-sm bg-pink-600 text-white rounded-md"
                    >
                      Order Nows
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Gallery</h2>
        <p className="mt-2 text-gray-600">A glimpse of Phool in everyday life.</p>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.map((p, i) => (
            <motion.div
              key={p.img}
              whileHover={{ scale: 1.03 }}
              className="rounded-xl overflow-hidden shadow-lg bg-white cursor-pointer"
              onClick={() => openModal(gallery, i)}
            >
              <img src={p.img} alt={p.title} className="w-full h-64 object-cover" />
              <div className="p-3 flex items-center justify-between">
                <div className="capitalize font-medium">{p.title}</div>
                <div>
                  <div className="text-pink-600 font-semibold">{p.price}</div>
                  <button
                    onClick={(e) => { e.stopPropagation(); orderNow(p); }}
                    className="mt-2 px-3 py-1 text-sm bg-pink-600 text-white rounded-md"
                  >
                    Order Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {modalImages && (
          <motion.div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="relative max-w-4xl w-full"
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={closeModal} className="absolute top-3 right-3 bg-white rounded-full p-2 shadow"><X /></button>
              <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow"><ArrowLeft /></button>
              <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow"><ArrowRight /></button>
              <motion.img
                key={modalImages[modalIndex].img}
                src={modalImages[modalIndex].img}
                alt={modalImages[modalIndex].title}
                className="w-full max-h-[80vh] object-contain rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}
              />
              <div className="mt-4 text-white text-center">
                <h3 className="text-xl font-bold capitalize">{modalImages[modalIndex].title}</h3>
                <p className="text-pink-300 font-semibold">{modalImages[modalIndex].price}</p>
                <button onClick={() => orderNow(modalImages[modalIndex])} className="mt-3 px-5 py-2 bg-pink-600 text-white rounded-md shadow">Order Now</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* About */}
      <section id="about" className="bg-pink-50 py-12">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">About Phool</h2>
          <p className="mt-4 text-gray-700">
            Phool is a slow-fashion label celebrating craft and sustainable fabrics — made with care.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">Contact</h2>
        <form onSubmit={handleContactSubmit} className="mt-6 grid gap-3 max-w-xl mx-auto">
          <input value={contactName} onChange={(e) => setContactName(e.target.value)} type="text" placeholder="Your name" className="p-3 border rounded-lg" required />
          <input value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} type="email" placeholder="Your email" className="p-3 border rounded-lg" required />
          <textarea value={contactMessage} onChange={(e) => setContactMessage(e.target.value)} rows="5" placeholder="Your message" className="p-3 border rounded-lg" required />
          <button type="submit" className="px-6 py-3 bg-pink-600 text-white rounded-lg font-semibold">Send Message</button>
        </form>
      </section>

      <footer className="bg-gray-900 text-gray-400 py-8 text-center">
        <p>© {new Date().getFullYear()} Phool. All rights reserved.</p>
      </footer>
    </div>
  );
}



