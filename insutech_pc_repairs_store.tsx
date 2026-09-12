import React, { useState, useMemo, useEffect } from 'react';
import { 
  Wrench, 
  Cpu, 
  HardDrive, 
  ShieldCheck, 
  Zap, 
  ShoppingCart, 
  Search, 
  Filter, 
  CheckCircle, 
  AlertTriangle, 
  MessageCircle, 
  Phone, 
  Clock, 
  MapPin, 
  X, 
  Plus, 
  Minus, 
  Trash2, 
  ExternalLink,
  ChevronRight,
  Monitor,
  Fan,
  Layers,
  Sparkles,
  ArrowRight,
  Send,
  Check
} from 'lucide-react';

const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: 'SSD Kingston NV2 1TB NVMe PCIe 4.0',
    category: 'Almacenamiento',
    priceGs: 520000,
    priceUsd: 70,
    stock: 12,
    badge: 'Más Vendido',
    image: 'https://images.unsplash.com/photo-1597872250970-45d82054c7d0?w=500&auto=format&fit=crop&q=60',
    specs: 'Lectura 3500MB/s | Escritura 2100MB/s'
  },
  {
    id: 2,
    name: 'RAM Corsair Vengeance LPX 16GB (2x8GB) DDR4 3200MHz',
    category: 'Memoria RAM',
    priceGs: 380000,
    priceUsd: 52,
    stock: 8,
    badge: 'Oferta',
    image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=500&auto=format&fit=crop&q=60',
    specs: 'Kit Dual Channel | Disipador Aluminio'
  },
  {
    id: 3,
    name: 'Fuente Corsair RM750e 750W 80 Plus Gold Modular',
    category: 'Fuentes',
    priceGs: 950000,
    priceUsd: 130,
    stock: 5,
    badge: 'Recomendado',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=500&auto=format&fit=crop&q=60',
    specs: 'ATX 3.0 Ready | PCIe 5.0 | Silenciosa'
  },
  {
    id: 4,
    name: 'NVIDIA GeForce RTX 4060 Ti 8GB GDDR6',
    category: 'Tarjetas de Video',
    priceGs: 3450000,
    priceUsd: 470,
    stock: 3,
    badge: 'Top Gaming',
    image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=500&auto=format&fit=crop&q=60',
    specs: 'DLSS 3 | Ray Tracing | Dual Fan'
  },
  {
    id: 5,
    name: 'Kit Pasta Térmica Arctic MX-4 (4g) + Limpiador',
    category: 'Mantenimiento',
    priceGs: 85000,
    priceUsd: 12,
    stock: 25,
    badge: 'Esencial',
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=500&auto=format&fit=crop&q=60',
    specs: 'Alta conductividad | Durabilidad 8 años'
  },
  {
    id: 6,
    name: 'Mouse Gamer Logitech G502 Hero 25K DPI',
    category: 'Periféricos',
    priceGs: 320000,
    priceUsd: 44,
    stock: 10,
    badge: 'Populares',
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&auto=format&fit=crop&q=60',
    specs: '11 Botones Programables | Pesos Ajustables'
  },
  {
    id: 7,
    name: 'Cooler CPU DeepCool AK400 Digital Display',
    category: 'Refrigeración',
    priceGs: 390000,
    priceUsd: 53,
    stock: 7,
    badge: 'Nuevo',
    image: 'https://images.unsplash.com/photo-1544652478-6653e09f18a2?w=500&auto=format&fit=crop&q=60',
    specs: 'Pantalla de temp en tiempo real | 220W TDP'
  },
  {
    id: 8,
    name: 'Teclado Mecánico Redragon Kumara K552 RGB',
    category: 'Periféricos',
    priceGs: 280000,
    priceUsd: 38,
    stock: 14,
    badge: 'Económico',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=60',
    specs: 'Switches Red | Anti-ghosting | TKL Compacto'
  }
];

