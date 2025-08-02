import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { SERVER_NAME, SERVER_VERSION } from "./src/types/index.js";
import { registerPublicTools } from "./src/tools/publicTools.js";
import { registerAuthStatsTools } from "./src/tools/auth/auth_statsTools.js";
import { registerAuthMsgTools } from "./src/tools/auth/auth_msgTools.js";
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

// 注册需要认证的API工具-统计
registerAuthStatsTools(server);

// 注册需要认证的API工具-消息
registerAuthMsgTools(server);

// 连接并启动服务器
const transport = new StdioServerTransport();
await server.connect(transport);
