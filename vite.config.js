import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { site } from './data/site.ts';
import { seo } from './data/seo.ts';
const escapeHtml = (value) => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
export default defineConfig({
  plugins: [react(), { name: 'portfolio-metadata', transformIndexHtml(html) {
    const values = { SITE_TITLE: site.name + ' — ' + site.role, SITE_NAME: site.name, SITE_DESCRIPTION: site.name + ' — ' + site.role + '. ' + seo.description, SHARE_DESCRIPTION: seo.shareDescription, SITE_URL: site.siteUrl, SHARE_IMAGE: new URL(seo.shareImage, site.siteUrl).href };
    return html.replace(/\{\{([A-Z_]+)\}\}/g, (match, key) => key in values ? escapeHtml(values[key]) : match);
  } }],
  build: { target: 'es2022' },
});
