import { TextField } from '@/app/[lang]/components/form';
import { type TFunction } from 'i18next';
import { useAtomValue } from 'jotai';
import {
  ADDRESS_LENGTH,
  assetConfigFormControlAtom,
  showFormErrorsAtom,
  tipBtnClass,
  tipContentClass,
} from '@/app/lib/txn-data';
import FieldErrorMessage from '../FieldErrorMessage';

export default function ReserveAddr({ t }: { t: TFunction }) {
  const form = useAtomValue(assetConfigFormControlAtom);
  const showFormErrors = useAtomValue(showFormErrorsAtom);
  return (<>
    <TextField label={t('fields.apar_r.label')}
      name='apar_r'
      id='apar_r-input'
      tip={{
        content: t('fields.apar_r.tip'),
        btnClass: tipBtnClass,
        btnTitle: t('fields.more_info'),
        contentClass: tipContentClass
      }}
      inputInsideLabel={false}
      placeholder={t('fields.apar_r.placeholder')}
      containerId='apar_r-field'
      containerClass='mt-4'
      inputClass={
        ((showFormErrors || form.touched.apar_r) && form.fieldErrors.apar_r) ? 'input-error' : ''
      }
      maxLength={ADDRESS_LENGTH}
      value={form.values.apar_r as string}
      onChange={(e) => form.handleOnChange('apar_r')(e.target.value)}
      onFocus={form.handleOnFocus('apar_r')}
      onBlur={form.handleOnBlur('apar_r')}
    />
    {(showFormErrors || form.touched.apar_r) && form.fieldErrors.apar_r &&
      <FieldErrorMessage t={t}
        i18nkey={form.fieldErrors.apar_r.message.key}
        dict={form.fieldErrors.apar_r.message.dict}
      />
    }
  </>);
}
