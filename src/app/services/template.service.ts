import config from '@app/config';
import fs from 'fs';
import handlebars from 'handlebars';
import path from 'path';

class TemplateService {
  private templates: Map<string, HandlebarsTemplateDelegate> = new Map();

  constructor() {
    this.loadTemplates();
  }

  private loadTemplates(): void {
    const templatesDir = path.join(__dirname, '../templates/email');

    try {
      // Load base template
      const baseTemplatePath = path.join(templatesDir, 'base.hbs');
      if (fs.existsSync(baseTemplatePath)) {
        const baseTemplate = fs.readFileSync(baseTemplatePath, 'utf8');
        this.templates.set('base', handlebars.compile(baseTemplate));
      }

      // Load other templates
      const templateFiles = fs
        .readdirSync(templatesDir)
        .filter(file => file.endsWith('.hbs') && file !== 'base.hbs');

      templateFiles.forEach(file => {
        const templateName = file.replace('.hbs', '');
        const templatePath = path.join(templatesDir, file);
        const templateContent = fs.readFileSync(templatePath, 'utf8');
        this.templates.set(templateName, handlebars.compile(templateContent));
      });

      console.log(`Loaded ${this.templates.size} email templates`);
    } catch (error) {
      console.error('Error loading email templates:', error);
    }
  }

  render(templateName: string, context: Record<string, any> = {}): string {
    const template = this.templates.get(templateName);
    if (!template) {
      throw new Error(`Template '${templateName}' not found`);
    }

    return template(context);
  }

  renderEmail(templateName: string, context: Record<string, any> = {}): string {
    const contentTemplate = this.templates.get(templateName);
    if (!contentTemplate) {
      throw new Error(`Template '${templateName}' not found`);
    }

    const baseTemplate = this.templates.get('base');
    if (!baseTemplate) {
      throw new Error('Base template not found');
    }

    // Render the content template first
    const content = contentTemplate(context);

    // Then render the base template with the content
    return baseTemplate({
      ...context,
      content,
      appName: config.mail.from_name || 'Your App',
    });
  }

  getAvailableTemplates(): string[] {
    return Array.from(this.templates.keys());
  }
}

export const templateService = new TemplateService();
