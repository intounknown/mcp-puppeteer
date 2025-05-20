#!/usr/bin/env node

import puppeteer from "puppeteer";
import { FastMCP } from "fastmcp";
import { z } from "zod";

const server = new FastMCP({
  name: "mcp-puppeteer",
  version: "1.0.5",
});

let browser: puppeteer.Browser | null = null;
let page: puppeteer.Page | null = null;

// Initialize browser tool
server.addTool({
  name: "mcp-puppeteer_initialize",
  description: "Initialize a Puppeteer browser instance in headless mode",
  parameters: z.object({
    args: z.array(z.string()).optional(),
  }),
  execute: async () => {
    browser = await puppeteer.launch({
      headless: true,
      defaultViewport: { width: 1920, height: 1080 },
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    page = await browser.newPage();
    return "Browser instance initialized";
  },
});

// Close browser tool
server.addTool({
  name: "mcp-puppeteer_close",
  description: "Close the Puppeteer browser instance",
  parameters: z.object({}),
  execute: async () => {
    if (browser) {
      await browser.close();
      browser = null;
      page = null;
      return "Browser closed";
    }
    return "No active browser instance";
  },
});

// Navigate to specified URL
server.addTool({
  name: "mcp-puppeteer_navigate",
  description: "Navigate to a specified URL",
  parameters: z.object({
    url: z.string(),
  }),
  execute: async (args) => {
    if (!page) return "Please initialize browser first";
    await page.goto(args.url);
    return `Navigated to ${args.url}`;
  },
});

// Screenshot functionality
server.addTool({
  name: "mcp-puppeteer_screenshot",
  description: "Capture a screenshot of the current page",
  parameters: z.object({
    path: z.string(),
  }),
  execute: async (args) => {
    if (!page) return "Please initialize browser first";
    await page.screenshot({ path: args.path });
    return `Screenshot saved to ${args.path}`;
  },
});

// Click element
server.addTool({
  name: "mcp-puppeteer_click",
  description: "Click on an element specified by selector",
  parameters: z.object({
    selector: z.string(),
  }),
  execute: async (args) => {
    if (!page) return "Please initialize browser first";
    await page.click(args.selector);
    return `Clicked on ${args.selector}`;
  },
});

// Fill form
server.addTool({
  name: "mcp-puppeteer_fill",
  description: "Fill a text input with specified content",
  parameters: z.object({
    selector: z.string(),
    text: z.string(),
  }),
  execute: async (args) => {
    if (!page) return "Please initialize browser first";
    await page.type(args.selector, args.text);
    return `Text entered in ${args.selector}`;
  },
});

// Select dropdown option
server.addTool({
  name: "mcp-puppeteer_select",
  description: "Select an option from a dropdown menu",
  parameters: z.object({
    selector: z.string(),
    value: z.string(),
  }),
  execute: async (args) => {
    if (!page) return "Please initialize browser first";
    await page.select(args.selector, args.value);
    return `Selected value ${args.value} in ${args.selector}`;
  },
});

// Hover over element
server.addTool({
  name: "mcp-puppeteer_hover",
  description: "Hover the mouse over a specified element",
  parameters: z.object({
    selector: z.string(),
  }),
  execute: async (args) => {
    if (!page) return "Please initialize browser first";
    await page.hover(args.selector);
    return `Hovered over ${args.selector}`;
  },
});

// Execute JavaScript
server.addTool({
  name: "mcp-puppeteer_evaluate",
  description: "Execute JavaScript code in the page context",
  parameters: z.object({
    script: z.string(),
  }),
  execute: async (args) => {
    if (!page) return "Please initialize browser first";
    const result = await page.evaluate(args.script);
    return JSON.stringify(result);
  },
});

server.start({
  transportType: "stdio",
});
