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
  formData.append("productName", values.name);
  formData.append("fkCategoryId", values.category);
  formData.append("fkSubcategoryId", values.subCategory);
  formData.append("fkBrandId", values.brand);
  formData.append("stockStatus", values.status.toString());

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
