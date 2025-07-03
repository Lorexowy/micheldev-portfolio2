// src/app/polityka-prywatnosci/page.tsx
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';

export default function PrivacyPolicy() {
  return (
    <main>
      <Navigation />
      <div className="pt-16 min-h-screen bg-white dark:bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Polityka Prywatności
          </h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Ostatnia aktualizacja: {new Date().toLocaleDateString('pl-PL')}
            </p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                1. Informacje ogólne
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Niniejsza Polityka Prywatności określa zasady przetwarzania i ochrony danych osobowych 
                przekazanych przez użytkowników w związku z korzystaniem z usług świadczonych za 
                pośrednictwem strony internetowej MichelDev (www.micheldev.pl).
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Polityka została opracowana zgodnie z Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 
                2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z 
                przetwarzaniem danych osobowych (RODO).
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                2. Administrator danych
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Administratorem danych osobowych jest Mateusz Michel prowadzący działalność 
                pod nazwą MichelDev.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                <strong>Kontakt:</strong><br />
                E-mail: mateusz.michel7@gmail.com<br />
                Strona internetowa: www.micheldev.pl
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                3. Zakres zbieranych danych
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Zbieramy następujące dane osobowe wyłącznie za pośrednictwem formularza kontaktowego:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4">
                <li>Imię i nazwisko</li>
                <li>Adres e-mail</li>
                <li>Numer telefonu (opcjonalnie)</li>
                <li>Treść wiadomości</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Dodatkowo, w celach analitycznych, automatycznie zbieramy dane za pomocą:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4">
                <li><strong>Google Analytics:</strong> adres IP, typ przeglądarki, system operacyjny, czas spędzony na stronie, odwiedzone podstrony</li>
                <li><strong>Pliki cookies:</strong> niezbędne do funkcjonowania strony i analityki</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                4. Podstawa prawna i cel przetwarzania danych
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Dane osobowe przetwarzamy na następujących podstawach prawnych:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4">
                <li><strong>Zgoda (art. 6 ust. 1 lit. a RODO):</strong> dla danych z formularza kontaktowego oraz korzystania z Google Analytics</li>
                <li><strong>Uzasadniony interes (art. 6 ust. 1 lit. f RODO):</strong> dla celów technicznych związanych z funkcjonowaniem strony</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Cele przetwarzania danych:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4">
                <li>Udzielenie odpowiedzi na zapytania przesłane przez formularz kontaktowy</li>
                <li>Analiza ruchu na stronie internetowej (Google Analytics)</li>
                <li>Zapewnienie prawidłowego funkcjonowania strony internetowej</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                <strong>Ważne:</strong> Nie wysyłamy newsletterów ani komunikatów marketingowych. Nie kontaktujemy się z użytkownikami w celach innych niż odpowiedź na ich zapytanie.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                5. Okres przechowywania danych
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Dane osobowe przechowujemy przez następujące okresy:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4">
                <li><strong>Dane z formularza kontaktowego:</strong> maksymalnie 3 lata od daty przesłania wiadomości</li>
                <li><strong>Dane Google Analytics:</strong> zgodnie z ustawieniami Google Analytics (domyślnie 26 miesięcy)</li>
                <li><strong>Pliki cookies:</strong> zgodnie z ustawieniami przeglądarki użytkownika</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                6. Przekazywanie danych osobowych
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Twoje dane osobowe mogą być przekazywane następującym podmiotom:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4">
                <li><strong>Vercel Inc. (hosting):</strong> amerykańska firma hostingowa, zgodna z RODO, dane mogą być przetwarzane poza UE zgodnie z odpowiednimi mechanizmami ochrony</li>
                <li><strong>Google LLC (Analytics):</strong> w celu analizy ruchu na stronie, zgodnie z polityką prywatności Google</li>
                <li><strong>EmailJS:</strong> w celu obsługi formularza kontaktowego</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Wszystkie podmioty zostały wybrane z uwzględnieniem wymogów RODO i zapewniają odpowiedni poziom ochrony danych osobowych.
              </p>
            </section>

            <section className="mb-8" id="cookies">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                7. Pliki cookies i technologie śledzące
              </h2>
              
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  Czym są pliki cookies?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Pliki cookies to małe pliki tekstowe przechowywane na Twoim urządzeniu podczas przeglądania strony internetowej. 
                  Zawierają informacje, które pomagają nam zapewnić lepsze doświadczenie użytkownika.
                </p>

                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  Rodzaje stosowanych plików cookies
                </h3>
                
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Cookies niezbędne (zawsze aktywne)
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                      <strong>Podstawa prawna:</strong> Art. 6 ust. 1 lit. f RODO (uzasadniony interes administratora)
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                      <strong>Cel:</strong> Zapewnienie podstawowych funkcji strony internetowej
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                      <strong>Okres przechowywania:</strong> Sesja lub do 1 roku
                    </p>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 text-sm space-y-1">
                      <li>Zapamiętanie wybranego motywu (jasny/ciemny)</li>
                      <li>Przechowywanie ustawień cookies i preferencji użytkownika</li>
                      <li>Obsługa formularzy kontaktowych i zapobieganie spam</li>
                      <li>Bezpieczeństwo sesji i ochrona przed atakami</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Cookies analityczne (wymagają zgody)
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                      <strong>Podstawa prawna:</strong> Art. 6 ust. 1 lit. a RODO (zgoda)
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                      <strong>Cel:</strong> Analiza ruchu, optymalizacja treści i poprawa doświadczenia użytkownika
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                      <strong>Okres przechowywania:</strong> Do 26 miesięcy
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                      <strong>Zewnętrzny dostawca:</strong> Google Analytics (Google LLC, USA)
                    </p>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 text-sm space-y-1">
                      <li>Analiza ruchu i zachowań użytkowników na stronie</li>
                      <li>Statystyki odwiedzin i najpopularniejsze treści</li>
                      <li>Dane demograficzne w formie zagregowanej</li>
                      <li>Optymalizacja wydajności strony</li>
                      <li>Identyfikacja problemów technicznych</li>
                    </ul>
                  </div>
                </div>

                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  Google Analytics i przekazywanie danych do USA
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Korzystamy z Google Analytics świadczonego przez Google LLC z siedzibą w USA. 
                  Dane mogą być przekazywane i przetwarzane w Stanach Zjednoczonych na podstawie:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4">
                  <li>Decyzji o adekwatności Komisji Europejskiej dla programu EU-US Data Privacy Framework</li>
                  <li>Standardowych klauzul umownych zatwierdzonych przez Komisję Europejską</li>
                  <li>Certyfikacji Google w ramach EU-US Data Privacy Framework</li>
                </ul>

                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  Google Consent Mode v2
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Nasza strona wykorzystuje Google Consent Mode v2, co oznacza, że:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4">
                  <li>Bez Twojej zgody Google Analytics nie zbiera żadnych danych osobowych</li>
                  <li>Kod uruchamia się w trybie prywatnym, bez zapisywania cookies</li>
                  <li>Po udzieleniu zgody rozpoczyna się normalne zbieranie danych</li>
                  <li>Po wycofaniu zgody dane przestają być zbierane, a cookies są usuwane</li>
                </ul>

                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  Zarządzanie plikami cookies
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Możesz zarządzać swoimi preferencjami dotyczącymi plików cookies:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4">
                  <li>Za pomocą banera cookies wyświetlanego przy pierwszej wizycie</li>
                  <li>Klikając link &quot;Ustawienia cookies&quot; w stopce strony</li>
                  <li>Poprzez ustawienia Twojej przeglądarki internetowej</li>
                  <li>Kontaktując się z nami bezpośrednio</li>
                </ul>

                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  Wycofanie zgody
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Możesz w każdej chwili wycofać zgodę na pliki cookies analityczne:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4">
                  <li>Wycofanie zgody nie wpływa na zgodność z prawem dotychczasowego przetwarzania</li>
                  <li>Po wycofaniu zgody odpowiednie cookies zostaną automatycznie usunięte</li>
                  <li>Procedura wycofania zgody jest tak samo prosta jak jej udzielenie</li>
                  <li>Strona będzie nadal funkcjonować normalnie po wycofaniu zgody</li>
                </ul>

                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-6">
                  <p className="text-blue-800 dark:text-blue-200 text-sm">
                    <strong>Uwaga:</strong> Cookies niezbędne nie mogą być wyłączone, ponieważ są konieczne 
                    do prawidłowego funkcjonowania strony internetowej. Nie przetwarzają one danych osobowych 
                    w sposób umożliwiający identyfikację użytkownika.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                8. Prawa użytkowników
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Zgodnie z RODO przysługują Ci następujące prawa:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4">
                <li><strong>Prawo dostępu do danych</strong> (art. 15 RODO) - możesz uzyskać informację o przetwarzanych danych</li>
                <li><strong>Prawo do sprostowania danych</strong> (art. 16 RODO) - możesz poprawić nieprawidłowe dane</li>
                <li><strong>Prawo do usunięcia danych</strong> (art. 17 RODO) - możesz żądać usunięcia swoich danych</li>
                <li><strong>Prawo do ograniczenia przetwarzania</strong> (art. 18 RODO)</li>
                <li><strong>Prawo do przenoszenia danych</strong> (art. 20 RODO)</li>
                <li><strong>Prawo sprzeciwu</strong> (art. 21 RODO) - wobec przetwarzania na podstawie uzasadnionego interesu</li>
                <li><strong>Prawo do cofnięcia zgody</strong> - w każdej chwili, bez wpływu na zgodność z prawem przetwarzania przed cofnięciem</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Masz również prawo do wniesienia skargi do organu nadzorczego (Prezes Urzędu Ochrony Danych Osobowych).
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                9. Bezpieczeństwo danych
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Stosujemy odpowiednie środki techniczne i organizacyjne w celu ochrony Twoich danych osobowych przed:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4">
                <li>Nieautoryzowanym dostępem</li>
                <li>Przypadkową lub celową destrukcją</li>
                <li>Przypadkową utratą lub zmianą</li>
                <li>Nieautoryzowanym ujawnieniem lub dostępem</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Wszystkie dane są transmitowane przy użyciu szyfrowania HTTPS/SSL.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                10. Zmiany w polityce prywatności
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Zastrzegamy sobie prawo do wprowadzania zmian w niniejszej Polityce Prywatności. 
                O wszelkich zmianach będziemy informować poprzez aktualizację treści na tej stronie 
                wraz z datą ostatniej modyfikacji.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                11. Kontakt
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                W przypadku pytań dotyczących przetwarzania danych osobowych lub realizacji przysługujących Ci praw, prosimy o kontakt:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4">
                <li><strong>E-mail:</strong> mateusz.michel7@gmail.com</li>
                <li><strong>Strona internetowa:</strong> www.micheldev.pl</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Odpowiemy na Twoje zapytanie w terminie 30 dni od daty otrzymania.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}