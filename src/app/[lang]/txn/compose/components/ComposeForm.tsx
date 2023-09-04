'use client';

import Link from 'next/link';
import { useTranslation } from '@/app/i18n/client';
import { Trans } from 'react-i18next';
import {
  IconAlertTriangleFilled,
  IconArrowLeft,
  IconArrowRight
} from '@tabler/icons-react';
import * as GeneralFields from './GeneralFields';
import * as PaymentFields from './PaymentFields';

type Props = {
  /** Language */
  lng?: string
};

/** Form for composing a transaction */
export default function ComposeForm({ lng }: Props) {
  const { t } = useTranslation(lng || '', ['compose_txn', 'common']);

  const submitData = (e: React.MouseEvent) => {
    e.preventDefault();
  };

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

      <PaymentFields.ReceiverAndAmount t={t} />

      <GeneralFields.Fee t={t} />
      <GeneralFields.Note t={t} />

      <div>
        <GeneralFields.FirstValid t={t} />
        <GeneralFields.LastValid t={t} />
        <GeneralFields.Lease t={t} />
        <GeneralFields.Rekey t={t} />

        {/* If payment type */}
        <PaymentFields.CloseTo t={t} />
      </div>

      {/* Buttons */}
      <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 grid-rows-1 mx-auto mt-12'>
        <div className='order-last sm:order-first'>
          <Link type='button' href='' className='btn w-full btn-disabled'>
            <IconArrowLeft aria-hidden className='rtl:hidden' />
            <IconArrowRight aria-hidden className='hidden rtl:inline' />
            {t('txn_template_btn')}
          </Link>
          {/* <div className='alert bg-base-100 gap-1 border-0 py-0 mt-2'>
            <IconAlertTriangleFilled
              aria-hidden
              className='text-warning align-middle my-auto me-2'
            />
            <small>{t('txn_template_btn_warning')}</small>
          </div> */}
        </div>
        <div>
          <button type='submit' className='btn btn-primary w-full' onClick={(submitData)}>
            {t('sign_txn_btn')}
            <IconArrowRight aria-hidden className='rtl:hidden' />
            <IconArrowLeft aria-hidden className='hidden rtl:inline' />
          </button>
        </div>
      </div>

    </form>
  );
}