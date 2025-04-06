/**
 * 类型定义文件
 */

// 请求头类型定义
export interface AuthHeaders {
  Authorization: string;
  "user-agent": string;
  "x-dao-ua": string;
}

// 统计工具定义
export interface StatsEndpoint {
  name: string;
  description: string;
  path: string;
}

// 导出常量类型
export const API_BASE_URL = "https://code-api-pc.dao3.fun";
export const SERVER_NAME = "@dao3fun/statistics-mcp";
export const SERVER_VERSION = "0.0.1";
