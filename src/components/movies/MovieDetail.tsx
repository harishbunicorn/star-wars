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
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <Button
          onClick={onBack}
          variant="outline"
          className="flex items-center space-x-2"
          aria-label="Go back to movie list"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back to Movies</span>
        </Button>
      </div>

      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 p-8 text-black">
          <div className="flex items-center space-x-4 mb-4">
            <Badge variant="default" size="lg" className="bg-black text-yellow-400 font-mono">
              Episode {getEpisodeDisplay(movie.episode_id)}
            </Badge>
          </div>
          <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
          <p className="text-lg opacity-90">
            Directed by {movie.director}
          </p>
        </div>

        <div className="p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Opening Crawl</h2>
            <div className="bg-black text-yellow-400 p-6 rounded-lg font-mono text-sm leading-relaxed whitespace-pre-line">
              {movie.opening_crawl}
            </div>
          </section>

          <div className="grid md:grid-cols-2 gap-8">
            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Movie Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-medium text-gray-600">Director</span>
                  <span className="text-gray-900">{movie.director}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-medium text-gray-600">Producer</span>
                  <span className="text-gray-900">{movie.producer}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-medium text-gray-600">Release Date</span>
                  <span className="text-gray-900">{formatDate(movie.release_date)}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-medium text-gray-600">Episode</span>
                  <Badge variant="info">
                    {getEpisodeDisplay(movie.episode_id)}
                  </Badge>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Statistics</h3>
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4 text-center bg-blue-50">
                  <div className="text-2xl font-bold text-blue-600">
                    {movie.characters?.length || 0}
                  </div>
                  <div className="text-sm text-gray-600">Characters</div>
                </Card>
                <Card className="p-4 text-center bg-green-50">
                  <div className="text-2xl font-bold text-green-600">
                    {movie.planets?.length || 0}
                  </div>
                  <div className="text-sm text-gray-600">Planets</div>
                </Card>
                <Card className="p-4 text-center bg-purple-50">
                  <div className="text-2xl font-bold text-purple-600">
                    {movie.starships?.length || 0}
                  </div>
                  <div className="text-sm text-gray-600">Starships</div>
                </Card>
                <Card className="p-4 text-center bg-yellow-50">
                  <div className="text-2xl font-bold text-yellow-600">
                    {movie.vehicles?.length || 0}
                  </div>
                  <div className="text-sm text-gray-600">Vehicles</div>
                </Card>
              </div>
            </section>
          </div>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Additional Information</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-600 mb-2">Created</h4>
                <p className="text-gray-900">{formatDate(movie.created)}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-600 mb-2">Last Edited</h4>
                <p className="text-gray-900">{formatDate(movie.edited)}</p>
              </div>
            </div>
          </section>
        </div>
      </Card>
    </div>
  );
};

export default MovieDetail;