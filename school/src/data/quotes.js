export const quotes = [
  { text: 'Education is the most powerful weapon which you can use to change the world.', author: 'Nelson Mandela' },
  { text: 'The beautiful thing about learning is that nobody can take it away from you.', author: 'B. B. King' },
  { text: 'An investment in knowledge pays the best interest.', author: 'Benjamin Franklin' },
  { text: 'Education is not preparation for life; education is life itself.', author: 'John Dewey' },
  { text: 'The roots of education are bitter, but the fruit is sweet.', author: 'Aristotle' },
  { text: 'Live as if you were to die tomorrow. Learn as if you were to live forever.', author: 'Mahatma Gandhi' },
  { text: 'The mind is not a vessel to be filled, but a fire to be kindled.', author: 'Plutarch' },
  { text: 'Education breeds confidence. Confidence breeds hope. Hope breeds peace.', author: 'Confucius' },
  { text: 'The expert in anything was once a beginner.', author: 'Helen Hayes' },
  { text: 'Learning never exhausts the mind.', author: 'Leonardo da Vinci' },
  { text: 'The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice.', author: 'Brian Herbert' },
  { text: 'A person who never made a mistake never tried anything new.', author: 'Albert Einstein' },
  { text: 'Education is the passport to the future, for tomorrow belongs to those who prepare for it today.', author: 'Malcolm X' },
  { text: 'The goal of education is the advancement of knowledge and the dissemination of truth.', author: 'John F. Kennedy' },
  { text: 'Teachers open the door, but you must enter by yourself.', author: 'Chinese Proverb' },
  { text: 'Success is a lousy teacher. It seduces smart people into thinking they cannot lose.', author: 'Bill Gates' },
  { text: 'The future belongs to those who believe in the beauty of their dreams.', author: 'Eleanor Roosevelt' },
  { text: 'Knowledge will bring you the opportunity to make a difference.', author: 'Claire Fagin' },
]

export const getTodayQuote = () => {
  const day = Math.floor(Date.now() / 86400000)
  return quotes[day % quotes.length]
}
