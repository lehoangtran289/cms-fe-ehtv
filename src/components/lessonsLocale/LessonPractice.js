import Practice00Situations from './Practice00Situations';
import Practice01Memorizes from './Practice01Memorizes';
import Practice07ConversationMemorizes from './Practice07ConversationMemorizes';
import Practice12GroupExercise from './Practice12GroupExercise';
import Practice13Writing from './Practice13Writing';
import Practice15CultureImage from './Practice15CultureImage';
import Practice16CultureSong from './Practice16CultureSong';
import Practice17CulturePoem from './Practice17CulturePoem';
import Practice18CultureIdiom from './Practice18CultureIdiom';
import Practice19CultureQuiz from './Practice19CultureQuiz';
import Practice20CultureGame from './Practice20CultureGame';

const availableComponents = {
  situations: {
    component: Practice00Situations
  },
  memorizes: {
    component: Practice01Memorizes
  },
  conversation_memorizes: {
    component: Practice07ConversationMemorizes
  },
  group_exercise: {
    component: Practice12GroupExercise
  },
  writing: {
    component: Practice13Writing
  },
  culture_image: {
    component: Practice15CultureImage
  },
  culture_song: {
    component: Practice16CultureSong
  },
  culture_poem: {
    component: Practice17CulturePoem
  },
  culture_idiom: {
    component: Practice18CultureIdiom
  },
  culture_quiz: {
    component: Practice19CultureQuiz
  },
  culture_game: {
    component: Practice20CultureGame
  }
};

function LessonPractice({ type, ...props }) {
  const RenderComponent = availableComponents[type].component;
  return (
    <RenderComponent {...props} />
  );
}

export default LessonPractice;
