import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { makeApiRequest } from "../utils/api.js";
import { z } from "zod";

/**
 * 注册公开API工具（不需要认证）
 * @param server MCP服务器实例
 */
export function registerPublicTools(server: McpServer) {
  /**
   * 用户资料API
   */
  server.tool(
    "getUserProfileByUserId",
    "使用用户ID获取神岛平台用户的个人资料数据",
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
    "getMapInfoByUserId",
    "使用地图ID获取神岛平台地图详情",
    {
      mapId: z.string().describe("地图ID"),
    },
    async ({ mapId }, extra) => {
      const endpoint = `/content/detail/${mapId}`;
      return await makeApiRequest(endpoint);
    }
  );

  /**
   * 地图评论列表API
   */
  server.tool(
    "getMapCommentListByUserId",
    "使用地图ID获取神岛平台地图评论列表",
    {
      contentId: z.string().describe("地图ID"),
      limit: z.number().describe("查询数量，最多100条"),
      offset: z.number().describe("偏移量"),
      orderBy: z.number().describe("排序方式，1创建时间倒序；4热度（默认）"),
      contentType: z.number().describe("评论分类，1地图，2模型"),
    },
    async ({ contentId, limit, offset, orderBy, contentType }, extra) => {
      const endpoint = `/comment/list?contentId=${contentId}&limit=${limit}&offset=${offset}&contentType=${contentType}&orderBy=${orderBy}`;
      return await makeApiRequest(endpoint);
    }
  );

  /**
   * 地图发布信息API
   */
  server.tool(
    "getMapReleaseInfoByUserId",
    "使用地图ID获取神岛平台地图发布信息",
    {
      contentId: z.string().describe("地图ID"),
      limit: z.number().describe("查询数量，最多100条"),
      offset: z.number().describe("偏移量"),
    },
    async ({ contentId, limit, offset }, extra) => {
      const endpoint = `/map/release-info/${contentId}?limit=${limit}&offset=${offset}`;
      return await makeApiRequest(endpoint);
    }
  );

  /**
   * 地图列表API
   */
  server.tool(
    "getMapListByUserId",
    "使用用户ID获取神岛平台地图列表",
    {
      offset: z.number().describe("偏移量"),
      limit: z.number().describe("查询数量，最多100条"),
      userId: z.string().describe("用户ID"),
    },
    async ({ offset, limit, userId }, extra) => {
      const endpoint = `/user/experience?limit=${limit}&offset=${offset}&userId=${userId}`;
      return await makeApiRequest(endpoint);
    }
  );

  /**
   * 模型列表API
   */
  server.tool(
    "getModelListByUserId",
    "使用用户ID获取神岛平台模型列表",
    {
      offset: z.number().describe("偏移量"),
      limit: z.number().describe("查询数量，最多100条"),
      userId: z.string().describe("用户ID"),
    },
    async ({ offset, limit, userId }, extra) => {
      const endpoint = `/user/models?limit=${limit}&offset=${offset}&userId=${userId}`;
      return await makeApiRequest(endpoint);
    }
  );

  /**
   * 收藏列表API
   */
  server.tool(
    "getFavoriteListByUserId",
    "使用用户ID获取神岛平台收藏列表",
    {
      offset: z.number().describe("偏移量"),
      limit: z.number().describe("查询数量，最多100条"),
      userId: z.string().describe("用户ID"),
      contentType: z.number().describe("收藏内容类型，1地图，2模型"),
    },
    async ({ offset, limit, userId, contentType }, extra) => {
      const endpoint = `/user/favorites?limit=${limit}&offset=${offset}&userId=${userId}&contentType=${contentType}`;
      return await makeApiRequest(endpoint);
    }
  );

  /**
   * 最近游玩API
   */
  server.tool(
    "getRecentlyPlayListByUserId",
    "使用用户ID获取神岛平台最近游玩列表",
    {
      offset: z.number().describe("偏移量"),
      limit: z.number().describe("查询数量，最多100条"),
      userId: z.string().describe("用户ID"),
    },
    async ({ offset, limit, userId }, extra) => {
      const endpoint = `/user/recently-play?limit=${limit}&offset=${offset}&userId=${userId}`;
      return await makeApiRequest(endpoint);
    }
  );

  /**
   * 粉丝列表API
   */
  server.tool(
    "getFollowerListByUserId",
    "使用用户ID获取神岛平台粉丝列表",
    {
      offset: z.number().describe("偏移量"),
      limit: z.number().describe("查询数量，最多100条"),
      userId: z.string().describe("用户ID"),
    },
    async ({ offset, limit, userId }, extra) => {
      const endpoint = `/follow/follower/v2?userId=${userId}&limit=${limit}&offset=${offset}`;
      return await makeApiRequest(endpoint);
    }
  );

  /**
   * 好友列表API
   */
  server.tool(
    "getFriendListByUserId",
    "使用用户ID获取神岛平台好友列表",
    {
      offset: z.number().describe("偏移量"),
      limit: z.number().describe("查询数量，最多100条"),
      userId: z.string().describe("用户ID"),
    },
    async ({ offset, limit, userId }, extra) => {
      const endpoint = `/follow/friends/v2?userId=${userId}&limit=${limit}&offset=${offset}`;
      return await makeApiRequest(endpoint);
    }
  );
  /**
   * 关注列表API
   */
  server.tool(
    "getFollowingListByUserId",
    "使用用户ID获取神岛平台关注列表",
    {
      offset: z.number().describe("偏移量"),
      limit: z.number().describe("查询数量，最多100条"),
      userId: z.string().describe("用户ID"),
    },
    async ({ offset, limit, userId }, extra) => {
      const endpoint = `/follow/following/v2?userId=${userId}&limit=${limit}&offset=${offset}`;
      return await makeApiRequest(endpoint);
    }
  );

  /**
   * 地图列表API
   */
  server.tool(
    "getMapListByKeyword",
    "使用关键字搜索获取神岛平台地图/模型列表",
    {
      offset: z.number().describe("偏移量"),
      limit: z.number().describe("查询数量，最多100条"),
      keyword: z.string().describe("关键词"),
      orderBy: z
        .number()
        .describe(
          "排序方式，0：官方推荐:最热，1：最新, 2:当通过keyword查找地图/模型时使用"
        ),
    },
    async ({ offset, limit, keyword, orderBy }, extra) => {
      const endpoint = `/map/tab/maps?offset=${offset}&limit=${limit}&keyword=${keyword}&orderBy=${orderBy}`;
      return await makeApiRequest(endpoint);
    }
  );
}
