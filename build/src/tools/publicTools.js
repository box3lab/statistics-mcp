import { makeApiRequest } from "../utils/api.js";
import { z } from "zod";
/**
 * 注册公开API工具（不需要认证）
 * @param server MCP服务器实例
 */
export function registerPublicTools(server) {
    /**
     * 用户资料API
     */
    server.tool("getUserProfile", "获取神岛平台用户的个人资料数据", {
        userId: z.string().describe("用户ID"),
    }, async ({ userId }, extra) => {
        return await makeApiRequest(`/user/profile/${userId}`);
    });
    /**
     * 地图详情API
     */
    server.tool("getMapInfo", "获取神岛平台用户地图详情", {
        mapId: z.string().describe("地图ID"),
    }, async ({ mapId }, extra) => {
        const endpoint = `/content/detail/${mapId}`;
        return await makeApiRequest(endpoint);
    });
    /**
     * 地图评论列表API
     */
    server.tool("getMapCommentList", "获取神岛平台用户地图评论列表", {
        contentId: z.string().describe("地图ID"),
        limit: z.number().describe("查询数量"),
        offset: z.number().describe("偏移量"),
        orderBy: z.number().describe("排序方式，1创建时间倒序；4热度（默认）"),
        contentType: z.number().describe("评论分类，1地图，2模型"),
    }, async ({ contentId, limit, offset, orderBy, contentType }, extra) => {
        const endpoint = `/comment/list?contentId=${contentId}&limit=${limit}&offset=${offset}&contentType=${contentType}&orderBy=${orderBy}`;
        return await makeApiRequest(endpoint);
    });
    /**
     * 地图发布信息API
     */
    server.tool("getMapReleaseInfo", "获取神岛平台用户地图发布信息", {
        contentId: z.string().describe("地图ID"),
        limit: z.number().describe("查询数量"),
        offset: z.number().describe("偏移量"),
    }, async ({ contentId, limit, offset }, extra) => {
        const endpoint = `/map/release-info/${contentId}?limit=${limit}&offset=${offset}`;
        return await makeApiRequest(endpoint);
    });
    /**
     * 地图列表API
     */
    server.tool("getMapList", "获取神岛平台用户地图列表", {
        offset: z.number().describe("偏移量"),
        limit: z.number().describe("查询数量"),
        keyword: z.string().describe("关键词"),
        orderBy: z
            .number()
            .describe("排序方式，0：官方推荐:最热，1：最新, 2:当通过keyword查找地图时使用"),
    }, async ({ offset, limit, keyword, orderBy }, extra) => {
        const endpoint = `/map/tab/maps?offset=${offset}&limit=${limit}&keyword=${keyword}&orderBy=${orderBy}`;
        return await makeApiRequest(endpoint);
    });
}
