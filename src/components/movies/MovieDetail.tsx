import React from 'react';
import { Movie } from '@/types/movie';
import { Button, Card, Badge } from '@/components/ui';

interface MovieDetailProps {
  movie: Movie;
  onBack: () => void;
}

const MovieDetail: React.FC<MovieDetailProps> = ({ movie, onBack }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const romanNumerals = {
    1: 'I',
    2: 'II',
    3: 'III',
    4: 'IV',
    5: 'V',
    6: 'VI',
    7: 'VII',
    8: 'VIII',
    9: 'IX',
  } as const;

  const getEpisodeDisplay = (episodeId: number) => {
    return romanNumerals[episodeId as keyof typeof romanNumerals] || episodeId.toString();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <Button
          onClick={onBack}
          variant="outline"
          size="lg"
          className="flex items-center space-x-3 shadow-sm hover:shadow-md transition-shadow"
          aria-label="Go back to movie list"
        >
          <svg 
            className="w-5 h-5" 
            style={{ width: '1.25rem', height: '1.25rem', flexShrink: 0 }}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-semibold">Back to Movies</span>
        </Button>
      </div>

      <Card variant="elevated" className="overflow-hidden shadow-2xl">
        <div className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 p-12 text-black relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 left-4 w-2 h-2 bg-black rounded-full" />
            <div className="absolute top-8 right-8 w-1 h-1 bg-black rounded-full" />
            <div className="absolute bottom-6 left-12 w-1.5 h-1.5 bg-black rounded-full" />
            <div className="absolute bottom-12 right-6 w-1 h-1 bg-black rounded-full" />
          </div>
          
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
              <Badge variant="default" size="lg" className="bg-black text-yellow-400 font-mono text-lg px-6 py-3 shadow-lg mb-4 sm:mb-0">
                Episode {getEpisodeDisplay(movie.episode_id)}
              </Badge>
              <div className="text-right opacity-75">
                <p className="text-sm font-medium">Released</p>
                <p className="text-lg font-semibold">{formatDate(movie.release_date)}</p>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">{movie.title}</h1>
            <p className="text-xl md:text-2xl opacity-90 font-medium">
              Directed by {movie.director}
            </p>
            <p className="text-lg opacity-75 mt-2">
              Produced by {movie.producer}
            </p>
          </div>
        </div>

        <div className="p-12 space-y-12">
          <section>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
              <span className="bg-gradient-to-r from-yellow-400 to-amber-500 w-1 h-8 rounded-full mr-4"></span>
              Opening Crawl
            </h2>
            <div className="bg-gradient-to-br from-black to-gray-900 text-yellow-400 p-8 rounded-2xl font-mono text-base leading-relaxed whitespace-pre-line shadow-2xl border border-yellow-400/20">
              {movie.opening_crawl}
            </div>
          </section>

          <div className="grid lg:grid-cols-2 gap-12">
            <section>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
                <span className="bg-gradient-to-r from-blue-400 to-blue-600 w-1 h-6 rounded-full mr-3"></span>
                Movie Details
              </h3>
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-slate-800/50 p-6 rounded-xl space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-slate-600">
                    <span className="font-semibold text-gray-700 dark:text-gray-300">Director</span>
                    <span className="text-gray-900 dark:text-gray-100 font-medium">{movie.director}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-slate-600">
                    <span className="font-semibold text-gray-700 dark:text-gray-300">Producer</span>
                    <span className="text-gray-900 dark:text-gray-100 font-medium text-right max-w-xs">{movie.producer}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-slate-600">
                    <span className="font-semibold text-gray-700 dark:text-gray-300">Release Date</span>
                    <span className="text-gray-900 dark:text-gray-100 font-medium">{formatDate(movie.release_date)}</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="font-semibold text-gray-700 dark:text-gray-300">Episode</span>
                    <Badge variant="info" size="lg" className="font-mono">
                      {getEpisodeDisplay(movie.episode_id)}
                    </Badge>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
                <span className="bg-gradient-to-r from-purple-400 to-purple-600 w-1 h-6 rounded-full mr-3"></span>
                Statistics
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <Card variant="glass" className="text-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 border-blue-200 dark:border-blue-700 hover:scale-105 transition-transform">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {movie.characters?.length || 0}
                  </div>
                  <div className="text-sm font-semibold text-blue-700 dark:text-blue-300">Characters</div>
                </Card>
                <Card variant="glass" className="text-center bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 border-green-200 dark:border-green-700 hover:scale-105 transition-transform">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                    {movie.planets?.length || 0}
                  </div>
                  <div className="text-sm font-semibold text-green-700 dark:text-green-300">Planets</div>
                </Card>
                <Card variant="glass" className="text-center bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 border-purple-200 dark:border-purple-700 hover:scale-105 transition-transform">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                    {movie.starships?.length || 0}
                  </div>
                  <div className="text-sm font-semibold text-purple-700 dark:text-purple-300">Starships</div>
                </Card>
                <Card variant="glass" className="text-center bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/30 dark:to-yellow-800/30 border-yellow-200 dark:border-yellow-700 hover:scale-105 transition-transform">
                  <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
                    {movie.vehicles?.length || 0}
                  </div>
                  <div className="text-sm font-semibold text-yellow-700 dark:text-yellow-300">Vehicles</div>
                </Card>
              </div>
            </section>
          </div>

          <section>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
              <span className="bg-gradient-to-r from-gray-400 to-gray-600 w-1 h-6 rounded-full mr-3"></span>
              Additional Information
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <Card variant="outlined" className="hover:shadow-lg transition-shadow">
                <h4 className="font-bold text-gray-700 dark:text-gray-300 mb-3 text-lg">Created</h4>
                <p className="text-gray-900 dark:text-gray-100 font-medium text-lg">{formatDate(movie.created)}</p>
              </Card>
              <Card variant="outlined" className="hover:shadow-lg transition-shadow">
                <h4 className="font-bold text-gray-700 dark:text-gray-300 mb-3 text-lg">Last Edited</h4>
                <p className="text-gray-900 dark:text-gray-100 font-medium text-lg">{formatDate(movie.edited)}</p>
              </Card>
            </div>
          </section>
        </div>
      </Card>
    </div>
  );
};

export default MovieDetail;