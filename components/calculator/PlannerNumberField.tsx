export function PlannerNumberField({
  id,
  label,
  value,
  unit,
  min,
  max,
  step,
  integer = false,
  error,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  step?: string;
  integer?: boolean;
  error?: string;
  onChange: (value: number) => void;
}) {
  const rangeInvalid = !Number.isFinite(value) || value < min || value > max;
  const integerInvalid = integer && Number.isFinite(value) && !Number.isInteger(value);
  const message = rangeInvalid
    ? `Bitte einen Wert zwischen ${format(min)} und ${format(max)} ${unit} eingeben.`
    : integerInvalid
      ? `Bitte eine ganze Zahl zwischen ${format(min)} und ${format(max)} eingeben.`
      : error;
  const invalid = Boolean(message);

  return <div className="field">
    <label htmlFor={id}>{label}</label>
    <div className="input-with-unit">
      <input
        id={id}
        type="number"
        inputMode={integer ? "numeric" : "decimal"}
        value={Number.isFinite(value) ? value : ""}
        min={min}
        max={max}
        step={integer ? "1" : step}
        aria-invalid={invalid}
        aria-describedby={invalid ? `${id}-error` : undefined}
        onChange={(event) => onChange(event.target.valueAsNumber)}
      />
      <span>{unit}</span>
    </div>
    {message && <small className="field-error" id={`${id}-error`}>{message}</small>}
  </div>;
}

function format(value: number) {
  return value.toLocaleString("de-DE", { maximumFractionDigits: 2 });
}
