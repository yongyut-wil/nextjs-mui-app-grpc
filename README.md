# Next.js MUI Application

A modern, production-ready Next.js application built with Material UI and TypeScript.

## Features | คุณสมบัติ

- **Next.js 15** - Latest version with App Router | เวอร์ชันล่าสุดพร้อม App Router
- **TypeScript** - Type safety throughout the codebase | ความปลอดภัยด้านประเภทข้อมูลตลอดทั้งโค้ด
- **Material UI (MUI)** - Complete UI component library | ไลบรารีคอมโพเนนต์ UI ที่สมบูรณ์
- **Responsive Design** - Mobile-first approach | การออกแบบที่ตอบสนองด้วยแนวคิด Mobile-first
- **Theme Configuration** - Customizable theming with MUI | การกำหนดค่าธีมที่ปรับแต่งได้กับ MUI
- **PNPM** - Fast, disk space efficient package manager | ตัวจัดการแพ็คเกจที่เร็วและประหยัดพื้นที่ดิสก์

## Getting Started | เริ่มต้นใช้งาน

### Prerequisites | ข้อกำหนดเบื้องต้น

- Node.js 18.17 or later | Node.js 18.17 หรือใหม่กว่า
- PNPM

### Installation | การติดตั้ง

1. Clone the repository | โคลนที่เก็บโค้ด:

```bash
git clone https://github.com/yongyut-wil/nextjs-mui-app-grpc
cd nextjs-mui-app-grpc
```

2. Install dependencies | ติดตั้งแพ็คเกจที่จำเป็น:

```bash
pnpm install
```

3. Run the development server | รันเซิร์ฟเวอร์สำหรับการพัฒนา:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result | เปิด [http://localhost:3000](http://localhost:3000) ด้วยเบราว์เซอร์เพื่อดูผลลัพธ์

## Project Structure | โครงสร้างโปรเจค

```
nextjs-mui-app/
├── public/                # Static assets | สินทรัพย์คงที่
├── src/
│   ├── app/               # App Router pages | หน้าของ App Router
│   │   ├── layout.tsx     # Root layout | เลย์เอาต์หลัก
│   │   └── page.tsx       # Home page | หน้าแรก
│   ├── components/        # Reusable components | คอมโพเนนต์ที่นำกลับมาใช้ใหม่ได้
│   └── theme/             # MUI theme configuration | การกำหนดค่าธีม MUI
├── .gitignore
├── next.config.ts         # Next.js configuration | การกำหนดค่า Next.js
├── package.json           # Project dependencies | แพ็คเกจที่โปรเจคต้องการ
├── pnpm-lock.yaml         # PNPM lock file | ไฟล์ล็อค PNPM
├── postcss.config.mjs     # PostCSS configuration | การกำหนดค่า PostCSS
├── tailwind.config.ts     # Tailwind CSS configuration | การกำหนดค่า Tailwind CSS
└── tsconfig.json          # TypeScript configuration | การกำหนดค่า TypeScript
```

## Customizing the Theme | การปรับแต่งธีม

The theme is defined in `src/theme/theme.ts`. You can modify colors, typography, component styles, and other theme properties according to your needs. | ธีมถูกกำหนดไว้ใน `src/theme/theme.ts` คุณสามารถปรับเปลี่ยนสี, ตัวอักษร, สไตล์ของคอมโพเนนต์ และคุณสมบัติธีมอื่นๆ ตามความต้องการของคุณ

## Deployment | การเผยแพร่

The application can be deployed to various platforms | แอปพลิเคชันสามารถเผยแพร่บนแพลตฟอร์มต่างๆ:

- [Render](https://render.com/) - Example deployment | ตัวอย่างการเผยแพร่: [https://nextjs-mui-app-grpc.onrender.com/](https://nextjs-mui-app-grpc.onrender.com/)

## License | ใบอนุญาต

This project is licensed under the MIT License. | โปรเจคนี้ได้รับอนุญาตภายใต้ใบอนุญาต MIT
