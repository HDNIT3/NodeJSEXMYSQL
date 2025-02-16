npm init -y

# Cài đặt Express, MySQL với Sequelize, Socket.io
npm install express mysql2 sequelize dotenv cors socket.io jsonwebtoken bcryptjs body-parser joi

# Cài đặt Nodemon (dùng cho môi trường dev)
npm install --save-dev nodemon


const fs = require("fs");
const path = require("path");

// Danh sách thư mục cần tạo
const folders = [
    "src",
    "src/config",
    "src/controllers",
    "src/models",
    "src/routes",
    "src/middleware",
    "src/services"
];

// Tạo thư mục nếu chưa tồn tại
folders.forEach(folder => {
    const folderPath = path.join(__dirname, folder);
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
        console.log(`📁 Đã tạo thư mục: ${folder}`);
    } else {
        console.log(`✅ Thư mục đã tồn tại: ${folder}`);
    }
});

// Tạo file `.env` nếu chưa có
const envPath = path.join(__dirname, ".env");
if (!fs.existsSync(envPath)) {
    const envContent = `PORT=5000
DB_HOST=localhost
DB_NAME=mydatabase
DB_USER=root
DB_PASS=yourpassword
DB_DIALECT=mysql
JWT_SECRET=mysecretkey`;
    fs.writeFileSync(envPath, envContent);
    console.log("✅ Đã tạo file .env");
} else {
    console.log("✅ File .env đã tồn tại");
}

console.log("🚀 Setup hoàn tất!");
