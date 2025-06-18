# API Protection Documentation

## Tổng quan

Hệ thống đã được thiết lập authentication middleware để bảo vệ các API endpoints. Chỉ những người dùng đã đăng nhập mới có thể thực hiện các thao tác tạo, cập nhật và xóa sản phẩm.

## Cấu trúc Middleware

### `/lib/middleware.ts`

- `verifyAuth()`: Kiểm tra JWT token và trả về thông tin user
- `requireAuth()`: Yêu cầu authentication, trả về 401 nếu chưa đăng nhập
- `requireAdminAuth()`: Yêu cầu authentication và role admin

## API Endpoints

### Public Endpoints (Không cần đăng nhập)

- `GET /api/products` - Lấy danh sách sản phẩm
- `GET /api/products/[id]` - Lấy thông tin sản phẩm theo ID

### Protected Endpoints (Cần đăng nhập)

- `POST /api/products` - Tạo sản phẩm mới
- `PUT /api/products` - Cập nhật sản phẩm
- `DELETE /api/products` - Xóa sản phẩm
- `PUT /api/products/[id]` - Cập nhật sản phẩm theo ID
- `DELETE /api/products/[id]` - Xóa sản phẩm theo ID

## Response Codes

### 200 - Success
```json
{
  "success": true,
  "data": { ... }
}
```

### 401 - Unauthorized
```json
{
  "error": "Unauthorized - No token provided"
}
```

### 403 - Forbidden (Admin only)
```json
{
  "error": "Forbidden - Admin access required"
}
```

## Testing

### Chạy test tự động

```bash
npm run test:api
```

### Test thủ công

1. **Test public access:**
```bash
curl http://localhost:3000/api/products
```

2. **Test protected endpoints (sẽ trả về 401):**
```bash
# POST - Tạo sản phẩm
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","description":"Test","price":100,"image":"test.jpg"}'

# PUT - Cập nhật sản phẩm
curl -X PUT http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"id":"123","name":"Updated","description":"Updated","price":200,"image":"updated.jpg"}'

# DELETE - Xóa sản phẩm
curl -X DELETE "http://localhost:3000/api/products?id=123"
```

### Test với authentication

1. **Đăng nhập và lấy session**
2. **Sử dụng session cookie trong request**

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN" \
  -d '{"name":"Test","description":"Test","price":100,"image":"test.jpg"}'
```

## Security Features

- ✅ JWT token verification
- ✅ Session-based authentication
- ✅ Proper error handling
- ✅ Role-based access control (admin functions)
- ✅ Public read access, protected write access

## Implementation Details

### Middleware Integration

```typescript
// Trong API route
const authResult = await requireAuth(request as any);
if (authResult instanceof NextResponse) {
  return authResult; // Trả về lỗi 401
}
```

### Error Handling

- Invalid tokens: 401 Unauthorized
- Missing tokens: 401 Unauthorized
- Insufficient permissions: 403 Forbidden
- Database errors: 500 Internal Server Error

## Best Practices

1. **Luôn kiểm tra authentication trước khi xử lý request**
2. **Sử dụng proper error messages**
3. **Log authentication failures để monitoring**
4. **Implement rate limiting cho production**
5. **Sử dụng HTTPS trong production** 