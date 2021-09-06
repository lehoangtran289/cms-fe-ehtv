import {
  Box,
  Button,
  Divider,
  Grid,
  ImageListItem,
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
  image: {
    maxHeight: '420px'
  },
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
    height: 'auto',
    display: 'block',
    padding: '8px',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  }
}));

const Practice15CultureImage = ({ config }) => {
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
        res.data.map((item) => {
          item.imagePath = encodeURI('https://emhoctiengviet.vn:9001/resource' + item.imagePath);
        });
        setData(res.data);
        setIsRequesting(false);
      });
  }, [config]);

  const handleImageCaptionTranslateChange = (event, key) => {
    setData(data.map((item, idx) => idx === key ? { ...item, 'imageCaptionTranslated': event.target.value } : item));
  };

  // 
  const handleSubmit = () => {
    const requestData = data.map((item) => {
      return {
        'practiceId': item.id,
        'content': item.imageCaptionTranslated,
        'type': 'caption'
      };
    });
    const requestBody = {
      'practiceType': config.practiceType.practiceType,
      'language': config.language.languageCode,
      'data': requestData
    };

    console.log(JSON.stringify(requestBody, null, '\t'));

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
        <Grid item lg={4} md={4} sm={4} className={classes.gridHeader}>
          <Typography variant='h5'>Hình ảnh</Typography>
        </Grid>
        <Grid item lg={4} md={4} sm={4} className={classes.gridHeader}>
          <Typography variant='h5'>Tiếng việt</Typography>
        </Grid>
        <Grid item lg={4} md={4} sm={4} className={classes.gridHeader}>
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
                <Grid item lg={4} md={4} sm={4} className={classes.grid}>
                  <ImageListItem>
                    <img className={classes.image}
                         srcSet={item.imagePath}
                         alt={item.imageCaption}
                    />
                  </ImageListItem>
                </Grid>
                <Grid item lg={4} md={4} sm={4} className={classes.dialog}>
                  <TextField
                    fullWidth
                    multiline
                    margin='normal'

                    variant='outlined'
                    value={item.imageCaption}
                    InputProps={{
                      readOnly: true
                    }}
                  />
                </Grid>
                <Grid item lg={4} md={4} sm={4} className={classes.dialog}>
                  <TextField
                    fullWidth
                    margin='normal'
                    multiline

                    variant='outlined'
                    value={item.imageCaptionTranslated}
                    onChange={(event) =>
                      handleImageCaptionTranslateChange(event, key)
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

export default Practice15CultureImage;
