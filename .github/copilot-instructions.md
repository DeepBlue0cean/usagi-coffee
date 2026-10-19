# USAGI Coffee – Copilot Instructions

## Project
Landing page tĩnh cho thương hiệu cà phê USAGI (Robusta & Arabica Lâm Đồng), host trên GitHub Pages. Không framework, không bước build.

## Structure
- `index.html` – nội dung; `style.css` – giao diện/hiệu ứng; `script.js` – slider, reveal, parallax (vanilla JS).
- `img/` – ảnh dùng trên trang; `asset/` – ảnh thiết kế gốc, chỉ để tham khảo, không tham chiếu từ trang.

## Conventions
- Giữ HTML/CSS/JS thuần, không thêm thư viện hay build tool nếu không được yêu cầu.
- Nội dung hiển thị bằng tiếng Việt, tiêu đề phong cách có thể dùng tiếng Anh như thiết kế. Thẻ `<html lang="vi">`.
- Màu và biến dùng `:root` trong `style.css` (`--bg`, `--bg2`, `--ink`, `--accent`, `--dark`); không hard-code màu mới nếu đã có biến phù hợp.
- Hiệu ứng cuộn dùng class `.reveal` (+ `.left`/`.right`) và `IntersectionObserver`; không dùng scroll handler nặng, giữ `passive: true`.
- Tôn trọng `prefers-reduced-motion` và responsive (breakpoint 760px).
- Ảnh phải có `alt`; ảnh dưới màn hình đầu tiên dùng `loading="lazy"`; ưu tiên WebP, có `width`/`height` để tránh layout shift.
- Đường dẫn tương đối (vd. `img/x.jpg`), không dùng đường dẫn tuyệt đối bắt đầu bằng `/`, vì trang chạy ở `/usagi-coffee/` trên GitHub Pages.

## Workflow
- Kiểm tra bằng cách mở `index.html` hoặc `npx serve .`; xem cả desktop và mobile (~390px).
- Commit nhỏ, message ngắn gọn bằng tiếng Anh (vd. `Add hero slider`).
- Cập nhật `README.md` khi đổi cấu trúc hoặc cách deploy.
- Không commit thông tin bí mật; email/link liên hệ hiện là giá trị mẫu cần thay.
