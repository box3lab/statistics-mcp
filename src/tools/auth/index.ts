import { z } from "zod";

/**
 * 通用认证参数
 */
export const authParams = {
  token: z.string().describe("认证Token"),
  userAgent: z.string().describe("用户请求头"),
};
