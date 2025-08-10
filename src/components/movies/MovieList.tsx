import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { fetchMovies } from '@/store/movieSlice';
import { Movie, SortField, SortOrder } from '@/types/movie';
import { Card, LoadingSpinner, ErrorMessage, Button, Badge } from '@/components/ui';

interface MovieListProps {
  onMovieSelect: (movie: Movie) => void;
}

const MovieList: React.FC<MovieListProps> = ({ onMovieSelect }) => {
  const dispatch = useAppDispatch();
  const { movies, loading, error } = useAppSelector((state) => state.movies);
  
  const [sortField, setSortField] = useState<SortField>('episode_id');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);


  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
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

  const getEpisodeDisplay = (episodeId: number) => {
    const romanNumerals = {
      1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V', 6: 'VI',
      7: 'VII', 8: 'VIII', 9: 'IX'
    } as const;
    return romanNumerals[episodeId as keyof typeof romanNumerals] || episodeId.toString();
  };

  const LoadingSkeletons = () => (
    <div className={`grid gap-6 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
      {[...Array(6)].map((_, i) => (
        <Card key={i} variant="default" loading className="h-64" />
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="space-y-8 animate-fade-in">
        <div className="text-center space-y-4">
          <LoadingSpinner variant="lightsaber" size="lg" className="mx-auto" />
          <div className="space-y-2">
            <div className="loading-skeleton h-8 w-64 mx-auto" />
            <div className="loading-skeleton h-4 w-48 mx-auto" />
          </div>
        </div>
        <LoadingSkeletons />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-96 animate-fade-in">
        <ErrorMessage message={error} onRetry={handleRetry} />
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Header Section */}
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-sans font-bold gradient-text">
            Star Wars Movies
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-balance leading-relaxed">
            Discover the complete saga of a galaxy far, far away. From the original trilogy to the sequel saga.
          </p>
        </div>
        
        <div className="flex items-center justify-center space-x-4">
          <Badge variant="info" className="font-mono text-base px-4 py-2">
            {movies.length} Films
          </Badge>
          <Badge variant="warning" className="font-mono text-base px-4 py-2">
            9 Episodes
          </Badge>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-6 p-6 bg-gray-50 dark:bg-slate-800/50 rounded-2xl shadow-sm">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <span className="text-base font-semibold text-gray-700 dark:text-gray-300">Sort by:</span>
          <div className="flex flex-wrap gap-2">
            {[
              { field: 'episode_id' as SortField, label: 'Episode' },
              { field: 'title' as SortField, label: 'Title' },
              { field: 'release_date' as SortField, label: 'Release Date' },
              { field: 'director' as SortField, label: 'Director' },
            ].map(({ field, label }) => (
              <Button
                key={field}
                variant={sortField === field ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => handleSort(field)}
                icon={sortField === field ? (
                  <svg 
                    className="w-3 h-3" 
                    style={{ width: '0.75rem', height: '0.75rem', flexShrink: 0 }}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d={sortOrder === 'asc' ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                  </svg>
                ) : undefined}
                iconPosition="right"
              >
                {label}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <span className="text-base font-semibold text-gray-700 dark:text-gray-300">View:</span>
          <div className="flex bg-gray-100 dark:bg-slate-700 rounded-xl p-1.5 shadow-inner">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-3 rounded-lg transition-all ${
                viewMode === 'grid' 
                  ? 'bg-white dark:bg-slate-600 shadow-md scale-105' 
                  : 'hover:bg-gray-200 dark:hover:bg-slate-600'
              }`}
            >
              <svg 
                className="w-4 h-4" 
                style={{ width: '1rem', height: '1rem', flexShrink: 0 }}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-3 rounded-lg transition-all ${
                viewMode === 'list' 
                  ? 'bg-white dark:bg-slate-600 shadow-md scale-105' 
                  : 'hover:bg-gray-200 dark:hover:bg-slate-600'
              }`}
            >
              <svg 
                className="w-4 h-4" 
                style={{ width: '1rem', height: '1rem', flexShrink: 0 }}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Movies Grid/List */}
      <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8' : 'flex flex-col gap-4 max-w-4xl mx-auto'}`}>
        {sortedMovies.map((movie, index) => (
          <Card
            key={movie.url}
            variant="elevated"
            hover
            onClick={() => onMovieSelect(movie)}
            className={`overflow-hidden group cursor-pointer animate-slide-up ${viewMode === 'list' ? 'flex' : ''}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className={`${viewMode === 'list' ? 'flex items-center' : ''}`}>
              {/* Episode Banner */}
              <div className={`
                ${viewMode === 'list' ? 'w-20 h-20 flex-shrink-0 mr-4' : 'h-32'} 
                bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 
                flex items-center justify-center relative overflow-hidden
              `}>
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative z-10 text-center">
                  <div className="text-2xl md:text-3xl font-mono font-bold text-white">
                    {getEpisodeDisplay(movie.episode_id)}
                  </div>
                  <div className="text-xs text-white/80 font-medium">
                    Episode
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-2 right-2 w-1 h-1 bg-white/60 rounded-full" />
                <div className="absolute bottom-3 left-3 w-1 h-1 bg-white/40 rounded-full" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-sans font-bold text-gray-900 dark:text-gray-50 group-hover:gradient-text transition-all">
                      {movie.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Directed by {movie.director}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                      <svg 
                        className="w-4 h-4" 
                        style={{ width: '1rem', height: '1rem', flexShrink: 0 }}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{formatDate(movie.release_date)}</span>
                    </div>
                    
                    <Badge variant="info" size="sm">
                      {movie.characters?.length || 0} Characters
                    </Badge>
                  </div>

                  {viewMode === 'grid' && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {movie.opening_crawl.substring(0, 120)}...
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i} 
                          className="w-3 h-3 text-yellow-400" 
                          style={{ width: '0.75rem', height: '0.75rem', flexShrink: 0 }}
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    
                    <svg 
                      className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" 
                      style={{ width: '1.25rem', height: '1.25rem', flexShrink: 0 }}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {movies.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🌌</div>
          <h3 className="text-xl font-sans font-semibold text-gray-600 dark:text-gray-400 mb-2">
            No movies found in the galaxy
          </h3>
          <p className="text-gray-500 dark:text-gray-500">
            The Force seems to be disturbed. Try refreshing the page.
          </p>
        </div>
      )}
    </div>
  );
};

export default MovieList;