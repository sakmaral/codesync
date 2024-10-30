import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { useUnit } from 'effector-react';
import { LANGUAGE_VERSIONS } from '../languageVersions';
import { $lang, setLanguage } from '../model';

const languages = Object.entries(LANGUAGE_VERSIONS);

export const LanguageSelector = () => {
  const [lang, handleSelect] = useUnit([$lang, setLanguage]);

  const handleSelectChange = (value: keyof typeof LANGUAGE_VERSIONS) => {
    handleSelect(value);
  };

  return (
    <>
      <p className="my-2">Language:</p>
      <Select value={lang} onValueChange={handleSelectChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {languages.map(([lang]) => (
              <SelectItem key={lang} value={lang}>
                {lang}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};
