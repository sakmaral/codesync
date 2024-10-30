import { createEvent, createStore, sample } from 'effector';
import { CODE_SNIPPETS } from './codeSnippets';

export const setLanguage = createEvent<keyof typeof CODE_SNIPPETS>();
export const $lang = createStore<keyof typeof CODE_SNIPPETS>('javascript').on(
  setLanguage,
  (_, lang) => lang,
);

export const $currentSnippet = createStore(CODE_SNIPPETS['javascript']);

// Обновление `$currentSnippet` при изменении `$language`
sample({
  source: $lang,
  fn: (lang) => CODE_SNIPPETS[lang],
  target: $currentSnippet,
});

$lang.watch((lang) => console.log('lang:', lang));
