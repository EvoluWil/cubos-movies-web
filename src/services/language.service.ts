import { api } from '@/config/api/api';
import { Language } from '@/types/language.type';

class LanguageService {
  async getAll(): Promise<Language[]> {
    const { data } = await api.get<Language[]>('/languages');
    return data;
  }
}

export const languageService = new LanguageService();
