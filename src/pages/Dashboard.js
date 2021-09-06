import { Helmet } from 'react-helmet';
import { Box, Card, CardContent, Container } from '@material-ui/core';
import { doGet } from '../utils/api';
import ReactHtmlParser from 'html-react-parser';
import { useState } from 'react';

const Dashboard = () => {
  const [data, setData] = useState('');
  const url = '/v1/config/message'
    + '?message_key=cms-guide'
    + '&language=vi';
  doGet(url)
    .then(res => {
      console.log(res);

      setData(res[0].messageValue);
    });
  return (<>
    <Helmet>
      <title>Dashboard | Material Kit</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <Card>
          <CardContent>
            {ReactHtmlParser(data)}
          </CardContent>
        </Card>
      </Container>
    </Box>
  </>);
};

export default Dashboard;
