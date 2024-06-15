import React from 'react';
import Markdown from 'react-markdown';
import ReactMarkdown from 'react-markdown';

const parseGeminiResponse = (incomingText) => {
  try {
    const elements = <><Markdown> {incomingText} </Markdown></>
    console.log("HTML",elements);
    const childrenArray = React.Children.toArray(elements);
    console.log("array",childrenArray);
    return childrenArray;
  } catch (error) {
    console.error('Error parsing Gemini response:', error);
    return [];
  }
};

export default parseGeminiResponse;