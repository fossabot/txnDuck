import FieldTip from './FieldTip';
import type { NumberFieldProps } from './types';

/** Number form field. Includes a `<label>` element and an `<input>` element */
export default function NumberField({
  required = false,
  id = '',
  inputClass = '',
  label = '',
  labelClass = '',
  labelTextClass = '',
  inputInsideLabel = false,
  containerId = undefined,
  containerClass = '',
  requiredText = '',
  helpMsg = '',
  min = null,
  max = null,
  step = null,
  beforeSideLabel = '',
  afterSideLabel = '',
  name ='',
  defaultValue = undefined,
  disabled = false,
  autoComplete = undefined, // Use browser default
  value = undefined,
  onChange = undefined,
  onFocus = undefined,
  onBlur = undefined,
  tip = undefined,
}: NumberFieldProps) {
  return (
    <div className={`form-control ${containerClass}`} id={containerId}>
      <label className={`label ${labelClass}`} htmlFor={id || undefined}>
        <span className={`label-text ${labelTextClass}`}>
          {label}
          {required && <span className='text-error px-1' title={requiredText || undefined}>*</span>}
          {tip && <FieldTip tipProps={tip} />}
        </span>

        {inputInsideLabel && <>
          {(!beforeSideLabel && !afterSideLabel) &&
            <input
              className={`input-bordered input ${inputClass}`}
              type='number'
              id={id || undefined}
              required={required}
              min={min !== null? min : undefined }
              max={max !== null? max : undefined }
              step={step !== null? step : undefined }
              name={name || undefined}
              defaultValue={defaultValue}
              disabled={disabled}
              autoComplete={autoComplete}
              value={value}
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          }
          {(beforeSideLabel || afterSideLabel) && <>
            <span className='join'>
              {beforeSideLabel &&
                <span className='join-item bg-base-200 flex items-center px-4'>
                  {beforeSideLabel}
                </span>
              }
              <input
                className={`input-bordered input join-item ${inputClass}`}
                type='number'
                id={id || undefined}
                required={required}
                min={min !== null? min : undefined }
                max={max !== null? max : undefined }
                step={step !== null? step : undefined }
                name={name || undefined}
                defaultValue={defaultValue}
                disabled={disabled}
                autoComplete={autoComplete}
                value={value}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
              />
              {afterSideLabel &&
                <span className='join-item bg-base-200 flex items-center px-4'>
                  {afterSideLabel}
                </span>
              }
            </span>
          </>}
        </>}
      </label>

      {!inputInsideLabel && <>
        {(!beforeSideLabel && !afterSideLabel) &&
          <input
            className={`input-bordered input ${inputClass}`}
            type='number'
            id={id || undefined}
            required={required}
            min={min !== null? min : undefined }
            max={max !== null? max : undefined }
            step={step !== null? step : undefined }
            name={name || undefined}
            defaultValue={defaultValue}
            disabled={disabled}
            autoComplete={autoComplete}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        }
        {(beforeSideLabel || afterSideLabel) &&
          <span className='join'>
            {beforeSideLabel &&
              <span className='join-item bg-base-200 flex items-center px-4'>
                {beforeSideLabel}
              </span>
            }
            <input
              className={`input-bordered input join-item ${inputClass}`}
              type='number'
              id={id || undefined}
              required={required}
              min={min !== null? min : undefined }
              max={max !== null? max : undefined }
              step={step !== null? step : undefined }
              name={name || undefined}
              defaultValue={defaultValue}
              disabled={disabled}
              autoComplete={autoComplete}
              value={value}
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onBlur}
            />
            {afterSideLabel &&
              <span className='join-item bg-base-200 flex items-center px-4'>
                {afterSideLabel}
              </span>
            }
          </span>
        }
      </>}

      {helpMsg &&
        <div className='label help-msg'><span className='label-text-alt'>{helpMsg}</span></div>
      }
    </div>
  );
}
