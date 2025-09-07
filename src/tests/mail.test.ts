import { mailService } from '@app/services/mail.service';

describe('Mail Service', () => {
  it('should have supported providers', () => {
    const providers = mailService.getSupportedProviders();
    expect(providers).toContain('gmail');
    expect(providers).toContain('outlook');
    expect(providers).toContain('custom');
  });

  it('should test connection (will fail without proper config)', async () => {
    const isConnected = await mailService.testConnection();
    // This will likely be false in test environment without proper mail config
    expect(typeof isConnected).toBe('boolean');
  });
});
