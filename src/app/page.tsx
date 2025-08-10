'use client';

import React, { useState } from 'react';
import { Movie } from '@/types/movie';
import { MovieList, MovieDetail } from '@/components/movies';
import Header from '@/components/layout/Header';

export default function Home() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleBackToList = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="min-h-screen">
      <Header 
        title={selectedMovie ? selectedMovie.title : 'Star Wars Movies'}
        showBackButton={!!selectedMovie}
        onBack={handleBackToList}
      />
      
      <main className="container mx-auto px-6 sm:px-8 lg:px-12 py-8 md:py-12">
        {selectedMovie ? (
          <MovieDetail movie={selectedMovie} onBack={handleBackToList} />
        ) : (
          <MovieList onMovieSelect={handleMovieSelect} />
        )}
      </main>
    </div>
  );
}