const SERVICES = [
  {
    id: 'limpieza-profunda',
    title: 'Mantenimiento Preventivo & Limpieza Profunda',
    icon: Fan,
    priceGs: '150.000 Gs.',
    priceUsd: '$20',
    desc: 'Desarme completo, limpieza ultrasónica de componentes, cambio de pasta térmica de alta conductividad (Arctic MX-4/5) y optimización de flujo de aire.',
    features: ['Cambio de pasta térmica premium', 'Limpieza de radiadores y fanes', 'Baño dieléctrico (si requiere)', 'Informe térmico antes/después']
  },
  {
    id: 'diagnostico-reparacion',
    title: 'Diagnóstico Técnico & Reparación de Hardware',
    icon: Wrench,
    priceGs: 'Desde 100.000 Gs.',
    priceUsd: 'Desde $14',
    desc: 'Detección precisa de fallas electromecánicas, reemplazo o reparación de componentes quemados, cortos en placa madre, pines doblados y fallas de encendido.',
    features: ['Pruebas con osciloscopio y multímetro', 'Micro-soldadura básica', 'Diagnóstico de fuente y memorias', 'Garantía por reparación']
  },
  {
    id: 'upgrades-armado',
    title: 'Armado Personalizado & Upgrades',
    icon: Cpu,
    priceGs: '200.000 Gs.',
    priceUsd: '$27',
    desc: 'Ensamblaje desde cero con ruteo de cables profesional (Cable Management), instalación de drivers actualizados y stress test de estabilidad.',
    features: ['Gestión de cables limpia', 'Actualización de BIOS/Firmware', 'Stress test 24h (FurMark/Cinebench)', 'Asesoría de componentes']
  },
  {
    id: 'optimizacion-so',
    title: 'Optimización de SO & Eliminación de Virus',
    icon: Zap,
    priceGs: '120.000 Gs.',
    priceUsd: '$16',
    desc: 'Limpieza profunda de malware, eliminación de bloatware, configuración de inicio rápido, optimización de registro y boost de FPS para juegos.',
    features: ['Formateo e instalación limpia Windows 11', 'Back up preventivo de datos', 'Licenciamiento y Drivers oficiales', 'Tuning para bajo latency']
  }
];

const DIAGNOSTIC_SYMPTOMS = [
  {
    id: 'calentamiento',
    symptom: 'La PC se apaga sola o los ventiladores suenan muy fuerte',
    diagnosis: 'Sobrecalentamiento crítico de CPU/GPU o pasta térmica seca/cristalizada.',
    solution: 'Servicio de Mantenimiento Preventivo y Limpieza Profunda con cambio de pasta térmica.',
    recommendedService: 'limpieza-profunda',
    recommendedProductCategory: 'Mantenimiento'
  },
  {
    id: 'lenta',
    symptom: 'La computadora tarda minutos en encender y todo abre lento',
    diagnosis: 'Cuello de botella en el disco duro mecánico tradicional (HDD) o memoria RAM saturada.',
    solution: 'Migración/Clonación a un disco SSD NVMe de alta velocidad + Ampliación de RAM.',
    recommendedService: 'upgrades-armado',
    recommendedProductCategory: 'Almacenamiento'
  },
  {
    id: 'pantalla-azul',
    symptom: 'Aparecen pantallas azules (BSOD) o la PC se congela al jugar',
    diagnosis: 'Inestabilidad en Memoria RAM, drivers corruptos o degradación en la fuente de poder.',
    solution: 'Diagnóstico express con MemTest86, test de fuente y reinstalación limpia optimizada.',
    recommendedService: 'diagnostico-reparacion',
    recommendedProductCategory: 'Memoria RAM'
  },
  {
    id: 'sin-video',
    symptom: 'Enciende las luces y ventiladores pero la pantalla no da señal (No Video)',
    diagnosis: 'Fallo de POST por estática en RAM, bios corrupto o falla de tarjeta gráfica / motherboard.',
    solution: 'Revisión técnica de componentes y limpieza de contactos dieléctricos.',
    recommendedService: 'diagnostico-reparacion',
    recommendedProductCategory: 'Tarjetas de Video'
  },
  {
    id: 'ruido-electrico',
    symptom: 'Chispazos, olor a quemado o reinicios repentinos bajo carga',
    diagnosis: 'Falla severa en la fuente de alimentación (PSU) o variaciones de voltaje peligrosas.',
    solution: 'Reemplazo inmediato por una Fuente Certificada 80 Plus con protecciones activas.',
    recommendedService: 'diagnostico-reparacion',
    recommendedProductCategory: 'Fuentes'
  }
];

