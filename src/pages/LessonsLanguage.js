import { Helmet } from 'react-helmet';
import { Box, Button, Card, CardContent, CardHeader, Container, Divider, Typography } from '@material-ui/core';
import SettingsPassword from '../components/settings/SettingsPassword';

const LessonsLanguage = () => (
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
      <Container maxWidth="lg">
        <Card>
          <CardHeader
            subheader="Edit the lessons language"
            title="Lessons"
          />
          <Divider />
          <CardContent>
            <Typography variant='h3'>Hello World</Typography>
          </CardContent>
          <Divider />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              p: 2
            }}
          >
            <Button
              color="primary"
              variant="contained"
            >
              Save
            </Button>
          </Box>
        </Card>
      </Container>
    </Box>
  </>
);

export default LessonsLanguage;
