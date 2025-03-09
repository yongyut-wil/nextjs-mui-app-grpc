# Next.js MUI Application with gRPC Integration

A modern, production-ready Next.js application built with Material UI, TypeScript, and gRPC for efficient API communication.

## Features | คุณสมบัติ

- **Next.js 15** - Latest version with App Router 
- **TypeScript** - Type safety throughout the codebase 
- **Material UI (MUI) 6** - Latest UI component library with improved performance 
- **gRPC Integration** - Efficient API communication with Protocol Buffers 
- **Data Visualization** - Advanced data structure transformation and display 
- **Responsive Design** - Mobile-first approach 
- **Theme Configuration** - Customizable theming with MUI 
- **React 19** - Latest React version with improved performance

## Live Preview | ดูตัวอย่าง
- [Render](https://render.com/) - Live deployment | การเผยแพร่แบบออนไลน์: [https://nextjs-mui-app-grpc.onrender.com/](https://nextjs-mui-app-grpc.onrender.com/)


## Getting Started | เริ่มต้นใช้งาน

### Prerequisites | ข้อกำหนดเบื้องต้น

- Node.js 18.17 or later | Node.js 18.17 หรือใหม่กว่า
- NPM or PNPM | NPM หรือ PNPM

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
nextjs-mui-app-grpc/
├── public/                     # Static assets | สินทรัพย์คงที่
├── src/
│   ├── app/                    # App Router pages | หน้าของ App Router
│   │   ├── api/                # API routes | เส้นทาง API
│   │   │   └── grpc/          # gRPC API handler | ตัวจัดการ API แบบ gRPC
│   │   ├── api-data/          # Data visualization page | หน้าแสดงข้อมูล
│   │   ├── todo-list/         # Todo list page | หน้ารายการสิ่งที่ต้องทำ
│   │   ├── layout.tsx         # Root layout | เลย์เอาต์หลัก
│   │   └── page.tsx           # Home page | หน้าแรก
│   ├── components/            # Reusable components | คอมโพเนนต์ที่นำกลับมาใช้ใหม่ได้
│   │   ├── AppHeader.tsx      # Header component | คอมโพเนนต์ส่วนหัว
│   │   └── FeatureCard.tsx    # Feature card component | คอมโพเนนต์การ์ดคุณสมบัติ
│   ├── protos/                # Protocol Buffers definitions | นิยาม Protocol Buffers
│   │   └── users.proto        # User service proto file | ไฟล์ proto สำหรับบริการผู้ใช้
│   ├── services/              # Service layer | เลเยอร์บริการ
│   │   ├── userService.ts     # User service implementation | การใช้งานบริการผู้ใช้
│   │   └── users.interface.ts # User interfaces | อินเตอร์เฟซผู้ใช้
│   └── theme/                 # MUI theme configuration | การกำหนดค่าธีม MUI
│       ├── ThemeRegistry.tsx  # Theme registry component | คอมโพเนนต์ลงทะเบียนธีม
│       └── theme.ts           # Theme definition | นิยามธีม
├── next.config.js             # Next.js configuration | การกำหนดค่า Next.js
├── package.json               # Project dependencies | แพ็คเกจที่โปรเจคต้องการ
└── tsconfig.json              # TypeScript configuration | การกำหนดค่า TypeScript
```

## Key Features Overview | ภาพรวมคุณสมบัติหลัก

### gRPC API Integration | การผสาน API แบบ gRPC

This project demonstrates the use of gRPC for efficient API communication with Protocol Buffers. The implementation includes:

- Protocol Buffers in `src/protos/users.proto`
- API route handler in `src/app/api/grpc/route.ts`
- User service implementation in `src/services/userService.ts`

โปรเจคนี้แสดงการใช้งาน gRPC สำหรับการสื่อสาร API ที่มีประสิทธิภาพด้วย Protocol Buffers การติดตั้งประกอบด้วย:
- Protocol Buffers ใน `src/protos/users.proto`
- ตัวจัดการเส้นทาง API ใน `src/app/api/grpc/route.ts`
- การใช้งานบริการผู้ใช้ใน `src/services/userService.ts`

### Data Visualization | การแสดงผลข้อมูล

The API Data page (`src/app/api-data/page.tsx`) showcases:

- Fetching data from gRPC API
- Transforming data into a department-based structure
- Displaying complex data using MUI components
- Data aggregation, filtering, and analysis

หน้าข้อมูล API (`src/app/api-data/page.tsx`) แสดงให้เห็นถึง:
- การดึงข้อมูลจาก API แบบ gRPC
- การแปลงข้อมูลเป็นโครงสร้างตามแผนก
- การแสดงข้อมูลที่ซับซ้อนโดยใช้คอมโพเนนต์ MUI
- การรวม การกรอง และการวิเคราะห์ข้อมูล

### Customizing the Theme | การปรับแต่งธีม

The theme is defined in `src/theme/theme.ts`. You can modify colors, typography, component styles, and other theme properties according to your needs. | ธีมถูกกำหนดไว้ใน `src/theme/theme.ts` คุณสามารถปรับเปลี่ยนสี, ตัวอักษร, สไตล์ของคอมโพเนนต์ และคุณสมบัติธีมอื่นๆ ตามความต้องการของคุณ

## Running the Application | การรันแอปพลิเคชัน

After installation, you can run the application in development mode:

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to explore the following pages:

- **Home**: Main landing page with feature overview
- **API Data**: Visualization of API data grouped by department
- **Todo List**: A simple todo list application

หลังจากติดตั้งแล้ว คุณสามารถรันแอปพลิเคชันในโหมดการพัฒนา:

```bash
npm run dev
# or
pnpm dev
```

เปิด [http://localhost:3000](http://localhost:3000) เพื่อสำรวจหน้าต่อไปนี้:

- **หน้าหลัก**: หน้าแรกพร้อมภาพรวมคุณสมบัติ
- **ข้อมูล API**: การแสดงผลข้อมูล API ที่จัดกลุ่มตามแผนก
- **รายการสิ่งที่ต้องทำ**: แอปพลิเคชันรายการสิ่งที่ต้องทำอย่างง่าย

## License | ใบอนุญาต

This project is licensed under the MIT License. | โปรเจคนี้ได้รับอนุญาตภายใต้ใบอนุญาต MIT
