/**
 * PDF Generator Utility
 * 
 * Generates PDF from HTML content using html2pdf.js
 * Creates a professional CV/Resume PDF from personal information
 */

import { PERSONAL_INFO, TIMELINE_ITEMS, SKILL_CATEGORIES } from './constants';

/**
 * Generates CV HTML content
 * Creates a well-formatted HTML structure for the CV
 * 
 * @returns {string} HTML content for the CV
 */
function generateCVHTML(): string {
  const skillsHTML = SKILL_CATEGORIES.map(category => `
    <div style="margin-bottom: 20px;">
      <h3 style="color: #3b82f6; font-size: 18px; font-weight: bold; margin-bottom: 10px; border-bottom: 2px solid #3b82f6; padding-bottom: 5px;">
        ${category.title}
      </h3>
      <div style="display: flex; flex-wrap: wrap; gap: 8px;">
        ${category.skills.map(skill => `
          <span style="background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 500;">
            ${skill.name}
          </span>
        `).join('')}
      </div>
    </div>
  `).join('');

  const timelineHTML = TIMELINE_ITEMS.map(item => `
    <div style="margin-bottom: 25px; padding-left: 20px; border-left: 3px solid #3b82f6; position: relative;">
      <div style="position: absolute; left: -8px; top: 0; width: 13px; height: 13px; background: #3b82f6; border-radius: 50%;"></div>
      <div style="margin-bottom: 5px;">
        <span style="color: #3b82f6; font-weight: bold; font-size: 14px;">${item.year}</span>
      </div>
      <h4 style="color: #1f2937; font-size: 16px; font-weight: bold; margin: 5px 0;">${item.title}</h4>
      <p style="color: #6b7280; font-size: 14px; margin: 5px 0;">${item.company}</p>
      <p style="color: #4b5563; font-size: 14px; line-height: 1.6; margin-top: 8px;">${item.description}</p>
    </div>
  `).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>${PERSONAL_INFO.name} - Resume</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: 'Arial', 'Helvetica', sans-serif;
          color: #1f2937;
          line-height: 1.6;
          background: #ffffff;
        }
        .container {
          max-width: 900px;
          margin: 0 auto;
          padding: 40px;
        }
        .header {
          text-align: center;
          margin-bottom: 40px;
          padding-bottom: 20px;
          border-bottom: 3px solid #3b82f6;
        }
        .name {
          font-size: 36px;
          font-weight: bold;
          color: #1f2937;
          margin-bottom: 10px;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .title {
          font-size: 20px;
          color: #6b7280;
          margin-bottom: 15px;
        }
        .contact-info {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 20px;
          font-size: 14px;
          color: #4b5563;
        }
        .section {
          margin-bottom: 35px;
        }
        .section-title {
          font-size: 24px;
          font-weight: bold;
          color: #1f2937;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 2px solid #e5e7eb;
        }
        .description {
          font-size: 15px;
          color: #4b5563;
          line-height: 1.8;
          text-align: justify;
        }
        .stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 15px;
          margin: 20px 0;
        }
        .stat-item {
          text-align: center;
          padding: 15px;
          background: #f3f4f6;
          border-radius: 8px;
        }
        .stat-value {
          font-size: 24px;
          font-weight: bold;
          color: #3b82f6;
        }
        .stat-label {
          font-size: 12px;
          color: #6b7280;
          margin-top: 5px;
        }
        @media print {
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="name">${PERSONAL_INFO.name}</div>
          <div class="title">${PERSONAL_INFO.title}</div>
          <div class="contact-info">
            <div>📧 ${PERSONAL_INFO.email}</div>
            <div>📱 ${PERSONAL_INFO.phone}</div>
            <div>📍 ${PERSONAL_INFO.location}</div>
          </div>
        </div>

        <div class="section">
          <h2 class="section-title">Professional Summary</h2>
          <p class="description">${PERSONAL_INFO.description}</p>
        </div>

        <div class="section">
          <div class="stats">
            <div class="stat-item">
              <div class="stat-value">${PERSONAL_INFO.experience}</div>
              <div class="stat-label">Experience</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">${PERSONAL_INFO.projects}</div>
              <div class="stat-label">Projects</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">${PERSONAL_INFO.clients}</div>
              <div class="stat-label">Clients</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">${PERSONAL_INFO.awards}</div>
              <div class="stat-label">Awards</div>
            </div>
          </div>
        </div>

        <div class="section">
          <h2 class="section-title">Professional Experience</h2>
          ${timelineHTML}
        </div>

        <div class="section">
          <h2 class="section-title">Skills & Technologies</h2>
          ${skillsHTML}
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Generates and downloads PDF from HTML
 * Uses html2pdf.js library to convert HTML to PDF
 * 
 * @returns {Promise<void>}
 */
export async function generatePDF(): Promise<void> {
  if (typeof window === 'undefined') {
    throw new Error('PDF generation is only available in the browser');
  }

  try {
    // Dynamically import html2pdf.js to avoid SSR issues
    // html2pdf.js exports as a function, not a default export
    const html2pdfModule = await import('html2pdf.js');
    // html2pdf.js is exported as a function factory
    const html2pdf = (html2pdfModule as any).default || html2pdfModule;
    
    if (!html2pdf || typeof html2pdf !== 'function') {
      throw new Error('html2pdf.js failed to load correctly');
    }
    
    const htmlContent = generateCVHTML();
    
    // Create a temporary iframe to properly render the HTML document
    const iframe = document.createElement('iframe');
    iframe.style.position = 'absolute';
    iframe.style.left = '-9999px';
    iframe.style.top = '0';
    iframe.style.width = '210mm';
    iframe.style.height = '297mm'; // A4 height
    iframe.style.border = 'none';
    document.body.appendChild(iframe);

    // Wait for iframe to load
    await new Promise<void>((resolve) => {
      iframe.onload = () => resolve();
      iframe.srcdoc = htmlContent;
    });

    // Wait a bit more for content to fully render
    await new Promise(resolve => setTimeout(resolve, 500));

    // Get the iframe's body element
    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!iframeDoc) {
      throw new Error('Failed to access iframe document');
    }
    const element = iframeDoc.body;

    // Configure PDF options
    const opt = {
      margin: [10, 10, 10, 10] as [number, number, number, number],
      filename: `${PERSONAL_INFO.name.replace(/\s+/g, '_')}_Resume.pdf`,
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        letterRendering: true,
        logging: false,
        backgroundColor: '#ffffff'
      },
      jsPDF: { 
        unit: 'mm' as const, 
        format: 'a4' as const, 
        orientation: 'portrait' as const
      }
    };

    // Generate and download PDF
    const worker = html2pdf().set(opt).from(element);
    await worker.save();
    
    // Clean up
    setTimeout(() => {
      if (element.parentNode) {
        document.body.removeChild(element);
      }
    }, 1000);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
}

