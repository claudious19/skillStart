export const FIRESTORE_COLLECTIONS = {
  users: 'users',
  companies: 'companies',
  candidateProfiles: 'candidateProfiles',
  jobPosts: 'jobPosts',
  applications: 'applications',
  contactRequests: 'contactRequests',
  auditLogs: 'auditLogs',
} as const;

export type FirestoreCollectionName =
  (typeof FIRESTORE_COLLECTIONS)[keyof typeof FIRESTORE_COLLECTIONS];
