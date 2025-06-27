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
                pośrednictwem strony internetowej MichelDev.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                2. Administrator danych
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Administratorem danych osobowych jest MichelDev z siedzibą w Warszawie.
                Kontakt: kontakt@micheldev.pl
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                3. Zakres zbieranych danych
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Zbieramy następujące dane osobowe:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4">
                <li>Imię i nazwisko</li>
                <li>Adres e-mail</li>
                <li>Numer telefonu (opcjonalnie)</li>
                <li>Treść wiadomości</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                4. Cel przetwarzania danych
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Dane osobowe przetwarzane są w celu:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4">
                <li>Udzielenia odpowiedzi na zapytania</li>
                <li>Świadczenia usług</li>
                <li>Komunikacji z klientami</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                5. Prawa użytkowników
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Użytkownikom przysługują następujące prawa:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4">
                <li>Prawo dostępu do danych</li>
                <li>Prawo do sprostowania danych</li>
                <li>Prawo do usunięcia danych</li>
                <li>Prawo do ograniczenia przetwarzania</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                6. Kontakt
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                W przypadku pytań dotyczących przetwarzania danych osobowych, prosimy o kontakt:
                <br />
                E-mail: kontakt@micheldev.pl
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}