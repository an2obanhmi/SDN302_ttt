import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string()
    .min(1, 'Tên sản phẩm là bắt buộc')
    .max(100, 'Tên sản phẩm không được vượt quá 100 ký tự'),
  description: z.string()
    .min(1, 'Mô tả sản phẩm là bắt buộc'),
  price: z.number()
    .min(0, 'Giá sản phẩm không được âm'),
  image: z.string().optional(),
});

export const updateProductSchema = createProductSchema.partial();

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>; 