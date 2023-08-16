// src/db.ts

export const UsersTable = [
    { userId: '1', type: 'BO', name: 'JohnBO1', tenantId: 't1' },
    { userId: '2', type: 'BSO Admin', name: 'JaneAdmin1', tenantId: 't1' },
    { userId: '3', type: 'BO', name: 'DoeBO2', tenantId: 't1' },
    { userId: '4', type: 'BSO Admin', name: 'SamAdmin2', tenantId: 't2' },
    { userId: '5', type: 'BO', name: 'MoeBO1', tenantId: 't2' },
    { userId: '6', type: 'BO', name: 'TinaBO2', tenantId: 't2' }
  ];
  
  export const BusinessProfile = [
    { businessId: 'b1', userId: '1', details: 'Sample Details 1' },
    { businessId: 'b2', userId: '3', details: 'Sample Details 2' },
    { businessId: 'b3', userId: '5', details: 'Sample Details 3' },
    { businessId: 'b4', userId: '6', details: 'Sample Details 4' }
  ];
  
  export const BusinessTable = [
    { tenantId: 't1', name: 'BSO 1', keywords: { advisor: 'advisor', organization: 'organization' } },
    { tenantId: 't2', name: 'BSO 2', keywords: { advisor: 'consultant', organization: 'company' } }
  ];
  