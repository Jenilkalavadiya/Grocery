import { FormikErrors, FormikTouched } from "formik";
import { RiDeleteBin6Line } from "react-icons/ri";

interface ProductDetail {
  variation: string;
  productPrice: string;
  discount: string;
  discountPrice: string;
}

interface FormValues {
  productDetails: ProductDetail[];
}

interface ProductDetailInputProps {
  index: number;
  values: FormValues;
  errors: FormikErrors<FormValues>;
  touched: FormikTouched<FormValues>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  remove: (index: number) => void;
}

export const ProductDetailInput = ({
  index,
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  remove,
}: ProductDetailInputProps) => {
  const isNumericField = (field: string) =>
    ["productPrice", "discount", "discountPrice"].includes(field);

  return (
    <div className="flex justify-between flex-wrap">
      {["variation", "productPrice", "discount", "discountPrice"].map(
        (field) => (
          <div key={field} className="flex flex-col mt-3 gap-2">
            <span className="text-gray-400 font-bold capitalize">{field}</span>
            <input
              type={isNumericField(field) ? "number" : "text"}
              name={`productDetails[${index}].${field}`}
              value={
                isNumericField(field)
                  ? (values?.productDetails[index]?.[field] ?? "")
                  : ((
                      values?.productDetails[index]?.[field] as string
                    )?.trim() ?? "")
              }
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyDown={
                isNumericField(field)
                  ? (e) => {
                      if (["e", "E", "+", "-"].includes(e.key)) {
                        e.preventDefault();
                      }
                    }
                  : undefined
              }
              className="w-[300px] border border-gray-400 focus:outline-none bg-white text-black h-[48px] p-1"
              placeholder={field}
            />
            {touched?.productDetails?.[index]?.[field] &&
              errors?.productDetails?.[index]?.[field] && (
                <div className="text-red-500">
                  {errors?.productDetails[index]?.[field]}
                </div>
              )}
          </div>
        )
      )}
      {values.productDetails.length > 1 && (
        <div className="flex flex-col mt-5 justify-center items-center h-[80px]">
          <button
            type="button"
            onClick={() => remove(index)}
            className="text-2xl cursor-pointer"
          >
            <RiDeleteBin6Line />
          </button>
        </div>
      )}
    </div>
  );
};
