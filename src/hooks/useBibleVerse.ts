import { useState, useEffect, useCallback } from 'react';

export interface BibleVerse {
  text: string;
  reference: string;
  book: string;
  chapter: number;
  verse: number;
}

// Popular verses for daily rotation (book chapter:verse format)
const DAILY_VERSES = [
  'Jeremiah+29:11',
  'Philippians+4:13',
  'Romans+8:28',
  'Isaiah+41:10',
  'Joshua+1:9',
  'Proverbs+3:5-6',
  'Psalm+23:1-4',
  '1+Corinthians+10:13',
  '2+Timothy+1:7',
  'Romans+8:37-39',
  'Matthew+11:28-30',
  'John+3:16',
  'Ephesians+6:10-11',
  'Psalm+46:1',
  'Isaiah+40:31',
  'James+1:2-4',
  'Philippians+4:6-7',
  'Hebrews+12:1-2',
  '1+Peter+5:7',
  'Galatians+5:22-23',
  'Psalm+91:1-2',
  'Romans+12:1-2',
  'Colossians+3:23-24',
  '2+Corinthians+12:9',
  'Psalm+119:105',
  'Matthew+6:33',
  'John+14:27',
  'Psalm+27:1',
  '1+John+4:18',
  'Isaiah+43:2',
];

// Get today's verse based on the day of the year
const getTodaysVerseRef = (): string => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  return DAILY_VERSES[dayOfYear % DAILY_VERSES.length];
};

// Get a random verse for refresh
const getRandomVerseRef = (): string => {
  return DAILY_VERSES[Math.floor(Math.random() * DAILY_VERSES.length)];
};

export const useBibleVerse = (mode: 'daily' | 'random' = 'daily') => {
  const [verse, setVerse] = useState<BibleVerse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVerse = useCallback(async (verseRef?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const reference = verseRef || (mode === 'daily' ? getTodaysVerseRef() : getRandomVerseRef());
      const response = await fetch(`https://bible-api.com/${reference}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch verse');
      }

      const data = await response.json();
      
      // Clean up the text (remove extra whitespace)
      const cleanText = data.text.trim().replace(/\n+/g, ' ');
      
      setVerse({
        text: `"${cleanText}"`,
        reference: data.reference,
        book: data.verses?.[0]?.book_name || '',
        chapter: data.verses?.[0]?.chapter || 0,
        verse: data.verses?.[0]?.verse || 0,
      });
    } catch (err) {
      console.error('Error fetching Bible verse:', err);
      setError('Failed to load verse');
      // Fallback verse
      setVerse({
        text: '"For I know the plans I have for you," declares the Lord, "plans to prosper you and not to harm you, plans to give you hope and a future."',
        reference: 'Jeremiah 29:11',
        book: 'Jeremiah',
        chapter: 29,
        verse: 11,
      });
    } finally {
      setIsLoading(false);
    }
  }, [mode]);

  const refreshVerse = useCallback(() => {
    fetchVerse(getRandomVerseRef());
  }, [fetchVerse]);

  useEffect(() => {
    fetchVerse();
  }, [fetchVerse]);

  return { verse, isLoading, error, refreshVerse };
};
