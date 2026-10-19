# USAGI Coffee

Landing page tĩnh cho thương hiệu cà phê **USAGI** (Robusta & Arabica Lâm Đồng) — *Good coffee fits into your day.*

🌐 Demo: https://deepblue0cean.github.io/usagi-coffee/

## Tính năng

- Hero slider (Robusta / Arabica / Coffee Filter), tự chuyển và có điều hướng
- Hiệu ứng reveal khi cuộn, thanh tiến trình, parallax, menu đổi nền khi cuộn
- Responsive, hỗ trợ `prefers-reduced-motion`
- Không dùng framework, không cần build

## Cấu trúc

```
index.html   # nội dung trang
style.css    # giao diện & hiệu ứng
script.js    # slider, reveal, parallax
img/         # ảnh đã cắt từ thiết kế
asset/       # ảnh thiết kế gốc
```

## Chạy local

Mở `index.html` trực tiếp bằng trình duyệt, hoặc chạy server tĩnh:

```bash
npx serve .
```

## Deploy (GitHub Pages)

Settings → Pages → Source: **Deploy from a branch** → `main` / `/ (root)`.

## Tuỳ chỉnh

- Đổi link liên hệ trong nút "Liên hệ đặt hàng" ở `index.html` (hiện là email mẫu `hello@usagicoffee.vn`).
- Thay ảnh trong `img/` bằng ảnh PNG/WebP chất lượng cao khi có.