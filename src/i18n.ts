const localeDefault = {
  code: 'en',
  language: 'English',
} as const;
export const defaultLocale = localeDefault['code'];
const locales = [
  localeDefault,
  {
    code: 'de',
    language: 'Deutsch',
  },
] as const;
export type Locale = (typeof locales)[number];
export type LocaleCode = Locale['code'];

export const isLocaleCode = (value: string): value is LocaleCode => {
  const codes = locales.map((locale) => locale.code);
  return codes.find((code) => value === code) !== undefined;
};
export const getLocales = (): Array<Locale> => [...locales];
export const getLabelForLocale = (code: LocaleCode) =>
  (locales.find((locale) => locale.code === code) ?? localeDefault).language;

const localization = {
  en: {
    'header.nav.label': 'Main',
    'header.nav.cta': 'Say hello',
    'footer.description':
      'Software development is the process of transforming visions into reality.',
    'footer.toTop': 'Go back to the top',
    'footer.nav.socials.label': 'Contacts & Socials',
    'footer.nav.socials.mail': 'Mail me',
    'footer.nav.content.label': 'Further contents',
    'footer.nav.content.contact': 'Contact',
    'footer.nav.content.imprint': 'Imprint',
    'footer.nav.content.privacy': 'Privacy Policy',
    'footer.nav.mention.label': 'Mentions',
    '404.title': '404 - Not found',
    '404.description':
      'In this case you may not have found what you were looking for. If so be sure to get in touch with me!',
    '404.back': 'Go back',
    '404.contact': 'Say hello',
    'logo.href.label': 'Go to the frontpage',
    'form.send': 'Send',
    'form.policy':
      'I have read the <a href="/en/privacy">privacy policy</a> and agree to the processing of my data.',
    'form.optional': 'optional',
    'form.name.title': 'Name',
    'form.name.placeholder': 'Name',
    'form.company.title': 'Company',
    'form.company.placeholder': 'Company',
    'form.email.title': 'Email',
    'form.email.placeholder': 'Email',
    'form.message.title': 'Message',
    'form.message.placeholder': "Let's work together...",
    'breadcrumb.label': 'Breadcrumb',
    'breadcrumb.home.label': 'Go to the frontpage',
  },
  de: {
    'header.nav.label': 'Haupt',
    'header.nav.cta': 'Schreib mir',
    'footer.description':
      'Softwareentwicklung beschreibt den Prozess der Umsetzung von Ideen in die Realität.',
    'footer.toTop': 'Zurück nach oben',
    'footer.nav.socials.label': 'Kontakt & soziale Medien',
    'footer.nav.socials.mail': 'Schreib mir',
    'footer.nav.content.label': 'Weitere Inhalte',
    'footer.nav.content.contact': 'Kontakt',
    'footer.nav.content.imprint': 'Impressum',
    'footer.nav.content.privacy': 'Datenschutz',
    'footer.nav.mention.label': 'Erwähnungen',
    '404.title': '404 - Nicht gefunden',
    '404.description':
      'In diesem Fall haben du vielleicht nicht das gefunden, wonach du gesucht hast. Wenn dem so ist, solltest du dich mit mir in Verbindung setzen!',
    '404.back': 'Zurück',
    '404.contact': 'Schreib mir',
    'logo.href.label': 'Gehe zur Startseite',
    'form.send': 'Absenden',
    'form.policy':
      'Ich habe die <a href="/de/datenschutz">Datenschutzerklärung</a> gelesen und stimme der Verarbeitung meiner Daten zu.',
    'form.optional': 'optional',
    'form.name.title': 'Name',
    'form.name.placeholder': 'Name',
    'form.company.title': 'Unternehmen',
    'form.company.placeholder': 'Unternehmen',
    'form.email.title': 'E-Mail',
    'form.email.placeholder': 'E-Mail',
    'form.message.title': 'Nachricht',
    'form.message.placeholder': 'Lass uns gemeinsam...',
    'breadcrumb.label': 'Brotkrumennavigation',
    'breadcrumb.home.label': 'Gehe zur Startseite',
  },
} as const;

export const useTranslation = (locale: keyof typeof localization) => {
  return function t(key: keyof (typeof localization)[typeof defaultLocale]) {
    return localization[locale][key] ?? localization[defaultLocale][key];
  };
};
