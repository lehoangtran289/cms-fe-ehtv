import { Box, Button, Divider, Grid, makeStyles, Skeleton, TextField, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { doGet, doPost } from '../../utils/api';
import { Save as SaveIcon } from 'react-feather';
import swal from 'sweetalert';

const useStyles = makeStyles((theme) => ({
  gridHeader: {
    padding: '8px',
    backgroundColor: '#dfe3f0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  grid: {
    padding: '8px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  grid2: {
    padding: '8px'
  },
  dialog: {
    padding: '8px',
    height: 'auto',
    display: 'block',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  }
}));

const Practice19CultureQuiz = ({ config }) => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [isRequesting, setIsRequesting] = useState(false);

  //
  useEffect(() => {
    const url = '/v1/lesson/practice-detail'
      + '?lesson_id=' + config.lesson
      + '&practice_type=' + config.practiceType.practiceType
      + '&practice_order=' + config.practiceType.practiceOrder
      + '&language=' + config.language.languageCode;

    setIsRequesting(true);
    doGet(url)
      .then(res => {
        console.log(res);
        setData(res.data);
        setIsRequesting(false);
      });
  }, [config]);

  const handleDialogTranslateChange = (event, key) => {
    setData(data.map((item, idx) => idx === key ? { ...item, 'contentTranslated': event.target.value } : item));
  };
  const handleTitleTranslateChange = (event, key) => {
    setData(data.map((item, idx) => idx === key ? { ...item, 'titleTranslated': event.target.value } : item));
  };

  // 
  const handleSubmit = () => {
    let requestDataTitle = data.map((item) => {
      return {
        'practiceId': item.id,
        'content': item.titleTranslated,
        'type': 'title'
      };
    });
    let requestDataContent = data.map((item) => {
      return {
        'practiceId': item.id,
        'content': item.contentTranslated,
        'type': 'content'
      };
    });
    Array.prototype.push.apply(requestDataTitle, requestDataContent);

    const requestBody = {
      'practiceType': config.practiceType.practiceType,
      'language': config.language.languageCode,
      'data': requestDataTitle
    };

    // console.log(JSON.stringify(requestBody, null, '\t'));
    setIsRequesting(true);
    doPost('/v1/content-locale', requestBody)
      .then(res => {
        setIsRequesting(false);
        swal('', 'Thành công', 'success');
      });
  };

  return (
    <>
      <Grid container className={classes.gridHeader}>
        <Grid item lg={2} md={2} sm={2} className={classes.gridHeader}>
          <Typography variant='h5'>Thứ tự</Typography>
        </Grid>
        <Grid item lg={5} md={5} sm={5} className={classes.gridHeader}>
          <Typography variant='h5'>Tiếng việt</Typography>
        </Grid>
        <Grid item lg={5} md={5} sm={5} className={classes.gridHeader}>
          <Typography variant='h5'>{config.language.title}</Typography>
        </Grid>
      </Grid>
      <Divider sx={{ display: 'flex' }} />
      {isRequesting ?
        <Box className={classes.grid2}>
          <Typography variant='h1'>
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </Typography>
        </Box>
        :
        data.map((item, key) => {
          return (
            <Box key={key} className={classes.grid2}>
              <Grid container spacing={1} wrap='wrap'>
                <Grid item lg={2} md={2} sm={2} className={classes.grid}>
                  <Typography>
                    {key + 1}
                  </Typography>
                </Grid>
                <Grid item lg={5} md={5} sm={5} className={classes.dialog}>
                  <TextField
                    fullWidth
                    multiline
                    margin='normal'

                    variant='outlined'
                    value={item.title}
                    InputProps={{
                      readOnly: true
                    }}
                  />
                </Grid>
                <Grid item lg={5} md={5} sm={5} className={classes.dialog}>
                  <TextField
                    fullWidth
                    margin='normal'
                    multiline

                    variant='outlined'
                    value={item.titleTranslated}
                    onChange={(event) =>
                      handleTitleTranslateChange(event, key)
                    }
                  />
                </Grid>
              </Grid>

              {/* title vs content */}
              <Grid container spacing={1} wrap='wrap'>
                <Grid item lg={2} md={2} sm={2} className={classes.grid}>
                </Grid>
                <Grid item lg={5} md={5} sm={5} className={classes.dialog}>
                  <TextField
                    fullWidth
                    multiline
                    margin='normal'

                    variant='outlined'
                    value={item.content}
                    InputProps={{
                      readOnly: true
                    }}
                  />
                </Grid>
                <Grid item lg={5} md={5} sm={5} className={classes.dialog}>
                  <TextField
                    fullWidth
                    margin='normal'
                    multiline

                    variant='outlined'
                    value={item.contentTranslated}
                    onChange={(event) =>
                      handleDialogTranslateChange(event, key)
                    }
                  />
                </Grid>
              </Grid>
              <Divider sx={{
                paddingTop: 1
              }} />
            </Box>
          );
        })}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          paddingTop: 1
        }}
      >
        <Button
          color='primary'
          variant='contained'
          startIcon={<SaveIcon size='20' />}
          onClick={handleSubmit}
        >
          Save All
        </Button>
      </Box>
    </>
  );
};

export default Practice19CultureQuiz;
