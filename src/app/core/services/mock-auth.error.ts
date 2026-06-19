export class MockAuthError extends Error {
  constructor(public readonly code: string, message?: string) {
    super(message ?? code);
  }
}
