export const FIRESTORE_COLLECTIONS = {
  users: 'users',
  candidateProfiles: 'candidateProfiles',
  companyProfiles: 'companyProfiles',
  jobPosts: 'jobPosts',
  applications: 'applications',
  contactRequests: 'contactRequests',
  auditLogs: 'auditLogs',
} as const;

export type FirestoreCollectionName =
  (typeof FIRESTORE_COLLECTIONS)[keyof typeof FIRESTORE_COLLECTIONS];
