
type DiffResult = {
  type: 'added' | 'removed' | 'unchanged';
  value: string;
};

/**
 * Simple line-by-line diff algorithm
 */
export const compareTexts = (texts: string[]): DiffResult[][] => {
  if (texts.length < 2) {
    return [];
  }

  // Split all texts into lines
  const textLines = texts.map(text => text.split('\n'));
  
  const results: DiffResult[][] = [];
  
  // Compare each consecutive pair of texts
  for (let i = 0; i < textLines.length - 1; i++) {
    // Skip empty text comparisons - only compare when both texts have content
    if (!texts[i].trim() || !texts[i + 1].trim()) {
      continue;
    }
    
    const baseLines = textLines[i];
    const compareLines = textLines[i + 1];
    const diff: DiffResult[] = [];
    
    // Get max length to iterate through
    const maxLength = Math.max(baseLines.length, compareLines.length);
    
    for (let j = 0; j < maxLength; j++) {
      const baseLine = j < baseLines.length ? baseLines[j] : '';
      const compareLine = j < compareLines.length ? compareLines[j] : '';
      
      if (baseLine === compareLine) {
        diff.push({ type: 'unchanged', value: baseLine });
      } else {
        if (baseLine) {
          diff.push({ type: 'removed', value: baseLine });
        }
        if (compareLine) {
          diff.push({ type: 'added', value: compareLine });
        }
      }
    }
    
    results.push(diff);
  }
  
  return results;
};

/**
 * Compare any two specific texts
 */
export const compareSpecificTexts = (text1: string, text2: string): DiffResult[] => {
  if (!text1.trim() || !text2.trim()) {
    return [];
  }
  
  const lines1 = text1.split('\n');
  const lines2 = text2.split('\n');
  const diff: DiffResult[] = [];
  
  const maxLength = Math.max(lines1.length, lines2.length);
  
  for (let j = 0; j < maxLength; j++) {
    const line1 = j < lines1.length ? lines1[j] : '';
    const line2 = j < lines2.length ? lines2[j] : '';
    
    if (line1 === line2) {
      diff.push({ type: 'unchanged', value: line1 });
    } else {
      if (line1) {
        diff.push({ type: 'removed', value: line1 });
      }
      if (line2) {
        diff.push({ type: 'added', value: line2 });
      }
    }
  }
  
  return diff;
};
