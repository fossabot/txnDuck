import { Suspense, use } from 'react';
import { useTranslation } from '@/app/i18n';
import { BuilderSteps, PageTitleHeading, WalletProvider } from '@/app/[lang]/components';
import TxnDataTable from './components/TxnDataTable';
import SignTxn from './components/SignTxn';
import SignTxnLoading from './components/SignTxnLoading';

/**  Sign Transaction page */
export default function SignTxnPage({ params: { lang } }: {
  params: { lang: string }
}) {
  const { t } = use(useTranslation(lang, 'sign_txn'));

  return (
    <main className='prose max-w-4xl min-h-screen mx-auto pt-4 px-4 pb-12'>
      <BuilderSteps lng={lang} current='sign' />
      <PageTitleHeading lng={lang} showTxnPreset={true}>{t('title')}</PageTitleHeading>
      <TxnDataTable lng={lang} />
      <Suspense fallback={<SignTxnLoading />}>
        <WalletProvider><SignTxn lng={lang} /></WalletProvider>
      </Suspense>
    </main>
  );
}
