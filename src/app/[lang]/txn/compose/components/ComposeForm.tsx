'use client';

import Link from 'next/link';
import { useTranslation } from '@/app/i18n/client';
import { Trans } from 'react-i18next';
import * as Icons from '@tabler/icons-react';
import { TransactionType } from 'algosdk';
import { useAtomValue } from 'jotai';
import { txnDataAtoms } from '@/app/lib/txn-data';
import * as GeneralFields from './fields/GeneralFields';
import * as PaymentFields from './fields/PaymentFields';
import * as AssetTransferFields from './fields/AssetTransferFields';
import * as AssetConfigFields from './fields/AssetConfigFields';
import * as AssetFreezeFields from './fields/AssetFreezeFields';
import * as KeyRegFields from './fields/KeyRegFields';
import ComposeSubmitButton from './ComposeSubmitButton';

type Props = {
  /** Language */
  lng?: string
};

/** Form for composing a transaction */
export default function ComposeForm({ lng }: Props) {
  const { t } = useTranslation(lng || '', ['compose_txn', 'common']);
  const txnType = useAtomValue(txnDataAtoms.txnType);

  return (
    <form
      id='compose-txn-form'
      className='max-w-2xl mx-auto mt-12'
      noValidate={true}
      aria-label={t('title')}
    >
      <p className='max-w-3xl text-sm mb-8'>
        <Trans t={t} i18nKey='instructions'>
          asterisk_fields (<span className='text-error'>*</span>) required
        </Trans>
      </p>

      <GeneralFields.TxnType t={t} />
      <GeneralFields.Sender t={t} />

      {txnType === TransactionType.pay && <PaymentFields.ReceiverAndAmount t={t} />}

      {txnType === TransactionType.axfer && <>
        <AssetTransferFields.Receiver t={t} />
        <AssetTransferFields.AssetId t={t} />
        <AssetTransferFields.Amount t={t} />
        <AssetTransferFields.Sender t={t} />
      </>}

      {txnType === TransactionType.acfg && <>
        <AssetConfigFields.AssetId t={t} />
        <AssetConfigFields.UnitName t={t} />
        <AssetConfigFields.AssetName t={t} />
        <AssetConfigFields.Total t={t} />
        <AssetConfigFields.DecimalPlaces t={t} />
        <AssetConfigFields.DefaultFrozen t={t} />
        <AssetConfigFields.Url t={t} />
      </>}

      {txnType === TransactionType.afrz && <>
        <AssetFreezeFields.AssetId t={t} />
        <AssetFreezeFields.TargetAddr t={t} />
        <AssetFreezeFields.Freeze t={t} />
      </>}

      {txnType === TransactionType.keyreg && <>
        <KeyRegFields.VoteKey t={t} />
        <KeyRegFields.SelectionKey t={t} />
        <KeyRegFields.StateProofKey t={t} />
        <KeyRegFields.FirstVoteRound t={t} />
        <KeyRegFields.LastVoteRound t={t} />
        <KeyRegFields.KeyDilution t={t} />
      </>}

      <GeneralFields.Fee t={t} />
      <GeneralFields.Note t={t} />

      {txnType === TransactionType.acfg && <>
        <AssetConfigFields.ManagerAddr t={t} />
        <AssetConfigFields.FreezeAddr t={t} />
        <AssetConfigFields.ClawbackAddr t={t} />
        <AssetConfigFields.ReserveAddr t={t} />
        <AssetConfigFields.MetadataHash t={t} />
      </>}

      <div>
        {txnType === TransactionType.keyreg && <KeyRegFields.Nonparticipation t={t} />}

        <GeneralFields.FirstValid t={t} />
        <GeneralFields.LastValid t={t} />
        <GeneralFields.Lease t={t} />
        <GeneralFields.Rekey t={t} />

        {txnType === TransactionType.pay && <PaymentFields.CloseTo t={t} />}
        {txnType === TransactionType.axfer && <AssetTransferFields.CloseTo t={t} />}
      </div>

      <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 grid-rows-1 mx-auto mt-12'>
        <div>
          <ComposeSubmitButton lng={lng} />
        </div>
        <div className='sm:order-first'>
          <Link type='button' href='' className='btn w-full btn-disabled' tabIndex={-1}>
            <Icons.IconArrowLeft aria-hidden className='rtl:hidden' />
            <Icons.IconArrowRight aria-hidden className='hidden rtl:inline' />
            {t('txn_template_btn')}
          </Link>
          {/* <div className='alert bg-base-100 gap-1 border-0 py-0 mt-2'>
            <Icons.IconAlertTriangleFilled
              aria-hidden
              className='text-warning align-middle my-auto me-2'
            />
            <small>{t('txn_template_btn_warning')}</small>
          </div> */}
        </div>
      </div>

    </form>
  );
}
