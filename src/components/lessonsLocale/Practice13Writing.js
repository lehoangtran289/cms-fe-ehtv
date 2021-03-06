import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  makeStyles,
  Skeleton,
  TextField,
  Typography
} from '@material-ui/core';
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

const Practice13Writing = ({ config }) => {
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
      setIsRequesting(true);
      doGet(url)
        .then(res => {
          console.log(res);
          res.data.map(item => {
            item.contentTranslated = item.contentTranslated || '';
            item.readingReqTranslated = item.readingReqTranslated || '';
            item.writingReqTranslated = item.writingReqTranslated || '';
          });
          setData(res.data);
          setIsRequesting(false);
        });
    }, [config]);

    const handleReadingReqChange = (event, index) => {
      const newData = data;
      newData[index] = {
        ...newData[index],
        'readingReqTranslated': event.target.value
      };
      setData(newData);
    };

    const handleWritingReqChange = (event, index) => {
      const newData = data;
      newData[index] = {
        ...newData[index],
        'writingReqTranslated': event.target.value
      };
      setData(newData);
    };

    const handleContentChange = (event, index) => {
      const newData = data;
      newData[index] = {
        ...newData[index],
        'contentTranslated': event.target.value
      };
      setData(newData);
    };

    const updateByType = (contentType, type) => {
      const requestBody = {
        'practiceType': config.practiceType.practiceType,
        'language': config.language.languageCode,
        'data': data.map((item) => {
          return {
            'practiceId': item.pId,
            'content': item[contentType],
            'type': type
          };
        })
      };
      console.log(requestBody);
      doPost('/v1/content-locale', requestBody)
        .then(res => {
          console.log(type + ' update OK');
        });
    };

    const handleSubmit = () => {
      console.log(data);
      setIsRequesting(true);
      updateByType('contentTranslated', 'content');
      updateByType('readingReqTranslated', 'reading_req');
      updateByType('writingReqTranslated', 'writing_req');
      swal('Th??nh c??ng', '', 'success');
      setIsRequesting(false);
    };

    return (
      <>
        <Grid container className={classes.gridHeader}>
          <Grid item lg={2} md={2} sm={2} className={classes.gridHeader}>
            <Typography variant='h5'>Th??? t???</Typography>
          </Grid>
          <Grid item lg={5} md={5} sm={5} className={classes.gridHeader}>
            <Typography variant='h5'>Ti???ng vi???t</Typography>
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
          data.map((item, index) => {
            return (
              <Box key={index} className={classes.grid2}>
                <Grid container spacing={1} wrap='wrap' direction='row' justify='center' alignItems='stretch'>
                  <Grid item lg={2} md={2} sm={2} className={classes.grid}>
                    <Typography>
                      {index + 1}
                    </Typography>
                  </Grid>
                  <Grid item lg={10} md={10} sm={10} className={classes.grid}>
                    <Grid container spacing={1} wrap='wrap'>
                      <Grid item lg={6} md={6} sm={6} className={classes.dialog}>
                        <TextField
                          fullWidth
                          multiline
                          margin='normal'

                          variant='outlined'
                          value={item.readingReq}
                          InputProps={{
                            readOnly: true
                          }}
                        />
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} className={classes.dialog}>
                        <TextField
                          fullWidth
                          margin='normal'
                          multiline

                          variant='outlined'
                          defaultValue={item.readingReqTranslated ? item.readingReqTranslated : ''}
                          onChange={(event) => handleReadingReqChange(event, index)}
                        />
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} className={classes.dialog}>
                        <TextField
                          fullWidth
                          multiline
                          margin='normal'

                          variant='outlined'
                          value={item.writingReq}
                          InputProps={{
                            readOnly: true
                          }}
                        />
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} className={classes.dialog}>
                        <TextField
                          fullWidth
                          margin='normal'
                          multiline

                          variant='outlined'
                          defaultValue={item.writingReqTranslated ? item.writingReqTranslated : ''}
                          onChange={(event) => handleWritingReqChange(event, index)}
                        />
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} className={classes.dialog}>
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
                      <Grid item lg={6} md={6} sm={6} className={classes.dialog}>
                        <TextField
                          fullWidth
                          margin='normal'
                          multiline

                          variant='outlined'
                          defaultValue={item.contentTranslated}
                          onChange={(event) => handleContentChange(event, index)}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Divider sx={{
                  paddingTop: 1
                }} />
              </Box>
            );
          })
        }
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
  }
;

export default Practice13Writing;
