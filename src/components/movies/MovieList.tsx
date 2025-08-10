import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { fetchMovies } from '@/store/movieSlice';
import { Movie, SortField, SortOrder } from '@/types/movie';
import { Table, LoadingSpinner, ErrorMessage, Button } from '@/components/ui';
import type { TableColumn } from '@/components/ui/Table';

interface MovieListProps {
  onMovieSelect: (movie: Movie) => void;
}

const MovieList: React.FC<MovieListProps> = ({ onMovieSelect }) => {
  const dispatch = useAppDispatch();
  const { movies, loading, error } = useAppSelector((state) => state.movies);
  
  const [sortField, setSortField] = useState<SortField>('episode_id');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  useEffect(() => {
    if (movies.length === 0) {
      dispatch(fetchMovies());
    }
  }, [dispatch, movies.length]);

  const handleSort = (field: string) => {
    const newField = field as SortField;
    if (sortField === newField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(newField);
      setSortOrder('asc');
    }
  };

  const handleRetry = () => {
    dispatch(fetchMovies());
  };

  const sortedMovies = React.useMemo(() => {
    const sorted = [...movies].sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (sortField === 'release_date') {
        aValue = new Date(aValue as string).getTime();
        bValue = new Date(bValue as string).getTime();
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });

    return sorted;
  }, [movies, sortField, sortOrder]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const columns: TableColumn<Movie>[] = [
    {
      key: 'episode_id',
      header: 'Episode',
      sortable: true,
      render: (movie) => (
        <span className="font-mono text-lg font-bold text-yellow-600">
          {movie.episode_id}
        </span>
      ),
      className: 'w-20',
    },
    {
      key: 'title',
      header: 'Title',
      sortable: true,
      render: (movie) => (
        <Button
          variant="ghost"
          className="text-left p-0 h-auto font-semibold text-blue-600 hover:text-blue-800"
          onClick={() => onMovieSelect(movie)}
          aria-label={`View details for ${movie.title}`}
        >
          {movie.title}
        </Button>
      ),
    },
    {
      key: 'director',
      header: 'Director',
      sortable: true,
      render: (movie) => (
        <span className="text-gray-700">{movie.director}</span>
      ),
    },
    {
      key: 'release_date',
      header: 'Release Date',
      sortable: true,
      render: (movie) => (
        <span className="text-gray-600">{formatDate(movie.release_date)}</span>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <p className="text-gray-600">Loading Star Wars movies...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <ErrorMessage message={error} onRetry={handleRetry} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-gray-900">
          Star Wars Movies
        </h1>
        <p className="text-lg text-gray-600">
          Explore the galaxy far, far away...
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            All Movies ({movies.length})
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Click on any movie title to view details
          </p>
        </div>
        
        <Table
          data={sortedMovies}
          columns={columns}
          onSort={handleSort}
          sortField={sortField}
          sortOrder={sortOrder}
          emptyMessage="No movies found in the galaxy..."
          aria-label="Star Wars movies table"
        />
      </div>
    </div>
  );
};

export default MovieList;