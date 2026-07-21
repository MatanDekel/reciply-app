import { db } from './firebase';
import {
  collection, doc, getDoc, getDocs,
  addDoc, query, orderBy, Timestamp,
} from 'firebase/firestore';

const COL = 'recipes';

export async function getRecipes() {
  const q = query(collection(db, COL), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getRecipe(id) {
  const snap = await getDoc(doc(db, COL, id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}

export async function getRecipesByIds(ids) {
  if (!ids.length) return [];
  const snaps = await Promise.all(ids.map((id) => getDoc(doc(db, COL, id))));
  return snaps
    .filter((s) => s.exists())
    .map((s) => ({ id: s.id, ...s.data() }));
}

export async function addRecipe(data) {
  const ref = await addDoc(collection(db, COL), {
    ...data,
    createdAt: Timestamp.now(),
  });
  return ref.id;
}
