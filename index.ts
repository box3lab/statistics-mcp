import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import axios from "axios";

// 定义常量
export const API_BASE_URL = "https://code-api-pc.dao3.fun";
export const SERVER_NAME = "@dao3fun/statistics-mcp";
export const SERVER_VERSION = "0.0.1";

/**
 * 神岛MCP服务器
 * 提供用户资料、地图数据、统计等API访问能力
 */
const server = new McpServer({
  name: SERVER_NAME,
  version: SERVER_VERSION,
});

/**
 * 发起API请求并格式化响应
 * @param endpoint API端点
 * @param headers 请求头(可选)
 * @returns 格式化的MCP响应
 */
async function makeApiRequest(endpoint: string, headers?: any) {
  try {
    const response = await axios.get(`${API_BASE_URL}${endpoint}`, { headers });
    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(response.data),
        },
      ],
    };
  } catch (error: any) {
    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify({
            error: "API请求失败",
            endpoint,
            message: error.message,
          }),
        },
      ],
      isError: true,
    };
  }
}

/**
 * 创建带认证的请求头
 */
function createAuthHeaders(token: string, userAgent: string) {
  return {
    Authorization: token,
    "user-agent": userAgent,
    "x-dao-ua": userAgent,
  };
}

// ================ 认证参数定义 ================

/**
 * 通用认证参数
 */
const authParams = {
  token: z.string().describe("认证Token"),
  userAgent: z.string().describe("用户请求头"),
};

// ================ 公开API ================
// 这些API不需要认证

/**
 * 用户资料API
 */
server.tool(
  "getUserProfile",
  "获取神岛平台用户的个人资料数据",
  {
    userId: z.string().describe("用户ID"),
  },
  async ({ userId }, extra) => {
    return await makeApiRequest(`/user/profile/${userId}`);
  }
);

/**
 * 地图详情API
 */
server.tool(
  "getMapInfo",
  "获取神岛平台用户地图详情",
  {
    mapId: z.string().describe("地图ID"),
  },
  async ({ mapId }, extra) => {
    const endpoint = `/content/detail/${mapId}`;
    return await makeApiRequest(endpoint);
  }
);

// ================ 需要认证的API ================

/**
 * 获取评论列表
 */
server.tool(
  "getCommentList",
  "获取神岛平台用户的评论列表，需要Token和用户请求头",
  {
    offset: z.number().describe("偏移量"),
    limit: z.number().describe("限制数量"),
    ...authParams,
  },
  async ({ offset, limit, token, userAgent }, extra) => {
    const headers = createAuthHeaders(token, userAgent);
    return await makeApiRequest(
      `/msg/comment?offset=${offset}&limit=${limit}`,
      headers
    );
  }
);

// ================ 地图统计API ================

/**
 * 统计相关工具的通用参数
 */
const statsParams = {
  startTime: z.string().describe("开始时间，例如：2025-03-29"),
  endTime: z.string().describe("结束时间，例如：2025-04-04"),
  ...authParams,
};

/**
 * 获取地图统计列表
 */
server.tool(
  "getMapStatList",
  "获取神岛平台用户地图统计列表，需Token和用户请求头",
  statsParams,
  async ({ startTime, endTime, token, userAgent }, extra) => {
    const endpoint = `/statistics/map/user-maps?startTime=${startTime}&endTime=${endTime}`;
    const headers = createAuthHeaders(token, userAgent);
    return await makeApiRequest(endpoint, headers);
  }
);

/**
 * 带地图ID的统计工具参数
 */
const mapStatsParams = {
  ...statsParams,
  mapId: z.string().describe("地图ID"),
};

/**
 * 地图统计工具定义
 */
interface StatsEndpoint {
  name: string;
  description: string;
  path: string;
}

/**
 * 地图统计工具列表
 */
const mapStatsEndpoints: StatsEndpoint[] = [
  {
    name: "getMapPlayerStatList",
    description: "获取神岛平台用户地图玩家统计，需Token和用户请求头和地图ID",
    path: "/statistics/map/player",
  },
  {
    name: "getMapPlayerRetention",
    description: "获取神岛平台用户地图玩家留存，需Token和用户请求头和地图ID",
    path: "/statistics/map/player-retention",
  },
  {
    name: "getMapPlayerBehavior",
    description: "获取神岛平台用户地图玩家行为，需Token和用户请求头和地图ID",
    path: "/statistics/map/player-behavior",
  },
];

// 批量注册地图统计工具
mapStatsEndpoints.forEach(({ name, description, path }) => {
  server.tool(
    name,
    description,
    mapStatsParams,
    async ({ startTime, endTime, token, userAgent, mapId }, extra) => {
      const endpoint = `${path}?startTime=${startTime}&endTime=${endTime}&mapId=${mapId}`;
      const headers = createAuthHeaders(token, userAgent);
      return await makeApiRequest(endpoint, headers);
    }
  );
});

// 连接并启动服务器
const transport = new StdioServerTransport();
await server.connect(transport);