export default function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Interactive Express Diagnostic State
  const [selectedSymptomId, setSelectedSymptomId] = useState(null);
  
  // Modal State for Booking
  const [bookingService, setBookingService] = useState(null);
  const [bookingForm, setBookingForm] = useState({ name: '', phone: '', pcSpecs: '', message: '' });

  // Filtered Products
  const categories = ['Todas', 'Almacenamiento', 'Memoria RAM', 'Fuentes', 'Tarjetas de Video', 'Refrigeración', 'Periféricos', 'Mantenimiento'];

  const filteredProducts = useMemo(() => {
    return INITIAL_PRODUCTS.filter(product => {
      const matchesCategory = selectedCategory === 'Todas' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            product.specs.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Cart Functions
  const addToCart = (product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id, delta) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      });
    });
  };

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const totalCartGs = cart.reduce((acc, item) => acc + (item.priceGs * item.quantity), 0);
  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // WhatsApp Checkout Helper
  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;
    let text = `*¡Hola InsuTech! Quiero realizar el pedido de los siguientes componentes:*\n\n`;
    cart.forEach((item, index) => {
      text += `${index + 1}. *${item.name}* x${item.quantity} - Gs. ${(item.priceGs * item.quantity).toLocaleString('es-PY')}\n`;
    });
    text += `\n*Total estimado:* Gs. ${totalCartGs.toLocaleString('es-PY')}\n`;
    text += `\nQuedo a la espera de confirmación para método de envío/pago.`;
    
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/595981000000?text=${encodedText}`, '_blank');
  };

  // WhatsApp Service Booking Helper
  const handleServiceSubmit = (e) => {
    e.preventDefault();
    if (!bookingService) return;
    
    let text = `*¡Hola InsuTech! Solicito información / turno para el servicio:*\n`;
    text += `🛠️ *Servicio:* ${bookingService.title}\n`;
    text += `👤 *Nombre:* ${bookingForm.name}\n`;
    text += `📱 *Teléfono:* ${bookingForm.phone}\n`;
    text += `💻 *Especificaciones PC:* ${bookingForm.pcSpecs || 'No especificadas'}\n`;
    text += `💬 *Detalles del problema:* ${bookingForm.message || 'Sin observaciones'}\n`;

    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/595981000000?text=${encodedText}`, '_blank');
    setBookingService(null);
    setBookingForm({ name: '', phone: '', pcSpecs: '', message: '' });
  };

  // Active Diagnostic Object
  const activeDiagnostic = DIAGNOSTIC_SYMPTOMS.find(s => s.id === selectedSymptomId);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      {}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <Cpu className="w-6 h-6 text-slate-950 font-bold" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-wider bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent">
                INSU<span className="text-cyan-400">TECH</span>
              </span>
              <span className="block text-[10px] tracking-widest text-cyan-400 uppercase font-semibold">
                Hardware & Repair Studio
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#servicios" className="hover:text-cyan-400 transition-colors">Servicios</a>
            <a href="#tienda" className="hover:text-cyan-400 transition-colors">Tienda</a>
            <a href="#diagnostico" className="hover:text-cyan-400 transition-colors flex items-center gap-1 text-cyan-400 font-semibold bg-cyan-950/60 border border-cyan-800/50 px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              Diagnóstico Express
            </a>
            <a href="#contacto" className="hover:text-cyan-400 transition-colors">Contacto</a>
          </nav>

          {/* Cart Button & Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-slate-200 hover:text-cyan-400 transition-all shadow-md group"
              aria-label="Abrir carrito"
            >
              <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs w-5.5 h-5.5 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  {totalCartCount}
                </span>
              )}
            </button>

            <a
              href="https://wa.me/595981000000"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-emerald-900/30"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Directo</span>
            </a>
          </div>

        </div>
      </header>

      <main>
        {}
        <section className="relative overflow-hidden py-20 lg:py-28 border-b border-slate-800/60 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
          {/* Neon Glow backdrop effect */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-semibold tracking-wide">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  Garantía & Soporte Técnico Certificado
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
                  Mantenimiento Experto & <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400 bg-clip-text text-transparent">Poder de Hardware</span>
                </h1>

                <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                  Optimizamos tu computadora al máximo rendimiento. Diagnósticos precisos, limpieza profunda con pasta térmica premium y componentes de alta gama en stock.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                  <a
                    href="#servicios"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-cyan-500/25 transition-all group"
                  >
                    <Wrench className="w-5 h-5 text-slate-950 group-hover:rotate-45 transition-transform" />
                    Solicitar Servicio Técnico
                  </a>
                  <a
                    href="#tienda"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold px-7 py-3.5 rounded-xl transition-all"
                  >
                    Ver Catálogo de Tienda
                    <ChevronRight className="w-4 h-4 text-cyan-400" />
                  </a>
                </div>

                {/* Features Badges */}
                <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-800/80 max-w-xl mx-auto lg:mx-0">
                  <div>
                    <p className="text-2xl font-bold text-white">100%</p>
                    <p className="text-xs text-slate-400">Repuestos Originales</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-cyan-400">24h - 48h</p>
                    <p className="text-xs text-slate-400">Tiempo de Servicio</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">+1,500</p>
                    <p className="text-xs text-slate-400">PCs Reparadas</p>
                  </div>
                </div>
              </div>

              {/* Decorative Tech Graphic */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/90 shadow-2xl shadow-cyan-950/40 group">
                  <img 
                    src="https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&auto=format&fit=crop&q=80" 
                    alt="Servicio técnico PC Gaming" 
                    className="w-full h-96 object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                  
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl backdrop-blur-md bg-slate-950/80 border border-slate-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></div>
                      <div>
                        <p className="text-xs text-slate-400">Laboratorio Activo</p>
                        <p className="text-sm font-semibold text-white">Recepción de Equipos Disponible</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-cyan-400 border border-cyan-500/30 px-2 py-1 rounded bg-cyan-950">
                      SYS_STATUS: OK
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {}
        <section id="diagnostico" className="py-16 bg-slate-900/50 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 text-xs font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                Herramienta Interactiva
              </div>
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                Diagnóstico Express de tu PC
              </h2>
              <p className="text-slate-400 mt-2">
                Selecciona la falla principal de tu equipo y obtén una estimación del problema y solución adecuada al instante.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Symptoms List */}
              <div className="lg:col-span-6 space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  ¿Qué problema presenta tu equipo?
                </p>
                {DIAGNOSTIC_SYMPTOMS.map((item) => {
                  const isSelected = selectedSymptomId === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedSymptomId(item.id)}
                      className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 ${
                        isSelected 
                          ? 'bg-cyan-950/70 border-cyan-500 text-white shadow-lg shadow-cyan-950/50' 
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-850'
                      }`}
                    >
                      <AlertTriangle className={`w-5 h-5 shrink-0 mt-0.5 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`} />
                      <div className="flex-1">
                        <span className="text-sm font-medium block">{item.symptom}</span>
                      </div>
                      <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'rotate-90 text-cyan-400' : 'text-slate-600'}`} />
                    </button>
                  );
                })}
              </div>

              {/* Diagnostic Result Card */}
              <div className="lg:col-span-6">
                <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 sm:p-8 relative overflow-hidden min-h-[360px] flex flex-col justify-between shadow-xl">
                  {activeDiagnostic ? (
                    <>
                      <div>
                        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-emerald-400" /> Diagnóstico Estimado
                          </span>
                          <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full font-medium">
                            Resultado Inmediato
                          </span>
                        </div>

                        <div className="mt-6 space-y-4">
                          <div>
                            <h4 className="text-xs uppercase text-slate-400 font-semibold">Causa Probable:</h4>
                            <p className="text-lg font-semibold text-white mt-1">
                              {activeDiagnostic.diagnosis}
                            </p>
                          </div>

                          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                            <h4 className="text-xs uppercase text-cyan-400 font-semibold flex items-center gap-1.5">
                              <Wrench className="w-3.5 h-3.5" /> Recomendación del Técnico:
                            </h4>
                            <p className="text-sm text-slate-300 mt-1">
                              {activeDiagnostic.solution}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row gap-3">
                        <button
                          onClick={() => {
                            const serv = SERVICES.find(s => s.id === activeDiagnostic.recommendedService);
                            if (serv) setBookingService(serv);
                          }}
                          className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm px-5 py-3 rounded-xl transition-all shadow-md"
                        >
                          Solicitar Servicio Recomendado
                        </button>
                        <a
                          href="#tienda"
                          onClick={() => setSelectedCategory(activeDiagnostic.recommendedProductCategory)}
                          className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold px-4 py-3 rounded-xl transition-all"
                        >
                          Ver Repuestos
                        </a>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center my-auto py-12 text-slate-500">
                      <Cpu className="w-12 h-12 stroke-1 text-slate-600 mb-3 animate-pulse" />
                      <p className="text-base font-medium text-slate-400">
                        Selecciona un síntoma de la lista
                      </p>
                      <p className="text-xs text-slate-500 max-w-xs mt-1">
                        Analizaremos las fallas típicas de hardware y software para brindarte la mejor solución.
                      </p>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </section>

        {}
        <section id="servicios" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
                Soluciones Integrales
              </span>
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl mt-1">
                Servicios de Mantenimiento & Taller
              </h2>
            </div>
            <p className="text-slate-400 max-w-md mt-4 md:mt-0 text-sm">
              Trabajos respaldados con reporte de diagnóstico térmico y de rendimiento. Garantía escrita de servicio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SERVICES.map((service) => {
              const Icon = service.icon;
              return (
                <div 
                  key={service.id}
                  className="bg-slate-900/90 rounded-2xl border border-slate-800 hover:border-cyan-500/40 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-cyan-950/20 group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-cyan-950 border border-cyan-800/60 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="text-right">
                        <span className="text-xl font-bold text-white block">{service.priceGs}</span>
                        <span className="text-xs text-slate-400">({service.priceUsd})</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                      {service.desc}
                    </p>

                    <ul className="mt-6 space-y-2">
                      {service.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                          <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => setBookingService(service)}
                    className="mt-8 w-full inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-200 font-semibold text-sm py-3 rounded-xl transition-all"
                  >
                    Agendar Turno / Presupuesto
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {}
        <section id="tienda" className="py-20 bg-slate-900/40 border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
                Catálogo de Hardware
              </span>
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl mt-1">
                Tienda de Componentes & Repuestos
              </h2>
              <p className="text-slate-400 text-sm mt-2">
                Productos 100% nuevos con garantía oficial. Envíos a todo el país.
              </p>
            </div>

            {/* Controls: Search and Categories */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
              
              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      selectedCategory === cat
                        ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                        : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar componente..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-slate-900 rounded-2xl border border-slate-800 hover:border-slate-700 overflow-hidden flex flex-col justify-between transition-all hover:shadow-xl group"
                  >
                    <div>
                      {/* Product Image */}
                      <div className="relative h-48 bg-slate-950 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                        />
                        <span className="absolute top-3 left-3 bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md">
                          {product.badge}
                        </span>
                        <span className="absolute bottom-3 right-3 bg-slate-950/80 text-slate-400 text-[10px] px-2 py-0.5 rounded font-mono border border-slate-800">
                          Stock: {product.stock}
                        </span>
                      </div>

                      {/* Details */}
                      <div className="p-5">
                        <span className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wider block mb-1">
                          {product.category}
                        </span>
                        <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug">
                          {product.name}
                        </h3>
                        <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                          {product.specs}
                        </p>
                      </div>
                    </div>

                    {/* Footer / Buy */}
                    <div className="p-5 pt-0">
                      <div className="flex items-baseline justify-between mb-4">
                        <div>
                          <span className="text-lg font-extrabold text-white">
                            Gs. {product.priceGs.toLocaleString('es-PY')}
                          </span>
                          <span className="text-xs text-slate-500 block">
                            (${product.priceUsd} USD)
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => addToCart(product)}
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs py-2.5 rounded-xl transition-all shadow-md"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Añadir al Carrito
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-slate-900/50 rounded-2xl border border-slate-800">
                <Search className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                <p className="text-slate-300 font-semibold">No se encontraron productos</p>
                <p className="text-xs text-slate-500 mt-1">Prueba seleccionando otra categoría o término de búsqueda.</p>
              </div>
            )}

          </div>
        </section>

        {}
        <footer id="contacto" className="bg-slate-950 border-t border-slate-800 pt-16 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
              
              {/* Brand Col */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center text-slate-950 font-bold">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <span className="text-lg font-extrabold text-white tracking-wider">
                    INSU<span className="text-cyan-400">TECH</span>
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Centro especializado en optimización de alto rendimiento, reparación de microelectrónica PC y venta de componentes de vanguardia.
                </p>
              </div>

              {/* Direct Info */}
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Ubicación & Taller</h4>
                <ul className="space-y-3 text-xs text-slate-400">
                  <li className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>Av. Palma e/ 14 de Mayo - Asunción, Paraguay</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>+595 981 000 000</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Lun a Vie: 08:30 - 18:00 hs | Sáb: 09:00 - 13:00 hs</span>
                  </li>
                </ul>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Navegación</h4>
                <ul className="space-y-2 text-xs text-slate-400">
                  <li><a href="#servicios" className="hover:text-cyan-400">Mantenimiento Preventivo</a></li>
                  <li><a href="#servicios" className="hover:text-cyan-400">Diagnóstico Electrónico</a></li>
                  <li><a href="#tienda" className="hover:text-cyan-400">Placas de Video & SSDs</a></li>
                  <li><a href="#diagnostico" className="hover:text-cyan-400">Diagnóstico Express en línea</a></li>
                </ul>
              </div>

              {/* Social / Guarantee */}
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Garantía InsuTech</h4>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400">
                  <p className="font-semibold text-slate-200 mb-1">Soporte Técnico Certificado</p>
                  <p>Todos los trabajos cuentan con test de estrés térmico y pruebas de estabilidad antes de entrega.</p>
                </div>
              </div>

            </div>

            <div className="border-t border-slate-900 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
              <p>© 2026 InsuTech PC Repair & Store. Todos los derechos reservados.</p>
              <div className="flex gap-4">
                <a href="#" className="hover:text-slate-400">Términos de Garantía</a>
                <a href="#" className="hover:text-slate-400">Política de Privacidad</a>
              </div>
            </div>
          </div>
        </footer>
      </main>

      {}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-slate-900 h-full border-l border-slate-800 flex flex-col justify-between p-6 shadow-2xl">
            
            {/* Cart Header */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-lg font-bold text-white">Carrito de Compras</h3>
                  <span className="text-xs bg-slate-800 text-cyan-400 font-mono px-2 py-0.5 rounded-full">
                    {totalCartCount}
                  </span>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cart Items List */}
              <div className="mt-6 space-y-4 max-h-[55vh] overflow-y-auto pr-1">
                {cart.length > 0 ? (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 object-cover rounded-lg shrink-0 bg-slate-900"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-white truncate">{item.name}</h4>
                        <span className="text-xs text-cyan-400 font-bold block mt-0.5">
                          Gs. {item.priceGs.toLocaleString('es-PY')}
                        </span>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-mono font-bold text-white w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-900 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 text-slate-500">
                    <ShoppingCart className="w-12 h-12 stroke-1 mx-auto mb-2 text-slate-600" />
                    <p className="text-sm">Tu carrito está vacío</p>
                  </div>
                )}
              </div>
            </div>

            {/* Cart Footer / Total */}
            {cart.length > 0 && (
              <div className="pt-4 border-t border-slate-800">
                <div className="flex justify-between items-baseline mb-4">
                  <span className="text-sm text-slate-400">Total Estimado:</span>
                  <div className="text-right">
                    <span className="text-xl font-extrabold text-white block">
                      Gs. {totalCartGs.toLocaleString('es-PY')}
                    </span>
                    <span className="text-xs text-slate-500">
                      (~${Math.round(totalCartGs / 7300)} USD)
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-950/40"
                >
                  <MessageCircle className="w-5 h-5" />
                  Enviar Pedido por WhatsApp
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {}
      {bookingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 sm:p-8 relative shadow-2xl">
            <button
              onClick={() => setBookingService(null)}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Agendar Servicio Técnico</h3>
                <p className="text-xs text-cyan-400 font-semibold">{bookingService.title}</p>
              </div>
            </div>

            <form onSubmit={handleServiceSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Nombre Completo *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Juan Pérez"
                  value={bookingForm.name}
                  onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Teléfono / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  placeholder="Ej: 0981 123 456"
                  value={bookingForm.phone}
                  onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Especificaciones / Modelo de la PC</label>
                <input
                  type="text"
                  placeholder="Ej: Intel i5 10ma gen, GTX 1660, 16GB RAM"
                  value={bookingForm.pcSpecs}
                  onChange={(e) => setBookingForm({ ...bookingForm, pcSpecs: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Descripción del Problema o Solicitud</label>
                <textarea
                  rows="3"
                  placeholder="Detalla qué falla presenta el equipo o qué modificaciones deseas hacer..."
                  value={bookingForm.message}
                  onChange={(e) => setBookingForm({ ...bookingForm, message: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm py-3 rounded-xl transition-all shadow-md"
                >
                  <Send className="w-4 h-4" />
                  Enviar Consulta por WhatsApp
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}