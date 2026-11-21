# Retail Sales & Profitability Analytics Dashboard — Portfolio Website

A responsive dark-theme Data Analyst portfolio website built with plain **HTML, CSS, and JavaScript**, ready for zero-configuration deployment on **Vercel**.

## Project Structure

- `index.html` — Semantic page structure with all 8 portfolio sections and clearly marked placeholders
- `styles.css` — Dark-theme analytics styling, responsive grid, and subtle CSS animations
- `script.js` — Interactive report page switcher, modal spec viewer, DAX filter/copy controls, and scroll spy
- `vercel.json` — Static hosting configuration for Vercel
- `assets/screenshots/` — Drop your exported Power BI Desktop PNG screenshots here

## How to Add Your Real Power BI Results

1. **Update KPI Cards (`index.html`):** Replace `[Total Revenue]`, `[Net Profit]`, `[Profit Margin %]`, `[Total Orders]`, and `[Units Sold]` with your verified Power BI Desktop card values.
2. **Add Dashboard Screenshots:** Export your Power BI report pages as 1920x1080 PNGs into `assets/screenshots/` (`page1-executive-overview.png`, `page2-product-discount-margin.png`, `page3-regional-customer-insights.png`) and replace the placeholder frame in `#previewStage`.
3. **Update Analytical Insights (`index.html`):** Replace the 4 `[Insight Placeholder]` cards in Section 6 with your verified findings.

## Deploy to Vercel

1. Push this folder to a GitHub repository (or drag-and-drop via Vercel CLI: `npx vercel`).
2. In Vercel Dashboard, click **Add New Project** → import your repo → leave Framework Preset as **Other** and Root Directory as `./` → click **Deploy**.
