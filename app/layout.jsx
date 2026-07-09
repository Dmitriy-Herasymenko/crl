import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import ScrollTopButton from '@/components/ScrollTopButton';

export const metadata = {
  title: 'Уманська центральна районна лікарня — офіційний сайт',
  description:
    'Уманська ЦРЛ — якісна медична допомога, сучасне оснащення, високий професіоналізм. КНП Паланської територіальної громади.',
  icons: {
    icon: '/icons/favicon.jpg',
    apple: '/icons/apple-touch-icon.jpg',
  },
};

// Applied before hydration so there's no light/dark flash on load.
const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var theme = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    if (theme === 'dark') document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="uk">
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-gray-800 antialiased">
        <Header />
        {children}
        <Footer />
        <ScrollReveal />
        <ScrollTopButton />
      </body>
    </html>
  );
}
