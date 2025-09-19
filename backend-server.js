// backend-server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

// 使用 cors 中间件，允许所有来源的跨域请求
app.use(cors());
// 解析JSON格式的请求体
app.use(express.json());

// 用一个简单的数组来模拟数据库
let ordersDB = [];
let currentId = 1;

// --- API 路由 ---

// 处理 POST /api/orders 请求 (创建新订单)
app.post('/api/orders', (req, res) => {
  console.log('收到新的订单请求:', req.body);
  
  const newOrder = {
    id: currentId++,
    ...req.body,
    status: 'received',
    createdAt: new Date().toISOString()
  };

  ordersDB.push(newOrder);
  
  // 返回成功响应和新创建的订单数据
  res.status(201).json(newOrder);
});

// 处理 GET /api/orders 请求 (获取所有订单)
app.get('/api/orders', (req, res) => {
  res.json(ordersDB);
});


// ==================【关键修改】==================
// 在 app.listen 中增加第二个参数 '0.0.0.0'
// 这会让服务器监听本机所有的IP地址，而不仅仅是 localhost
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ 后端服务器已启动，正在监听所有网络接口的 ${PORT} 端口...`);
});
// ===============================================
