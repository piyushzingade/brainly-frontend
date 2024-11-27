

interface InputProps {
  placeholder: string;
  reference?: any
}

export const Input = ({ placeholder, reference }: InputProps) => {
  return (
    <div>
      <input
        ref={reference}
        placeholder={placeholder}
        type="text"
        className="px-4 py-2"
      />
    </div>
  );
};
