import { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    boxShadow: '0 5px 8px 0 rgba(0, 0, 0, 0.3)',
    backgroundColor: '#fafafa',
  },
  media: {
    height: 300,
  },
});

function Home() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    return fetch(`https://reqres.in/api/users?page=${page}&per_page=2`)
      .then((res) => res.json())
      .then((res) => {
        setPage(res.page);
        setTotalPages(res.total_pages);
        setData(res.data);
      });
  }, [page]);

  const handleClickpre = () => {
    setPage(page - 1);
  };
  const handleClicknext = () => {
    setPage(page + 1);
  };

  return (
    <>
      <Container>
        <Typography
          color='textPrimary'
          gutterBottom
          variant='h3'
          align='center'
        >
          USER DATA PAGE
        </Typography>
        <div style={{ display: 'flex', marginTop: '5px', marginBottom: '5px' }}>
          {page > 1 && (
            <button
              style={{ height: '40px', width: '80px' }}
              onClick={handleClickpre}
            >
              previous
            </button>
          )}
          {page < totalPages && (
            <button
              style={{ height: '40px', width: '80px' }}
              onClick={handleClicknext}
            >
              next
            </button>
          )}
        </div>
        Current Page: {page}
        <Grid container spacing={3}>
          {data.map((user) => (
            <Grid item xs={12} sm={4} key={user.id}>
              <Card className={classes.card}>
                <CardMedia className={classes.media} image={user.avatar} />
                <CardContent>
                  <Typography color='primary' variant='h5'>
                    {user.first_name}
                    {user.last_name}
                  </Typography>
                  <Typography color='textSecondary' variant='subtitle2'>
                    {user.email}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default Home;
