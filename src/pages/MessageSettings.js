import { Helmet } from 'react-helmet';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
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
import { editorLanguages, editorTypes, TINYMCE_API_KEY } from '../config/config';
import React, { useEffect, useRef, useState } from 'react';
import { doGet, doPost } from '../utils/api';
import { Editor } from '@tinymce/tinymce-react';
import { Save as SaveIcon } from 'react-feather';
import swal from 'sweetalert';

const useStyles = makeStyles((theme) => ({
  paper: {
    // width: '100%'
  }
}));

const MessageSettings = () => {
  const [isRequesting, setIsRequesting] = useState(false);
  const classes = useStyles();
  const [data, setData] = useState(
    ''
  );
  const [config, setConfig] = useState({
    'language': editorLanguages[0],
    'editorType': editorTypes[0]
  });

  useEffect(() => {
    const url = '/v1/config/message'
      + '?message_key=' + config.editorType.editorType
      + '&language=' + config.language.languageCode;
        doGet(url)
      .then(res => {
        setData(res[0] ? res[0].messageValue : '');
      })
    ;
  }, [config]);
  const editorRef = useRef(data);

  const handleLanguageChange = (event) => {
    setConfig({
      ...config,
      'language': editorLanguages.find(o => o.languageCode === event.target.value)
    });
  };

  const handleEditorTypeChange = (event) => {
    setConfig({
      ...config,
      'editorType': editorTypes.find(o => o.editorType === event.target.value)
    });
  };

  function handleSubmit() {
    setIsRequesting(true);
    const requestBody = {
      'messageKey': config.editorType.editorType,
      'language': config.language.languageCode,
      'messageValue': editorRef.current.getContent()
    };
    doPost('/v1/config/message', requestBody)
      .then(res => {
        setIsRequesting(false);
        if (res && res.ok) {
          swal('', 'Thành công', 'success');
        } else {
          swal('', 'Cập nhật thất bại. Liên hệ admin\n' + res, 'error');
        }
      });
  }

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
                // subheader='Chỉnh sửa Phần giới thiệu'
                title='Editor'
              />
              <Divider />
              <CardContent>
                <form>
                  <Grid container spacing={1}>
                    <Grid item lg={2} md={2} sm={2}>
                      <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel>Trang</InputLabel>
                        <Select
                          labelId='type-select'
                          id='type-select'
                          value={config.editorType.editorType}
                          defaultValue={config.editorType.editorType}
                          label='type'
                          onChange={handleEditorTypeChange}
                        >
                          {editorTypes.map((i, k) => (
                            <MenuItem key={k} value={i.editorType}>{i.title}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item lg={4} md={4} sm={4}>
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
                          {editorLanguages.map((i, k) => (
                            <MenuItem key={k} value={i.languageCode}>{i.title}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6}>
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
                          {isRequesting ? <CircularProgress color={'inherit'} size={20} /> : 'Lưu'}
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
              <CardContent>
                <Editor
                  apiKey={TINYMCE_API_KEY}
                  onInit={(evt, editor) => editorRef.current = editor}
                  initialValue={data}
                  init={{
                    paste_data_images: true,
                    height: 500,
                    menubar: false,
                    plugins: [
                      'advlist autolink lists link image charmap print preview anchor',
                      'searchreplace visualblocks code fullscreen',
                      'insertdatetime media table paste code help wordcount editimage image'
                    ],
                    toolbar: 'undo redo | formatselect fontsizeselect | ' +
                      'bold italic forecolor backcolor | alignleft aligncenter ' +
                      'alignright alignjustify | bullist numlist outdent indent | image',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                  }}
                />
              </CardContent>
            </Card>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default MessageSettings;
