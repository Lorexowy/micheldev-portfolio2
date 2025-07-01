// src/components/sections/Services.tsx
'use client';

import { motion } from 'framer-motion';
import { Monitor, Palette, Settings } from 'lucide-react';

// Dane usług
const SERVICES = [
  {
    id: 'web-development',
    title: 'Strony internetowe',
    subtitle: 'Nowoczesne rozwiązania',
    description: 'Responsywne strony • SEO • Szybkość',
    icon: Monitor,
    badge: 'Web Dev'
  },
  {
    id: 'graphics', 
    title: 'Grafika & Branding',
    subtitle: 'Identyfikacja wizualna', 
    description: 'Logo • Branding • Materiały',
    icon: Palette,
    badge: 'Design'
  },
  {
    id: 'administration',
    title: 'Administracja',
    subtitle: 'Opieka techniczna',
    description: 'Aktualizacje • Monitoring • Wsparcie',
    icon: Settings,
    badge: 'Support'
  }
];

function ServiceCard({ service }: { service: typeof SERVICES[0] }) {
  const IconComponent = service.icon;
  
  return (
    <div className="card">
      <div className="content">
        {/* Back Side - pokazuje się po hover */}
        <div className="back">
          <div className="back-content">
            <IconComponent className="w-12 h-12 text-white" />
            <strong className="text-lg font-bold">Poznaj szczegóły</strong>
          </div>
        </div>
        
        {/* Front Side - domyślnie widoczna */}
        <div className="front">
          <div className="img">
            <div className="circle"></div>
            <div className="circle" id="right"></div>
            <div className="circle" id="bottom"></div>
          </div>
          <div className="front-content">
            <small className="badge">{service.badge}</small>
            <div className="description">
              <div className="title">
                <p className="title">
                  <strong>{service.title}</strong>
                </p>
                <IconComponent className="w-4 h-4 text-green-400" />
              </div>
              <p className="card-footer">
                {service.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .card {
          overflow: visible;
          width: 320px;
          height: 400px;
        }

        .content {
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 300ms;
          box-shadow: 0px 0px 10px 1px #000000ee;
          border-radius: 8px;
        }

        .front, .back {
          background-color: #151515;
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: 8px;
          overflow: hidden;
        }

        .back {
          width: 100%;
          height: 100%;
          justify-content: center;
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        .back::before {
          position: absolute;
          content: ' ';
          display: block;
          width: 160px;
          height: 160%;
          background: linear-gradient(90deg, transparent, #ff9966, #ff9966, #ff9966, #ff9966, transparent);
          animation: rotation_481 5000ms infinite linear;
        }

        .back-content {
          position: absolute;
          width: 99%;
          height: 99%;
          background-color: #151515;
          border-radius: 8px;
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 30px;
        }

        .card:hover .content {
          transform: rotateY(180deg);
        }

        @keyframes rotation_481 {
          0% {
            transform: rotateZ(0deg);
          }
          100% {
            transform: rotateZ(360deg);
          }
        }

        .front {
          transform: rotateY(180deg);
          color: white;
        }

        .front .front-content {
          position: absolute;
          width: 100%;
          height: 100%;
          padding: 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .front-content .badge {
          background-color: #00000055;
          padding: 6px 12px;
          border-radius: 15px;
          backdrop-filter: blur(2px);
          width: fit-content;
          font-size: 12px;
          font-weight: 600;
        }

        .description {
          box-shadow: 0px 0px 10px 5px #00000088;
          width: 100%;
          padding: 16px;
          background-color: #00000099;
          backdrop-filter: blur(5px);
          border-radius: 8px;
        }

        .title {
          font-size: 14px;
          max-width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .title p {
          width: 80%;
          margin: 0;
          font-size: 16px;
        }

        .card-footer {
          color: #ffffff88;
          margin-top: 8px;
          font-size: 12px;
          line-height: 1.4;
        }

        .front .img {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }

        .circle {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background-color: #ffbb66;
          position: absolute;
          filter: blur(15px);
          animation: floating 2600ms infinite linear;
        }

        #bottom {
          background-color: #ff8866;
          left: 50px;
          top: 50px;
          width: 150px;
          height: 150px;
          animation-delay: -800ms;
        }

        #right {
          background-color: #ff2233;
          right: 20px;
          top: 20px;
          width: 60px;
          height: 60px;
          animation-delay: -1800ms;
        }

        @keyframes floating {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(10px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        /* Mobile responsiveness */
        @media (max-width: 768px) {
          .card {
            width: 100%;
            max-width: 320px;
            height: 350px;
          }
          
          .front-content {
            padding: 16px !important;
          }
          
          .description {
            padding: 12px !important;
          }
          
          .title p {
            font-size: 14px !important;
          }
          
          .card-footer {
            font-size: 11px !important;
          }
        }

        @media (max-width: 480px) {
          .card {
            height: 320px;
          }
          
          .circle {
            width: 70px;
            height: 70px;
          }
          
          #bottom {
            width: 120px;
            height: 120px;
            left: 40px;
            top: 40px;
          }
          
          #right {
            width: 50px;
            height: 50px;
            right: 15px;
            top: 15px;
          }
        }
      `}</style>
    </div>
  );
}

export function Services() {
  return (
    <section id="services" className="py-20 bg-white dark:bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Moje Usługi
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Oferuję kompleksowe rozwiązania dla Twojego biznesu
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"
        >
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}