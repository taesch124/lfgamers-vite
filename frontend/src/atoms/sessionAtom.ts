import { atom } from 'jotai';

const sessionAtom = atom({ authenticated: false });

export default sessionAtom;