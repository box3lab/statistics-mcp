import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { makeApiRequest, createAuthHeaders } from "../utils/api.js";
import { StatsEndpoint } from "../types/index.js";
import { z } from "zod";

/**
 * 通用认证参数
 */
const authParams = {
  token: z.string().describe("认证Token"),
  userAgent: z.string().describe("用户请求头"),
};

/**
 * 统计相关工具的通用参数
 */
const statsParams = {
  startTime: z.string().describe("开始时间，例如：2025-03-29"),
  endTime: z.string().describe("结束时间，例如：2025-04-04"),
  ...authParams,
};

/**
 * 带地图ID的统计工具参数
 */
const mapStatsParams = {
  ...statsParams,
  mapId: z.string().describe("地图ID"),
};

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

/**
 * 注册需要认证的API工具
 * @param server MCP服务器实例
 */
export function registerAuthTools(server: McpServer) {
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
}
