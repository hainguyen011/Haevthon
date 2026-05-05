# Finalize Incentive Tech Card Aesthetic

Hoàn thiện thẩm mỹ "Tech Card" cho cổng thông tin Incentive, đảm bảo tính nhất quán cao cao cấp và phong cách "Agentic".

## User Review Required

> [!IMPORTANT]
> Việc sử dụng `clip-path` sẽ làm mất đi các đường viền (border) truyền thống. An sẽ sử dụng `drop-shadow` hoặc một lớp div giả lập phía sau để tạo hiệu ứng viền kim loại sắc sảo.

> [!TIP]
> An sẽ tối ưu hóa font chữ: dùng **Outfit** cho các tiêu đề mạnh mẽ và **Inter** cho phần mô tả để đảm bảo độ đọc tốt nhất trên nền Glassmorphism.

## Proposed Changes

### Components

#### [MODIFY] [IncentivesSection.jsx](file:///d:/I2FLabs/Projects/Haevthon/src/components/IncentivesSection.jsx)
- **Hình học Card**: Triển khai `clip-path` với các góc cắt v-shaped (ví dụ: cắt góc trên bên trái và dưới bên phải).
- **Glassmorphism**: 
    - Layer 1: Nền đen mờ (`rgba(10, 10, 10, 0.7)`).
    - Layer 2: Gradient sáng tinh tế để tạo cảm giác bề mặt kim loại.
    - Hiệu ứng `backdrop-filter: blur(20px)`.
- **Typography**:
    - Title: `Outfit`, `900 weight`, `letter-spacing: 1px`.
    - Body: `Inter`, `300-400 weight`, `line-height: 1.6`.
- **Branding**: Tinh chỉnh các thanh tím (`Top Branded Bar`, `Bottom Branded Footer`) để chúng trông như được "nhúng" vào khối card đã cắt góc.

## Verification Plan

### Automated Tests
- Kiểm tra hiển thị trên Browser với các độ phân giải khác nhau.
- Xác nhận không có hiện tượng "tràn nội dung" (content overflow) do `clip-path`.

### Manual Verification
- Kiểm tra độ tương phản và tính thẩm mỹ trên màn hình chuẩn.
- Đảm bảo hiệu ứng hover (nếu có) mượt mà và không gây giật lag.
