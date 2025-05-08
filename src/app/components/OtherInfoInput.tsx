import { RiDeleteBin6Line } from "react-icons/ri";

interface OtherInfo {
  title: string;
  description: string;
}

interface FormValues {
  otherInfo: OtherInfo[];
}

interface OtherInfoInputProps {
  index: number;
  values: FormValues;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  remove: (index: number) => void;
}

export const OtherInfoInput = ({
  index,
  values,
  handleChange,
  handleBlur,
  remove,
}: OtherInfoInputProps) => {
  return (
    <div className="flex gap-14 flex-wrap ">
      {["title", "description"].map((field) => (
        <div key={field} className="flex mb-3 flex-col mt-3 gap-2">
          <span className="text-gray-400 font-bold capitalize">{field}</span>
          <textarea
            name={`otherInfo[${index}].${field}`}
            value={values?.otherInfo[index]?.[field]?.trim() || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-[655px] border h-[80px] border-gray-400 focus:outline-none bg-white text-black p-2"
            placeholder={field}
          />
        </div>
      ))}

      {values.otherInfo.length > 1 && (
        <div className="flex flex-col mt-5 justify-center items-center h-[80px]">
          <button
            type="button"
            onClick={() => remove(index)}
            className=" text-2xl cursor-pointer mt-5 "
          >
            <RiDeleteBin6Line />
          </button>
        </div>
      )}
    </div>
  );
};

export default OtherInfoInput;
