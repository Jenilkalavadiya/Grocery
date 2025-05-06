import React from "react";
import { FormikErrors, FormikTouched } from "formik";

interface ProductDetailInputProps {
  index: number;
  values: {
    productDetails: Array<{
      variation: string;
      productPrice: string;
      discount: string;
      discountPrice: string;
    }>;
  };
  errors: FormikErrors<{
    productDetails: Array<{
      variation: string;
      productPrice: string;
      discount: string;
      discountPrice: string;
    }>;
  }>;
  touched: FormikTouched<{
    productDetails: Array<{
      variation: string;
      productPrice: string;
      discount: string;
      discountPrice: string;
    }>;
  }>;
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
  return (
    <div className="flex gap-8 flex-wrap items-end">
      {["variation", "productPrice", "discount", "discountPrice"].map(
        (field) => (
          <div key={field} className="flex flex-col mt-3 gap-2">
            <span className="text-gray-400 font-bold capitalize">{field}</span>
            <input
              type="text"
              name={`productDetails[${index}].${field}`}
              value={
                values?.productDetails[index]?.[
                  field as keyof (typeof values.productDetails)[0]
                ]
              }
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-[300px] border border-gray-400 focus:outline-none bg-white text-black h-[42px] p-1"
              placeholder={field}
            />
            {touched?.productDetails?.[index]?.[
              field as keyof (typeof values.productDetails)[0]
            ] &&
              errors?.productDetails?.[index]?.[
                field as keyof (typeof values.productDetails)[0]
              ] && (
                <div className="text-red-500">
                  {
                    errors.productDetails[index][
                      field as keyof (typeof values.productDetails)[0]
                    ]
                  }
                </div>
              )}
          </div>
        )
      )}

      {values.productDetails.length > 1 && (
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

export default ProductDetailInput;
