'use client';

import { useState } from 'react';
import { useAtom } from 'jotai';
import { useTranslation } from '@/app/i18n/client';
import * as Dialog from '@radix-ui/react-dialog';
import { IconSettings, IconX } from '@tabler/icons-react';
import ToastNotification from './ToastNotification';
import { RadioButtonGroupField } from '@/app/[lang]/components/form';
import * as Settings from '@/app/lib/app-settings';

type Props = {
  /** Language */
  lng?: string,
  /** The open state of the dialog when it is initially rendered */
  open?: boolean,
};

/** Dialog that allows the user to change app settings */
export default function SettingsDialog({ lng, open = false }: Props) {
  const { t } = useTranslation(lng || '', ['app', 'common']);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  /* Settings Data */
  const [theme, setTheme] = useAtom(Settings.themeAtom);
  // TODO: Add more settings here

  /** Notify user that the updated settings have been saved */
  const notifySave = () => {
    setToastMsg(t('settings.saved_message'));
    setToastOpen(true);
  };

  /** Save the user's theme preference and apply it */
  const applyTheme = (themeValue: Settings.Themes, notify = true) => {
    // Update theme value in local storage
    setTheme(themeValue);

    /* Apply the theme
     * NOTE: If there are significant changes to the following line, update the script in the
     *`<head>` if necessary */
    (document.querySelector('html') as HTMLHtmlElement).dataset.theme = themeValue;

    // Notify user (if the user should be notified)
    if (notify) notifySave();
  };

  /** Reset all settings to their default values  */
  const resetSettings = () => {
    // Set to defaults
    applyTheme(Settings.defaults.theme, false);
    // TODO: Add more settings here

    // Notify user of reset
    setToastMsg(t('settings.reset_message'));
    setToastOpen(true);
  };

  return (
    <>
      <Dialog.Root defaultOpen={open}>
        <Dialog.Trigger asChild>
          <button className='btn btn-ghost px-2' title={t('settings.heading')}>
            <IconSettings stroke={1.5} size={32} />
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content
            aria-describedby={undefined}
            className='modal data-[state=open]:modal-open'
          >
            <div className='modal-box prose'>
              <Dialog.Title>{t('settings.heading')}</Dialog.Title>
              <form noValidate={true} aria-label={t('settings.heading')}>
                <RadioButtonGroupField
                  name='theme'
                  label={t('settings.theme_switcher.label')}
                  containerClass=''
                  optionClass='btn-sm disabled:checked:opacity-20'
                  options={[
                    { value: Settings.Themes.light, text: t('settings.theme_switcher.light') },
                    { value: Settings.Themes.dark, text: t('settings.theme_switcher.dark') },
                    { value: Settings.Themes.auto, text: t('settings.theme_switcher.auto') },
                  ]}
                  value={theme}
                  onChange={(e) => applyTheme(e.target.value as Settings.Themes)}
                />
                {/* TODO: Add more settings here */}
              </form>
              <div className='action mt-8'>
                <button
                  className='btn btn-sm btn-outline normal-case font-normal'
                  onClick={resetSettings}
                >
                  {t('settings.reset_button')}
                </button>
              </div>
              <Dialog.Close asChild>
                <button
                  className='btn-ghost btn btn-sm btn-square text-base-content absolute end-3 top-3'
                  title={t('close')}
                >
                  <IconX aria-hidden />
                </button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <ToastNotification
        lng={lng}
        message={toastMsg}
        open={toastOpen}
        onOpenChange={setToastOpen}
      />
    </>
  );
}