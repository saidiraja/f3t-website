import { usePageContent } from './PageContentContext';
import { useI18n } from '../i18n/useI18n';

export default function CmsText({ k, fr='', en='', as='span' }) {
  const { lang } = useI18n();
  const { texts } = usePageContent();
  const Comp = as;
  const t = texts[k] || {};
  const val = (lang === 'fr' ? (t.fr || fr) : (t.en || en)) || '';
  return <Comp>{val}</Comp>;
}
