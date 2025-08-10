'use client';

import React, { useState } from 'react';
import { Movie } from '@/types/movie';
import { MovieList, MovieDetail } from '@/components/movies';

export default function Home() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleBackToList = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {selectedMovie ? (
          <MovieDetail movie={selectedMovie} onBack={handleBackToList} />
        ) : (
          <MovieList onMovieSelect={handleMovieSelect} />
        )}
      </div>
    </div>
  );
}
