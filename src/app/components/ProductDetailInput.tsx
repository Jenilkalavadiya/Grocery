// components/ProductDetailInput.tsx
export const ProductDetailInput = ({ index, values, errors, touched, handleChange, handleBlur, remove }:any) => (
    <div className="flex justify-between flex-wrap">
      {["variation", "productPrice", "discount", "discountPrice"].map((field) => (
        <div key={field} className="flex flex-col mt-3 gap-2">
          <span className="text-gray-400 font-bold capitalize">{field}</span>
          <input
            type="text"
            name={`productDetails[${index}].${field}`}
            value={values?.productDetails[index]?.[field]}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-[300px] border border-gray-400 focus:outline-none bg-white text-black h-[42px] p-1"
            placeholder={field}
          />
          {touched?.productDetails?.[index]?.[field] &&
            errors?.productDetails?.[index]?.[field] && (
              <div className="text-red-500">{errors?.productDetails[index]?.[field]}</div>
            )}
        </div>
      ))}
      {values.productDetails.length > 1 && (
        <div className="flex items-end">
          <button type="button" onClick={() => remove(index)} className="text-red-600">
            Remove
          </button>
        </div>
      )}
    </div>
  );
  