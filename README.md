# USAGI Coffee

Landing page tĩnh cho thương hiệu cà phê **USAGI** (Robusta & Arabica Lâm Đồng) — *Good coffee fits into your day.*

🌐 Demo: https://deepblue0cean.github.io/usagi-coffee/

## Tính năng

- Hero slider gồm Arabica và Robusta ghép từ component PNG (variant2, variant1), cùng phin cà phê kim loại từ variant3; chữ, túi, hạt và nút điều hướng là các lớp riêng, không dùng ảnh thiết kế phẳng; hạt cà phê zoom in trước khi sản phẩm xuất hiện bằng CSS thuần
- Header cố định; các mục điều hướng cuộn tới và focus đúng nội dung
- Journal bung thành từng lớp khi cuộn tới
- Responsive, hỗ trợ `prefers-reduced-motion`
- Không dùng framework, không cần build

## Cấu trúc

```
index.html   # nội dung và điều hướng trang
style.css    # giao diện responsive
script.js    # slider, focus điều hướng và trạng thái hero trong viewport
asset/       # ảnh nội dung ở frame2/; component sản phẩm trong frame1/variant1/, variant2/ và variant3/
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