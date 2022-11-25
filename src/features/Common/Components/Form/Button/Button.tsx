import { twMerge } from 'tailwind-merge';

export type ButtonSizeType = 'xs' | 'sm' | 'normal';
export type ButtonColorType = 'primary' | 'light' | 'blue' | 'orange' | 'gray';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSizeType;
  color?: ButtonColorType;
  children: React.ReactNode;
  isLoading?: boolean;
}

const Button = ({
  isLoading,
  children,
  className,
  disabled,
  color = 'primary',
  size = 'normal',
  ...anotherProps
}: ButtonProps) => {
  let colorClassNames = '';
  let sizeClassNames = '';
  let spinnerColorClassNames = '';

  switch (color) {
    default:
      colorClassNames +=
        'bg-teal-400 hover:bg-teal-500 text-white ring-teal-400 disabled:ring-gray-200 disabled:bg-gray-200';
      spinnerColorClassNames += disabled === true ? 'border-white' : 'border-gray-400';
  }

  switch (size) {
    case 'xs':
      sizeClassNames += 'px-2 py-1';
      break;

    case 'sm':
      sizeClassNames += 'px-4 py-2 rounded-md shadow-none drop-shadow-none';
      break;

    default:
      sizeClassNames += 'px-8 py-2';
  }

  return (
    <button
      type="button"
      className={twMerge(
        'rounded-md',
        sizeClassNames,
        'duration-100s font-semibold outline-none ring-2 transition-colors',
        colorClassNames,
        className,
        'flex items-center justify-center',
      )}
      disabled={disabled}
      {...anotherProps}
    >
      {isLoading === true && (
        <div
          className={twMerge(
            'h-4 w-4 border-2',
            spinnerColorClassNames,
            'mr-4 animate-spin rounded-full border-t-transparent',
          )}
        />
      )}
      {children}
    </button>
  );
};

export default Button;