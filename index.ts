import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { SERVER_NAME, SERVER_VERSION } from "./src/types/index.js";
import { registerPublicTools } from "./src/tools/publicTools.js";
import { registerAuthTools } from "./src/tools/authTools.js";

/**
 * 神岛MCP服务器
 * 提供用户资料、地图数据、统计等API访问能力
 */
const server = new McpServer({
  name: SERVER_NAME,
  version: SERVER_VERSION,
});

// 注册公开API工具（不需要认证）
registerPublicTools(server);

// 注册需要认证的API工具
registerAuthTools(server);

// 连接并启动服务器
const transport = new StdioServerTransport();
await server.connect(transport);
