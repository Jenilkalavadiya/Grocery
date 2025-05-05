import React from "react";

interface OtherInfo {
  title: string;
  description: string;
}

interface FormValues {
  otherInfo: OtherInfo[];
}

interface FormErrors {
  otherInfo?: {
    [key: number]: {
      title?: string;
      description?: string;
    };
  };
}

interface FormTouched {
  otherInfo?: {
    [key: number]: {
      title?: boolean;
      description?: boolean;
    };
  };
}

interface OtherInfoInputProps {
  index: number;
  values: FormValues;
  errors: FormErrors;
  touched: FormTouched;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  remove: (index: number) => void;
}

export const OtherInfoInput = ({
  index,
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  remove,
}: OtherInfoInputProps) => {
  return (
    <div className="flex gap-8 flex-wrap items-end">
      {["title", "description"].map((field) => (
        <div key={field} className="flex flex-col mt-3 gap-2">
          <span className="text-gray-400 font-bold capitalize">{field}</span>
          <textarea
            name={`otherInfo[${index}].${field}`}
            value={values?.otherInfo[index]?.[field as keyof OtherInfo]}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-[600px] border border-gray-400 focus:outline-none bg-white text-black p-1"
            placeholder={field}
          />
          {touched?.otherInfo?.[index]?.[field as keyof OtherInfo] &&
            errors?.otherInfo?.[index]?.[field as keyof OtherInfo] && (
              <div className="text-red-500">
                {errors.otherInfo[index][field as keyof OtherInfo]}
              </div>
            )}
        </div>
      ))}

      {values.otherInfo.length > 1 && (
        <div className="flex items-end">
          <button
            type="button"
            onClick={() => remove(index)}
            className="text-red-600 cursor-pointer"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
};

export default OtherInfoInput;
