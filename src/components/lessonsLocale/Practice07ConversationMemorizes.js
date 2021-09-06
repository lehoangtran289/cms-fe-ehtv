import { Box, Button, CircularProgress, Divider, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  }
}));

const Practice07ConversationMemorizes = ({ config }) => {
  const classes = useStyles();

  const [data, setData] = useState([]);
  const [isRequesting, setIsRequesting] = useState(false);

  useEffect(() => {
    const url = '/v1/lesson/practice-detail'
      + '?lesson_id=' + config.lesson
      + '&practice_type=' + config.practiceType.practiceType
      + '&practice_order=' + config.practiceType.practiceOrder
      + '&language=' + config.language.languageCode;
    console.log(url);
    doGet(url)
      .then(res => {
        console.log(res);
        setData(res.data);
      });
  }, [config]);

  const handleDialogTranslateChange = (event, index) => {
    setData(data.map((item, idx) => idx === index ? {
      ...item,
      'contentTranslate': event.target.value
    } : item));
  };

  const handleSubmit = () => {
    const requestData = data.map((item) => {
      return {
        'practiceId': item.pId,
        'content': item.contentTranslate,
        'type': 'translated'
      };
    });
    const requestBody = {
      'practiceType': config.practiceType.practiceType,
      'language': config.language.languageCode,
      'data': requestData
    };

    setIsRequesting(true);
    console.log(requestBody);
    doPost('/v1/content-locale', requestBody)
      .then(res => {
        setIsRequesting(false);
        swal('Thành công', '', 'success');
        return res.json();
      })
      .then(res => {
        console.log(res);
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
      {data.map((item, index) => {
        return (
          <Box key={index} className={classes.grid2}>
            <Grid container spacing={1} wrap='wrap'>
              <Grid item lg={2} md={2} sm={2} className={classes.grid}>
                <Typography>
                  {index + 1}
                </Typography>
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
                  value={item.contentTranslate}
                  onChange={(event) =>
                    handleDialogTranslateChange(event, index)
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
          {isRequesting ? <CircularProgress color={'inherit'} size={20} /> : 'Save All'}
        </Button>
      </Box>
    </>
  );
};

export default Practice07ConversationMemorizes;