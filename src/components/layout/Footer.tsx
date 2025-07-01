// src/components/layout/Footer.tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Instagram,
  ArrowRight,
  ExternalLink,
  Share2
} from 'lucide-react';

export function Footer() {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-950 via-gray-900 to-black dark:from-black dark:via-gray-950 dark:to-gray-900 text-gray-300 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3cpattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'%3e%3ccircle cx='30' cy='30' r='1' fill='%23ffffff' fill-opacity='0.2'/%3e%3c/pattern%3e%3c/defs%3e%3crect width='100%25' height='100%25' fill='url(%23grid)'/%3e%3c/svg%3e")`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
          
          {/* Company Info + CTA - Left Side */}
          <div className="lg:col-span-5 space-y-8">
            {/* Company Info */}
            <div>
              <h3 className="text-3xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                MichelDev
              </h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Profesjonalne usługi webowe, grafika komputerowa i branding dla Twojego biznesu.
                Tworzymy nowoczesne rozwiązania, które wyróżniają Twoją markę.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Mail className="h-4 w-4 text-blue-400" />
                  </div>
                  <span className="text-gray-300">mateusz.michel7@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <Phone className="h-4 w-4 text-green-400" />
                  </div>
                  <span className="text-gray-300">+48 519 430 169</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <MapPin className="h-4 w-4 text-purple-400" />
                  </div>
                  <span className="text-gray-300">Polska</span>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-gray-900/40 to-gray-800/40 rounded-2xl border border-gray-700/30 p-6">
              <h4 className="text-xl font-semibold text-white mb-2">
                Gotowy na nowy projekt?
              </h4>
              <p className="text-gray-400 mb-4 text-sm">
                Otrzymaj bezpłatną wycenę w ciągu 24 godzin
              </p>
              <motion.button
                onClick={scrollToContact}
                whileHover={{ scale: 1 }}
                whileTap={{ scale: 1 }}
                className="relative inline-flex h-12 active:scale-95 transition overflow-hidden rounded-lg p-[1px] focus:outline-none"
              >
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#e7029a_0%,#f472b6_50%,#bd5fff_100%)]">
                </span>
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-7 text-sm font-medium text-white backdrop-blur-3xl gap-2">
                  Otrzymaj darmową wycenę
                  <ArrowRight className="w-4 h-4" />
                </span>
              </motion.button>
            </div>
          </div>

          {/* Right Side - Services + Instagram + Social */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Usługi</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="#services" className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm">
                    Projektowanie stron
                  </Link>
                </li>
                <li>
                  <Link href="#services" className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm">
                    Programowanie
                  </Link>
                </li>
                <li>
                  <Link href="#services" className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm">
                    Grafika komputerowa
                  </Link>
                </li>
                <li>
                  <Link href="#services" className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm">
                    Branding
                  </Link>
                </li>
                <li>
                  <Link href="#services" className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm">
                    Administracja stron
                  </Link>
                </li>
              </ul>
            </div>

            {/* Instagram Section - NOWY PRZYCISK */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Zaobserwuj mnie</h4>
              <div className="space-y-4">
                <div className="relative group">
                  <a
                    href="https://instagram.com/michelwebdev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative inline-block p-px font-semibold leading-6 text-white bg-gray-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out active:scale-95"
                  >
                    <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <span className="relative z-10 block px-4 py-3 rounded-xl bg-gray-950">
                      <div className="relative z-10 flex items-center justify-between space-x-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <Instagram className="w-4 h-4 text-white" />
                          </div>
                          <span className="transition-all duration-500 group-hover:translate-x-1 font-medium text-sm">@michelwebdev</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="text-xs transition-all duration-500 group-hover:translate-x-1">Obserwuj</span>
                          <ExternalLink className="w-3 h-3 transition-transform duration-500 group-hover:translate-x-1 opacity-70" />
                        </div>
                      </div>
                    </span>
                  </a>
                </div>
                
                <p className="text-xs text-gray-500 leading-relaxed">
                  Śledź moje najnowsze projekty, proces twórczy i inspiracje z świata web designu.
                </p>
              </div>
            </div>

            {/* Share Section */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6 flex items-center space-x-2">
                <Share2 className="w-4 h-4" />
                <span>Udostępnij mnie!</span>
              </h4>
              <div className="space-y-4">
                <p className="text-xs text-gray-500 mb-4">
                  Poleć moją stronę znajomym i rodzinie
                </p>
                <div className="flex flex-wrap gap-3">
                  {/* Instagram */}
                  <div className="social-button">
                    <a
                      href="https://www.instagram.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative w-12 h-12 rounded-full group block"
                      title="Udostępnij na Instagram"
                    >
                      <div className="floater w-full h-full absolute top-0 left-0 bg-violet-400 rounded-full duration-300 group-hover:-top-8 group-hover:shadow-2xl" />
                      <div className="icon relative z-10 w-full h-full flex items-center justify-center border-2 border-violet-400 rounded-full">
                        <svg fill="none" viewBox="0 0 22 22" height={22} width={22} xmlns="http://www.w3.org/2000/svg">
                          <path d="M21.94 6.46809C21.8884 5.2991 21.6994 4.49551 21.4285 3.79911C21.1492 3.05994 20.7194 2.39818 20.1564 1.84802C19.6062 1.28932 18.9401 0.855163 18.2094 0.580194C17.5091 0.309437 16.7096 0.120336 15.5407 0.0688497C14.363 0.0128932 13.9891 0 11.0022 0C8.01527 0 7.64141 0.0128932 6.46808 0.064466C5.29914 0.116039 4.49551 0.305225 3.79932 0.57581C3.05994 0.855163 2.39818 1.28494 1.84802 1.84802C1.28932 2.39813 0.855377 3.06428 0.580193 3.7949C0.309437 4.49551 0.120379 5.2948 0.0688496 6.4637C0.0129362 7.64141 0 8.01527 0 11.0022C0 13.9891 0.0129362 14.363 0.0644659 15.5363C0.116039 16.7053 0.305225 17.5089 0.576025 18.2053C0.855377 18.9444 1.28932 19.6062 1.84802 20.1564C2.39818 20.7151 3.06432 21.1492 3.79494 21.4242C4.49547 21.6949 5.29476 21.884 6.46391 21.9355C7.63702 21.9873 8.0111 22 10.998 22C13.9849 22 14.3588 21.9873 15.5321 21.9355C16.7011 21.884 17.5047 21.695 18.2009 21.4242C18.9321 21.1415 19.5961 20.7091 20.1505 20.1548C20.7048 19.6005 21.1373 18.9365 21.42 18.2053C21.6906 17.5047 21.8798 16.7052 21.9314 15.5363C21.9829 14.363 21.9958 13.9891 21.9958 11.0022C21.9958 8.01527 21.9914 7.64137 21.94 6.46809ZM19.9588 15.4503C19.9114 16.5248 19.731 17.105 19.5805 17.4918C19.2109 18.4502 18.4502 19.2109 17.4918 19.5805C17.105 19.731 16.5206 19.9114 15.4503 19.9586C14.29 20.0103 13.942 20.023 11.0066 20.023C8.07118 20.023 7.71881 20.0103 6.56259 19.9586C5.48816 19.9114 4.90796 19.731 4.52117 19.5805C4.04425 19.4043 3.61014 19.1249 3.25772 18.7596C2.89242 18.4029 2.61306 17.9731 2.43677 17.4961C2.28635 17.1094 2.10589 16.5248 2.05874 15.4547C2.007 14.2943 1.99428 13.9461 1.99428 11.0107C1.99428 8.07535 2.007 7.72298 2.05874 6.56698C2.10589 5.49254 2.28635 4.91235 2.43677 4.52555C2.61306 4.04842 2.89241 3.61439 3.26211 3.26189C3.61865 2.89658 4.04842 2.61723 4.52555 2.44115C4.91235 2.29073 5.49692 2.11023 6.56697 2.06291C7.72736 2.01134 8.07556 1.99844 11.0107 1.99844C13.9505 1.99844 14.2985 2.01134 15.4547 2.06291C16.5292 2.11027 17.1093 2.29069 17.4961 2.44111C17.9731 2.61723 18.4072 2.89658 18.7596 3.26189C19.1249 3.61865 19.4042 4.04842 19.5805 4.52555C19.731 4.91235 19.9114 5.49671 19.9587 6.56698C20.0103 7.72736 20.0232 8.07535 20.0232 11.0107C20.0232 13.9461 20.0104 14.29 19.9588 15.4503Z" className="group-hover:fill-[#171543] fill-white duration-300" />
                          <path d="M11.0026 5.35054C7.88252 5.35054 5.35107 7.88182 5.35107 11.0021C5.35107 14.1223 7.88252 16.6536 11.0026 16.6536C14.1227 16.6536 16.6541 14.1223 16.6541 11.0021C16.6541 7.88182 14.1227 5.35054 11.0026 5.35054ZM11.0026 14.668C8.97844 14.668 7.33654 13.0264 7.33654 11.0021C7.33654 8.97774 8.97844 7.33609 11.0025 7.33609C13.0269 7.33609 14.6685 8.97774 14.6685 11.0021C14.6685 13.0264 13.0268 14.668 11.0026 14.668ZM18.1971 5.12706C18.1971 5.85569 17.6063 6.44646 16.8775 6.44646C16.1489 6.44646 15.5581 5.85569 15.5581 5.12706C15.5581 4.39833 16.1489 3.80774 16.8775 3.80774C17.6063 3.80774 18.1971 4.39829 18.1971 5.12706Z" className="group-hover:fill-[#171543] fill-white duration-300" />
                        </svg>
                      </div>
                    </a>
                  </div>

                  {/* Twitter/X */}
                  <div className="social-button">
                    <a
                      href="https://twitter.com/intent/tweet?url=https://micheldev.pl&text=Sprawdź%20MichelDev%20-%20profesjonalne%20strony%20internetowe%20i%20branding!"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative w-12 h-12 rounded-full group block"
                      title="Udostępnij na Twitter"
                    >
                      <div className="floater w-full h-full absolute top-0 left-0 bg-black rounded-full duration-300 group-hover:-top-8 group-hover:shadow-2xl" />
                      <div className="icon relative z-10 w-full h-full flex items-center justify-center border-2 border-black rounded-full">
                        <svg fill="none" viewBox="0 0 22 22" height={22} width={22} xmlns="http://www.w3.org/2000/svg">
                          <path d="M12.8115 9.3155L20.8253 0H18.9263L11.9679 8.08852L6.41015 0H0L8.40433 12.2313L0 22H1.89914L9.24745 13.4583L15.1168 22H21.5269L12.811 9.3155H12.8115ZM10.2103 12.339L9.35878 11.1211L2.58343 1.42964H5.5004L10.9682 9.25094L11.8197 10.4689L18.9272 20.6354H16.0102L10.2103 12.3395V12.339Z" className="group-hover:fill-[#171543] fill-white duration-300" />
                        </svg>
                      </div>
                    </a>
                  </div>

                  {/* Facebook */}
                  <div className="social-button">
                    <a
                      href="https://www.facebook.com/sharer/sharer.php?u=https://micheldev.pl"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative w-12 h-12 rounded-full group block"
                      title="Udostępnij na Facebook"
                    >
                      <div className="floater w-full h-full absolute top-0 left-0 bg-blue-500 rounded-full duration-300 group-hover:-top-8 group-hover:shadow-2xl" />
                      <div className="icon relative z-10 w-full h-full flex items-center justify-center border-2 border-blue-500 rounded-full">
                        <svg fill="none" viewBox="0 0 13 22" height={22} width={13} xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.71289 22H4.1898C3.60134 22 3.12262 21.5213 3.12262 20.9328V12.9863H1.06717C0.478672 12.9863 0 12.5074 0 11.9191V8.514C0 7.9255 0.478672 7.44683 1.06717 7.44683H3.12262V5.74166C3.12262 4.05092 3.6535 2.6125 4.65773 1.58207C5.6665 0.546992 7.07627 0 8.7346 0L11.4214 0.00438281C12.0089 0.00537109 12.4868 0.484086 12.4868 1.07151V4.23311C12.4868 4.82157 12.0083 5.30028 11.4199 5.30028L9.61091 5.30093C9.05919 5.30093 8.91868 5.41153 8.88864 5.44543C8.83914 5.50172 8.78023 5.66062 8.78023 6.09954V7.4467H11.284C11.4725 7.4467 11.6551 7.49319 11.812 7.58076C12.1506 7.76995 12.3611 8.12762 12.3611 8.51417L12.3597 11.9193C12.3597 12.5074 11.881 12.9861 11.2926 12.9861H8.78019V20.9328C8.78023 21.5213 8.30139 22 7.71289 22ZM4.41233 20.7103H7.49031V12.4089C7.49031 12.016 7.81009 11.6964 8.20282 11.6964H11.07L11.0712 8.73662H8.20265C7.80991 8.73662 7.49031 8.41706 7.49031 8.02411V6.09959C7.49031 5.59573 7.54153 5.0227 7.92185 4.59198C8.38144 4.07133 9.10568 4.01126 9.61056 4.01126L11.1971 4.01057V1.29375L8.73357 1.28975C6.06848 1.28975 4.41238 2.99574 4.41238 5.7417V8.02407C4.41238 8.4168 4.09277 8.73658 3.7 8.73658H1.28975V11.6964H3.7C4.09277 11.6964 4.41238 12.016 4.41238 12.4089L4.41233 20.7103Z" className="group-hover:fill-[#171543] fill-white duration-300" />
                        </svg>
                      </div>
                    </a>
                  </div>

                  {/* WhatsApp */}
                  <div className="social-button">
                    <a
                      href="https://wa.me/?text=Sprawdź%20MichelDev%20-%20profesjonalne%20strony%20internetowe%20i%20branding!%20https://micheldev.pl"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative w-12 h-12 rounded-full group block"
                      title="Udostępnij przez WhatsApp"
                    >
                      <div className="floater w-full h-full absolute top-0 left-0 bg-green-500 rounded-full duration-300 group-hover:-top-8 group-hover:shadow-2xl" />
                      <div className="icon relative z-10 w-full h-full flex items-center justify-center border-2 border-green-500 rounded-full">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.525 3.488" className="group-hover:fill-[#171543] fill-white duration-300" />
                        </svg>
                      </div>
                    </a>
                  </div>

                  {/* Reddit */}
                  <div className="social-button">
                    <a
                      href="https://www.reddit.com/submit?url=https://micheldev.pl&title=MichelDev%20-%20profesjonalne%20strony%20internetowe%20i%20branding"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative w-12 h-12 rounded-full group block"
                      title="Udostępnij na Reddit"
                    >
                      <div className="floater w-full h-full absolute top-0 left-0 bg-orange-500 rounded-full duration-300 group-hover:-top-8 group-hover:shadow-2xl" />
                      <div className="icon relative z-10 w-full h-full flex items-center justify-center border-2 border-orange-500 rounded-full">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" className="group-hover:fill-[#171543] fill-white duration-300" />
                        </svg>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Legal Links */}
            <div className="sm:col-span-2 lg:col-span-3">
              <h4 className="text-lg font-semibold text-white mb-6">Informacje</h4>
              <div className="flex flex-wrap gap-6">
                <Link href="/polityka-prywatnosci" className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm">
                  Polityka prywatności
                </Link>
                <Link href="#contact" className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm">
                  Kontakt
                </Link>
                <Link href="#portfolio" className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm">
                  Portfolio
                </Link>
                <Link href="#process" className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm">
                  Proces współpracy
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800/50 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-gray-500 text-sm">
              © 2025 MichelDev. Wszystkie prawa zastrzeżone.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}