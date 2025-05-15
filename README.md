# MCP-Puppeteer

A Model Context Protocol (MCP) server based on Puppeteer that provides web automation capabilities to AI agents.

## Introduction

MCP-Puppeteer is a tool that exposes Puppeteer's web automation capabilities through the Model Context Protocol. It allows AI assistants to control web browsers programmatically, enabling tasks such as web scraping, screenshot capture, form filling, and more.

## Tools

| Tool Name                  | Description                                              | Parameters                                                                          |
| -------------------------- | -------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `mcp-puppeteer_initialize` | Initialize a Puppeteer browser instance in headless mode | None                                                                                |
| `mcp-puppeteer_close`      | Close the Puppeteer browser instance                     | None                                                                                |
| `mcp-puppeteer_navigate`   | Navigate to a specified URL                              | `url`: The URL to navigate to                                                       |
| `mcp-puppeteer_screenshot` | Capture a screenshot of the current page                 | `path`: File path to save the screenshot                                            |
| `mcp-puppeteer_click`      | Click on an element specified by selector                | `selector`: CSS selector of the element to click                                    |
| `mcp-puppeteer_fill`       | Fill a text input with specified content                 | `selector`: CSS selector of the input element<br>`text`: Text to enter in the input |
| `mcp-puppeteer_select`     | Select an option from a dropdown menu                    | `selector`: CSS selector of the select element<br>`value`: Value to select          |
| `mcp-puppeteer_hover`      | Hover the mouse over a specified element                 | `selector`: CSS selector of the element to hover over                               |
| `mcp-puppeteer_evaluate`   | Execute JavaScript code in the page context              | `script`: JavaScript code to execute                                                |

## Usage

```json
{
  "mcpServers": {
    "mcp-puppeteer": {
      "command": "npx",
      "args": ["-y", "@humansean/mcp-puppeteer"]
    }
  }
}
```

## License

Apache-2.0 license
