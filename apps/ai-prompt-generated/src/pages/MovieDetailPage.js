import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MainLayout from '../components/layout/MainLayout';
import MovieDetails from '../components/movie/MovieDetails';
import MovieList from '../components/movie/MovieList';
import Button from '../components/common/Button';
import Loading from '../components/common/Loading';
import { movieApi } from '../api';

const DetailContainer = styled.div`
  width: 100%;
`;

const BackButton = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin: 3rem 0 1.5rem;
  color: ${props => props.theme?.colors?.text || '#333333'};
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: ${props => props.theme?.colors?.text || '#333333'};
  
  h2 {
    margin-bottom: 1rem;
    color: #e53935;
  }
  
  p {
    margin-bottom: 2rem;
  }
`;

/**
 * MovieDetailPage component
 */
const MovieDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [movie, setMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const movieData = await movieApi.getMovieDetails(id);
        setMovie(movieData);
        
        // Fetch recommendations
        const recommendationsData = await movieApi.getMovieRecommendations(id);
        setRecommendations(recommendationsData.results);
      } catch (err) {
        console.error('Error fetching movie details:', err);
        setError('Failed to load movie details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchMovieDetails();
    }
  }, [id]);
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  if (loading) {
    return (
      <MainLayout>
        <Loading text="Loading movie details..." />
      </MainLayout>
    );
  }
  
  if (error || !movie) {
    return (
      <MainLayout>
        <ErrorMessage>
          <h2>Error</h2>
          <p>{error || 'Movie not found'}</p>
          <Button onClick={handleGoBack}>Go Back</Button>
        </ErrorMessage>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <DetailContainer>
        <BackButton>
          <Button variant="outlined" onClick={handleGoBack}>
            &larr; Back
          </Button>
        </BackButton>
        
        <MovieDetails movie={movie} />
        
        {recommendations.length > 0 && (
          <>
            <SectionTitle>You May Also Like</SectionTitle>
            <MovieList 
              movies={recommendations}
              loading={false}
              emptyMessage="No recommendations available"
            />
          </>
        )}
      </DetailContainer>
    </MainLayout>
  );
};

export default MovieDetailPage; 