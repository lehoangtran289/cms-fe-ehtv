import React from 'react'

import ConversationMemorizes from './ConversationMemorizes'
import ConversationReoders from './ConversationReoders'
import CultureGame from './CultureGame'
import CultureIdiom from './CultureIdiom'
import CultureImage from './CultureImage'
import CulturePoem from './CulturePoem'
import CultureQuiz from './CultureQuiz'
import CultureSong from './CultureSong'
import FillConversation from './FillConversation'
import GroupExerciseV2 from './GroupExerciseV2'
import Memories from './Memories'
import MultipleChoices from './MultipleChoices'
import Recognizes from './Recognizes'
import SentencePatterns from './SentencePatterns'
import SentencesReorders from './SentencesReorders'
import Situations from './Situations'
import Writing from './Writing'

const availableComponents = {
  situations: {
    component: Situations
  },
  memorizes: {
    component: Memories
  },
  recognizes: {
    component: Recognizes
  },
  multiple_choices: {
    component: MultipleChoices
  },
  conversation_memorizes: {
    component: ConversationMemorizes
  },
  fill_conversation: {
    component: FillConversation
  },
  sentences_reorders: {
    component: SentencesReorders
  },
  conversations_reorders: {
    component: ConversationReoders
  },
  group_exercise: {
    component: GroupExerciseV2
  },
  writing: {
    component: Writing
  },
  sentence_patterns: {
    component: SentencePatterns
  },
  culture_image: {
    component: CultureImage
  },
  culture_song: {
    component: CultureSong
  },
  culture_poem: {
    component: CulturePoem
  },
  culture_idiom: {
    component: CultureIdiom
  },
  culture_quiz: {
    component: CultureQuiz
  },
  culture_game: {
    component: CultureGame
  }
}

export default function LessonPractice({ type, ...props }): JSX.Element {
  const RenderComponent = availableComponents[type || 'situations'].component

  return <RenderComponent {...props} />
}
