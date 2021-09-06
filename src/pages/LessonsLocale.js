import { Helmet } from 'react-helmet';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select
} from '@material-ui/core';
import { useState } from 'react';
import LessonPractice from '../components/lessonsLocale/LessonPractice';
import { languages, practiceTypes } from '../config/config';

const useStyles = makeStyles((theme) => ({
  paper: {
    // width: '100%'
  }
}));

const LessonsLocale = () => {
  const classes = useStyles();

  // read or set data in session
  let lessonNumber = 1;
  let pOrder = 1;
  let lan = 'en';

  if (sessionStorage.getItem('lesson') !== null) {
    lessonNumber = sessionStorage.getItem('lesson');
    pOrder = parseInt(sessionStorage.getItem('practiceOrder'));
    lan = sessionStorage.getItem('language');
  } else {
    // set up data
    sessionStorage.setItem('lesson', 1);
    sessionStorage.setItem('practiceOrder', 1);
    sessionStorage.setItem('language', 'en');
  }

  const [config, setConfig] = useState({
    'lesson': lessonNumber,
    'practiceType': practiceTypes.find(o => o.practiceOrder === pOrder),
    'language': languages.find(e => e.languageCode === lan)
  });

  const lessonIds = [...Array(10).keys()].map(i => i + 1);

  const handleLessonChange = (event) => {
    setConfig({
      ...config,
      'lesson': event.target.value
    });
    sessionStorage.setItem('lesson', event.target.value);
  };
  const handlePracticeTypeChange = (event) => {
    setConfig({
      ...config,
      'practiceType': practiceTypes.find(o => o.practiceOrder === event.target.value),
      'practiceOrder': event.target.value
    });
    sessionStorage.setItem('practiceOrder', event.target.value);
  };

  const handleLanguageChange = (event) => {
    setConfig({
      ...config,
      'language': languages.find(o => o.languageCode === event.target.value)
    });
    sessionStorage.setItem('language', event.target.value);
  };

  return (
    <>
      <Helmet>
        <title>Lessons | Edit language</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <Paper className={classes.paper}>
            <Card>
              <CardHeader
                subheader='Chỉnh sửa ngôn ngữ'
                title='Lessons'
              />
              <Divider />
              <CardContent>
                <form>
                  <Grid container spacing={1}>
                    <Grid item lg={2} md={2} sm={2}>
                      <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel>Lesson</InputLabel>
                        <Select
                          labelId='lesson-select'
                          id='lesson-select'
                          value={config.lesson}
                          defaultValue={config.lesson}
                          label='Lesson'
                          onChange={handleLessonChange}
                        >
                          {lessonIds.map(i => (
                            <MenuItem key={i} value={+i}>{i}</MenuItem>
                          ))}
                        </Select>
                        {/*<FormHelperText>Choose lesson</FormHelperText>*/}
                      </FormControl>
                    </Grid>
                    <Grid item lg={2} md={2} sm={2}>
                      <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel>Language</InputLabel>
                        <Select
                          labelId='language-select'
                          id='language-select'
                          value={config.language.languageCode}
                          defaultValue={config.language.languageCode}
                          label='language'
                          onChange={handleLanguageChange}
                        >
                          {languages.map((i, k) => (
                            <MenuItem key={k} value={i.languageCode}>{i.title}</MenuItem>
                          ))}
                        </Select>
                        {/*<FormHelperText>Choose language</FormHelperText>*/}
                      </FormControl>
                    </Grid>
                    <Grid item lg={8} md={8} sm={8}>
                      <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel>Practice Type</InputLabel>
                        <Select
                          labelId='practice-select'
                          id='practice-select'
                          value={config.practiceType.practiceOrder}
                          defaultValue={config.practiceType.practiceOrder}
                          label='Practice Type'
                          onChange={handlePracticeTypeChange}
                        >
                          {practiceTypes.map((i, k) => (
                            <MenuItem key={k} value={i.practiceOrder}>{i.title}</MenuItem>
                          ))}
                        </Select>
                        {/*<FormHelperText>Choose practice type</FormHelperText>*/}
                      </FormControl>
                    </Grid>

                  </Grid>
                </form>
              </CardContent>
              <br /><Divider />
              {/*<CardHeader*/}
              {/*  subheader={'Practice type: ' + config.practiceType}*/}
              {/*  title={'Lesson ' + config.lesson + ' details'}*/}
              {/*/>*/}
              <Divider />
              <CardContent>
                <LessonPractice type={config.practiceType.practiceType} config={config} />
              </CardContent>
            </Card>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default LessonsLocale;
