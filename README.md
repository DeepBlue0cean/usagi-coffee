# USAGI Coffee

Landing page tĩnh cho thương hiệu cà phê **USAGI** (Robusta & Arabica Lâm Đồng) — *Good coffee fits into your day.*

🌐 Demo: https://deepblue0cean.github.io/usagi-coffee/

## Tính năng

- Hero slider Robusta / Arabica, tự chuyển và có điều hướng
- Header cố định; các mục điều hướng cuộn tới và focus đúng nội dung
- Responsive, hỗ trợ `prefers-reduced-motion`
- Không dùng framework, không cần build

## Cấu trúc

```
index.html   # nội dung và điều hướng trang
style.css    # giao diện responsive
script.js    # slider và focus điều hướng
asset/       # toàn bộ ảnh được trang sử dụng
```

## Chạy local

Mở `index.html` trực tiếp bằng trình duyệt, hoặc chạy server tĩnh:

```bash
npx serve .
```

## Deploy (GitHub Pages)

Settings → Pages → Source: **Deploy from a branch** → `main` / `/ (root)`.

## Tuỳ chỉnh

- Cập nhật số điện thoại và liên kết Facebook trong `index.html` khi thông tin liên hệ thay đổi.
- Thay ảnh trong `asset/` khi cập nhật thiết kế.