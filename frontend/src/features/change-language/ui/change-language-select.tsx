import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { LANGUAGE_VERSIONS } from '../languageVersions';

const languages = Object.entries(LANGUAGE_VERSIONS);

export const LanguageSelector = () => {
  console.log('LanguageSelector', languages);

  return (
    <>
      <p className="my-2">Language:</p>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {languages.map(([lang, version]) => (
              <SelectItem value={lang}>{lang}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};
