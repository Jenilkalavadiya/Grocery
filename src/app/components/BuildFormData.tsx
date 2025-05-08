interface ProductDetail {
  productPrice: string;
  variation: string;
  discount: string;
  discountPrice: string;
}

interface OtherInfo {
  title: string;
  description: string;
}

interface FormValues {
  name: string;
  category: string;
  subCategory: string;
  brand: string;
  status: number;
  productDetails: ProductDetail[];
  otherInfo: OtherInfo[];
  image: File | string | null;
}

export const buildFormData = (
  values: FormValues,
  variationId: string | null,
  newProductId: string | null
) => {
  const formData = new FormData();
  formData.append("product_name", values.name);
  formData.append("fk_category_id", values.category);
  formData.append("fk_subcategory_id", values.subCategory);
  formData.append("fk_brand_id", values.brand);
  formData.append("stock_status", values.status.toString());

  values?.productDetails.forEach((detail: ProductDetail, index: number) => {
    formData.append(`products[${index}][product_price]`, detail.productPrice);
    formData.append(`products[${index}][variation]`, detail.variation);
    formData.append(`products[${index}][discount]`, detail.discount);
    formData.append(`products[${index}][discount_price]`, detail.discountPrice);
    if (variationId) {
      formData.append(`products[${index}][id]`, variationId);
    }
  });

  values.otherInfo.forEach((info: OtherInfo, index: number) => {
    formData.append(`products[${index}][title]`, info.title);
    formData.append(`products[${index}][description]`, info.description);
  });

  if (values?.image instanceof File) {
  
    formData.append("image", values.image);
  }

  if (newProductId) formData.append("id", newProductId);

  return formData;
};
