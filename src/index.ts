import puppeteer from "puppeteer";
import { FastMCP } from "fastmcp";
import { z } from "zod";

const server = new FastMCP({
  name: "mcp-puppeteer",
  version: "1.0.0",
});

// 定义browser和page类型
let browser: puppeteer.Browser | null = null;
let page: puppeteer.Page | null = null;

// 初始化浏览器工具
server.addTool({
  name: "mcp-puppeteer_initialize",
  description: "Initialize a Puppeteer browser instance in headless mode",
  parameters: z.object({}),
  execute: async () => {
    browser = await puppeteer.launch({
      headless: true,
      defaultViewport: { width: 1920, height: 1080 },
    });
    page = await browser.newPage();
    return "浏览器实例已初始化";
  },
});

// 关闭浏览器工具
server.addTool({
  name: "mcp-puppeteer_close",
  description: "Close the Puppeteer browser instance",
  parameters: z.object({}),
  execute: async () => {
    if (browser) {
      await browser.close();
      browser = null;
      page = null;
      return "浏览器已关闭";
    }
    return "没有活动的浏览器实例";
  },
});

// 导航到指定URL
server.addTool({
  name: "mcp-puppeteer_navigate",
  description: "Navigate to a specified URL",
  parameters: z.object({
    url: z.string(),
  }),
  execute: async (args) => {
    if (!page) return "请先初始化浏览器";
    await page.goto(args.url);
    return `已导航到 ${args.url}`;
  },
});

// 截图功能
server.addTool({
  name: "mcp-puppeteer_screenshot",
  description: "Capture a screenshot of the current page",
  parameters: z.object({
    path: z.string(),
  }),
  execute: async (args) => {
    if (!page) return "请先初始化浏览器";
    await page.screenshot({ path: args.path });
    return `截图已保存至 ${args.path}`;
  },
});

// 点击元素
server.addTool({
  name: "mcp-puppeteer_click",
  description: "Click on an element specified by selector",
  parameters: z.object({
    selector: z.string(),
  }),
  execute: async (args) => {
    if (!page) return "请先初始化浏览器";
    await page.click(args.selector);
    return `已点击 ${args.selector}`;
  },
});

// 填写表单
server.addTool({
  name: "mcp-puppeteer_fill",
  description: "Fill a text input with specified content",
  parameters: z.object({
    selector: z.string(),
    text: z.string(),
  }),
  execute: async (args) => {
    if (!page) return "请先初始化浏览器";
    await page.type(args.selector, args.text);
    return `已在 ${args.selector} 中填写文本`;
  },
});

// 选择下拉菜单选项
server.addTool({
  name: "mcp-puppeteer_select",
  description: "Select an option from a dropdown menu",
  parameters: z.object({
    selector: z.string(),
    value: z.string(),
  }),
  execute: async (args) => {
    if (!page) return "请先初始化浏览器";
    await page.select(args.selector, args.value);
    return `已在 ${args.selector} 中选择值 ${args.value}`;
  },
});

// 悬停在元素上
server.addTool({
  name: "mcp-puppeteer_hover",
  description: "Hover the mouse over a specified element",
  parameters: z.object({
    selector: z.string(),
  }),
  execute: async (args) => {
    if (!page) return "请先初始化浏览器";
    await page.hover(args.selector);
    return `已在 ${args.selector} 上悬停`;
  },
});

// 执行JavaScript
server.addTool({
  name: "mcp-puppeteer_evaluate",
  description: "Execute JavaScript code in the page context",
  parameters: z.object({
    script: z.string(),
  }),
  execute: async (args) => {
    if (!page) return "请先初始化浏览器";
    const result = await page.evaluate(args.script);
    return JSON.stringify(result);
  },
});

server.start({
  transportType: "stdio",
});
