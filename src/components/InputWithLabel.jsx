export default function InputWithLabel({
  label,
  inputName,
  type = 'text',
  value,
  onChange,
}) {
  return (
    <div>
      <label
        htmlFor={inputName}
        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        type={type}
        name={inputName}
        id={inputName}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        placeholder={type === 'password' ? '••••••••' : `Enter your ${label}`}
        spellCheck={false}
        autoComplete="off"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
