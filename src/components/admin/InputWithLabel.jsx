'use client';

export default function InputWithLabel({
  label,
  type = 'text',
  value,
  onChange,
  fieldName,
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-lg" htmlFor={fieldName}>
        {label}
      </label>
      <input
        type={type}
        id={fieldName}
        name={fieldName}
        value={value}
        onChange={onChange}
        required
        placeholder={`Enter the ${label}`}
        className="w-2/3 rounded-md border bg-transparent py-1 pl-2 text-lg"
      />
    </div>
  );
}
