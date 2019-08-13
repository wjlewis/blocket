export const inProd = () => process.env.NODE_ENV === 'production';

/*
 * When a client connects, we generate a fresh (unused) ID for her. To do this,
 * we simply randomly choose a number of characters from an "urn"; if the
 * resulting ID is already in use, we try again; otherwise we return the ID.
 */
export const generateFreshId = (idsInUse: string[]) => {
  // We've included a lot of hyphens so that they show up fairly frequently (I
  // think hyphens in ID's look nice :-)
  const urn = 'abcdefghijklmnopqrstuvwxyz---------';
  let id = '';
  for (let i = 0; i < 5; i++) {
    id += urn[Math.floor(Math.random() * urn.length)];
  }
  if (idsInUse.includes(id)) {
    return generateFreshId(idsInUse);
  }
  return id;
};
