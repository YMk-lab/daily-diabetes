import { LocalStorageService } from '../services/local-storage/local-storage.service';

export const currentLocale = (ls: LocalStorageService) => {
  return ls.get('client-lang') || 'en';
}
