import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { makeApiRequest, createAuthHeaders } from "../../utils/api.js";
import { z } from "zod";
import { authParams } from "./index.js";

/**
 * 注册需要认证的API工具
 * @param server MCP服务器实例
 */
export function registerAuthMsgTools(server: McpServer) {
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
   * 获取点赞列表
   */
  server.tool(
    "getLikeList",
    "获取神岛平台用户的点赞列表，需要Token和用户请求头",
    {
      offset: z.number().describe("偏移量"),
      limit: z.number().describe("限制数量"),
      ...authParams,
    },
    async ({ offset, limit, token, userAgent }, extra) => {
      const headers = createAuthHeaders(token, userAgent);
      return await makeApiRequest(
        `/msg/like?offset=${offset}&limit=${limit}`,
        headers
      );
    }
  );

  /**
   * 获取系统消息列表
   */
  server.tool(
    "getSystemMsgList",
    "获取神岛平台用户的系统消息列表，需要Token和用户请求头",
    {
      offset: z.number().describe("偏移量"),
      limit: z.number().describe("限制数量"),
      ...authParams,
    },
    async ({ offset, limit, token, userAgent }, extra) => {
      const headers = createAuthHeaders(token, userAgent);
      return await makeApiRequest(
        `/msg/sys?offset=${offset}&limit=${limit}`,
        headers
      );
    }
  );
}
