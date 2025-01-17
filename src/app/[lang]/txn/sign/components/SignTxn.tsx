'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import algosdk from 'algosdk';
import * as algokit from '@algorandfoundation/algokit-utils';
import { useWallet } from '@txnlab/use-wallet';
import * as Dialog from '@radix-ui/react-dialog';
import * as Icons from '@tabler/icons-react';
import { useAtom, useAtomValue } from 'jotai';
import { RESET } from 'jotai/utils';
import { useTranslation } from '@/app/i18n/client';
import {
  walletTypes,
  getWalletClient,
  getActiveProvider,
} from '@/app/lib/wallet-utils';
import { nodeConfigAtom } from '@/app/lib/node-config';
import { createTxnFromData, storedSignedTxnAtom, storedTxnDataAtom } from '@/app/lib/txn-data';
import { bytesToBase64DataUrl, dataUrlToBytes } from '@/app/lib/utils';
import NextStepButton from './NextStepButton';

type Props = {
  /** Language */
  lng?: string
};

/** Buttons for connecting to wallet and signing transaction */
export default function SignTxn({ lng }: Props) {
  const { t } = useTranslation(lng || '', ['app', 'common', 'sign_txn']);
  const currentURLParams = useSearchParams();
  const nodeConfig = useAtomValue(nodeConfigAtom);

  const storedTxnData = useAtomValue(storedTxnDataAtom);
  const [storedSignedTxn, setStoredSignedTxn] = useAtom(storedSignedTxnAtom);
  const [hasSignTxnError, setHasSignTxnError] = useState(false);

  const { providers, activeAccount, clients, signTransactions } = useWallet();
  const walletClient = useMemo(
    () => getWalletClient(activeAccount?.providerId, clients),
    [activeAccount, clients]
  );

  /** Get genesis ID and genesis hash */
  const getGenesisInfo = async () => {
    // Get suggested parameters
    const algod = algokit.getAlgoClient({
      server: nodeConfig.nodeServer,
      port: nodeConfig.nodePort,
      token: (nodeConfig.nodeToken || '') as string,
    });
    const suggestedParams = await algokit.getTransactionParams(undefined, algod);

    return { gen: suggestedParams.genesisID, gh: suggestedParams.genesisHash };
  };

  /** Create transaction object from stored transaction data and sign the transaction */
  const signTransaction = async () => {
    if (!storedTxnData) throw Error('No transaction data exists in session storage');

    const {gen, gh} = await getGenesisInfo();
    let unsignedTxn = new Uint8Array;

    try {
      // Create Transaction object and encoded it
      unsignedTxn = algosdk.encodeUnsignedTransaction(createTxnFromData(storedTxnData, gen, gh));
    } catch (e) {
      setHasSignTxnError(true);
      return;
    }

    // Sign the transaction and store it
    const signedTxn = (await signTransactions([unsignedTxn]))[0];
    const signedTxnBase64 = await bytesToBase64DataUrl(signedTxn);
    setStoredSignedTxn(signedTxnBase64);
  };

  useEffect(() => {
    if (!storedTxnData || !storedSignedTxn) return;

    // Remove stored signed transaction if the transaction data was edited
    dataUrlToBytes(storedSignedTxn).then((signedTxnBytes) => {
      getGenesisInfo().then(({gen, gh}) => {
        const unsignedTxn = createTxnFromData(storedTxnData, gen, gh);
        let signedTxn: algosdk.Transaction;

        try {
          signedTxn = algosdk.decodeSignedTransaction(signedTxnBytes).txn;
        } catch (e) { // The stored signed transaction is invalid for some reason
          setStoredSignedTxn(RESET); // The transaction will need to be signed again
          return;
        }

        // The transaction has been changed and will need to be signed again
        if (unsignedTxn.txID() !== signedTxn.txID()) setStoredSignedTxn(RESET);
      });
    });
  /*
   * NOTE: The node configuration is added as a dependency because the transaction may need to be
   * signed again if it is for a different network.
   */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storedTxnData, storedSignedTxn, nodeConfig]);

  return (<>
    {// No wallet connected and transaction has not been signed yet
      (!activeAccount && !storedSignedTxn) &&
      <Dialog.Root modal={false}>
        <Dialog.Trigger asChild>
          <button className='btn btn-secondary btn-block min-h-[5em] h-auto'>
            <Icons.IconWallet aria-hidden />
            {t('wallet.connect')}
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content
            className='modal data-[state=open]:modal-open'
            onPointerDownOutside={(e) => e.preventDefault()}
            onInteractOutside={(e) => e.preventDefault()}
          >
            <div className='modal-box prose max-w-4xl'>
              <Dialog.Title className='mb-3'>{t('wallet.choose_provider')}</Dialog.Title>
              <Dialog.Description className='text-sm'>
                {t('wallet.choose_provider_description')}
              </Dialog.Description>
              {/* List of available wallet providers */}
              <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3'>
                {providers?.map(provider => (
                  <div key={provider.metadata.id} className={
                    'alert gap-1 sm:gap-4 content-evenly shadow-md border-base-300 bg-base-100'
                  }>
                    <span className={'not-prose relative h-16 w-16 sm:h-24 sm:w-24'}>
                      <Image src={provider.metadata.icon}
                        alt={t('wallet.provider_icon_alt', {provider: provider.metadata.name})}
                        fill
                        aria-hidden
                      />
                    </span>
                    {/* Wallet provider info + button */}
                    <div className='w-full'>
                      <div>
                        <h3 className='m-0'>{t('wallet.providers.' + provider.metadata.id)}</h3>
                        <p className='italic opacity-70 m-0'>
                          {t('wallet.type.' + walletTypes[provider.metadata.id])}
                        </p>
                      </div>
                      <button className='btn btn-block btn-sm btn-secondary mt-2'
                        onClick={provider.connect}
                      >
                        {t('wallet.use_provider_btn', {provider: provider.metadata.name})}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {/* Upper corner close button */}
              <Dialog.Close asChild>
                <button title={t('close')} className={
                  'btn-ghost btn btn-sm btn-square text-base-content absolute end-3 top-3'
                }>
                  <Icons.IconX aria-hidden />
                </button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    }
    {// Transaction signing failed for some reason
      hasSignTxnError &&
      <div className='alert alert-error mt-8'>
        <Icons.IconCircleX aria-hidden size={32} />
        {t('sign_txn:sign_error')}
      </div>
    }
    {// Connected to wallet but transaction has not been signed yet
      (activeAccount && !storedSignedTxn && !hasSignTxnError) &&
      <div className='mt-8'>
        <button
          className='btn btn-primary btn-block min-h-[5em] h-auto'
          onClick={() => signTransaction()}
        >
          <Icons.IconBallpenFilled aria-hidden />
          {t('sign_txn:sign_txn_btn')}
        </button>
        <div className='not-prose text-center mt-3'>
          <div className='truncate align-middle px-2'>
            {walletClient &&
              <span className='relative h-6 w-6 inline-block me-2 align-middle'>
                <Image
                  src={walletClient.metadata.icon}
                  alt={t('wallet.provider_icon_alt', {provider: walletClient.metadata.name})}
                  fill
                />
              </span>
            }
            <span className='align-middle'>
              {t('wallet.is_connected', {address: activeAccount.address})}
            </span>
          </div>
          <button className='btn btn-sm btn-link text-secondary'
            onClick={() => getActiveProvider(providers)?.disconnect()}
          >
            <Icons.IconWalletOff aria-hidden />
            {t('wallet.disconnect')}
          </button>
        </div>
      </div>
    }
    {// Transaction is signed!
      (storedSignedTxn && !hasSignTxnError) &&
      <div className='alert alert-success mt-8'>
        <Icons.IconCircleCheck aria-hidden size={32} />
        {t('sign_txn:txn_signed')}
      </div>
    }

    {/* Buttons */}
    <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 grid-rows-1 mx-auto mt-12'>
      {/* Next step */}
      <div><NextStepButton lng={lng} /></div>
      {/* Previous step */}
      <div className={'' + (hasSignTxnError ? 'order-first' : 'sm:order-first')}>
        <Link href={{
          pathname: `/${lng}/txn/compose`,
          query: currentURLParams.toString(),
        }} className={'btn w-full' + (hasSignTxnError ? ' btn-primary' : '')}>
          <Icons.IconArrowLeft aria-hidden className='rtl:hidden' />
          <Icons.IconArrowRight aria-hidden className='hidden rtl:inline' />
          {t('sign_txn:compose_txn_btn')}
        </Link>
        {storedSignedTxn &&
          <div className='alert bg-base-100 gap-1 border-0 py-0 mt-2'>
            <Icons.IconAlertTriangleFilled aria-hidden
              className='text-warning align-middle my-auto me-2'
            />
            <small>{t('sign_txn:compose_txn_btn_warning')}</small>
          </div>
        }
      </div>
    </div>
  </>);
}
