import axios from "axios";
import { API_BASE_URL } from "../types/index.js";
/**
 * 发起API请求并格式化响应
 * @param endpoint API端点
 * @param headers 请求头(可选)
 * @returns 格式化的MCP响应
 */
export async function makeApiRequest(endpoint, headers) {
    try {
        const response = await axios.get(`${API_BASE_URL}${endpoint}`, { headers });
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(response.data),
                },
            ],
        };
    }
    catch (error) {
        return {
            content: [
                {
                    type: "text",
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
 * @param token 认证令牌
 * @param userAgent 用户代理字符串
 * @returns 认证头对象
 */
export function createAuthHeaders(token, userAgent) {
    return {
        Authorization: token,
        "user-agent": userAgent,
        "x-dao-ua": userAgent,
    };
}
