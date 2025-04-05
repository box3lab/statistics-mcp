# 神岛数据统计 MCP 服务器
[![smithery badge](https://smithery.ai/badge/@box3lab/statistics-mcp)](https://smithery.ai/server/@box3lab/statistics-mcp)

基于 Model Context Protocol (MCP) 的服务器，提供对神岛平台用户数据、地图信息和统计数据的访问。

## 功能特点

- **公开 API**: 无需认证访问的基础数据（用户资料、地图详情）
- **认证 API**: 需要 Token 访问的高级数据（评论列表、各类统计数据）
- **地图分析**: 全面的地图玩家数据、留存率、行为分析等
- **标准接口**: 基于 MCP 协议，提供标准化的工具接口
- **易于集成**: 支持多平台客户端集成，包括浏览器、CLI 等

## 可用工具

### 公开 API (无需认证)

| 工具名称         | 描述             | 参数     |
| ---------------- | ---------------- | -------- |
| `getUserProfile` | 获取用户个人资料 | `userId` |
| `getMapInfo`     | 获取地图详情信息 | `mapId`  |

### 需要认证的 API

| 工具名称                | 描述             | 参数                                                  |
| ----------------------- | ---------------- | ----------------------------------------------------- |
| `getCommentList`        | 获取用户评论列表 | `offset`, `limit`, `token`, `userAgent`               |
| `getMapStatList`        | 获取地图统计列表 | `startTime`, `endTime`, `token`, `userAgent`          |
| `getMapPlayerStatList`  | 获取地图玩家统计 | `startTime`, `endTime`, `mapId`, `token`, `userAgent` |
| `getMapPlayerRetention` | 获取地图玩家留存 | `startTime`, `endTime`, `mapId`, `token`, `userAgent` |
| `getMapPlayerBehavior`  | 获取地图玩家行为 | `startTime`, `endTime`, `mapId`, `token`, `userAgent` |

## 客户端示例

### 公开 API 调用示例

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

// 创建传输通道
const transport = new StdioClientTransport({
  command: "npx",
  args: ["-y", "@smithery/cli@latest", "run", "@dao3fun/statistics-mcp"],
});

// 初始化客户端
const client = new Client(
  { name: "dao3-client", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

// 连接到服务器
await client.connect(transport);

// 获取用户资料 (公开API)
const userProfile = await client.callTool({
  name: "getUserProfile",
  arguments: { userId: "83354" },
});

// 获取地图详情 (公开API)
const mapInfo = await client.callTool({
  name: "getMapInfo",
  arguments: { mapId: "12345" },
});

console.log(JSON.parse(userProfile.content[0].text));
```

### 需要认证的 API 调用示例

```typescript
// 认证信息
const token = "YOUR_TOKEN";
const userAgent = "Mozilla/5.0 ...";

// 获取地图统计数据 (需要认证)
const mapStats = await client.callTool({
  name: "getMapStatList",
  arguments: {
    startTime: "2025-03-29",
    endTime: "2025-04-04",
    token,
    userAgent,
  },
});

// 处理响应
const statsData = JSON.parse(mapStats.content[0].text);
```

## 项目结构

- `index.ts`: 主服务器代码
- `tsconfig.json`: TypeScript 配置
- `package.json`: 项目依赖

## 技术栈

- TypeScript
- Model Context Protocol (MCP)
- Zod (类型验证)
- Axios (HTTP 请求)

## 许可证

MIT

