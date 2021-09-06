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
    maxHeight: '500px'
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
    padding: '0px 8px',
    height: 'auto !important',
    display: 'block !important'
  }
}));

const Practice20CultureGame = ({ config }) => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [isRequesting, setIsRequesting] = useState(false);

  //
  useEffect(() => {
    const url =
      '/v1/lesson/practice-detail' +
      '?lesson_id=' +
      config.lesson +
      '&practice_type=' +
      config.practiceType.practiceType +
      '&practice_order=' +
      config.practiceType.practiceOrder +
      '&language=' +
      config.language.languageCode;

    setIsRequesting(true);
    doGet(url).then((res) => {
      res.data.map((item) => {
        item.image = encodeURI('https://emhoctiengviet.vn:9001/resource' + item.image);
      });
      setData(res.data);
      setIsRequesting(false);
    });
  }, [config]);

  const handleDialogTranslateChange = (event, key) => {
    setData(
      data.map((item, idx) =>
        idx === key ? { ...item, contentTranslated: event.target.value } : item
      )
    );
  };
  const handleTitleTranslateChange = (event, key) => {
    setData(
      data.map((item, idx) =>
        idx === key ? { ...item, titleTranslated: event.target.value } : item
      )
    );
  };

  //
  const handleSubmit = () => {
    let requestDataTitle = data.map((item) => {
      return {
        practiceId: item.id,
        content: item.titleTranslated,
        type: 'title'
      };
    });
    let requestDataContent = data.map((item) => {
      return {
        practiceId: item.id,
        content: item.contentTranslated,
        type: 'content'
      };
    });
    Array.prototype.push.apply(requestDataTitle, requestDataContent);

    const requestBody = {
      practiceType: config.practiceType.practiceType,
      language: config.language.languageCode,
      data: requestDataTitle
    };

    // console.log(JSON.stringify(requestBody, null, '\t'));
    setIsRequesting(true);
    doPost('/v1/content-locale', requestBody).then((res) => {
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
          <Typography variant='h5'>Ngoại ngữ</Typography>
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
                <Grid item lg={4} md={4} sm={4} className={classes.dialog}>
                  <ImageListItem>
                    <img className={classes.image} srcSet={item.image} />
                  </ImageListItem>
                </Grid>
                <Grid item container lg={8} md={8} sm={8}>
                  <Grid item lg={6} md={6} sm={6} className={classes.dialog}>
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
                  <Grid item lg={6} md={6} sm={6} className={classes.dialog}>
                    <TextField
                      fullWidth
                      margin='normal'
                      multiline

                      variant='outlined'
                      value={item.titleTranslated}
                      onChange={(event) => handleTitleTranslateChange(event, key)}
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
                      value={item.contentTranslated}
                      onChange={(event) =>
                        handleDialogTranslateChange(event, key)
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>
              {/* title vs content */}
              <Divider
                sx={{
                  paddingTop: 1
                }}
              />
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

export default Practice20CultureGame;
